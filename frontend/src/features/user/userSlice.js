import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from './userThunk';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    success: null,
    user: null, // User will be stored here
  },
  reducers: {
    clearStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Registration successful';
        state.user = action.payload.user; // Save user data
        localStorage.setItem('token', action.payload.token); // Save token in localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Login successful';
        state.user = action.payload.user; // Save user data
        localStorage.setItem('token', action.payload.token); // Save token in localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; // Clear user data
        localStorage.removeItem('token'); // Remove token from localStorage
      });
  },
});

export const { clearStatus } = userSlice.actions;
export default userSlice.reducer;
