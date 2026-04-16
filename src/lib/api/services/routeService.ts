import { api } from '../client';
import { ApiResponse } from '@/types';

export type RouteDataType = 
  | 'product' 
  | 'category_products' 
  | 'subcategory_products'
  | 'brand_products'
  | 'collection_products'
  | 'blog_post'
  | 'blog_category'
  | 'page';

export interface RouteData {
  data_type: RouteDataType;
  data: unknown;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
  };
}

export const routeService = {
  resolveRoute: (slug: string) => 
    api.get<ApiResponse<RouteData>>(`/route/resolve/${slug}`),
};

export default routeService;

