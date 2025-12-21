/**
 * Utility functions for Product Card
 */

export const getImageUrl = (imageUrl?: string | null): string => {
  if (!imageUrl) return '/placeholder-product.jpg';
  
  // If image is a relative path, prepend API base URL
  if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    return `${apiBaseUrl}/${imageUrl}`;
  }
  
  return imageUrl;
};

export const shouldUnoptimize = (imageUrl: string): boolean => {
  return imageUrl.startsWith('http://');
};

export const calculateDiscount = (price: number, discountPrice?: number): number => {
  if (!discountPrice || discountPrice >= price) return 0;
  return Math.round((1 - discountPrice / price) * 100);
};

export interface ProductCardData {
  id: number;
  name: string;
  slug: string;
  price: number;
  discount_price?: number;
  image?: string | null;
  rating?: number;
  reviews_count?: number;
}

