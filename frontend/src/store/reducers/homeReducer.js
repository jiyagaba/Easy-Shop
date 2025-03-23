import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Async action to fetch categories from backend
export const get_category = createAsyncThunk('home/get_category', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/home/get-categorys'); // Ensure correct API endpoint
        console.log("Fetched Categories:", data);
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Error fetching categories");
    }
});

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        categorys: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_category.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_category.fulfilled, (state, action) => {
                state.loading = false;
                state.categorys = action.payload;
            })
            .addCase(get_category.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default homeSlice.reducer;
