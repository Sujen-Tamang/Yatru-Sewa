import api from "./api"; 

export const login = async (logindata) => {
  try {
    const response = await api.post("/Login", logindata,{
      withCredentials: true, 
    });
    return response.data;
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
    const response = await api.post("/register", registrationData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
};
