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
      // Clear all auth data
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