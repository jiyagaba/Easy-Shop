// store.js
import { configureStore } from "@reduxjs/toolkit";
import sellerReducer from "./features/seller/sellerSlice";
import categoryReducer from "./features/category/categorySlice";
import userReducer from "./features/user/userSlice";
const store = configureStore({
  reducer: {
    seller: sellerReducer,
    category: categoryReducer,
    user: userReducer,
  },
});

export default store;
