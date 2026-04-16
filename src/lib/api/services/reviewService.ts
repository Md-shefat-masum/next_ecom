import { api } from '../client';
import { ApiResponse, PaginatedResponse } from '@/types';

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  review: string;
  status: string;
  helpful_count?: number;
  not_helpful_count?: number;
  user_vote?: 'helpful' | 'not_helpful' | null;
  user?: {
    id: number;
    name: string;
    image?: string;
  };
  product?: {
    id: number;
    name: string;
    slug: string;
    image?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateReviewData {
  product_id?: number;
  product_slug?: string;
  rating: number;
  review: string;
}

export interface UpdateReviewData {
  rating?: number;
  review?: string;
}

export const reviewService = {
  // Public
  getAllReviews: (params?: { page?: number; per_page?: number; rating?: number }) => 
    api.get<ApiResponse<PaginatedResponse<Review>>>('/reviews', { params }),

  getProductReviews: (productSlug: string, params?: { page?: number; per_page?: number }) => 
    api.get<ApiResponse<PaginatedResponse<Review>>>(`/reviews/product/${productSlug}`, { params }),

  getReview: (reviewId: number) => 
    api.get<ApiResponse<Review>>(`/reviews/${reviewId}`),

  // Private - Create/Update/Delete
  createReview: (data: CreateReviewData) => 
    api.post<ApiResponse<Review>>('/reviews', data),

  createProductReview: (productSlug: string, data: { rating: number; review: string }) => 
    api.post<ApiResponse<Review>>(`/products/${productSlug}/reviews`, data),

  updateReview: (reviewId: number, data: UpdateReviewData) => 
    api.put<ApiResponse<Review>>(`/reviews/${reviewId}`, data),

  deleteReview: (reviewId: number) => 
    api.delete<ApiResponse<null>>(`/reviews/${reviewId}`),

  // Helpful/Report
  markHelpful: (reviewId: number, isHelpful: boolean) => 
    api.post<ApiResponse<{ helpful_count: number; not_helpful_count: number }>>(`/reviews/${reviewId}/helpful`, { is_helpful: isHelpful }),

  reportReview: (reviewId: number, data: { reason: string; description?: string }) => 
    api.post<ApiResponse<null>>(`/reviews/${reviewId}/report`, data),

  // My Reviews
  getMyReviews: (params?: { page?: number; per_page?: number }) => 
    api.get<ApiResponse<PaginatedResponse<Review>>>('/account/reviews', { params }),

  getMyPendingReviews: () => 
    api.get<ApiResponse<Review[]>>('/account/reviews/pending'),

  getMyApprovedReviews: () => 
    api.get<ApiResponse<Review[]>>('/account/reviews/approved'),

  getMyReview: (reviewId: number) => 
    api.get<ApiResponse<Review>>(`/account/reviews/${reviewId}`),

  updateMyReview: (reviewId: number, data: UpdateReviewData) => 
    api.put<ApiResponse<Review>>(`/account/reviews/${reviewId}`, data),

  deleteMyReview: (reviewId: number) => 
    api.delete<ApiResponse<null>>(`/account/reviews/${reviewId}`),
};

export default reviewService;

