import express from 'express';
import adminBookingRoutes from './admin/bookingRoutes.js';
import adminBusRoutes from './admin/busRoutes.js';
import adminUserRoutes from './admin/userRoutes.js';
import userAuthRoutes from './user/authRoutes.js';
import userBookingRoutes from './user/bookingRoutes.js';
import userBusRoutes from './user/busRoutes.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import paymentRoutes from "./user/paymentRoutes.js";

const router = express.Router();

// 1. Health Check Endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// 2. Public Authentication Routes
router.use('/auth', userAuthRoutes);

// 3. Protected User Routes
router.use('/buses', userBusRoutes);
router.use('/bookings', isAuthenticated, userBookingRoutes);

// 4. Admin Routes
router.use('/admin/bookings', isAuthenticated, isAdmin, adminBookingRoutes);
router.use('/admin/buses', isAuthenticated, isAdmin, adminBusRoutes);
router.use('/admin/users', isAuthenticated, isAdmin, adminUserRoutes);

// Payment Routes
router.use('/payments', isAuthenticated, paymentRoutes);
// 5. API Documentation Redirect (Optional)
router.get('/docs', (req, res) => {
    res.redirect('https://api-docs.yourdomain.com');
});

// 6. 404 Handler
router.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.originalUrl,
        availableEndpoints: [
            '/auth/login',
            '/buses',
            '/bookings',
            '/payments/khalti/initiate',
            '/payments/khalti/verify',
        ]
    });
});

export default router;