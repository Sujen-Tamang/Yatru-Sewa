// routes/authRoutes.js

import express from 'express';
import { login } from '../controllers/authController.js';
import { sendVerificationEmailCode, verifyEmailCode } from '../controllers/verificationController.js';

const router = express.Router();

// Login Route
router.post('/login', login);

// Send Verification Code Route
router.post('/send-verification-code', sendVerificationEmailCode);

// Verify Email Code Route
router.post('/verify-email-code', verifyEmailCode);

export default router;
