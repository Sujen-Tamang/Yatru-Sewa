
import express from 'express';
import { getAllBuses, getBusById, createBus, updateBusLocation } from '../controllers/busController.js';
import {isAuthenticated} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all buses (Accessible by admin and super admin)
router.get('/', isAuthenticated, getAllBuses);

// Get bus by ID (Accessible by admin and super admin)
router.get('/:id', isAuthenticated, getBusById);

// Create a new bus (Accessible by super admin)
router.post('/', isAuthenticated, createBus);

// Update bus location (Accessible by admin and super admin)
router.put('/location/:id', isAuthenticated, updateBusLocation);

export default router;
