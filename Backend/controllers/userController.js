import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import twilio from "twilio";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Register User
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password, verificationMethod } = req.body;

  if (!name || !email || !phone || !password || !verificationMethod) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  // Validate phone number format
  function validatePhoneNumber(phone) {
    const phoneRegex = /^\+977\d{10}$/; // Nepal format, you can adjust regex as needed
    return phoneRegex.test(phone);
  }

  if (!validatePhoneNumber(phone)) {
    return next(new ErrorHandler("Invalid phone number.", 400));
  }

  const existingUser = await User.findOne({
    $or: [
      { email, accountVerified: true },
      { phone, accountVerified: true },
    ],
  });

  if (existingUser) {
    return next(new ErrorHandler("Phone or Email is already used.", 400));
  }

  const registrationAttempts = await User.find({
    $or: [
      { phone, accountVerified: false },
      { email, accountVerified: false },
    ],
  });

  if (registrationAttempts.length > 3) {
    return next(new ErrorHandler("Exceeded maximum registration attempts. Try again after an hour.", 400));
  }

  const userData = { name, email, phone, password };
  const user = await User.create(userData);

  const verificationCode = await user.generateVerificationCode();
  await user.save();

  sendVerificationCode(verificationMethod, verificationCode, name, email, phone, res);
});

// Send Verification Code (Email/Phone)
async function sendVerificationCode(verificationMethod, verificationCode, name, email, phone, res) {
  try {
    if (verificationMethod === "email") {
      const message = generateEmailTemplate(verificationCode);
      sendEmail({ email, subject: "Your Verification Code", message });
      return res.status(200).json({
        success: true,
        message: `Verification email sent to ${name}.`,
      });
    } else if (verificationMethod === "phone") {
      const verificationCodeWithSpace = verificationCode.toString().split("").join(" ");
      await client.calls.create({
        twiml: `<Response><Say>Your verification code is ${verificationCodeWithSpace}. Your verification code is ${verificationCodeWithSpace}.</Say></Response>`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
      return res.status(200).json({
        success: true,
        message: "OTP sent to your phone.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid verification method.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Verification code failed to send.",
    });
  }
}

// Generate Email Template
function generateEmailTemplate(verificationCode) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
      <p style="font-size: 16px; color: #333;">Dear User,</p>
      <p style="font-size: 16px; color: #333;">Your verification code is:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
          ${verificationCode}
        </span>
      </div>
      <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
      <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
        <p>Thank you,<br>Your Company Team</p>
      </footer>
    </div>
  `;
}

// OTP Verification
export const verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, otp, phone } = req.body;

  // Validate phone number
  function validatePhoneNumber(phone) {
    const phoneRegex = /^\+977\d{10}$/; // Correct regex pattern for Nepal
    return phoneRegex.test(phone);
  }

  if (!validatePhoneNumber(phone)) {
    return next(new ErrorHandler("Invalid phone number.", 400));
  }

  try {
    const user = await User.findOne({
      $or: [{ email, accountVerified: false }, { phone, accountVerified: false }],
    }).sort({ createdAt: -1 });

    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }


    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler("Invalid OTP.", 400));
    }

    const verificationCodeExpire = user.verificationCodeExpire;
    if (Date.now() > verificationCodeExpire) {
      return next(new ErrorHandler("OTP Expired.", 400));
    }

    // Update user as verified
    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    await user.save({ validateModifiedOnly: true });

    sendToken(user, 200, "Account Verified.", res);
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error.", 500));
  }
});

// User Login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required.", 400));
  }

  // Find user by email and ensure account is verified
  const user = await User.findOne({ email }).select("+password");

  // If user not found, return error
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  // Check if the provided password matches the stored password
  const isPasswordMatched = await user.comparePassword(password);
  console.log(await user.comparePassword(password));

  if (!isPasswordMatched){

    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  // Send JWT token if login is successful
  sendToken(user, 200, "User logged in successfully.", res);
});


// User Logout
export const logout = catchAsyncError(async (req, res, next) => {
  res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged out successfully.",
      });
});

// Get User Info
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Forgot Password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }
  const resetToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it.`;

  try {
    sendEmail({
      email: user.email,
      subject: "Yatru Sewa Verfication",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message ? error.message : "Cannot send reset password token.", 500));
  }
});

// Reset Password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has been expired.", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & confirm password do not match.", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, "Password reset successfully.", res);
});
