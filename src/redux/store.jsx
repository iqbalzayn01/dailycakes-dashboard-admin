import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
  },
});
