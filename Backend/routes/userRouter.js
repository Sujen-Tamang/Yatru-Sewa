import express, {Router} from "express";
import {
  register,
  verifyOTP,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import authRoutes from "./authRoutes.js";
import busRoutes from "./busRoutes.js";
import bookingRoutes from "./bookingRoutes.js";

const router = express.Router();

router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get('/buses', busRoutes);  // Bus management routes
router.post('/bookings', bookingRoutes);  // Booking management routes


export default router;
