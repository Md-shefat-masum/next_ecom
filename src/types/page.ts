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
    youtube?: string;
  };
}

export interface ContactPage extends PageContent {
  contact_info?: ContactInfo;
}

export interface FAQPage extends PageContent {
  faqs?: FAQItem[];
}

