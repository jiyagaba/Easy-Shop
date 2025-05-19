// src/api.js
import axios from 'axios';

// Replace with your API URL or use an environment variable
const API_URL = 'http://localhost:3000/api';
const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // or sessionStorage if that's what you're using
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch current user
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        ...getAuthHeader()
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
};
export const fetchSellerDetails = async (sellerId) => {
  try {
    const response = await axios.get(`${API_URL}/seller/${sellerId}`, {
      headers: {
        ...getAuthHeader()
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching seller details:", error.response?.data || error.message);
    throw error;
  }
};
export const updateSellerProfile = async (sellerId, updatedProfileData) => {
  try {
    const response = await axios.put(`${API_URL}/seller/${sellerId}`, updatedProfileData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating seller profile:", error.response?.data || error.message);
    throw error;
  }
};
export const updateUserProfile = async (userId, updatedProfileData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, updatedProfileData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error.response?.data || error.message);
    throw error;
  }
};

// Update profile
export const updateProfile = async (userId, updatedProfileData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, updatedProfileData);
    return response.data; // Return the updated user data
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
