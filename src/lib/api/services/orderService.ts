import { api } from '../client';
import { ApiResponse, PaginatedResponse } from '@/types';

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
  };
}

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  status: string;
  payment_status: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
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
    city: string;
  };
  items: OrderItem[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderTracking {
  order_id: number;
  order_number: string;
  status: string;
  tracking_number?: string;
  carrier?: string;
  estimated_delivery?: string;
  history: {
    status: string;
    description: string;
    timestamp: string;
  }[];
}

export interface CreateOrderData {
  items: { product_id: number; variant_id?: number; quantity: number; price: number }[];
  delivery_method: string;
  payment_method: string;
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
  subtotal: number;
  discount?: number;
  shipping: number;
  tax?: number;
  total: number;
  notes?: string;
}

export const orderService = {
  getOrders: (params?: { page?: number; per_page?: number; status?: string }) => 
    api.get<ApiResponse<PaginatedResponse<Order>>>('/orders', { params }),

  getOrder: (orderId: number) => 
    api.get<ApiResponse<Order>>(`/orders/${orderId}`),

  createOrder: (data: CreateOrderData) => 
    api.post<ApiResponse<Order>>('/orders', data),

  cancelOrder: (orderId: number) => 
    api.put<ApiResponse<Order>>(`/orders/${orderId}/cancel`),

  getOrderTracking: (orderId: number) => 
    api.get<ApiResponse<OrderTracking>>(`/orders/${orderId}/tracking`),

  getOrderInvoice: (orderId: number) => 
    api.get<ApiResponse<{ invoice_url: string }>>(`/orders/${orderId}/invoice`),
};

export default orderService;

