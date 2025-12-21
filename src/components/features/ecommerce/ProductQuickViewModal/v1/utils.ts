/**
 * Utility functions for Product Quick View Modal
 */

export const getImageUrl = (imageUrl?: string | null): string => {
  if (!imageUrl) return '/placeholder-product.jpg';
  if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    return `${apiBaseUrl}/${imageUrl}`;
  }
  return imageUrl;
};

export const shouldUnoptimize = (imageUrl: string): boolean => {
  return imageUrl.startsWith('http://');
};

export interface ProductWithExtras {
  id?: number;
  name?: string;
  slug?: string;
  image?: string;
  full_image_url?: string;
  images?: string[];
  price?: number;
  stock?: number;
  short_description?: string;
  pricing?: {
    final_price?: number;
    discount_price?: number;
  };
}

export const extractProductImages = (product: ProductWithExtras | undefined): string[] => {
  if (!product) return [];
  
  return [
    ...(product.full_image_url ? [product.full_image_url] : []),
    ...(product.image ? [product.image] : []),
    ...(product.images ? product.images : []),
  ].filter((img): img is string => Boolean(img));
};

export const getProductPrice = (product: ProductWithExtras | undefined): number => {
  if (!product) return 0;
  const pricing = product.pricing || {};
  return pricing.final_price || product.price || 0;
};

export const getAvailableStock = (product: ProductWithExtras | undefined): number => {
  if (!product) return 0;
  const stock = product.stock || 0;
  return stock > 0 ? stock : 0;
};

