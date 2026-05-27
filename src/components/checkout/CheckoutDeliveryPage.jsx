"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { defaultGeneralInfo } from "@/config";
import { loadCheckoutState, saveCheckoutState } from "@/lib/cart/checkoutStorage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateCheckout, setDeliveryMethod } from "@/store/slices/checkoutSlice";
import { CheckoutSteps } from "./CheckoutSteps";
import { CheckoutSummary } from "./CheckoutSummary";

const insideCharge = Number(defaultGeneralInfo.inside_dhaka_shipping_charge || 120);
const outsideCharge = Number(defaultGeneralInfo.outside_dhaka_shipping_charge || 250);

const deliveryOptions = [
  { id: "home_delivery_inside", label: "Home Delivery (Inside Dhaka)", charge: insideCharge },
  { id: "home_delivery_outside", label: "Home Delivery (Outside Dhaka)", charge: outsideCharge },
  { id: "store_pickup", label: "Store Pickup", charge: 0 },
  { id: "request_express", label: "Express Delivery", charge: insideCharge + 50 },
];

export function CheckoutDeliveryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cart.count);
  const shippingInfo = useAppSelector((state) => state.checkout.shippingInfo);
  const deliveryMethod = useAppSelector((state) => state.checkout.deliveryMethod);

  useEffect(() => {
    dispatch(hydrateCheckout());
  }, [dispatch]);

  useEffect(() => {
    if (!shippingInfo) {
      router.replace("/checkout");
    }
  }, [shippingInfo, router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const method = String(formData.get("delivery_method") || "home_delivery_inside");
    const selected = deliveryOptions.find((option) => option.id === method) || deliveryOptions[0];

    dispatch(
      setDeliveryMethod({
        method: selected.id,
        charge: selected.charge,
        pickupPointId: method === "pickup_point" ? formData.get("pickup_point_id") : null,
      })
    );

    const currentState = loadCheckoutState();
    saveCheckoutState({
      ...currentState,
      deliveryMethod: selected.id,
      deliveryCharge: selected.charge,
      pickupPointId: method === "pickup_point" ? formData.get("pickup_point_id") : null,
    });

    router.push("/checkout/payment");
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
      <CheckoutSteps currentStep={1} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#071B3A]">Delivery Information</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {deliveryOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-[#E8EEF6] p-4 hover:border-[#0B5FAE]"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery_method"
                      value={option.id}
                      defaultChecked={deliveryMethod === option.id}
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-medium text-[#071B3A]">{option.label}</span>
                  </span>
                  <span className="text-sm font-semibold text-[#0B5FAE]">
                    {option.charge > 0 ? `৳${option.charge}` : "Free"}
                  </span>
                </label>
              ))}

              <div className="flex gap-4 pt-2">
                <Link
                  href="/checkout"
                  className="flex-1 rounded-lg border border-[#E8EEF6] py-3 text-center text-sm font-medium hover:bg-slate-50"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className="flex-1 rounded-lg py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        </div>

        <CheckoutSummary />
      </div>
    </section>
  );
}
