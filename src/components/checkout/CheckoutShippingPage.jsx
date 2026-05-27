"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Plus, CheckCircle } from "lucide-react";
import { defaultGeneralInfo } from "@/config";
import { loadCheckoutState, saveCheckoutState } from "@/lib/cart/checkoutStorage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateCheckout, setShippingInfo } from "@/store/slices/checkoutSlice";
import { selectAuthUser } from "@/store/slices/authSlice";
import api from "@/lib/api/client";
import { CheckoutSteps } from "./CheckoutSteps";
import { CheckoutSummary } from "./CheckoutSummary";

const inputClass =
  "w-full rounded-lg border border-[#D8E4F2] px-4 py-3 text-sm outline-none transition focus:border-[#0B5FAE] focus:ring-2 focus:ring-[#0B5FAE]/10";

/** Extract a user-friendly error string from API error responses */
function parseApiError(err) {
  // Laravel 422 validation: { message, errors: { field: ["msg"] } }
  if (err?.data?.errors && typeof err.data.errors === "object") {
    const fieldErrors = Object.values(err.data.errors).flat();
    if (fieldErrors.length) return fieldErrors.join(" ");
  }
  // Custom API error: { success: false, error: { message } }
  if (err?.data?.error?.message) return err.data.error.message;
  // Standard message
  if (err?.data?.message) return err.data.message;
  return err?.message || "Failed to save address. Please try again.";
}

function AddNewAddressForm({ onSave, onCancel, authUser }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setFieldErrors({});
    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim() || undefined,
      address_line_1: String(fd.get("address") || "").trim(),
      city: String(fd.get("city") || "").trim(),
      postal_code: String(fd.get("postal_code") || "").trim() || undefined,
      country: "Bangladesh",
      is_default: fd.get("is_default") === "on",
    };

    try {
      const res = await api.post("/account/addresses", payload);
      const saved = res.data ?? res;
      onSave(saved);
    } catch (err) {
      // Show per-field validation errors if available
      if (err?.data?.errors) setFieldErrors(err.data.errors);
      setError(parseApiError(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#0B5FAE]/30 bg-[#F0F6FF] p-5">
      <h3 className="mb-4 text-sm font-semibold text-[#071B3A]">New Address</h3>
      {error && (
        <p className="mb-3 rounded bg-red-50 p-2 text-xs text-red-600">{error}</p>
      )}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#475569]">Full Name *</label>
            <input
              name="name"
              type="text"
              required
              defaultValue={authUser?.name || ""}
              className={`${inputClass} ${fieldErrors.name ? "border-red-400" : ""}`}
            />
            {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name[0]}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#475569]">Phone *</label>
            <input
              name="phone"
              type="tel"
              required
              defaultValue={authUser?.phone || ""}
              className={`${inputClass} ${fieldErrors.phone ? "border-red-400" : ""}`}
            />
            {fieldErrors.phone && <p className="mt-1 text-xs text-red-500">{fieldErrors.phone[0]}</p>}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[#475569]">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={authUser?.email || ""}
            className={`${inputClass} ${fieldErrors.email ? "border-red-400" : ""}`}
          />
          {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email[0]}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[#475569]">Address *</label>
          <input
            name="address"
            type="text"
            required
            placeholder="House, Road, Area"
            className={`${inputClass} ${fieldErrors.address_line_1 ? "border-red-400" : ""}`}
          />
          {fieldErrors.address_line_1 && <p className="mt-1 text-xs text-red-500">{fieldErrors.address_line_1[0]}</p>}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#475569]">City *</label>
            <input
              name="city"
              type="text"
              required
              className={`${inputClass} ${fieldErrors.city ? "border-red-400" : ""}`}
            />
            {fieldErrors.city && <p className="mt-1 text-xs text-red-500">{fieldErrors.city[0]}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#475569]">Postal Code</label>
            <input name="postal_code" type="text" className={inputClass} />
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-[#64748B]">
          <input type="checkbox" name="is_default" />
          Set as default address
        </label>
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
            style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
          >
            {saving ? "Saving..." : "Save Address"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#E8EEF6] px-5 py-2 text-sm font-medium hover:bg-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export function CheckoutShippingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cart.count);
  const savedShippingInfo = useAppSelector((state) => state.checkout.shippingInfo);
  const authUser = useAppSelector(selectAuthUser);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addressesLoading, setAddressesLoading] = useState(true);

  useEffect(() => {
    dispatch(hydrateCheckout());
  }, [dispatch]);

  // Load saved addresses
  useEffect(() => {
    api
      .get("/account/addresses")
      .then((res) => {
        const list = res.data?.addresses ?? res.data ?? [];
        setAddresses(list);
        // Auto-select default or first
        const def = list.find((a) => a.is_default) || list[0];
        if (def) setSelectedAddressId(def.id);
      })
      .catch(() => {})
      .finally(() => setAddressesLoading(false));
  }, []);

  const handleAddressSaved = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
    setShowAddForm(false);
  };

  const handleSubmit = () => {
    let shippingData;

    if (selectedAddressId) {
      const addr = addresses.find((a) => a.id === selectedAddressId);
      if (addr) {
        shippingData = {
          name: addr.name || authUser?.name || "",
          email: addr.email || authUser?.email || "",
          address: addr.address_line_1 || addr.address || "",
          country: addr.country || "Bangladesh",
          city: addr.city || "",
          postal_code: addr.postal_code || "",
          phone: addr.phone || authUser?.phone || "",
          address_id: addr.id,
          checkout_type: "registered",
        };
      }
    }

    if (!shippingData) return; // No address selected yet

    dispatch(setShippingInfo(shippingData));
    const currentState = loadCheckoutState();
    saveCheckoutState({ ...currentState, shippingInfo: shippingData });
    router.push("/checkout/delivery");
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
      <CheckoutSteps currentStep={0} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#071B3A]">Shipping Information</h2>

            <div className="space-y-4">
              {/* ── Saved Address Cards ── */}
              {addressesLoading ? (
                <div className="flex h-20 items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#0B5FAE] border-t-transparent" />
                </div>
              ) : (
                <>
                  {addresses.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                          <label
                            key={addr.id}
                            className={[
                              "relative flex cursor-pointer rounded-xl border-2 p-4 transition",
                              isSelected
                                ? "border-[#0B5FAE] bg-[#F0F6FF]"
                                : "border-[#E8EEF6] bg-white hover:border-[#0B5FAE]/40",
                            ].join(" ")}
                          >
                            <input
                              type="radio"
                              name="address_id"
                              value={addr.id}
                              checked={isSelected}
                              onChange={() => setSelectedAddressId(addr.id)}
                              className="sr-only"
                            />
                            {isSelected && (
                              <CheckCircle
                                className="absolute right-3 top-3 text-[#0B5FAE]"
                                size={18}
                              />
                            )}
                            <div className="flex gap-3">
                              <MapPin size={16} className="mt-0.5 shrink-0 text-[#0B5FAE]" />
                              <div className="min-w-0 text-sm">
                                <p className="font-semibold text-[#071B3A]">{addr.name || authUser?.name}</p>
                                <p className="text-[#475569]">{addr.address_line_1 || addr.address}</p>
                                {addr.city && <p className="text-[#475569]">City: <span className="font-medium">{addr.city}</span></p>}
                                {addr.postal_code && <p className="text-[#475569]">Postal: {addr.postal_code}</p>}
                                {addr.country && <p className="text-[#475569]">Country: {addr.country}</p>}
                                <p className="text-[#475569]">Phone: {addr.phone}</p>
                                {addr.is_default && (
                                  <span className="mt-1 inline-block rounded-full bg-[#0B5FAE]/10 px-2 py-0.5 text-xs font-medium text-[#0B5FAE]">
                                    Default
                                  </span>
                                )}
                              </div>
                            </div>
                          </label>
                        );
                      })}

                      {/* Add New Address card */}
                      {!showAddForm && (
                        <button
                          type="button"
                          onClick={() => setShowAddForm(true)}
                          className="flex min-h-[100px] cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D8E4F2] bg-white text-sm font-medium text-[#64748B] transition hover:border-[#0B5FAE] hover:text-[#0B5FAE]"
                        >
                          <Plus size={18} />
                          Add New Address
                        </button>
                      )}
                    </div>
                  )}

                  {/* Empty state — show form directly */}
                  {addresses.length === 0 && !showAddForm && (
                    <button
                      type="button"
                      onClick={() => setShowAddForm(true)}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D8E4F2] py-8 text-sm font-medium text-[#64748B] hover:border-[#0B5FAE] hover:text-[#0B5FAE]"
                    >
                      <Plus size={18} />
                      Add a shipping address
                    </button>
                  )}

                  {/* Inline add-new form */}
                  {showAddForm && (
                    <AddNewAddressForm
                      authUser={authUser}
                      onSave={handleAddressSaved}
                      onCancel={() => setShowAddForm(false)}
                    />
                  )}
                </>
              )}

              <button
                type="button"
                disabled={!selectedAddressId && addresses.length > 0}
                onClick={handleSubmit}
                className="w-full rounded-lg py-3 text-sm font-semibold text-white disabled:opacity-40"
                style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
              >
                Continue to Delivery
              </button>
            </div>
          </div>
        </div>

        <CheckoutSummary />
      </div>
    </section>
  );
}
