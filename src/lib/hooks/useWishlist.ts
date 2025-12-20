'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setWishlist, addItem, removeItem, clearWishlist } from '@/store/slices/wishlistSlice';
import { wishlistService } from '@/lib/api/services';
import { useState } from 'react';

export function useWishlist() {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWishlist = async () => {
    setIsLoading(true);
    try {
      const response = await wishlistService.getWishlist();
      if (response.data.success) {
        dispatch(setWishlist(response.data.data));
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: number) => {
    setIsLoading(true);
    try {
      const response = await wishlistService.addProduct(productId);
      if (response.data.success) {
        dispatch(setWishlist(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    setIsLoading(true);
    try {
      const response = await wishlistService.removeProduct(productId);
      if (response.data.success) {
        dispatch(setWishlist(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const emptyWishlist = async () => {
    setIsLoading(true);
    try {
      await wishlistService.clearWishlist();
      dispatch(clearWishlist());
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.items.some(item => item.product_id === productId);
  };

  return {
    ...wishlist,
    isLoading,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    emptyWishlist,
    isInWishlist,
  };
}

export default useWishlist;

