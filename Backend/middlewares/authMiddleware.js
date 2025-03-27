// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

// Protect routes using JWT
export const protect = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied, No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user data to request
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({message: "Access denied"});
        }
        next();
    };
}