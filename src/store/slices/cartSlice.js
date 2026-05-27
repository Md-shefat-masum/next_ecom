import { createSlice } from "@reduxjs/toolkit";
import { getCart, getCartCount, getCartTotal } from "@/lib/cart/cartUtils";

const buildCartState = () => ({
  items: getCart(),
  count: getCartCount(),
  total: getCartTotal(),
});

const initialState = {
  items: [],
  count: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    syncCartFromStorage: (state) => {
      const next = buildCartState();
      state.items = next.items;
      state.count = next.count;
      state.total = next.total;
    },
  },
});

export const { syncCartFromStorage } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.count;
export const selectCartTotal = (state) => state.cart.total;
