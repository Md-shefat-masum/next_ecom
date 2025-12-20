import { useQuery } from '@tanstack/react-query';
import { productService } from '@/lib/api/services';

export const useProducts = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProduct(slug),
    enabled: !!slug,
  });
};

export const useProductReviews = (slug: string) => {
  return useQuery({
    queryKey: ['product-reviews', slug],
    queryFn: () => productService.getProductReviews(slug),
    enabled: !!slug,
  });
};

export const useProductFilters = () => {
  return useQuery({
    queryKey: ['product-filters'],
    queryFn: () => productService.getFilters(),
  });
};

