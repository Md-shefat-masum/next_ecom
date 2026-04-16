import { useQuery } from '@tanstack/react-query';
import { productService } from '@/lib/api/services';
import { ProductQueryParams } from '@/types';

export const useProducts = (params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
  });
};

export const useProduct = (slug: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProduct(slug),
    enabled: options?.enabled !== undefined ? options.enabled : !!slug,
  });
};

export const useProductFilters = () => {
  return useQuery({
    queryKey: ['product-filters'],
    queryFn: () => productService.getFilters(),
  });
};

