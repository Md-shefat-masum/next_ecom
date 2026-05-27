import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api";
import { configReducer, uiReducer } from "@/store/slices";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    config: configReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
