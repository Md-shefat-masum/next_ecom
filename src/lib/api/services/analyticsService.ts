import { api } from '../client';
import { ApiResponse } from '@/types';

export interface TrackEventData {
  event_type: string;
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

export const analyticsService = {
  track: (data: TrackEventData) => 
    api.post<ApiResponse<null>>('/analytics/track', data),

  pageView: (data: PageViewData) => 
    api.post<ApiResponse<null>>('/analytics/page-view', data),

  event: (data: CustomEventData) => 
    api.post<ApiResponse<null>>('/analytics/event', data),
};

export default analyticsService;

