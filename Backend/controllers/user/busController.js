import Bus from '../../models/Bus.js';
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import { AppError } from '../../middlewares/errorMiddleware.js';
import { io } from '../../app.js';

export const getAvailableBuses = catchAsyncError(async (req, res, next) => {
    const { from, to, date, minSeats } = req.query;
    const query = { active: true };

    if (from) query['route.from'] = { $regex: new RegExp(from, 'i') };
    if (to) query['route.to'] = { $regex: new RegExp(to, 'i') };

    if (date) {
        const searchDate = new Date(date);
        const startDate = new Date(searchDate.setHours(0, 0, 0, 0));
        const endDate = new Date(searchDate.setHours(23, 59, 59, 999));
        query['schedule.departure'] = { $gte: startDate, $lte: endDate };
    }

    let buses = await Bus.find(query).lean();

    if (minSeats) {
        const minSeatsNum = parseInt(minSeats);
        buses = buses.filter((bus) =>
            bus.seats.filter((s) => !s.isBooked).length >= minSeatsNum
        );
    }

    res.status(200).json({
        success: true,
        count: buses.length,
        data: buses.map((bus) => ({
            id: bus._id,
            yatayatName: bus.yatayatName,
            busNumber: bus.busNumber,
            route: bus.route,
            schedule: bus.schedule,
            availableSeats: bus.seats.filter((s) => !s.isBooked).length,
            price: bus.price,
            amenities: bus.amenities,
        })),
    });
});

    export const getBusWithSeats = catchAsyncError(async (req, res, next) => {
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

        const response = {
            id: bus._id,
            yatayatName: bus.yatayatName,
            busNumber: bus.busNumber,
            route: bus.route,
            schedule: bus.schedule,
            price: bus.price,
            totalSeats: bus.seats.length,
            availableSeats: bus.seats.filter((s) => !s.isBooked).length,
            seats: bus.seats.map((seat) => ({
                number: seat.number,
                available: !seat.isBooked,
                features: seat.features || [],
                ...(req.user?.role === 'admin' && {
                    bookedBy: seat.bookedBy,
                    bookingDate: seat.bookingDate,
                }),
            })),
            currentLocation: bus.currentLocation,
        };

        res.status(200).json({
            success: true,
            data: response,
        });
    });

    export const updateBusLocation = catchAsyncError(async (req, res, next) => {
        const { lat, lng } = req.body;
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return next(new AppError('Invalid bus ID format', 400));
        }
        if (typeof lat !== 'number' || typeof lng !== 'number' || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            return next(new AppError('Invalid latitude or longitude', 400));
        }

        const updatedBus = await Bus.findByIdAndUpdate(
            id,
            {
                $set: {
                    currentLocation: { lat, lng, updatedAt: new Date() },
                },
            },
            { new: true }
        ).select('busNumber yatayatName route currentLocation');

        if (!updatedBus) {
            return next(new AppError('Bus not found', 404));
        }

        io.to(id).emit('bus-location-update', {
            busId: id,
            location: updatedBus.currentLocation,
        });

        res.status(200).json({
            success: true,
            data: updatedBus,
        });
    });