"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { defaultGeneralInfo } from "@/config";
import {
  clearCheckoutState,
  createLocalOrder,
  loadCheckoutState,
  saveCheckoutState,
} from "@/lib/cart/checkoutStorage";
import { clearCart } from "@/lib/cart/cartUtils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  applyCoupon,
  hydrateCheckout,
  removeCoupon,
  resetCheckout,
  setOrderResult,
  setPaymentOption,
} from "@/store/slices/checkoutSlice";
import { syncCartFromStorage } from "@/store/slices/cartSlice";
import { CheckoutSteps } from "./CheckoutSteps";
import { CheckoutSummary } from "./CheckoutSummary";

const paymentOptions = [
  { id: "cash_on_delivery", label: "Cash on Delivery" },
  { id: "bkash", label: "bKash" },
  { id: "sslcommerz", label: "SSLCommerz" },
];

export function CheckoutPaymentPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = useAppSelector((state) => state.cart.count);
  const shippingInfo = useAppSelector((state) => state.checkout.shippingInfo);
  const checkoutState = useAppSelector((state) => state.checkout);
  const [couponInput, setCouponInput] = useState(checkoutState.couponCode || "");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(hydrateCheckout());
  }, [dispatch]);

  useEffect(() => {
    if (!shippingInfo) {
      router.replace("/checkout");
    }
  }, [shippingInfo, router]);

  const subtotal = useAppSelector((state) => state.cart.total);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;

    if (couponInput.trim().toUpperCase() === "BME10") {
      const discount = Math.round(subtotal * 0.1);
      dispatch(applyCoupon({ code: couponInput.trim().toUpperCase(), discount }));
      const currentState = loadCheckoutState();
      saveCheckoutState({ ...currentState, couponCode: couponInput.trim().toUpperCase(), couponDiscount: discount });
      return;
    }

    window.alert("Invalid coupon code");
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponInput("");
    const currentState = loadCheckoutState();
    saveCheckoutState({ ...currentState, couponCode: null, couponDiscount: 0 });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!agreed) {
      window.alert("Please agree to the terms and conditions");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const paymentOption = String(formData.get("payment_option") || "cash_on_delivery");
    dispatch(setPaymentOption(paymentOption));

    setIsSubmitting(true);

    try {
      const order = createLocalOrder({
        items: cartItems,
        shippingInfo,
        deliveryMethod: checkoutState.deliveryMethod,
        deliveryCharge: checkoutState.deliveryCharge,
        paymentOption,
        couponDiscount: checkoutState.couponDiscount,
      });

      if (typeof window !== "undefined") {
        const existingOrders = JSON.parse(window.localStorage.getItem("bme_orders") || "[]");
        existingOrders.unshift(order);
        window.localStorage.setItem("bme_orders", JSON.stringify(existingOrders));
        window.localStorage.setItem("bme_last_order", JSON.stringify(order));
      }

      dispatch(setOrderResult({ orderId: order.id, orderCode: order.code }));

      if (paymentOption === "cash_on_delivery") {
        clearCart();
        dispatch(syncCartFromStorage());
        dispatch(resetCheckout());
        clearCheckoutState();
        router.push("/checkout/order-confirmed");
        return;
      }

      window.alert("Online payment gateway integration is pending. Order saved locally.");
      router.push("/checkout/order-confirmed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartCount === 0) {
    return (
      <section className="container py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <Link href="/" className="text-[#0B5FAE] hover:underline">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#071B3A]">Checkout</h1>
      <CheckoutSteps currentStep={2} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#071B3A]">Payment Method</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-4 rounded-lg border border-[#E8EEF6] p-4 hover:border-[#0B5FAE]"
                >
                  <input
                    type="radio"
                    name="payment_option"
                    value={option.id}
                    defaultChecked={checkoutState.paymentOption === option.id}
                    className="h-4 w-4"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}

              <label className="flex items-start gap-3 pt-2 text-sm text-[#64748B]">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-1"
                />
                <span>I agree to the terms and conditions and return policy.</span>
              </label>

              <div className="flex gap-4">
                <Link
                  href="/checkout/delivery"
                  className="flex-1 rounded-lg border border-[#E8EEF6] py-3 text-center text-sm font-medium hover:bg-slate-50"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg py-3 text-sm font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-[#071B3A]">Coupon Code</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 rounded-lg border border-[#D8E4F2] px-4 py-3 text-sm outline-none focus:border-[#0B5FAE]"
              />
              {checkoutState.couponCode ? (
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="rounded-lg border border-[#E8EEF6] px-4 py-3 text-sm font-medium"
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: defaultGeneralInfo.accent_color }}
                >
                  Apply
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-[#64748B]">Demo coupon: BME10 (10% off)</p>
          </div>
        </div>

        <CheckoutSummary />
      </div>
    </section>
  );
}
