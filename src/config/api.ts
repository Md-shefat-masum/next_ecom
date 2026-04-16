export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
export const API_TIMEOUT = 30000;

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
  },
  
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (slug: string) => `/products/${slug}`,
    REVIEWS: (slug: string) => `/products/${slug}/reviews`,
    RELATED: (slug: string) => `/products/${slug}/related`,
    SEARCH: '/products/search',
    FILTERS: '/products/filters',
  },
  
  // Categories
  CATEGORIES: {
    ALL: '/categories/all-categories',
    LIST: '/categories',
    DETAIL: (slug: string) => `/categories/${slug}`,
    PRODUCTS: (slug: string) => `/categories/${slug}/products`,
  },
  
  // Brands
  BRANDS: {
    LIST: '/brands',
    DETAIL: (slug: string) => `/brands/${slug}`,
    PRODUCTS: (slug: string) => `/brands/${slug}/products`,
  },
  
  // Collections
  COLLECTIONS: {
    LIST: '/collections',
    DETAIL: (slug: string) => `/collections/${slug}`,
    PRODUCTS: (slug: string) => `/collections/${slug}/products`,
  },
  
  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart',
    UPDATE: (id: number) => `/cart/${id}`,
    REMOVE: (id: number) => `/cart/${id}`,
    CLEAR: '/cart',
    APPLY_COUPON: '/cart/apply-coupon',
    REMOVE_COUPON: '/cart/remove-coupon',
  },
  
  // Checkout
  CHECKOUT: {
    PROCESS: '/checkout',
    VALIDATE: '/checkout/validate',
    SHIPPING_METHODS: '/checkout/shipping-methods',
    PAYMENT_METHODS: '/checkout/payment-methods',
  },
  
  // Orders
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: number) => `/orders/${id}`,
    CREATE: '/orders',
    CANCEL: (id: number) => `/orders/${id}/cancel`,
    TRACKING: (id: number) => `/orders/${id}/tracking`,
  },
  
  // Account
  ACCOUNT: {
    GET: '/account',
    UPDATE: '/account',
    DELETE: '/account',
    ADDRESSES: '/account/addresses',
    PAYMENT_METHODS: '/account/payment-methods',
  },
  
  // Wishlist
  WISHLIST: {
    GET: '/wishlist',
    ADD: '/wishlist',
    REMOVE: (productId: number) => `/wishlist/${productId}`,
    CLEAR: '/wishlist',
  },
  
  // Compare
  COMPARE: {
    GET: '/compare',
    ADD: (productId: number) => `/compare/${productId}`,
    REMOVE: (productId: number) => `/compare/${productId}`,
    CLEAR: '/compare',
  },
  
  // Reviews
  REVIEWS: {
    LIST: '/reviews',
    PRODUCT: (slug: string) => `/reviews/product/${slug}`,
    MY_REVIEWS: '/account/reviews',
  },
  
  // Blog
  BLOG: {
    LIST: '/blog',
    DETAIL: (slug: string) => `/blog/${slug}`,
    CATEGORIES: '/blog/categories',
    TAGS: '/blog/tags',
  },
  
  // Pages
  PAGES: {
    ABOUT: '/pages/about',
    CONTACT: '/pages/contact',
    FAQ: '/pages/faq',
    TERMS: '/pages/terms',
    PRIVACY: '/pages/privacy',
    SHIPPING: '/pages/shipping',
    RETURNS: '/pages/returns',
  },
  
  // Config
  CONFIG: {
    ALL: '/config',
    CURRENCY: '/config/currency',
    FEATURES: '/config/features',
  },
  
  // Route Resolution
  ROUTE: {
    RESOLVE: (slug: string) => `/route/resolve/${slug}`,
  },
  
  // Dashboard
  DASHBOARD: {
    INDEX: '/dashboard',
    STATS: '/dashboard/stats',
    RECENT_ORDERS: '/dashboard/recent-orders',
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    UNREAD: '/notifications/unread',
    MARK_READ: (id: number) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },
  
  // Search
  SEARCH: {
    ALL: '/search',
    PRODUCTS: '/search/products',
    SUGGESTIONS: '/search/suggestions',
  },
};

