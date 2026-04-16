export interface Product {
  id: number;
  name: string;
  slug: string;
  image?: string;
  images?: string[];
  price: number;
  discount_price?: number;
  short_description?: string;
  description?: string;
  stock: number;
  has_variant: boolean;
  category?: Category;
  subcategory?: Category;
  brand?: Brand;
  variants?: ProductVariant[];
  reviews_count?: number;
  average_rating?: number;
  is_featured?: boolean;
  is_new?: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  sku?: string;
  price: number;
  discount_price?: number;
  stock: number;
  attributes?: Record<string, string>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parent_id?: number;
  children?: Category[];
  products_count?: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  banner?: string;
  description?: string;
  featured?: boolean;
  products_count?: number;
}

export interface Collection {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  products_count?: number;
}

export interface ProductFilters {
  categories?: { id: number; name: string; slug: string; count: number }[];
  brands?: { id: number; name: string; slug: string; count: number }[];
  price_range?: { min: number; max: number };
  attributes?: Record<string, string[]>;
}

export interface ProductQueryParams {
  page?: number;
  per_page?: number;
  category?: string;
  subcategory?: string;
  brand?: string;
  collection?: string;
  min_price?: number;
  max_price?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  featured?: boolean;
}

