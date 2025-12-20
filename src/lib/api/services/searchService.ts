import { api } from '../client';
import { ApiResponse, PaginatedResponse, Product } from '@/types';

export interface SearchResult {
  products: Product[];
  blogs: {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    image?: string;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  brands: {
    id: number;
    name: string;
    slug: string;
  }[];
}

export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand' | 'blog';
  id: number;
  name: string;
  slug: string;
  image?: string;
}

export const searchService = {
  search: (query: string, params?: { type?: string; page?: number; per_page?: number }) => 
    api.get<ApiResponse<SearchResult>>('/search', { params: { q: query, ...params } }),

  searchProducts: (query: string, params?: { category?: string; brand?: string; page?: number; per_page?: number; sort?: string }) => 
    api.get<ApiResponse<PaginatedResponse<Product>>>('/search/products', { params: { q: query, ...params } }),

  searchBlog: (query: string, params?: { category?: string; page?: number; per_page?: number }) => 
    api.get<ApiResponse<PaginatedResponse<unknown>>>('/search/blog', { params: { q: query, ...params } }),

  getSuggestions: (query: string, limit?: number) => 
    api.get<ApiResponse<SearchSuggestion[]>>('/search/suggestions', { params: { q: query, limit } }),
};

export default searchService;

