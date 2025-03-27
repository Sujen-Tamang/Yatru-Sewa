import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// User Schema Definition
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    minLength: [8, "Password must have at least 8 characters."],
    select: false,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  phone: { type: String, unique: true },
  accountVerified: { type: Boolean, default: false },
  verificationCode: Number,
  verificationCodeExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); // Skip hashing if password was not modified
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare entered password with stored password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate a random verification code (5 digits)
userSchema.methods.generateVerificationCode = function () {
  const generateRandomFiveDigitNumber = () => {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigits = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
    return parseInt(firstDigit + remainingDigits);
  };

  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000; // expires in 10 minutes

  return verificationCode;
};

// Generate JWT token
userSchema.methods.generateToken = function () {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
  }

  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE || "1h", // Default expiration time of 1 hour
  });
};

// Generate password reset token (for forgotten passwords)
userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // expires in 15 minutes

  return resetToken;
};

// Create and export the User model
export const User = mongoose.model("User", userSchema);
