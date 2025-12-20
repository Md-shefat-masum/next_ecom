export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read_at?: string;
  created_at: string;
}

export type NotificationType = 
  | 'order_placed'
  | 'order_shipped'
  | 'order_delivered'
  | 'order_cancelled'
  | 'review_approved'
  | 'review_rejected'
  | 'price_drop'
  | 'back_in_stock'
  | 'promotion'
  | 'system';

export interface NotificationList {
  notifications: Notification[];
  unread_count: number;
}

