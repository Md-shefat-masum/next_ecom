// Feature flags - can be toggled based on environment or API config
export const FEATURES = {
  WISHLIST_ENABLED: true,
  COMPARE_ENABLED: true,
  REVIEWS_ENABLED: true,
  BLOG_ENABLED: true,
  GUEST_CHECKOUT: true,
  MULTI_CURRENCY: false,
  SOCIAL_LOGIN: false,
  NEWSLETTER: true,
  LIVE_CHAT: false,
  PRODUCT_QUICK_VIEW: true,
  INFINITE_SCROLL: false,
  DARK_MODE: false,
};

export const isFeatureEnabled = (feature: keyof typeof FEATURES): boolean => {
  return FEATURES[feature] ?? false;
};

