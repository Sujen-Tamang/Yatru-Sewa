import express from 'express';
import {
    forgotPassword,
    login,
    logout,
    register,
    resetPassword, sendVerificationCode,
    verifyOTP
} from "../../controllers/user/authController.js";


const router = express.Router();

// POST /auth/register - User registration
router.post('/register', register);

// POST /auth/send-verification - Email Verification OTP Send
router.post('/send-verification', sendVerificationCode)

// POST /auth/verify-otp - OTP verification
router.post('/verify-otp', verifyOTP);

// POST /auth/login - User login
router.post('/login', login);

// POST /auth/logout - User logout
router.post('/logout', logout);

// POST /auth/forgot-password - Forgot password
router.post('/forgot-password', forgotPassword);

// PUT /auth/reset-password/:token - Reset password
router.put('/reset-password/:token', resetPassword);

export default router;