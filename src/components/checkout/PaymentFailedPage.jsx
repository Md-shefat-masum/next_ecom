"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, RefreshCw, ShoppingCart, Home } from "lucide-react";
import { defaultGeneralInfo } from "@/config";

const reasonMessages = {
  failed:    "Your payment could not be processed. Please try again.",
  cancelled: "Payment was cancelled. Your order is still saved — you can retry payment.",
  invalid:   "Payment validation failed. Please contact support if amount was deducted.",
  error:     "An unexpected error occurred. Please contact support.",
};

export function PaymentFailedPage() {
  const params     = useSearchParams();
  const reason     = params.get("reason") || "failed";
  const orderCode  = params.get("order");
  const message    = reasonMessages[reason] || reasonMessages.failed;

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-10 text-center shadow-sm">

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-[#071B3A]">Payment Failed</h1>
        <p className="mb-1 text-[#64748B]">{message}</p>

        {orderCode && (
          <p className="mt-2 text-sm text-[#94A3B8]">
            Order reference: <span className="font-semibold text-[#071B3A]">{orderCode}</span>
          </p>
        )}

        {/* Action buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {/* Retry payment */}
          <Link
            href="/checkout/payment"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
          >
            <RefreshCw size={16} />
            Retry Payment
          </Link>

          {/* View order in profile */}
          {orderCode && (
            <Link
              href="/profile?tab=orders"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E8EEF6] px-5 py-3 text-sm font-medium hover:bg-slate-50"
            >
              <ShoppingCart size={16} />
              View My Orders
            </Link>
          )}

          {/* Back home */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E8EEF6] px-5 py-3 text-sm font-medium hover:bg-slate-50"
          >
            <Home size={16} />
            Back to Shop
          </Link>
        </div>

        {/* Support note */}
        <p className="mt-6 text-xs text-[#94A3B8]">
          Need help?{" "}
          <a
            href={`mailto:${defaultGeneralInfo.email}`}
            className="text-[#0B5FAE] hover:underline"
          >
            {defaultGeneralInfo.email}
          </a>
          {defaultGeneralInfo.contact && ` · ${defaultGeneralInfo.contact}`}
        </p>
      </div>
    </section>
  );
}
