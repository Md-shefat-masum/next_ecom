"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { defaultGeneralInfo } from "@/config";

const FILE_URL = process.env.NEXT_PUBLIC_FILE_URL || "https://posftp.bme.com.bd";

function fmtPrice(n) {
  return Number(n || 0).toLocaleString("en-BD");
}

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Amount in words ────────────────────────────────────────────────────────────
const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
               "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
               "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function numToWords(n) {
  n = Math.round(n);
  if (n === 0) return "Zero";
  if (n < 0) return "Minus " + numToWords(-n);

  let words = "";
  if (n >= 10_000_000) { words += numToWords(Math.floor(n / 10_000_000)) + " Crore "; n %= 10_000_000; }
  if (n >= 100_000)    { words += numToWords(Math.floor(n / 100_000)) + " Lakh "; n %= 100_000; }
  if (n >= 1_000)      { words += numToWords(Math.floor(n / 1_000)) + " Thousand "; n %= 1_000; }
  if (n >= 100)        { words += ones[Math.floor(n / 100)] + " Hundred "; n %= 100; }
  if (n >= 20)         { words += tens[Math.floor(n / 10)] + " "; n %= 10; }
  if (n > 0)           { words += ones[n] + " "; }
  return words.trim();
}

function amountInWords(total) {
  return numToWords(Math.round(total)) + " Taka Only";
}

// ── Print / PDF helpers ────────────────────────────────────────────────────────
function printInvoice() {
  window.print();
}

export function CheckoutOrderConfirmedPage() {
  const [order, setOrder] = useState(null);
  const params  = useSearchParams();
  const paidStatus   = params.get("status");   // "paid" from gateway callback
  const paramCode    = params.get("order");     // order_code from gateway callback

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem("bme_last_order") || "null");
      // If gateway returned an order code that matches stored, or override order_code
      if (stored) {
        if (paramCode) stored.order_code = paramCode;
        if (paidStatus === "paid") stored.payment_status = "paid";
      }
      setOrder(stored);
    } catch {
      setOrder(null);
    }
  }, [paramCode, paidStatus]);

  const logoUrl = defaultGeneralInfo.logo
    ? `${FILE_URL}/${defaultGeneralInfo.logo}`
    : null;

  const qrData = order?.order_code
    ? encodeURIComponent(`${window?.location?.origin || ""}/profile?order=${order.order_code}`)
    : "";

  if (!order) {
    return (
      <section className="container py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-[#071B3A]">No recent order found</h1>
        <Link href="/" className="text-[#0B5FAE] hover:underline">Go to Home</Link>
      </section>
    );
  }

  const items       = order.items ?? [];
  const subtotal    = Number(order.subtotal ?? 0);
  const delivCharge = Number(order.delivery_charge ?? 0);
  const couponDisc  = Number(order.coupon_discount ?? 0);
  const total       = Number(order.total ?? subtotal + delivCharge - couponDisc);

  return (
    <section className="py-8 print:py-0">
      <style>{`
        @media print {
          .no_print { display: none !important; }
          body { background: white !important; }
          .print_area { overflow: visible !important; }
        }
      `}</style>

      <div className="container">
        <div className="mx-auto max-w-[992px] rounded-sm border border-gray-200 bg-white">

          {/* ── Success Banner (hidden on print) ─────────────────────── */}
          <div className="no_print border-b p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                   className="h-10 w-10 text-green-600">
                <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.525L9.53 12.53a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.147-.094l3.743-5.56Z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-green-700">Success</h1>
            <p className="text-[20px] text-gray-600">Order completed successfully.</p>
          </div>

          {/* ── Invoice Print Area ───────────────────────────────────── */}
          <div className="print_area overflow-x-auto">
            <div className="p-6 print_content">

              {/* Header row: logo + company info  |  QR */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    {logoUrl && (
                      <img src={logoUrl} alt="Logo" className="w-[140px] object-contain" />
                    )}
                    <div>
                      <h3 className="font-semibold">{defaultGeneralInfo.company_name}</h3>
                      {defaultGeneralInfo.address && (
                        <p className="text-sm leading-5 text-gray-600">{defaultGeneralInfo.address}</p>
                      )}
                      {defaultGeneralInfo.contact && (
                        <p className="text-sm text-gray-600">{defaultGeneralInfo.contact}</p>
                      )}
                    </div>
                  </div>

                  {/* Invoice meta + delivery info */}
                  <div className="mt-4 flex flex-wrap gap-8 text-sm text-gray-700">
                    <div className="space-y-1">
                      <div>Invoice #: <span className="font-semibold">{order.order_code}</span></div>
                      <div>Date: <span className="font-semibold">{fmtDate(order.sale_date)}</span></div>
                      <div>Payment: <span className="font-semibold uppercase">
                        {(order.payment_method || "COD").replace(/_/g, " ")}
                      </span></div>
                      <div>Status: <span className="font-semibold capitalize">{order.payment_status ?? "Unpaid"}</span></div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Delivery Information</h4>
                      <div className="mt-1 space-y-0.5 text-sm leading-6 text-gray-700">
                        <div>
                          {[order.shipping?.name, order.shipping?.phone]
                            .filter(Boolean).join(", ")}
                        </div>
                        <div>
                          {[order.shipping?.address, order.shipping?.city,
                            order.shipping?.postal_code, order.shipping?.country]
                            .filter(Boolean).join(", ")}
                        </div>
                        {order.delivery_method && (
                          <div className="capitalize text-gray-500">
                            {order.delivery_method.replace(/_/g, " ")}
                            {delivCharge > 0 ? ` (৳${fmtPrice(delivCharge)})` : " (Free)"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR code */}
                {qrData && (
                  <div className="w-[140px] shrink-0 text-right">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${qrData}`}
                      alt="QR"
                      className="ml-auto"
                    />
                    <div className="mt-2 text-xs text-gray-500">Scan to view order</div>
                  </div>
                )}
              </div>

              {/* ── Items Table ──────────────────────────────────────── */}
              <div className="mt-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr style={{ backgroundColor: defaultGeneralInfo.primary_color }} className="text-white">
                      <th className="p-2 text-left">Item</th>
                      <th className="p-2 text-right">Quantity</th>
                      <th className="p-2 text-right">Unit Price</th>
                      <th className="p-2 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2">
                          <div className="flex gap-2">
                            {item.image && (
                              <img
                                src={item.image.startsWith("http") ? item.image : `${FILE_URL}/${item.image}`}
                                alt={item.product_name}
                                className="h-10 w-10 rounded object-cover"
                              />
                            )}
                            <div>
                              <div className="font-medium">{item.product_name}</div>
                              {item.variant && (
                                <div className="text-xs text-gray-500">{item.variant}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 text-right">{item.qty}</td>
                        <td className="p-2 text-right">{fmtPrice(item.sale_price)} ৳</td>
                        <td className="p-2 text-right">{fmtPrice(item.total_price)} ৳</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Summary */}
                <div className="ml-auto mt-4 w-full md:w-1/2">
                  <div className="flex items-center justify-between py-1 text-sm">
                    <span>Sub total</span>
                    <span className="font-medium">{fmtPrice(subtotal)} ৳</span>
                  </div>
                  {couponDisc > 0 && (
                    <div className="flex items-center justify-between py-1 text-sm text-green-700">
                      <span>Coupon discount {order.coupon ? `(${order.coupon})` : ""}</span>
                      <span className="font-medium">- {fmtPrice(couponDisc)} ৳</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-1 text-sm">
                    <span>Delivery charge</span>
                    <span className="font-medium">{delivCharge > 0 ? `${fmtPrice(delivCharge)} ৳` : "Free"}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t py-2 text-base">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">{fmtPrice(total)} ৳</span>
                  </div>
                </div>

                {/* Amount in words */}
                <div className="mt-4 text-sm">
                  In text:{" "}
                  <span className="font-semibold">{amountInWords(total)}</span>
                </div>

                {/* Order note */}
                {order.order_note && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Order Note</h4>
                    <p className="text-sm leading-6 text-gray-700">{order.order_note}</p>
                  </div>
                )}
              </div>

              {/* ── Action Buttons (hidden on print) ─────────────────── */}
              <div className="no_print mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={printInvoice}
                  className="rounded-sm bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  🖨 Print Invoice
                </button>
                <button
                  onClick={printInvoice}
                  className="inline-flex items-center gap-1 rounded-sm bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
                <Link
                  href="/"
                  className="rounded-sm bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
                >
                  Back To Shopping
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
