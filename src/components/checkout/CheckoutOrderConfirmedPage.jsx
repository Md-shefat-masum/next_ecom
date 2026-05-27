"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultGeneralInfo } from "@/config";

const formatPrice = (price) => `৳${Number(price).toLocaleString("en-BD")}`;

export function CheckoutOrderConfirmedPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(window.localStorage.getItem("bme_last_order") || "null");
      setOrder(stored);
    } catch {
      setOrder(null);
    }
  }, []);

  if (!order) {
    return (
      <section className="container py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-[#071B3A]">No recent order found</h1>
        <Link href="/" className="text-[#0B5FAE] hover:underline">
          Go to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-12">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-[#16A34A]" />
        <h1 className="mb-2 text-3xl font-bold text-[#071B3A]">Order Confirmed</h1>
        <p className="mb-6 text-[#64748B]">Thank you for your purchase. Your order has been placed successfully.</p>

        <div className="mb-8 rounded-lg bg-[#F3F8FF] p-6 text-left">
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-[#64748B]">Order Code</p>
              <p className="font-semibold text-[#071B3A]">{order.code}</p>
            </div>
            <div>
              <p className="text-[#64748B]">Payment Method</p>
              <p className="font-semibold capitalize text-[#071B3A]">{order.paymentOption?.replace(/_/g, " ")}</p>
            </div>
            <div>
              <p className="text-[#64748B]">Delivery</p>
              <p className="font-semibold capitalize text-[#071B3A]">{order.deliveryMethod?.replace(/_/g, " ")}</p>
            </div>
            <div>
              <p className="text-[#64748B]">Grand Total</p>
              <p className="font-semibold text-[#0B5FAE]">{formatPrice(order.total)}</p>
            </div>
          </div>

          {order.shippingInfo ? (
            <div className="mt-6 border-t border-[#E8EEF6] pt-4">
              <p className="mb-2 text-sm font-semibold text-[#071B3A]">Shipping Address</p>
              <p className="text-sm text-[#64748B]">
                {order.shippingInfo.name}, {order.shippingInfo.phone}
                <br />
                {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.country}{" "}
                {order.shippingInfo.postal_code}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
          >
            Continue Shopping
          </Link>
          <Link
            href="/cart"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#E8EEF6] px-6 py-3 text-sm font-medium hover:bg-slate-50"
          >
            View Cart
          </Link>
        </div>
      </div>
    </section>
  );
}
