import { api } from '../client';
import { ApiResponse, PaginatedResponse, Product, ProductFilters, ProductQueryParams } from '@/types';

export const productService = {
  getProducts: (params?: ProductQueryParams) => 
    api.get<ApiResponse<PaginatedResponse<Product>>>('/products', { params }),

  getProduct: (slug: string) => 
    api.get<ApiResponse<Product>>(`/products/${slug}`),

  getCategoryProducts: (categorySlug: string, params?: ProductQueryParams) => 
    api.get<ApiResponse<PaginatedResponse<Product>>>(`/products/category/${categorySlug}`, { params }),

  getSubcategoryProducts: (subcategorySlug: string, params?: ProductQueryParams) => 
    api.get<ApiResponse<PaginatedResponse<Product>>>(`/products/subcategory/${subcategorySlug}`, { params }),

  getBrandProducts: (brandSlug: string, params?: ProductQueryParams) => 
    api.get<ApiResponse<PaginatedResponse<Product>>>(`/products/brand/${brandSlug}`, { params }),

  getCollectionProducts: (collectionSlug: string, params?: ProductQueryParams) => 
    api.get<ApiResponse<PaginatedResponse<Product>>>(`/products/collection/${collectionSlug}`, { params }),

  searchProducts: (query: string, params?: ProductQueryParams) => 
    api.get<ApiResponse<PaginatedResponse<Product>>>('/products/search', { params: { q: query, ...params } }),

  getFilters: (params?: { category?: string; brand?: string }) => 
    api.get<ApiResponse<ProductFilters>>('/products/filters', { params }),

  getRelatedProducts: (slug: string, type: 'similar' | 'recommended' | 'addons' = 'similar') => 
    api.get<ApiResponse<Product[]>>(`/products/${slug}/related/${type}`),

  getBannerProducts: () => 
    api.get<ApiResponse<Product[][][]>>('/products/banner-products'),
};

export default productService;

