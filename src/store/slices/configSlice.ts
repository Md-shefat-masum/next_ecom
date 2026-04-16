import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConfig, CurrencyConfig, FeatureFlags } from '@/types';

interface ConfigState {
  config: AppConfig | null;
  currency: CurrencyConfig | null;
  features: FeatureFlags | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ConfigState = {
  config: null,
  currency: null,
  features: null,
  isLoading: false,
  error: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<AppConfig>) => {
      state.config = action.payload;
      state.currency = action.payload.currency;
      state.features = action.payload.features;
      state.isLoading = false;
      state.error = null;
    },
    setCurrency: (state, action: PayloadAction<CurrencyConfig>) => {
      state.currency = action.payload;
    },
    setFeatures: (state, action: PayloadAction<FeatureFlags>) => {
      state.features = action.payload;
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

export const { setConfig, setCurrency, setFeatures, setLoading, setError } = configSlice.actions;
export default configSlice.reducer;

