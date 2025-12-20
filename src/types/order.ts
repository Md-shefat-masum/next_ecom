import { Address } from './address';

export interface OrderItem {
  id: number;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: number;
  discount_price?: number;
  total: number;
  product: {
    id: number;
    name: string;
    slug: string;
    image?: string;
  };
  variant?: {
    id: number;
    name: string;
    attributes?: Record<string, string>;
  };
}

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shipping_address: Address;
  billing_address?: Address;
  items: OrderItem[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export interface OrderTracking {
  order_id: number;
  order_number: string;
  status: OrderStatus;
  tracking_number?: string;
  carrier?: string;
  estimated_delivery?: string;
  history: {
    status: string;
    description: string;
    timestamp: string;
  }[];
}

