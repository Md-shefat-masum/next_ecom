import { api } from '../client';
import { ApiResponse, Brand, PaginatedResponse, Product, ProductQueryParams } from '@/types';

export const brandService = {
  getBrands: (params?: { featured?: boolean }) => 
    api.get<ApiResponse<Brand[]>>('/brands', { params }),

  getBrand: (slug: string) => 
    api.get<ApiResponse<Brand>>(`/brands/${slug}`),

  getBrandProducts: (slug: string, params?: ProductQueryParams) => 
    api.get<ApiResponse<PaginatedResponse<Product>>>(`/brands/${slug}/products`, { params }),
};

export default brandService;

