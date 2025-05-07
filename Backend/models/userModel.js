import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Please enter your phone number']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 8,
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: Number,
  verificationCodeExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);