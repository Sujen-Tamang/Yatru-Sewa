import Bus from '../../models/Bus.js';
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import { AppError } from '../../middlewares/errorMiddleware.js';


export const getAvailableBuses = catchAsyncError(async (req, res, next) => {
    const { from, to, date, minSeats } = req.query;

    // Build query
    const query = { active: true };

    // Route filters
    if (from) query['route.from'] = { $regex: new RegExp(from, 'i') };
    if (to) query['route.to'] = { $regex: new RegExp(to, 'i') };

    // Date filter
    if (date) {
        const searchDate = new Date(date);
        const startDate = new Date(searchDate.setHours(0, 0, 0, 0));
        const endDate = new Date(searchDate.setHours(23, 59, 59, 999));
        query['schedule.departure'] = { $gte: startDate, $lte: endDate };
    }

    // Get all buses matching the basic filters
    let buses = await Bus.find(query).lean();

    // Apply minSeats filter in JavaScript (more flexible than MongoDB query)
    if (minSeats) {
        const minSeatsNum = parseInt(minSeats);
        buses = buses.filter(bus =>
            bus.seats.filter(s => !s.isBooked).length >= minSeatsNum
        );
    }

    // Format response
    res.status(200).json({
        success: true,
        count: buses.length,
        data: buses.map(bus => ({
            id: bus._id,
            busNumber: bus.busNumber,
            route: bus.route,
            schedule: bus.schedule,
            availableSeats: bus.seats.filter(s => !s.isBooked).length,
            price: bus.price,
            amenities: bus.amenities // Added if available
        }))
    });
});

// @desc    Get bus details with seat map
// @route   GET /api/buses/:id
// @access  Public
export const getBusWithSeats = catchAsyncError(async (req, res, next) => {
    // Validate bus ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new AppError('Invalid bus ID format', 400));
    }

    const bus = await Bus.findById(req.params.id).lean();

    if (!bus) {
        return next(new AppError('Bus not found', 404));
    }

    if (!bus.active) {
        return next(new AppError('This bus is currently not in service', 403));
    }

    // Format response
    const response = {
        id: bus._id,
        busNumber: bus.busNumber,
        route: bus.route,
        schedule: bus.schedule,
        price: bus.price,
        totalSeats: bus.seats.length,
        availableSeats: bus.seats.filter(s => !s.isBooked).length,
        seats: bus.seats.map(seat => ({
            number: seat.number,
            available: !seat.isBooked,
            features: seat.features || [], // Added if available
            // Only show bookedBy to admin
            ...(req.user?.role === 'admin' && {
                bookedBy: seat.bookedBy,
                bookingDate: seat.bookingDate
            })
        }))
    };

    res.status(200).json({
        success: true,
        data: response
    });
});


export const updateBusLocation = async (req, res) => {
    const { lat, lng } = req.body;
    const { id } = req.params;

    try {
        const updatedBus = await Bus.findByIdAndUpdate(
            id,
            {
                $set: {
                    currentLocation: { lat, lng, updatedAt: new Date() }
                }
            },
            { new: true }
        );

        if (!updatedBus) return res.status(404).json({ message: 'Bus not found' });

        res.json({ success: true, data: updatedBus });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating location', error: err.message });
    }
};
