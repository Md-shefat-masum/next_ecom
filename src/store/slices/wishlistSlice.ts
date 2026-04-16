import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<{ items: WishlistItem[]; total_items: number }>) => {
      state.items = action.payload.items;
      state.totalItems = action.payload.total_items;
      state.isLoading = false;
      state.error = null;
    },
    addItem: (state, action: PayloadAction<WishlistItem>) => {
      state.items.push(action.payload);
      state.totalItems += 1;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product_id !== action.payload);
      state.totalItems = Math.max(0, state.totalItems - 1);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { setWishlist, addItem, removeItem, setLoading, setError, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

