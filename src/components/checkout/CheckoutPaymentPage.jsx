"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { defaultGeneralInfo } from "@/config";
import {
  clearCheckoutState,
  loadCheckoutState,
  saveCheckoutState,
} from "@/lib/cart/checkoutStorage";
import { clearCart } from "@/lib/cart/cartUtils";
import { validateCoupon, placeOrder, initiateBkash, initiateSSL } from "@/lib/api/checkoutService";
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
  { id: "cash_on_delivery", label: "Cash on Delivery (COD)", icon: "💵", desc: "Pay when you receive" },
  { id: "bkash",            label: "bKash",                  icon: "📱", desc: "Pay via bKash mobile banking" },
  { id: "sslcommerz",       label: "SSLCommerz",             icon: "💳", desc: "Pay via card / mobile banking" },
];

export function CheckoutPaymentPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = useAppSelector((state) => state.cart.count);
  const subtotal = useAppSelector((state) => state.cart.total);
  const shippingInfo = useAppSelector((state) => state.checkout.shippingInfo);
  const checkoutState = useAppSelector((state) => state.checkout);

  const [couponInput, setCouponInput] = useState(checkoutState.couponCode || "");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(
    checkoutState.paymentOption || "cash_on_delivery"
  );

  useEffect(() => {
    dispatch(hydrateCheckout());
  }, [dispatch]);

  useEffect(() => {
    if (!shippingInfo) {
      router.replace("/checkout");
    }
  }, [shippingInfo, router]);

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    setCouponLoading(true);
    setCouponError("");

    try {
      const promo = await validateCoupon(code, subtotal);
      const discount = promo.discount_amount;
      dispatch(applyCoupon({ code, discount }));
      const currentState = loadCheckoutState();
      saveCheckoutState({ ...currentState, couponCode: code, couponDiscount: discount });
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Invalid coupon code. Please try again.";
      setCouponError(msg);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponInput("");
    setCouponError("");
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
    setOrderError("");

    try {
      const response = await placeOrder({
        cartItems,
        shippingInfo,
        deliveryMethod: checkoutState.deliveryMethod,
        deliveryCharge: checkoutState.deliveryCharge,
        paymentMethod: paymentOption,
        couponCode: checkoutState.couponCode ?? null,
        couponDiscount: checkoutState.couponDiscount ?? 0,
        orderNote: null,
        outletId: checkoutState.pickupPointId ?? null,
      });

      const order     = response.data ?? response;
      const orderId   = order?.id ?? order?.order?.id ?? null;
      const orderCode = order?.order_code ?? order?.order?.order_code ?? order?.order_no ?? null;

      dispatch(setOrderResult({ orderId, orderCode }));

      // Save full invoice snapshot before clearing state
      const discount    = checkoutState.couponDiscount ?? 0;
      const delivFee    = checkoutState.deliveryCharge ?? 0;
      const cartSubtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
      const snapshot = {
        order_code:      orderCode,
        order_id:        orderId,
        sale_date:       new Date().toISOString().split("T")[0],
        payment_method:  paymentOption,
        payment_status:  "unpaid",
        delivery_method: checkoutState.deliveryMethod,
        delivery_charge: delivFee,
        coupon:          checkoutState.couponCode ?? null,
        coupon_discount: discount,
        subtotal:        cartSubtotal,
        total:           Math.max(0, cartSubtotal + delivFee - discount),
        shipping:        shippingInfo ?? {},
        order_note:      null,
        items: cartItems.map((i) => ({
          product_id:   i.productId,
          product_name: i.name,
          image:        i.image ?? null,
          variant:      i.variantLabel ?? null,
          qty:          i.quantity,
          sale_price:   i.price,
          total_price:  i.price * i.quantity,
        })),
      };
      localStorage.setItem("bme_last_order", JSON.stringify(snapshot));

      // For COD – clear state immediately and show invoice
      if (paymentOption === "cash_on_delivery") {
        clearCart();
        dispatch(syncCartFromStorage());
        dispatch(resetCheckout());
        clearCheckoutState();
        router.push("/checkout/order-confirmed");
        return;
      }

      // For bKash / SSLCommerz – initiate payment, redirect to gateway
      // (clear state AFTER redirect returns, not here)
      try {
        if (paymentOption === "bkash") {
          const bkash = await initiateBkash(orderId);
          if (bkash?.bkash_url) {
            clearCart();
            dispatch(syncCartFromStorage());
            dispatch(resetCheckout());
            clearCheckoutState();
            window.location.href = bkash.bkash_url;
            return;
          }
          throw new Error("bKash payment URL not received");
        }

        if (paymentOption === "sslcommerz") {
          const ssl = await initiateSSL(orderId);
          if (ssl?.gateway_url) {
            clearCart();
            dispatch(syncCartFromStorage());
            dispatch(resetCheckout());
            clearCheckoutState();
            window.location.href = ssl.gateway_url;
            return;
          }
          throw new Error("SSLCommerz gateway URL not received");
        }
      } catch (gatewayErr) {
        setOrderError(
          gatewayErr?.data?.error?.message ||
          gatewayErr?.message ||
          "Payment gateway initiation failed. Please try again."
        );
        setIsSubmitting(false);
      }
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Failed to place order. Please try again.";
      setOrderError(msg);
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
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#071B3A]">Payment Method</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-[#E8EEF6] p-4 transition hover:border-[#0B5FAE] has-[:checked]:border-[#0B5FAE] has-[:checked]:bg-[#F0F6FF]"
                >
                  <input
                    type="radio"
                    name="payment_option"
                    value={option.id}
                    checked={selectedPayment === option.id}
                    onChange={() => setSelectedPayment(option.id)}
                    className="h-4 w-4 accent-[#0B5FAE]"
                  />
                  <span className="text-xl">{option.icon}</span>
                  <span>
                    <span className="block text-sm font-semibold text-[#071B3A]">{option.label}</span>
                    <span className="text-xs text-[#64748B]">{option.desc}</span>
                  </span>
                </label>
              ))}

              <label className="flex items-start gap-3 pt-2 text-sm text-[#64748B]">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1"
                />
                <span>I agree to the terms and conditions and return policy.</span>
              </label>

              {orderError && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{orderError}</p>
              )}

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
                  {isSubmitting
                    ? selectedPayment === "cash_on_delivery"
                      ? "Placing Order..."
                      : "Redirecting to Payment..."
                    : selectedPayment === "bkash"
                    ? "Place Order & Pay with bKash"
                    : selectedPayment === "sslcommerz"
                    ? "Place Order & Pay via Card"
                    : "Place Order"}
                </button>
              </div>
            </form>
          </div>

          {/* Coupon Section */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-[#071B3A]">Coupon Code</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                placeholder="Enter coupon code"
                disabled={!!checkoutState.couponCode}
                className="flex-1 rounded-lg border border-[#D8E4F2] px-4 py-3 text-sm outline-none focus:border-[#0B5FAE] disabled:bg-slate-50"
              />
              {checkoutState.couponCode ? (
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="rounded-lg border border-[#E8EEF6] px-4 py-3 text-sm font-medium hover:bg-slate-50"
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !couponInput.trim()}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: defaultGeneralInfo.accent_color }}
                >
                  {couponLoading ? "Checking..." : "Apply"}
                </button>
              )}
            </div>

            {couponError && (
              <p className="mt-2 text-xs text-red-500">{couponError}</p>
            )}
            {checkoutState.couponCode && (
              <p className="mt-2 text-xs text-green-600">
                ✓ Coupon <strong>{checkoutState.couponCode}</strong> applied — you save ৳
                {checkoutState.couponDiscount?.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <CheckoutSummary />
      </div>
    </section>
  );
}
