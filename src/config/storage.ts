// LocalStorage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  COMPARE: 'compare',
  RECENT_SEARCHES: 'recent_searches',
  RECENTLY_VIEWED: 'recently_viewed',
  THEME: 'theme',
  CURRENCY: 'currency',
  LANGUAGE: 'language',
};

// Cookie names
export const COOKIE_NAMES = {
  SESSION_ID: 'session_id',
  GUEST_ID: 'guest_id',
  CONSENT: 'cookie_consent',
};

// Storage utilities
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error('Failed to save to localStorage');
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};

