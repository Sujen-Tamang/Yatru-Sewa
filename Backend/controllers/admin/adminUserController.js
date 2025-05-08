import { User } from '../../models/userModel.js';
import { AppError } from '../../middlewares/errorMiddleware.js';

// Get all users (admin only)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// Get single user by ID (admin only)
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// Update user (admin only)
export const updateUser = async (req, res, next) => {
    try {
        const { name, email, role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// Delete user (admin only)
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};