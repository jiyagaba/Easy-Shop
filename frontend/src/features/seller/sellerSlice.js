import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerSeller = createAsyncThunk(
  "seller/register",
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
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    // 👇 this fixes the missing export error
    clearStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Seller account created! Please verify your email.";
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 👇 add this to export your reducer and action
export const { clearStatus } = sellerSlice.actions;
export default sellerSlice.reducer;
