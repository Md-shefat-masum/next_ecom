export const CHECKOUT_STORAGE_KEY = "bme_checkout";

const canUseStorage = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const getDefaultCheckoutState = () => ({
  shippingInfo: null,
  deliveryMethod: "home_delivery_inside",
  deliveryCharge: 0,
  pickupPointId: null,
  paymentOption: "cash_on_delivery",
  couponCode: null,
  couponDiscount: 0,
  orderId: null,
  orderCode: null,
});

export const loadCheckoutState = () => {
  if (!canUseStorage()) return getDefaultCheckoutState();

  try {
    const stored = JSON.parse(window.localStorage.getItem(CHECKOUT_STORAGE_KEY) || "{}");
    return { ...getDefaultCheckoutState(), ...stored };
  } catch {
    return getDefaultCheckoutState();
  }
};

export const saveCheckoutState = (state) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(state));
};

export const clearCheckoutState = () => {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);
};

export const createLocalOrder = ({ items, shippingInfo, deliveryMethod, deliveryCharge, paymentOption, couponDiscount }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryCharge - couponDiscount;
  const orderCode = `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 900000 + 100000)}`;

  return {
    id: Date.now(),
    code: orderCode,
    createdAt: new Date().toISOString(),
    shippingInfo,
    deliveryMethod,
    deliveryCharge,
    paymentOption,
    couponDiscount,
    subtotal,
    total,
    items: items.map((item) => ({
      cartItemKey: item.cartItemKey,
      productId: item.productId,
      title: item.title,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
      selectedOptions: item.selectedOptions,
    })),
    paymentStatus: paymentOption === "cash_on_delivery" ? "unpaid" : "pending",
  };
};
