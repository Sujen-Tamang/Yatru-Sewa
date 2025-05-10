import api from "./api";
import axios from "axios";

export const login = async (logindata) => {
  try {
    const response = await api.post("auth/Login", logindata, {
      withCredentials: true,
    });

    const { token, user } = response.data;
    const userRole = user.role;
    console.log(response.data)

    const userData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      id: user.id,
      token: token, // Store token in user object for easy access
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return {
      success: true,
      token,
      user: userData
    };
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

export const register = async (registrationData) => {
  try {
    console.log("i am here!")
    const response = await api.post("auth/register", registrationData);
    console.log("i am here!")
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
};

export const logout = async() => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await api.post('auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    }
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Request email verification code
export const requestVerification = async (email) => {
  try {
    const response = await api.post("auth/send-verification", { email });
    return {
      success: true,
      message: response.data.message || "Verification code sent successfully"
    };
  } catch (error) {
    console.error("Verification request failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send verification code"
    };
  }
};

// Verify email with code
export const verifyEmail = async (email, verificationCode) => {
  try {
    // Convert verificationCode to a number since backend expects a number
    const numericOtp = Number(verificationCode);
    
    console.log('Sending verification request with:', { 
      email, 
      otp: numericOtp,
      originalOtp: verificationCode
    });
    
    const response = await api.post("auth/verify-otp", {
      email,
      otp: numericOtp // Convert to number as the backend compares with Number(otp)
    });
    
    console.log('Verification response:', response.data);
    
    // Update user data in localStorage if verification successful
    if (response.data.success) {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        userData.isVerified = true;
        localStorage.setItem("user", JSON.stringify(userData));
      }
    }
    
    return {
      success: true,
      message: response.data.message || "Email verified successfully",
      data: response.data
    };
  } catch (error) {
    console.error("Email verification failed:", error);
    console.error("Response data:", error.response?.data);
    
    return {
      success: false,
      message: error.response?.data?.message || "Failed to verify email",
      error: error.message
    };
  }
};

/**
 * Request password reset token
 * @param {string} email - User's email address
 * @returns {Promise<Object>} - Response with success status and message
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("auth/forgot-password", { email });
    
    console.log('Forgot password response:', response.data);
    
    return {
      success: true,
      message: response.data.message || "Password reset instructions sent to your email"
    };
  } catch (error) {
    console.error("Forgot password request failed:", error.response?.data || error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to request password reset. Please try again." 
    };
  }
};

export const resetPassword = async (passwordData, token) => {
  try {
    if (passwordData.password !== passwordData.confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }
    
    // Call the reset password API endpoint
    const response = await api.put(`auth/reset-password/${token}`, {
      password: passwordData.password,
      confirmPassword: passwordData.confirmPassword
    });
    
    console.log('Reset password response:', response.data);
    
    return {
      success: true,
      message: "Password reset successfully",
      data: response.data
    };
  } catch (error) {
    console.error("Password reset failed:", error.response?.data || error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to reset password. Please try again." 
    };
  }
};