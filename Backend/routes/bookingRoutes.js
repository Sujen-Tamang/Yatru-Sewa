// routes/bookingRoutes.js
import express from 'express';
import { createBooking, getBookingsByUser, cancelBooking } from '../controllers/bookingController.js';
import {isAuthenticated} from "../middlewares/authMiddleware.js";


const router = express.Router();

// Get all bookings for a specific user
router.get('/', isAuthenticated, getBookingsByUser);

// Create a booking (Accessible by logged-in users)
router.post('/', isAuthenticated, createBooking);

// Cancel a booking (Accessible by users)
router.delete('/:id', isAuthenticated, cancelBooking);

export default router;
