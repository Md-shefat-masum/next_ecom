import { api } from '../client';
import { ApiResponse } from '@/types';

export interface AppConfig {
  app_name: string;
  currency: CurrencyConfig;
  features: FeatureFlags;
  shipping_zones: ShippingZone[];
  payment_methods: ConfigPaymentMethod[];
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  position: 'before' | 'after';
  decimal_places: number;
  thousand_separator: string;
  decimal_separator: string;
}

export interface FeatureFlags {
  wishlist_enabled: boolean;
  compare_enabled: boolean;
  reviews_enabled: boolean;
  guest_checkout: boolean;
  multi_currency: boolean;
  blog_enabled: boolean;
}

export interface ShippingZone {
  id: number;
  name: string;
  regions: string[];
  methods: {
    id: number;
    name: string;
    price: number;
    estimated_days?: string;
  }[];
}

export interface ConfigPaymentMethod {
  id: number;
  name: string;
  code: string;
  icon?: string;
  description?: string;
  enabled: boolean;
}

export const configService = {
  getConfig: () => 
    api.get<ApiResponse<AppConfig>>('/config'),

  getCurrency: () => 
    api.get<ApiResponse<CurrencyConfig>>('/config/currency'),

  getShippingZones: () => 
    api.get<ApiResponse<ShippingZone[]>>('/config/shipping-zones'),

  getPaymentMethods: () => 
    api.get<ApiResponse<ConfigPaymentMethod[]>>('/config/payment-methods'),

  getFeatures: () => 
    api.get<ApiResponse<FeatureFlags>>('/config/features'),
};

export default configService;

