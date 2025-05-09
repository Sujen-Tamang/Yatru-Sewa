import api from './api';

// Admin Bus Management
export const getAllBuses = async () => {
  try {
    const response = await api.get('/admin/buses');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching buses:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error fetching buses'
    };
  }
};

export const createBus = async (busData) => {
  try {
    const response = await api.post('/admin/buses', busData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating bus:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error creating bus'
    };
  }
};

export const updateBus = async (busId, busData) => {
  try {
    const response = await api.put(`/admin/buses/${busId}`, busData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating bus:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error updating bus'
    };
  }
};

export const deleteBus = async (busId) => {
  try {
    const response = await api.delete(`/admin/buses/${busId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error deleting bus:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error deleting bus'
    };
  }
};

// Admin User Management
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error fetching users'
    };
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/admin/users/${userId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching user:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error fetching user'
    };
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating user:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error updating user'
    };
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error deleting user:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Error deleting user'
    };
  }
};
