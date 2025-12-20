import { api } from '../client';
import { ApiResponse } from '@/types';

export interface CheckoutData {
  items: { product_id: number; variant_id?: number; quantity: number }[];
  shipping_address: {
    name: string;
    phone: string;
    email?: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  billing_address?: {
    name: string;
    phone: string;
    email?: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  shipping_method_id: number;
  payment_method_id: number;
  coupon_code?: string;
  notes?: string;
}

export interface ShippingMethod {
  id: number;
  name: string;
  description?: string;
  price: number;
  estimated_days?: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export const checkoutService = {
  processCheckout: (data: CheckoutData) => 
    api.post<ApiResponse<{ order_id: number; order_number: string }>>('/checkout', data),

  validateCheckout: (data: Partial<CheckoutData>) => 
    api.post<ApiResponse<{ valid: boolean; errors?: Record<string, string[]> }>>('/checkout/validate', data),

  getShippingMethods: () => 
    api.get<ApiResponse<ShippingMethod[]>>('/checkout/shipping-methods'),

  getPaymentMethods: () => 
    api.get<ApiResponse<PaymentMethod[]>>('/checkout/payment-methods'),

  calculateShipping: (data: { address: { city: string; postal_code?: string }; items: { product_id: number; quantity: number }[] }) => 
    api.post<ApiResponse<{ shipping_cost: number; estimated_days?: string }>>('/checkout/calculate-shipping', data),

  calculateTax: (data: { subtotal: number; shipping: number; address: { city: string; state?: string } }) => 
    api.post<ApiResponse<{ tax: number; tax_rate: number }>>('/checkout/calculate-tax', data),
};

export default checkoutService;

