// src/services/adminService.js
import api from './api';

// Admin Bus Management
export const getAllBuses = async () => {
  try {
    const response = await api.get('/v1/admin/buses');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching buses:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error fetching buses',
    };
  }
};

export const createBus = async (busData) => {
  try {
    const response = await api.post('/v1/admin/buses', busData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error creating bus:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error creating bus',
    };
  }
};

export const updateBus = async (busId, busData) => {
  try {
    const response = await api.put(`/v1/admin/buses/${busId}`, busData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error updating bus:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error updating bus',
    };
  }
};

export const deleteBus = async (busId) => {
  try {
    const response = await api.delete(`/v1/admin/buses/${busId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error deleting bus:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error deleting bus',
    };
  }
};

// Admin User Management
export const getAllUsers = async () => {
  try {
    const response = await api.get('/v1/admin/users');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error fetching users',
    };
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/v1/admin/users/${userId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching user:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error fetching user',
    };
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/v1/admin/users/${userId}`, userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error updating user:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error updating user',
    };
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/v1/admin/users/${userId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error deleting user:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error deleting user',
    };
  }
};

// Admin Dashboard Management
export const getDashboardStats = async () => {
  try {
    console.log('Fetching dashboard stats...');
    const response = await api.get('dashboard/stats');
    console.log('Dashboard stats response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error fetching dashboard stats',
    };
  }
};

export const getRecentBookings = async () => {
  try {
    console.log('Fetching recent bookings...');
    const response = await api.get('dashboard/bookings/recent');
    console.log('Recent bookings response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching recent bookings:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error fetching recent bookings',
    };
  }
};

export const getPopularRoutes = async () => {
  try {
    console.log('Fetching popular routes...');
    const response = await api.get('dashboard/routes/popular');
    console.log('Popular routes response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching popular routes:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error fetching popular routes',
    };
  }
};