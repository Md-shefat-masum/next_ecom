import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFilters, PaginationMeta } from '@/types';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  filters: ProductFilters | null;
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  filters: null,
  pagination: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<{ products: Product[]; pagination?: PaginationMeta }>) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination || null;
      state.isLoading = false;
      state.error = null;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
    setFilters: (state, action: PayloadAction<ProductFilters | null>) => {
      state.filters = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearProducts: (state) => {
      state.products = [];
      state.pagination = null;
    },
  },
});

export const { setProducts, setCurrentProduct, setFilters, setLoading, setError, clearProducts } = productSlice.actions;
export default productSlice.reducer;

