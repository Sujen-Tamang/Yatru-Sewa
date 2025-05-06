import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

// Login user & return JWT token
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email, accountVerified: true }); // Ensure user is verified
        if (!user) {
            return res.status(401).json({ message: "User not found or not verified" });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Return the token
        res.json({ token });

    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
