import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProductQuickViewOpen: false,
  productSlug: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openProductQuickView: (state, action) => {
      state.isProductQuickViewOpen = true;
      state.productSlug = action.payload;
    },
    closeProductQuickView: (state) => {
      state.isProductQuickViewOpen = false;
      state.productSlug = null;
    },
  },
});

export const { openProductQuickView, closeProductQuickView } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
