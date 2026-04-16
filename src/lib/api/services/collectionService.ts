import { api } from '../client';
import { ApiResponse, Collection, PaginatedResponse, Product, ProductQueryParams } from '@/types';

export const collectionService = {
  getCollections: () => 
    api.get<ApiResponse<Collection[]>>('/collections'),

  getCollection: (slug: string) => 
    api.get<ApiResponse<Collection>>(`/collections/${slug}`),

  getCollectionProducts: (slug: string, params?: ProductQueryParams) => 
    api.get<ApiResponse<PaginatedResponse<Product>>>(`/collections/${slug}/products`, { params }),
};

export default collectionService;

