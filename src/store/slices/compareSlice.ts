import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface CompareState {
  products: Product[];
  totalItems: number;
  maxItems: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CompareState = {
  products: [],
  totalItems: 0,
  maxItems: 4,
  isLoading: false,
  error: null,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setCompareList: (state, action: PayloadAction<{ products: Product[]; total_items: number; max_items: number }>) => {
      state.products = action.payload.products;
      state.totalItems = action.payload.total_items;
      state.maxItems = action.payload.max_items;
      state.isLoading = false;
      state.error = null;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      if (state.products.length < state.maxItems) {
        state.products.push(action.payload);
        state.totalItems += 1;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.totalItems = Math.max(0, state.totalItems - 1);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearCompare: (state) => {
      state.products = [];
      state.totalItems = 0;
    },
  },
});

export const { setCompareList, addProduct, removeProduct, setLoading, setError, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;

