import express from 'express';
import {
    getAvailableBuses,
    getBusWithSeats
} from '../../controllers/user/busController.js';
import {isAuthenticated} from "../../middlewares/authMiddleware.js";


const router = express.Router();

router.route('/')
    .get(getAvailableBuses);

router.route('/:id/seats')
    .get(getBusWithSeats);

export default router;