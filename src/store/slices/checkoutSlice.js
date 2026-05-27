import { createSlice } from "@reduxjs/toolkit";
import { getDefaultCheckoutState, loadCheckoutState } from "@/lib/cart/checkoutStorage";

const initialState = getDefaultCheckoutState();

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    hydrateCheckout: (state) => Object.assign(state, loadCheckoutState()),
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    setDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload.method;
      state.deliveryCharge = action.payload.charge ?? 0;
      state.pickupPointId = action.payload.pickupPointId ?? null;
    },
    setPaymentOption: (state, action) => {
      state.paymentOption = action.payload;
    },
    applyCoupon: (state, action) => {
      state.couponCode = action.payload.code;
      state.couponDiscount = action.payload.discount;
    },
    removeCoupon: (state) => {
      state.couponCode = null;
      state.couponDiscount = 0;
    },
    setOrderResult: (state, action) => {
      state.orderId = action.payload.orderId;
      state.orderCode = action.payload.orderCode;
    },
    resetCheckout: () => getDefaultCheckoutState(),
  },
});

export const {
  hydrateCheckout,
  setShippingInfo,
  setDeliveryMethod,
  setPaymentOption,
  applyCoupon,
  removeCoupon,
  setOrderResult,
  resetCheckout,
} = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;

export const selectCheckoutShipping = (state) => state.checkout.shippingInfo;
export const selectCheckoutDelivery = (state) => ({
  deliveryMethod: state.checkout.deliveryMethod,
  deliveryCharge: state.checkout.deliveryCharge,
  pickupPointId: state.checkout.pickupPointId,
});
export const selectCheckoutPayment = (state) => state.checkout.paymentOption;
export const selectCheckoutCoupon = (state) => ({
  couponCode: state.checkout.couponCode,
  couponDiscount: state.checkout.couponDiscount,
});
