import { api } from '../client';
import { ApiResponse, PaginatedResponse } from '@/types';

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read_at?: string;
  created_at: string;
}

export interface NotificationList {
  notifications: Notification[];
  unread_count: number;
}

export const notificationService = {
  getNotifications: (params?: { page?: number; per_page?: number }) => 
    api.get<ApiResponse<PaginatedResponse<Notification>>>('/notifications', { params }),

  getUnreadNotifications: () => 
    api.get<ApiResponse<NotificationList>>('/notifications/unread'),

  markAsRead: (notificationId: number) => 
    api.put<ApiResponse<Notification>>(`/notifications/${notificationId}/read`),

  markAllAsRead: () => 
    api.put<ApiResponse<null>>('/notifications/read-all'),

  deleteNotification: (notificationId: number) => 
    api.delete<ApiResponse<null>>(`/notifications/${notificationId}`),
};

export default notificationService;

