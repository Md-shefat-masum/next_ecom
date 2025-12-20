import { api } from '../client';
import { ApiResponse, Cart, AddToCartRequest, UpdateCartRequest, ApplyCouponRequest } from '@/types';

export const cartService = {
  getCart: () => 
    api.get<ApiResponse<Cart>>('/cart'),

  addToCart: (data: AddToCartRequest) => 
    api.post<ApiResponse<Cart>>('/cart', data),

  updateCartItem: (itemId: number, data: UpdateCartRequest) => 
    api.put<ApiResponse<Cart>>(`/cart/${itemId}`, data),

  removeCartItem: (itemId: number) => 
    api.delete<ApiResponse<Cart>>(`/cart/${itemId}`),

  clearCart: () => 
    api.delete<ApiResponse<null>>('/cart'),

  applyCoupon: (data: ApplyCouponRequest) => 
    api.post<ApiResponse<Cart>>('/cart/apply-coupon', data),

  removeCoupon: () => 
    api.delete<ApiResponse<Cart>>('/cart/remove-coupon'),
};

export default cartService;

