
import express from 'express';
import {cancelMyBooking, createBooking, getMyBookings} from "../../controllers/user/bookingController.js";


const router = express.Router();

// POST /api/bookings - Create new booking
router.post('/', createBooking);

// GET /api/bookings - Get user's bookings
router.get('/', getMyBookings);

// PUT /api/bookings/:id/cancel - Cancel booking
router.put('/:id/cancel', cancelMyBooking);

export default router;