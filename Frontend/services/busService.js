import axios from 'axios';
// Update this with your backend URL

// Get all buses
export const getAllBuses = async () => {
  try {
    const response = await api.get(`buses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch buses',
    };
  }
};

// Get bus by ID
export const getBusById = async (busId) => {
  try {
    const response = await api.get(`/buses/${busId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch bus details',
    };
  }
};

// Get available seats for a bus
export const getAvailableSeats = async (busId, date) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/available-seats/${busId}`, {
      params: { date },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch available seats',
    };
  }
};

// Book bus seats
export const bookBusSeats = async (busId, seats, userData) => {
  try {
    const response = await axios.post(
      `${API_URL}/bookings`,
      {
        busId,
        seats,
        ...userData,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to book seats',
    };
  }
}; 