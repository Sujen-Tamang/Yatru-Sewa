
import Booking from '../models/Booking.js';
import Bus from '../models/Bus.js';

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { busId, seatNumber, route, date, departureTime, amount } = req.body;
        const bus = await Bus.findById(busId);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        const newBooking = new Booking({
            id: `BK${Date.now()}`,
            userId: req.user.id,
            userName: req.user.name,
            busId,
            route,
            date,
            departureTime,
            status: 'Confirmed',
            paymentStatus: 'Paid',
            amount,
            seatNumber,
        });
        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

// Get all bookings by user ID
export const getBookingsByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).populate('busId');
        res.json(bookings.map(booking => ({
            id: booking.id,
            userId: booking.userId,
            userName: booking.userName,
            route: booking.route,
            date: booking.date,
            departureTime: booking.departureTime,
            status: booking.status,
            paymentStatus: booking.paymentStatus,
            amount: booking.amount,
            seatNumber: booking.seatNumber
        })));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }

        booking.status = 'Canceled';
        await booking.save();
        res.json({ message: 'Booking canceled successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling booking', error });
    }
};
