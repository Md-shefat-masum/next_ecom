import { configureStore } from "@reduxjs/toolkit";
import { configReducer, uiReducer } from "@/store/slices";

export const store = configureStore({
  reducer: {
    config: configReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

