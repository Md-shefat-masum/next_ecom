export type RouteDataType = 
  | 'product' 
  | 'category_products' 
  | 'subcategory_products'
  | 'childcategory_products'
  | 'brand_products'
  | 'collection_products'
  | 'blog_post'
  | 'blog_category'
  | 'blog_tag'
  | 'page';

export interface RouteData {
  data_type: RouteDataType;
  data: unknown;
  metadata?: RouteMetadata;
}

export interface RouteMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical_url?: string;
  og_type?: string;
}

