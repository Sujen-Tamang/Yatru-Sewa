// routes/bookingRoutes.js
import express from 'express';
import { createBooking, getBookingsByUser, cancelBooking } from '../controllers/bookingController.js';
import {protect} from "../middlewares/authMiddleware.js";


const router = express.Router();

// Get all bookings for a specific user
router.get('/', protect, getBookingsByUser);

// Create a booking (Accessible by logged-in users)
router.post('/', protect, createBooking);

// Cancel a booking (Accessible by users)
router.delete('/:id', protect, cancelBooking);

export default router;
