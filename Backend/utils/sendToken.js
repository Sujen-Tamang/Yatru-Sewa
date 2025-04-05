export const sendToken = (user, statusCode, message, res) => {
    const token = user.generateToken(
        { id: user._id, email: user.email }, // Include email in the payload
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(statusCode).json({
        success: true,
        message,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    });
};