import { api } from '../client';
import { ApiResponse, Product } from '@/types';

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

export const wishlistService = {
  getWishlist: () => 
    api.get<ApiResponse<Wishlist>>('/wishlist'),

  addToWishlist: (data: { product_id: number; variant_id?: number }) => 
    api.post<ApiResponse<Wishlist>>('/wishlist', data),

  addProduct: (productId: number) => 
    api.post<ApiResponse<Wishlist>>(`/wishlist/${productId}`),

  removeProduct: (productId: number) => 
    api.delete<ApiResponse<Wishlist>>(`/wishlist/${productId}`),

  clearWishlist: () => 
    api.delete<ApiResponse<null>>('/wishlist'),
};

export default wishlistService;

