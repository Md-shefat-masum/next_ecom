import type { ProductCardData } from '../components/utils';

/** API-shaped product fields used by ProductCard V2 */
export type ProductCardV2Product = Omit<ProductCardData, 'rating'> & {
  rating?: number | string;
  full_image_url?: string | null;
  short_description?: string | null;
  discount_parcent?: number;
  cash_price?: string | number | null;
  brand?: { name: string } | null;
  category?: { name: string } | null;
  chest?: number | string | null;
  length?: number | string | null;
  waist?: number | string | null;
  sleeve?: number | string | null;
  /** ISO end time for limited discount / offer countdown */
  offer_end_time?: string | null;
};
