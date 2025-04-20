import { createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for seller registration
export const registerSeller = createAsyncThunk(
  'seller/register',
  async (sellerData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3000/api/seller/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sellerData),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Seller registration failed');
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for seller login
export const loginSeller = createAsyncThunk(
  'seller/login',
  async (sellerData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3000/api/seller/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sellerData),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Seller login failed');
      }
      
      localStorage.setItem("seller", JSON.stringify(data.seller));
      localStorage.setItem("token", data.token);
      console.log("Seller data saved to local storage:", data.seller);
      console.log("Token saved to local storage:", data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for seller logout
export const logoutSeller = createAsyncThunk(
  'seller/logout',
  async (_, thunkAPI) => {
    // Simply clear the seller data on logout
    return;
  }
);
