import jwt from 'jsonwebtoken';

// Protect routes using JWT
export const isAuthenticated = async (req, res, next) => {
    try {
        // Check if the Authorization header contains a token
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access Denied, No Token Provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user using the decoded id from the token
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid or Expired Token' });
    }
};

// Function to authorize user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    };
};

// Admin-specific role check
export const isAdmin = authorizeRoles("admin");

