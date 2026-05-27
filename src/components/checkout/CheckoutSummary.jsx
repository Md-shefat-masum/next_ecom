"use client";

import { useAppSelector } from "@/store/hooks";
import { getFileUrl } from "@/lib/utils";

const formatPrice = (price) => `৳${Number(price).toLocaleString("en-BD")}`;

export function CheckoutSummary() {
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = useAppSelector((state) => state.cart.total);
  const deliveryCharge = useAppSelector((state) => state.checkout.deliveryCharge);
  const couponDiscount = useAppSelector((state) => state.checkout.couponDiscount);
  const total = subtotal + deliveryCharge - couponDiscount;

  return (
    <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-[#071B3A]">Order Summary</h2>

      <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
        {items.map((item) => (
          <div key={item.cartItemKey} className="flex gap-3">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#F5F7FA]">
              {item.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={getFileUrl(item.image)} alt={item.title} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#071B3A]">{item.title}</p>
              <p className="text-xs text-[#64748B]">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-[#E8EEF6] pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-[#64748B]">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#64748B]">Delivery</span>
          <span>{formatPrice(deliveryCharge)}</span>
        </div>
        {couponDiscount > 0 ? (
          <div className="flex justify-between text-[#16A34A]">
            <span>Coupon</span>
            <span>-{formatPrice(couponDiscount)}</span>
          </div>
        ) : null}
      </div>

      <div className="mt-4 border-t border-[#E8EEF6] pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-[#0B5FAE]">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

export function getCheckoutTotal(state) {
  const subtotal = state.cart.total;
  const deliveryCharge = state.checkout.deliveryCharge;
  const couponDiscount = state.checkout.couponDiscount;
  return subtotal + deliveryCharge - couponDiscount;
}
