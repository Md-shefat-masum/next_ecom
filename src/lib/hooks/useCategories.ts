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

export const useCategoryProducts = (
  slug: string,
  params?: Record<string, any>,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['category-products', slug, params],
    queryFn: () => categoryService.getCategoryProducts(slug, params),
    enabled: options?.enabled !== undefined ? options.enabled : !!slug,
  });
};

export const useCategorySubcategoryBrands = () => {
  return useQuery({
    queryKey: ['category-subcategory-brands'],
    queryFn: async () => {
      const response = await categoryService.getCategorySubcategoryBrands();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useFeaturedCategories = () => {
  return useQuery({
    queryKey: ['featured-categories'],
    queryFn: async () => {
      const response = await categoryService.getFeaturedCategories();
      return response.data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

