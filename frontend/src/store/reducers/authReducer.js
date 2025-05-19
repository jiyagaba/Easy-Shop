import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Customer Registration
export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-register', info);
            localStorage.setItem('customerToken', data.token); // Store access token
            localStorage.setItem('refreshToken', data.refreshToken); // Store refresh token
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Refresh Access Token
export const refresh_access_token = createAsyncThunk(
    'auth/refresh_access_token',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token from localStorage
            if (!refreshToken) {
                throw new Error("Refresh token not found");
            }

            const { data } = await api.post('/seller/refresh-token', { refreshToken });
            localStorage.setItem('customerToken', data.accessToken); // Update access token
            return fulfillWithValue(data.accessToken);
        } catch (error) {
            console.error("Error refreshing token:", error.message);
            return rejectWithValue(error.response?.data || { message: "Failed to refresh token" });
        }
    }
);

// Auth Reducer
export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        loader: false,
        userInfo: '',
        errorMessage: '',
        successMessage: '',
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // Customer Registration
            .addCase(customer_register.pending, (state) => {
                state.loader = true;
            })
            .addCase(customer_register.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(customer_register.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.loader = false;
            })

            // Refresh Access Token
            .addCase(refresh_access_token.pending, (state) => {
                state.loader = true;
            })
            .addCase(refresh_access_token.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "Failed to refresh token";
                state.loader = false;
            })
            .addCase(refresh_access_token.fulfilled, (state, { payload }) => {
                state.successMessage = "Access token refreshed successfully";
                state.loader = false;
            });
    }
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;