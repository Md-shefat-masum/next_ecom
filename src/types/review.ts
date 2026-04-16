export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  review: string;
  status: 'pending' | 'approved' | 'rejected';
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

export interface ReportReviewData {
  reason: string;
  description?: string;
}

