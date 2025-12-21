import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isProductQuickViewOpen: boolean;
  productSlug: string | null;
}

const initialState: ModalState = {
  isProductQuickViewOpen: false,
  productSlug: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openProductQuickView: (state, action: PayloadAction<string>) => {
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
export default modalSlice.reducer;

