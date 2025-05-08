import express from 'express';
import {isAuthenticated} from "../../middlewares/authMiddleware.js";
import {initiateKhaltiPayment, verifyKhaltiPayment} from "../../controllers/user/khaltiController.js";

const router = express.Router();

// Khalti payment routes
router.post('/khalti/initiate', isAuthenticated, initiateKhaltiPayment);
router.post('/khalti/verify', verifyKhaltiPayment); // Webhook/callback

export default router;