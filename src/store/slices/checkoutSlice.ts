import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, ShippingMethod, PaymentMethod } from '@/types';

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'review';

interface CheckoutState {
  step: CheckoutStep;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  sameAsShipping: boolean;
  shippingMethod: ShippingMethod | null;
  paymentMethod: PaymentMethod | null;
  notes: string;
  isProcessing: boolean;
  error: string | null;
}

const initialState: CheckoutState = {
  step: 'cart',
  shippingAddress: null,
  billingAddress: null,
  sameAsShipping: true,
  shippingMethod: null,
  paymentMethod: null,
  notes: '',
  isProcessing: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<CheckoutStep>) => {
      state.step = action.payload;
    },
    setShippingAddress: (state, action: PayloadAction<Address | null>) => {
      state.shippingAddress = action.payload;
    },
    setBillingAddress: (state, action: PayloadAction<Address | null>) => {
      state.billingAddress = action.payload;
    },
    setSameAsShipping: (state, action: PayloadAction<boolean>) => {
      state.sameAsShipping = action.payload;
      if (action.payload) {
        state.billingAddress = state.shippingAddress;
      }
    },
    setShippingMethod: (state, action: PayloadAction<ShippingMethod | null>) => {
      state.shippingMethod = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod | null>) => {
      state.paymentMethod = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isProcessing = false;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  setStep,
  setShippingAddress,
  setBillingAddress,
  setSameAsShipping,
  setShippingMethod,
  setPaymentMethod,
  setNotes,
  setProcessing,
  setError,
  resetCheckout,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;

