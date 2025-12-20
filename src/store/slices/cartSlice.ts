import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  coupon: Cart['coupon'] | null;
  itemsCount: number;
  isLoading: boolean;
  isOpen: boolean; // Cart canvas open state
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  discount: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  coupon: null,
  itemsCount: 0,
  isLoading: false,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.items = action.payload.items;
      state.subtotal = action.payload.subtotal;
      state.discount = action.payload.discount;
      state.shipping = action.payload.shipping;
      state.tax = action.payload.tax;
      state.total = action.payload.total;
      state.coupon = action.payload.coupon || null;
      state.itemsCount = action.payload.items_count;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    clearCartState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setCart, setLoading, toggleCart, openCart, closeCart, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;

