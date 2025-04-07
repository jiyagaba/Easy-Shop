// store.js
import { configureStore } from "@reduxjs/toolkit";
import sellerReducer from "./features/seller/sellerSlice";
import categoryReducer from "./features/category/categorySlice";
const store = configureStore({
  reducer: {
    seller: sellerReducer,
    category: categoryReducer,
  },
});

export default store;
