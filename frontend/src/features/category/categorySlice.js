import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; // Your configured axios instance

// Async thunk for adding a category
export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const { data } = await api.post("/categories", formData, { withCredentials: true });
      return data; // Expecting: { message: "...", category: { ... } }
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "Something went wrong" });
    }
  }
);

// Async thunk for fetching categories
export const categoryFetch = createAsyncThunk(
  "category/categoryFetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/categories", { withCredentials: true });
      return data; // Expecting: [ { id, name, image }, ... ]
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "Failed to fetch categories" });
    }
  }
);

// Category slice
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    successMessage: "",
    errorMessage: "",
    loader: false,
  },
  reducers: {
    messageClear: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD CATEGORY
      .addCase(categoryAdd.pending, (state) => {
        state.loader = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.categories.unshift(payload.category);
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error || "Failed to add category";
      })

      // FETCH CATEGORIES
      .addCase(categoryFetch.pending, (state) => {
        state.loader = true;
      })
      .addCase(categoryFetch.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.categories = payload;
      })
      .addCase(categoryFetch.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error || "Failed to fetch categories";
      });
  },
});

export const { messageClear } = categorySlice.actions;
export default categorySlice.reducer;
