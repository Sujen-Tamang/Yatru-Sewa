
import express from 'express';
import { getAllBuses, getBusById, createBus, updateBusLocation } from '../controllers/busController.js';
import {protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all buses (Accessible by admin and super admin)
router.get('/', protect, getAllBuses);

// Get bus by ID (Accessible by admin and super admin)
router.get('/:id', protect, getBusById);

// Create a new bus (Accessible by super admin)
router.post('/', protect, createBus);

// Update bus location (Accessible by admin and super admin)
router.put('/location/:id', protect, updateBusLocation);

export default router;
