import { api } from '../client';
import { ApiResponse } from '@/types';

export interface PageContent {
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  updated_at: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  working_hours?: string;
  map_url?: string;
  social_links?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const pageService = {
  getAbout: () => 
    api.get<ApiResponse<PageContent>>('/pages/about'),

  getContact: () => 
    api.get<ApiResponse<PageContent & { contact_info?: ContactInfo }>>('/pages/contact'),

  getFAQ: () => 
    api.get<ApiResponse<PageContent & { faqs?: FAQItem[] }>>('/pages/faq'),

  getTerms: () => 
    api.get<ApiResponse<PageContent>>('/pages/terms'),

  getPrivacy: () => 
    api.get<ApiResponse<PageContent>>('/pages/privacy'),

  getShipping: () => 
    api.get<ApiResponse<PageContent>>('/pages/shipping'),

  getReturns: () => 
    api.get<ApiResponse<PageContent>>('/pages/returns'),
};

export default pageService;

