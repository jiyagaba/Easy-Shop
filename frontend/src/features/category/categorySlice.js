import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunks
export const categoryFetch = createAsyncThunk("category/fetch", async () => {
  const response = await fetch("http://localhost:3000/api/categories");
  const data = await response.json();
  return data;
});

export const messageClear = createAsyncThunk("category/messageClear", async () => {
  return null; // Clear messages
});

// Slice
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    successMessage: null,
    errorMessage: null,
    loader: false,
  },
  reducers: {
    categoryAdd: (state, action) => {
      state.categories.push(action.payload);
    },
    categoryUpdate: (state, action) => {
      const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    categoryDelete: (state, action) => {
      state.categories = state.categories.filter((cat) => cat.id !== action.payload);
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryFetch.pending, (state) => {
        state.loader = true;
      })
      .addCase(categoryFetch.fulfilled, (state, action) => {
        state.loader = false;
        state.categories = action.payload;
      })
      .addCase(categoryFetch.rejected, (state) => {
        state.loader = false;
        state.errorMessage = "Failed to fetch categories";
      })
      .addCase(messageClear.fulfilled, (state) => {
        state.successMessage = null;
        state.errorMessage = null;
      });
  },
});

export const { categoryAdd, categoryUpdate, categoryDelete, clearMessages } = categorySlice.actions;
export default categorySlice.reducer;