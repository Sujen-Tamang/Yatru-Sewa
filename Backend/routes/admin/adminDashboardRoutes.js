import express from 'express';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import {
    getDashboardStats,
    getRecentBookings,
    getPopularRoutes,
} from '../../controllers/admin/adminDashboardController.js';

const router = express.Router();

// Admin Dashboard Routes
router.get('/', isAuthenticated, (req, res) => console.log('Admin Dashboard'));
router.get('/stats', isAuthenticated, getDashboardStats);
router.get('/bookings/recent', isAuthenticated, getRecentBookings);
router.get('/routes/popular', isAuthenticated, getPopularRoutes);

export default router;