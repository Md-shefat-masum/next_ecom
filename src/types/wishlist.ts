import { Product } from './product';

export interface WishlistItem {
  id: number;
  product_id: number;
  variant_id?: number;
  product: Product;
  added_at: string;
}

export interface Wishlist {
  items: WishlistItem[];
  total_items: number;
}

