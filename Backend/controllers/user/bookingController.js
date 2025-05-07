import Bus from '../../models/Bus.js';
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import { AppError } from '../../middlewares/errorMiddleware.js';
import {User} from "../../models/userModel.js";
import {Booking} from "../../models/Booking.js";


/**
 * @desc    Create new booking with seat selection
 * @route   POST /api/bookings
 * @access  Private
 */
export const createBooking = catchAsyncError(async (req, res, next) => {
    const { busId, seats, travelDate } = req.body;
    const userId = req.user._id;

    // 1. Check if the user is verified
    const user = await User.findById(userId);
    if (!user || !user.isVerified) {
        return next(new AppError('Please verify your account before booking', 401));
    }

    // 2. Check bus availability
    const bus = await Bus.findById(busId);
    if (!bus) {
        return next(new AppError('Bus not found', 404));
    }
    if (!bus.active) {
        return next(new AppError('Bus is currently not available', 400));
    }

    // 3. Validate seat availability
    const unavailableSeats = seats.filter(seatNum => {
        const seat = bus.seats.find(s => s.number === seatNum);
        return !seat || seat.isBooked;
    });

    if (unavailableSeats.length > 0) {
        return next(new AppError(
            `Seats ${unavailableSeats.join(', ')} are not available`,
            400
        ));
    }

    // 4. Create booking
    const booking = await Booking.create({
        bookingId: `BK${Date.now()}`,
        user: userId,
        bus: busId,
        seats,
        travelDate: new Date(travelDate),
        totalPrice: seats.length * bus.price,
        status: 'Confirmed'
    });

    // 5. Update seat status
    await Bus.findByIdAndUpdate(busId, {
        $set: {
            'seats.$[elem].isBooked': true,
            'seats.$[elem].bookedBy': userId,
            'seats.$[elem].bookingDate': new Date()
        }
    }, {
        arrayFilters: [{ 'elem.number': { $in: seats } }]
    });

    res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: booking
    });
});

/**
 * @desc    Get all bookings for current user
 * @route   GET /api/bookings
 * @access  Private
 */
export const getMyBookings = catchAsyncError(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate({
            path: 'bus',
            select: 'busNumber route schedule price',
            populate: {
                path: 'route',
                select: 'from to distance duration'
            }
        })
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

/**
 * @desc    Cancel user's booking
 * @route   PUT /api/bookings/:id/cancel
 * @access  Private
 */
export const cancelMyBooking = catchAsyncError(async (req, res, next) => {
    const booking = await Booking.findOne({
        _id: req.params.id,
        user: req.user._id,
        status: 'Confirmed'
    });

    if (!booking) {
        return next(new AppError('Booking not found or already cancelled', 404));
    }

    // Free up seats
    await Bus.findByIdAndUpdate(booking.bus, {
        $set: {
            'seats.$[elem].isBooked': false,
            'seats.$[elem].bookedBy': null,
            'seats.$[elem].bookingDate': null
        }
    }, {
        arrayFilters: [{ 'elem.number': { $in: booking.seats } }]
    });

    // Update booking status
    booking.status = 'Cancelled';
    booking.cancelledAt = new Date();
    await booking.save();

    res.status(200).json({
        success: true,
        message: 'Booking cancelled successfully',
        data: {
            bookingId: booking.bookingId,
            cancelledAt: booking.cancelledAt
        }
    });
});