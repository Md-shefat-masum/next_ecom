"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Store } from "lucide-react";
import { defaultGeneralInfo } from "@/config";
import { loadCheckoutState, saveCheckoutState } from "@/lib/cart/checkoutStorage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateCheckout, setDeliveryMethod } from "@/store/slices/checkoutSlice";
import api from "@/lib/api/client";
import { CheckoutSteps } from "./CheckoutSteps";
import { CheckoutSummary } from "./CheckoutSummary";

const insideCharge = Number(defaultGeneralInfo.inside_dhaka_shipping_charge || 120);
const outsideCharge = Number(defaultGeneralInfo.outside_dhaka_shipping_charge || 250);
const expressCharge = insideCharge + 50;

const BASE_DELIVERY_OPTIONS = [
  { id: "home_delivery_inside", label: "Home Delivery — Inside Dhaka", charge: insideCharge, icon: "🏠" },
  { id: "home_delivery_outside", label: "Home Delivery — Outside Dhaka", charge: outsideCharge, icon: "🏠" },
  { id: "request_express", label: "Express Delivery", charge: expressCharge, icon: "⚡" },
  { id: "store_pickup", label: "Store / Local Pickup", charge: 0, icon: "🏪" },
];

export function CheckoutDeliveryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cart.count);
  const shippingInfo = useAppSelector((state) => state.checkout.shippingInfo);
  const deliveryMethod = useAppSelector((state) => state.checkout.deliveryMethod);
  const savedOutletId = useAppSelector((state) => state.checkout.pickupPointId);

  const [selectedMethod, setSelectedMethod] = useState(deliveryMethod || "home_delivery_inside");
  const [outlets, setOutlets] = useState([]);
  const [outletsLoading, setOutletsLoading] = useState(false);
  const [selectedOutletId, setSelectedOutletId] = useState(savedOutletId || "");
  const [outletError, setOutletError] = useState("");

  useEffect(() => {
    dispatch(hydrateCheckout());
  }, [dispatch]);

  useEffect(() => {
    if (!shippingInfo) router.replace("/checkout");
  }, [shippingInfo, router]);

  // Load outlets once
  useEffect(() => {
    setOutletsLoading(true);
    api
      .get("/outlets")
      .then((res) => setOutlets(res.data?.outlets ?? res.data ?? []))
      .catch(() => {})
      .finally(() => setOutletsLoading(false));
  }, []);

  const isStorePickup = selectedMethod === "store_pickup";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isStorePickup && !selectedOutletId) {
      setOutletError("Please select a pickup point.");
      return;
    }
    setOutletError("");

    const selectedOption =
      BASE_DELIVERY_OPTIONS.find((o) => o.id === selectedMethod) || BASE_DELIVERY_OPTIONS[0];

    dispatch(
      setDeliveryMethod({
        method: selectedOption.id,
        charge: selectedOption.charge,
        pickupPointId: isStorePickup ? selectedOutletId : null,
      })
    );

    const currentState = loadCheckoutState();
    saveCheckoutState({
      ...currentState,
      deliveryMethod: selectedOption.id,
      deliveryCharge: selectedOption.charge,
      pickupPointId: isStorePickup ? selectedOutletId : null,
    });

    router.push("/checkout/payment");
  };

  if (cartCount === 0) {
    return (
      <section className="container py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <Link href="/" className="text-[#0B5FAE] hover:underline">Continue Shopping</Link>
      </section>
    );
  }

  return (
    <section className="container py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#071B3A]">Checkout</h1>
      <CheckoutSteps currentStep={1} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          {/* Delivery method options */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-[#071B3A]">Select Delivery City</h2>
            <form id="delivery-form" className="space-y-3" onSubmit={handleSubmit}>
              {BASE_DELIVERY_OPTIONS.map((option) => {
                const isSelected = selectedMethod === option.id;
                return (
                  <label
                    key={option.id}
                    className={[
                      "flex cursor-pointer items-center justify-between gap-4 rounded-xl border-2 p-4 transition",
                      isSelected
                        ? "border-[#0B5FAE] bg-[#F0F6FF]"
                        : "border-[#E8EEF6] bg-white hover:border-[#0B5FAE]/40",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery_method"
                        value={option.id}
                        checked={isSelected}
                        onChange={() => {
                          setSelectedMethod(option.id);
                          setOutletError("");
                        }}
                        className="h-4 w-4 accent-[#0B5FAE]"
                      />
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-medium text-[#071B3A]">{option.label}</span>
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: defaultGeneralInfo.primary_color }}
                    >
                      {option.charge > 0 ? `৳${option.charge}` : "Free"}
                    </span>
                  </label>
                );
              })}
            </form>
          </div>

          {/* Outlet picker — shows only when Store Pickup selected */}
          {isStorePickup && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Store size={20} style={{ color: defaultGeneralInfo.primary_color }} />
                <h3 className="text-lg font-bold text-[#071B3A]">Select Pickup Point</h3>
              </div>

              {outletError && (
                <p className="mb-3 text-sm text-red-500">{outletError}</p>
              )}

              {outletsLoading ? (
                <div className="flex h-20 items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#0B5FAE] border-t-transparent" />
                </div>
              ) : outlets.length === 0 ? (
                <p className="text-sm text-[#64748B]">No pickup points available.</p>
              ) : (
                <div className="space-y-3">
                  {outlets.map((outlet) => {
                    const isSelected = String(selectedOutletId) === String(outlet.id);
                    return (
                      <label
                        key={outlet.id}
                        className={[
                          "flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition",
                          isSelected
                            ? "border-[#0B5FAE] bg-[#F0F6FF]"
                            : "border-[#E8EEF6] bg-white hover:border-[#0B5FAE]/40",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="outlet_id"
                          value={outlet.id}
                          checked={isSelected}
                          onChange={() => { setSelectedOutletId(String(outlet.id)); setOutletError(""); }}
                          className="mt-1 h-4 w-4 accent-[#0B5FAE]"
                          form="delivery-form"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-[#0B5FAE]" />
                            <span className="font-semibold text-[#071B3A] capitalize">
                              {outlet.title}
                            </span>
                          </div>
                          {outlet.address && (
                            <p className="mt-0.5 text-xs text-[#64748B]">{outlet.address}</p>
                          )}
                          {outlet.opening && (
                            <p className="mt-0.5 text-xs text-[#64748B]">🕐 {outlet.opening}</p>
                          )}
                          {(outlet.contact_number_1 || outlet.contact_number_2) && (
                            <p className="mt-0.5 text-xs text-[#64748B]">
                              📞 {[outlet.contact_number_1, outlet.contact_number_2].filter(Boolean).join(" / ")}
                            </p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4">
            <Link
              href="/checkout"
              className="flex-1 rounded-lg border border-[#E8EEF6] py-3 text-center text-sm font-medium hover:bg-slate-50"
            >
              Back
            </Link>
            <button
              type="submit"
              form="delivery-form"
              className="flex-1 rounded-lg py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
            >
              Continue to Payment
            </button>
          </div>
        </div>

        <CheckoutSummary />
      </div>
    </section>
  );
}
