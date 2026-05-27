import api from "./client";

/**
 * Validate a coupon code against the current cart subtotal.
 * @param {string} code - Coupon code
 * @param {number} subtotal - Cart subtotal in BDT
 */
export async function validateCoupon(code, subtotal) {
  const data = await api.post("/checkout/validate-coupon", { code, subtotal });
  return data.data;
}

/**
 * Place an order (requires auth token in cookie).
 * Maps Next.js cart items + checkout state to the API payload.
 *
 * @param {object} params
 * @param {Array}  params.cartItems       - Redux cart items
 * @param {object} params.shippingInfo    - { name, phone, email, address, city, postal_code, area }
 * @param {string} params.deliveryMethod  - "home_delivery" | "store_pickup"
 * @param {number} params.deliveryCharge  - Shipping fee in BDT
 * @param {string} params.paymentMethod   - "cash_on_delivery" | "bkash" | "sslcommerz"
 * @param {string|null} params.couponCode - Applied coupon code (or null)
 * @param {number} params.couponDiscount  - Discount amount in BDT
 * @param {string|null} params.orderNote  - Optional order note
 * @param {number|null} params.outletId   - Selected outlet ID for store pickup
 */
export async function placeOrder({
  cartItems,
  shippingInfo,
  deliveryMethod,
  deliveryCharge,
  paymentMethod,
  couponCode,
  couponDiscount,
  orderNote,
  outletId,
}) {
  const items = cartItems.map((item) => ({
    product_id: item.productId,
    variant_combination_id: item.variantCombinationId ?? null,
    quantity: item.quantity,
    unit_price: item.originalPrice ?? item.price,
    discount_price: item.originalPrice ? item.originalPrice - item.price : 0,
    total_price: item.price * item.quantity,
  }));

  const subTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = couponDiscount ?? 0;
  const total = Math.max(0, subTotal + deliveryCharge - discount);

  const payload = {
    items,
    order_from: "ecommerce",
    delivery_method: deliveryMethod === "store_pickup" ? "store_pickup" : "home_delivery",
    payment_method: paymentMethod ?? "cash_on_delivery",
    shipping_name: shippingInfo?.name ?? "",
    shipping_phone: shippingInfo?.phone ?? "",
    shipping_email: shippingInfo?.email ?? null,
    shipping_address: shippingInfo?.address ?? "",
    shipping_city: shippingInfo?.city ?? shippingInfo?.area ?? null,
    shipping_postal_code: shippingInfo?.postal_code ?? null,
    address_id: shippingInfo?.address_id ?? null,
    sub_total: subTotal,
    discount,
    delivery_fee: deliveryCharge ?? 0,
    vat: 0,
    tax: 0,
    total,
    coupon_code: couponCode ?? null,
    order_note: orderNote ?? null,
    outlet_id: outletId ?? null,
  };

  const data = await api.post("/orders", payload);
  return data;
}

/**
 * Initiate bKash payment for an already-placed order.
 * Returns { bkash_url, payment_id }
 */
export async function initiateBkash(orderId) {
  const data = await api.post("/payments/bkash/initiate", { order_id: orderId });
  return data.data ?? data;
}

/**
 * Initiate SSLCommerz payment for an already-placed order.
 * Returns { gateway_url, session_key }
 */
export async function initiateSSL(orderId) {
  const data = await api.post("/payments/sslcommerz/initiate", { order_id: orderId });
  return data.data ?? data;
}
