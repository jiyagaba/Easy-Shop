import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for registering a seller
export const registerSeller = createAsyncThunk(
  'seller/register',
  async (formData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/api/seller/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      return data; // Will be passed to the fulfilled action
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handles error in case of failure
    }
  }
);

export const loginSeller = createAsyncThunk(
  'seller/login',
  async (formData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/api/seller/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      return data; // Will be passed to the fulfilled action
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handles error in case of failure
    }
  }
);

export const logoutSeller = createAsyncThunk(
  'seller/logout',
  async (_, thunkAPI) => {
    try {
      await fetch("http://localhost:3000/api/seller/logout", {
        method: "POST",
        credentials: "include",
      });
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    loading: false,
    error: null,
    success: null,
    seller: null, // Seller will be stored here
  },
  reducers: {
    clearStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Seller registration successful';
        state.seller = action.payload.seller; // Save seller data
        localStorage.setItem('token', action.payload.token); // Save token in localStorage
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Seller login successful';
        state.seller = action.payload.seller; // Save seller data
        localStorage.setItem('token', action.payload.token); // Save token in localStorage
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(logoutSeller.fulfilled, (state) => {
        state.seller = null; // Clear seller data
        localStorage.removeItem('token'); // Remove token from localStorage
      });
  },
});

export const { clearStatus } = sellerSlice.actions;
export default sellerSlice.reducer;
