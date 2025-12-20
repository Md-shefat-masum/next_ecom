export const ROUTES = {
  // Public
  HOME: '/',
  SHOP: '/shop',
  CATEGORIES: '/categories',
  BRANDS: '/brands',
  COLLECTIONS: '/collections',
  BLOG: '/blog',
  SEARCH: '/search',
  CART: '/cart',
  CHECKOUT: '/checkout',
  WISHLIST: '/wishlist',
  COMPARE: '/compare',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Static Pages
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  SHIPPING: '/shipping',
  RETURNS: '/returns',
  
  // Account
  ACCOUNT: '/account',
  ACCOUNT_ORDERS: '/account/orders',
  ACCOUNT_ADDRESSES: '/account/addresses',
  ACCOUNT_PAYMENT_METHODS: '/account/payment-methods',
  ACCOUNT_REVIEWS: '/account/reviews',
  ACCOUNT_WISHLIST: '/account/wishlist',
  ACCOUNT_NOTIFICATIONS: '/account/notifications',
  ACCOUNT_SETTINGS: '/account/settings',
  
  // Dynamic
  PRODUCT: (slug: string) => `/products/${slug}`,
  CATEGORY: (slug: string) => `/categories/${slug}`,
  BRAND: (slug: string) => `/brands/${slug}`,
  COLLECTION: (slug: string) => `/collections/${slug}`,
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  ORDER: (id: string | number) => `/account/orders/${id}`,
};

export const PROTECTED_ROUTES = [
  '/account',
  '/checkout',
];

export const AUTH_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

