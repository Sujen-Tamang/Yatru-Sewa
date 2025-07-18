
import express from 'express';
import {
    cancelMyBooking,
    confirmBooking,
    createTempBooking,
    getMyBookings
} from "../../controllers/user/bookingController.js";


const router = express.Router();

// POST /api/bookings - Create new booking
router.post('/', createTempBooking);

// POST /api/bookings - Changed to Confirm booking
router.post('/confirm', confirmBooking);

// GET /api/bookings - Get user's bookings
router.get('/', getMyBookings);

// PUT /api/bookings/:id/cancel - Cancel booking
router.put('/:id/cancel', cancelMyBooking);



export default router;