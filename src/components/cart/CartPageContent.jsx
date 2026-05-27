"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { defaultGeneralInfo } from "@/config";
import {
  getAvailableCombinationsForCartItem,
  removeFromCart,
  switchCartItemVariant,
  updateCartQuantity,
} from "@/lib/cart/cartUtils";
import { getFileUrl } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { syncCartFromStorage } from "@/store/slices/cartSlice";
import "./cart.css";

const formatPrice = (price) => `৳${Number(price).toLocaleString("en-BD")}`;

const formatOptions = (options) => {
  if (!options) return "";
  return Object.entries(options)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" | ");
};

export function CartPageContent() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.count);
  const totalPrice = useAppSelector((state) => state.cart.total);
  const [expandedVariantKey, setExpandedVariantKey] = useState(null);

  const refreshCart = () => dispatch(syncCartFromStorage());

  const handleQuantityChange = (item, quantity) => {
    const result = updateCartQuantity(item.cartItemKey, quantity);
    if (!result.success) window.alert(result.message);
    else refreshCart();
  };

  const handleRemove = (cartItemKey) => {
    removeFromCart(cartItemKey);
    refreshCart();
  };

  const handleVariantSwitch = (item, combinationId) => {
    const result = switchCartItemVariant(item.cartItemKey, combinationId);
    if (!result.success || result.adjusted) window.alert(result.message);
    if (result.success) {
      setExpandedVariantKey(null);
      refreshCart();
    }
  };

  if (totalItems === 0) {
    return (
      <section className="container py-16 text-center">
        <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-slate-300" />
        <h1 className="mb-4 text-2xl font-bold text-[#071B3A]">Your cart is empty</h1>
        <p className="mb-8 text-[#64748B]">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-md px-8 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#071B3A]">Shopping Cart</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="rounded-xl bg-white shadow-sm">
            {items.map((item, index) => {
              const availableCombinations = item.hasVariants ? getAvailableCombinationsForCartItem(item) : [];
              const isVariantPanelOpen = expandedVariantKey === item.cartItemKey;

              return (
                <div key={item.cartItemKey} className={`p-6 ${index > 0 ? "border-t border-[#E8EEF6]" : ""}`}>
                  <div className="flex gap-4">
                    <div className="cart-item-image cart-item-image-large">
                      {item.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={getFileUrl(item.image)} alt={item.title} className="h-full w-full object-cover" />
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-[#071B3A]">{item.title}</h3>
                      {item.hasVariants ? (
                        <>
                          <p className="cart-variant-summary">{formatOptions(item.selectedOptions)}</p>
                          <button
                            type="button"
                            className="cart-variant-change-btn"
                            onClick={() =>
                              setExpandedVariantKey(isVariantPanelOpen ? null : item.cartItemKey)
                            }
                          >
                            Change Variant
                          </button>
                        </>
                      ) : null}
                      <p className="mt-1 font-semibold text-[#0B5FAE]">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded border p-1 hover:bg-slate-50"
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        className="rounded border p-1 hover:bg-slate-50"
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-[#071B3A]">{formatPrice(item.price * item.quantity)}</p>
                      <button
                        type="button"
                        className="mt-2 text-red-500 hover:text-red-600"
                        onClick={() => handleRemove(item.cartItemKey)}
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {item.hasVariants && isVariantPanelOpen ? (
                    <div className="cart-variant-panel">
                      {availableCombinations.length > 0 ? (
                        <div className="cart-variant-grid">
                          {availableCombinations.map((option) => {
                            const label = Object.values(option.selectedOptions).join(" / ");
                            const isActive = option.combinationId === item.productCombinationId;

                            return (
                              <button
                                type="button"
                                key={option.stockKey}
                                className={`cart-variant-option${isActive ? " cart-variant-option-active" : ""}`}
                                onClick={() => handleVariantSwitch(item, option.combinationId)}
                              >
                                <span>{label}</span>
                                <span className="cart-variant-stock">Stock: {option.stock}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="cart-variant-unavailable">No available stock combination found.</p>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#071B3A]">Order Summary</h2>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Subtotal ({totalItems} items)</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Shipping</span>
                <span className="text-[#64748B]">Calculated at checkout</span>
              </div>
            </div>

            <div className="mb-6 border-t border-[#E8EEF6] pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[#0B5FAE]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full rounded-lg py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/"
              className="mt-3 block w-full rounded-lg border border-[#E8EEF6] py-3 text-center text-sm font-medium transition hover:bg-slate-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
