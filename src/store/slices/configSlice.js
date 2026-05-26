import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  currency: null,
  features: null,
  isLoading: false,
  error: null,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig(state, action) {
      state.data = action.payload;
      state.currency = action.payload?.currency || null;
      state.features = action.payload?.features || null;
      state.isLoading = false;
      state.error = null;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    setFeatures(state, action) {
      state.features = action.payload;
    },
    setConfigLoading(state, action) {
      state.isLoading = action.payload;
    },
    setConfigError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setConfig,
  setCurrency,
  setFeatures,
  setConfigLoading,
  setConfigError,
} = configSlice.actions;

export const configReducer = configSlice.reducer;

