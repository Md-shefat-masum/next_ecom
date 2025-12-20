import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/lib/api/services';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategory(slug),
    enabled: !!slug,
  });
};

export const useCategoryProducts = (slug: string, params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['category-products', slug, params],
    queryFn: () => categoryService.getCategoryProducts(slug, params),
    enabled: !!slug,
  });
};

