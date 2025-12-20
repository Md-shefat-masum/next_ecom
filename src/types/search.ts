import { Product } from './product';
import { BlogPost } from './blog';
import { Category } from './category';
import { Brand } from './brand';

export interface SearchResult {
  products: Product[];
  blogs: BlogPost[];
  categories: Category[];
  brands: Brand[];
}

export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand' | 'blog';
  id: number;
  name: string;
  slug: string;
  image?: string;
}

export interface SearchFilters {
  query: string;
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  sort?: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'popular';
  page?: number;
  per_page?: number;
}

