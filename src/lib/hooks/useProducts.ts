import { useQuery } from '@tanstack/react-query';
import { productService } from '@/lib/api/services';
import { ProductQueryParams } from '@/types';

export const useProducts = (params?: ProductQueryParams) => {
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

export const useProductFilters = () => {
  return useQuery({
    queryKey: ['product-filters'],
    queryFn: () => productService.getFilters(),
  });
};

export const useBannerProducts = () => {
  return useQuery({
    queryKey: ['banner-products'],
    queryFn: async () => {
      const response = await productService.getBannerProducts();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

