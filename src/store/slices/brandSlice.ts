import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Brand } from '@/types';

interface BrandState {
  brands: Brand[];
  currentBrand: Brand | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  brands: [],
  currentBrand: null,
  isLoading: false,
  error: null,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      state.brands = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setCurrentBrand: (state, action: PayloadAction<Brand | null>) => {
      state.currentBrand = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setBrands, setCurrentBrand, setLoading, setError } = brandSlice.actions;
export default brandSlice.reducer;

