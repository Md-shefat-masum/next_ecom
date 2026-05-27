export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 30000);

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    PROFILE: "/auth/profile",
  },
  CONFIG: {
    ALL: "/config",
    CURRENCY: "/config/currency",
    FEATURES: "/config/features",
  },
  CATEGORIES: {
    ALL: "/categories/all-categories",
    LIST: "/categories",
    FEATURED: "/categories/featured-categories",
    DETAIL: (slug) => `/categories/${slug}`,
    PRODUCTS: (slug) => `/categories/${slug}/products`,
  },
  PRODUCTS: {
    LIST: "/products",
    DETAIL: (slug) => `/products/${slug}`,
    SEARCH: "/products/search",
    FILTERS: "/products/filters",
    RELATED: (slug) => `/products/${slug}/related`,
    CATEGORY_PRODUCTS: (categoryId) => `/products/get-category-products/${categoryId}`,
    SUBCATEGORY_PRODUCTS: (subcategoryId) => `/products/get-subcategory-products/${subcategoryId}`,
  },
  CART: {
    GET: "/cart",
    ADD: "/cart",
    UPDATE: (id) => `/cart/${id}`,
    REMOVE: (id) => `/cart/${id}`,
    CLEAR: "/cart",
    APPLY_COUPON: "/cart/apply-coupon",
    REMOVE_COUPON: "/cart/remove-coupon",
  },
  ORDERS: {
    LIST: "/orders",
    DETAIL: (id) => `/orders/${id}`,
    CREATE: "/orders",
    CANCEL: (id) => `/orders/${id}/cancel`,
  },
  ROUTE: {
    RESOLVE: (slug) => `/route/resolve/${slug}`,
  },
};

