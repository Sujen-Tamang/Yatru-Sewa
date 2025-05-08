import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js'; // or import User if using default export
import { AppError } from './errorMiddleware.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        // 1. Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return next(new AppError('Not authorized to access this route', 401));
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Find user and attach to request
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return next(new AppError('User not found', 404));
        }

        next();
    } catch (err) {
        return next(new AppError('Not authorized to access this route', 401));
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(`Role (${req.user.role}) is not allowed to access this resource`, 403)
            );
        }
        next();
    };
};