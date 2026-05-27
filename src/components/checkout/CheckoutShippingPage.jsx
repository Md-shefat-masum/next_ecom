"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { defaultGeneralInfo } from "@/config";
import { loadCheckoutState, saveCheckoutState } from "@/lib/cart/checkoutStorage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateCheckout, setShippingInfo } from "@/store/slices/checkoutSlice";
import { CheckoutSteps } from "./CheckoutSteps";
import { CheckoutSummary } from "./CheckoutSummary";

const inputClass =
  "w-full rounded-lg border border-[#D8E4F2] px-4 py-3 text-sm outline-none focus:border-[#0B5FAE] focus:ring-2 focus:ring-[#0B5FAE]/10";

export function CheckoutShippingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cart.count);
  const shippingInfo = useAppSelector((state) => state.checkout.shippingInfo);

  useEffect(() => {
    dispatch(hydrateCheckout());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const nextShippingInfo = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      address: String(formData.get("address") || ""),
      country: String(formData.get("country") || "Bangladesh"),
      city: String(formData.get("city") || ""),
      postal_code: String(formData.get("postal_code") || ""),
      phone: String(formData.get("phone") || ""),
      checkout_type: "guest",
    };

    dispatch(setShippingInfo(nextShippingInfo));

    const currentState = loadCheckoutState();
    saveCheckoutState({ ...currentState, shippingInfo: nextShippingInfo });

    router.push("/checkout/delivery");
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
      <CheckoutSteps currentStep={0} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#071B3A]">Shipping Information</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={shippingInfo?.name || ""}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Phone *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    defaultValue={shippingInfo?.phone || ""}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={shippingInfo?.email || defaultGeneralInfo.email || ""}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Address *</label>
                <input
                  name="address"
                  type="text"
                  required
                  defaultValue={shippingInfo?.address || ""}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">Country *</label>
                  <select name="country" required defaultValue={shippingInfo?.country || "Bangladesh"} className={inputClass}>
                    <option value="Bangladesh">Bangladesh</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">City *</label>
                  <input
                    name="city"
                    type="text"
                    required
                    defaultValue={shippingInfo?.city || ""}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Postal Code *</label>
                  <input
                    name="postal_code"
                    type="text"
                    required
                    defaultValue={shippingInfo?.postal_code || ""}
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
              >
                Continue to Delivery
              </button>
            </form>
          </div>
        </div>

        <CheckoutSummary />
      </div>
    </section>
  );
}
