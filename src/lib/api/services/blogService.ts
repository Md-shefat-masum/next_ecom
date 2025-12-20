import { api } from '../client';
import { ApiResponse, PaginatedResponse } from '@/types';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  category?: BlogCategory;
  tags?: BlogTag[];
  author?: {
    id: number;
    name: string;
    image?: string;
  };
  views_count?: number;
  comments_count?: number;
  published_at: string;
  created_at: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  posts_count?: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  posts_count?: number;
}

export interface BlogArchive {
  year: number;
  month: number;
  month_name: string;
  posts_count: number;
}

export const blogService = {
  // Posts
  getPosts: (params?: { page?: number; per_page?: number; category?: string; tag?: string }) => 
    api.get<ApiResponse<PaginatedResponse<BlogPost>>>('/blog', { params }),

  getPost: (slug: string) => 
    api.get<ApiResponse<BlogPost>>(`/blog/${slug}`),

  getCategoryPosts: (categorySlug: string, params?: { page?: number; per_page?: number }) => 
    api.get<ApiResponse<PaginatedResponse<BlogPost>>>(`/blog/category/${categorySlug}`, { params }),

  getTagPosts: (tagSlug: string, params?: { page?: number; per_page?: number }) => 
    api.get<ApiResponse<PaginatedResponse<BlogPost>>>(`/blog/tag/${tagSlug}`, { params }),

  getAuthorPosts: (authorSlug: string, params?: { page?: number; per_page?: number }) => 
    api.get<ApiResponse<PaginatedResponse<BlogPost>>>(`/blog/author/${authorSlug}`, { params }),

  searchPosts: (query: string, params?: { page?: number; per_page?: number }) => 
    api.get<ApiResponse<PaginatedResponse<BlogPost>>>('/blog/search', { params: { q: query, ...params } }),

  getArchive: () => 
    api.get<ApiResponse<BlogArchive[]>>('/blog/archive'),

  // Categories
  getCategories: () => 
    api.get<ApiResponse<BlogCategory[]>>('/blog/categories'),

  getCategory: (slug: string) => 
    api.get<ApiResponse<BlogCategory>>(`/blog/categories/${slug}`),

  // Tags
  getTags: () => 
    api.get<ApiResponse<BlogTag[]>>('/blog/tags'),

  getTag: (slug: string) => 
    api.get<ApiResponse<BlogTag>>(`/blog/tags/${slug}`),
};

export default blogService;

