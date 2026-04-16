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

/** Which id-based products API to use (from route resolve + nav). */
export type ProductsListContext = 'category' | 'subcategory' | 'brand';

/** Payload for category / subcategory / brand product listing pages. */
export interface CategoryProductsRoutePayload {
  name?: string;
  description?: string | null;
  /** Path that was resolved (e.g. electronics/laptops). */
  path?: string;
  products_list_context?: ProductsListContext;
  /** When set, server fetches GET …/get-*-products/{entity_id} */
  entity_id?: number | null;
  products?: unknown[];
}

export interface RouteData {
  data_type: RouteDataType;
  data: unknown;
  metadata?: RouteMetadata;
  slug?: string;
  original_url?: string;
}

/** Origin of listing nav (main menu); echoed from resolve-path when `nav_type` query is sent. */
export type NavMenuType =
  | 'category'
  | 'subcategory'
  | 'category_subcategory_brand';

export interface RouteMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical_url?: string;
  og_type?: string;
  nav_type?: NavMenuType | string;
}

