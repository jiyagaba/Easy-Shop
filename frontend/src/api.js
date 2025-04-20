// src/api.js
import axios from 'axios';

// Replace with your API URL or use an environment variable
const API_URL = 'http://localhost:3000/api';

// Fetch current user
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data; // Assuming the response has the user data
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
export const fetchSellerDetails = async () => {
  try {
    const response = await apiRequest("http://localhost:3000/api/seller/10", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch seller details");
    }

    const data = await response.json();
    console.log("Seller Details:", data);
  } catch (error) {
    console.error("Error fetching seller details:", error.message);
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
