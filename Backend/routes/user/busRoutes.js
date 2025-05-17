import express from 'express';
import {
    getAvailableBuses,
    getBusWithSeats, updateBusLocation
} from '../../controllers/user/busController.js';
import {authorizeRoles, isAuthenticated} from "../../middlewares/authMiddleware.js";


const router = express.Router();

router.route('/').get(getAvailableBuses);
router.route('/:id/seats').get(getBusWithSeats);
router.route('/:id/location').patch(
    isAuthenticated,
    authorizeRoles('driver'),
    updateBusLocation
);



export default router;
