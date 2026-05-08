import type { ProductCardData } from '../components/utils';

/** API-shaped product fields used by the futuristic HUD product card. */
export type ProductCardV3Product = Omit<ProductCardData, 'rating'> & {
  rating?: number | string | null;
  average_rating?: number | string | null;
  full_image_url?: string | null;
  full_multiple_images_url?: string[] | string | null;
  thumbnail_img?: string | null;
  short_description?: string | null;
  discount?: number | string | null;
  discount_type?: string | null;
  discount_price?: number;
  discount_parcent?: number;
  discount_percent?: number;
  wholesale_price?: number | string | null;
  retail_price?: number | string | null;
  mrp_price?: number | string | null;
  cash_price?: string | number | null;
  brand?: { name?: string | null; slug?: string | null } | null;
  category?: { name?: string | null; slug?: string | null } | null;
  stock?: number | null;
  availability_status?: string | null;
  offer_end_time?: string | null;
};

