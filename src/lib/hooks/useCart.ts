'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCart, addItem, updateItem, removeItem, clearCart } from '@/store/slices/cartSlice';
import { cartService } from '@/lib/api/services';
import { useState } from 'react';

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await cartService.getCart();
      if (response.data.success) {
        dispatch(setCart(response.data.data));
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1, variantId?: number) => {
    setIsLoading(true);
    try {
      const response = await cartService.addToCart({ product_id: productId, quantity, variant_id: variantId });
      if (response.data.success) {
        dispatch(setCart(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (itemId: number, quantity: number) => {
    setIsLoading(true);
    try {
      const response = await cartService.updateCartItem(itemId, { quantity });
      if (response.data.success) {
        dispatch(setCart(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    setIsLoading(true);
    try {
      const response = await cartService.removeFromCart(itemId);
      if (response.data.success) {
        dispatch(setCart(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const emptyCart = async () => {
    setIsLoading(true);
    try {
      const response = await cartService.clearCart();
      if (response.data.success) {
        dispatch(clearCart());
      }
      return response.data;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...cart,
    isLoading,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    emptyCart,
  };
}

export default useCart;

