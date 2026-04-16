export interface TrackEventData {
  event_type: EventType;
  event_data?: Record<string, unknown>;
  page_url?: string;
  referrer?: string;
}

export interface PageViewData {
  page_url: string;
  page_title?: string;
  referrer?: string;
}

export interface CustomEventData {
  event_name: string;
  event_category?: string;
  event_label?: string;
  event_value?: number;
  custom_data?: Record<string, unknown>;
}

export type EventType = 
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'add_to_wishlist'
  | 'remove_from_wishlist'
  | 'begin_checkout'
  | 'purchase'
  | 'search'
  | 'login'
  | 'register'
  | 'share';

