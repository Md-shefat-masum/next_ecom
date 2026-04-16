import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account, Address, UserPaymentMethod } from '@/types';

interface AccountState {
  account: Account | null;
  addresses: Address[];
  paymentMethods: UserPaymentMethod[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  account: null,
  addresses: [],
  paymentMethods: [],
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<Account | null>) => {
      state.account = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    removeAddress: (state, action: PayloadAction<number>) => {
      state.addresses = state.addresses.filter(a => a.id !== action.payload);
    },
    setPaymentMethods: (state, action: PayloadAction<UserPaymentMethod[]>) => {
      state.paymentMethods = action.payload;
    },
    addPaymentMethod: (state, action: PayloadAction<UserPaymentMethod>) => {
      state.paymentMethods.push(action.payload);
    },
    updatePaymentMethod: (state, action: PayloadAction<UserPaymentMethod>) => {
      const index = state.paymentMethods.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.paymentMethods[index] = action.payload;
      }
    },
    removePaymentMethod: (state, action: PayloadAction<number>) => {
      state.paymentMethods = state.paymentMethods.filter(p => p.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearAccount: () => initialState,
  },
});

export const {
  setAccount,
  setAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
  setLoading,
  setError,
  clearAccount,
} = accountSlice.actions;
export default accountSlice.reducer;

