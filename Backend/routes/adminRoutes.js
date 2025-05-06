import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import { getAdminDashboard } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, isAdmin, getAdminDashboard);

export default router;
