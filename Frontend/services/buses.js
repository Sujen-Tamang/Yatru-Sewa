// api/busApi.js
import api from "./api"; // Assuming you have your base api setup

export const getAllBuses = async () => {
  try {
    const response = await api.get("/buses");
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching buses:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching buses",
    };
  }
};

export const getBusById = async (id) => {
  try {
    const response = await api.get(`/buses/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching bus:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching bus",
    };
  }
};

export const createBus = async (busData) => {
  try {
    const { number, route, currentLocation } = busData;
    const response = await api.post("/buses", {
      number,
      route,
      currentLocation
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error creating bus:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error creating bus",
    };
  }
};

export const updateBusLocation = async (id, locationData) => {
  try {
    const { lat, lng } = locationData;
    const response = await api.put(`/buses/${id}/location`, {
      lat,
      lng
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error updating bus location:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error updating bus location",
    };
  }
};