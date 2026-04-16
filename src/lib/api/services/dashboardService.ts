import { api } from '../client';
import { ApiResponse, Product } from '@/types';
import { Order } from './orderService';

export interface DashboardStats {
  total_orders: number;
  total_spent: number;
  pending_orders: number;
  wishlist_count: number;
  reviews_count: number;
}

export interface DashboardData {
  user: {
    id: number;
    name: string;
    email: string;
    image?: string;
  };
  stats: DashboardStats;
  recent_orders: Order[];
  recommendations: Product[];
}

export const dashboardService = {
  getDashboard: () => 
    api.get<ApiResponse<DashboardData>>('/dashboard'),

  getStats: () => 
    api.get<ApiResponse<DashboardStats>>('/dashboard/stats'),

  getRecentOrders: (limit?: number) => 
    api.get<ApiResponse<Order[]>>('/dashboard/recent-orders', { params: { limit } }),

  getRecommendations: (limit?: number) => 
    api.get<ApiResponse<Product[]>>('/dashboard/recommendations', { params: { limit } }),
};

export default dashboardService;

