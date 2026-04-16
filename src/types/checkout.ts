import { CartItem } from './cart';
import { Address } from './address';

export interface CheckoutState {
  step: 'cart' | 'shipping' | 'payment' | 'review';
  items: CartItem[];
  shippingAddress: Address | null;
  billingAddress: Address | null;
  shippingMethod: ShippingMethod | null;
  paymentMethod: PaymentMethod | null;
  couponCode?: string;
  notes?: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
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
  code: string;
  description?: string;
  icon?: string;
}

export interface CheckoutData {
  items: { product_id: number; variant_id?: number; quantity: number }[];
  shipping_address: Omit<Address, 'id' | 'is_default' | 'address_type' | 'created_at' | 'updated_at'>;
  billing_address?: Omit<Address, 'id' | 'is_default' | 'address_type' | 'created_at' | 'updated_at'>;
  shipping_method_id: number;
  payment_method_id: number;
  coupon_code?: string;
  notes?: string;
}

export interface CheckoutResponse {
  order_id: number;
  order_number: string;
  payment_url?: string;
}

