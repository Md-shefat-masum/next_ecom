import { api } from '../client';
import { ApiResponse, Category, CategorySubcategoryBrandCategory } from '@/types';

export const categoryService = {
  getAllCategories: () => 
    api.get<ApiResponse<Category[]>>('/categories/all-categories'),

  getCategories: () => 
    api.get<ApiResponse<Category[]>>('/categories'),

  getCategory: (slug: string) => 
    api.get<ApiResponse<Category>>(`/categories/${slug}`),

  getCategoryProducts: (slug: string, params?: Record<string, unknown>) => 
    api.get<ApiResponse<unknown>>(`/categories/${slug}/products`, { params }),

  getSubcategories: (categorySlug: string) => 
    api.get<ApiResponse<Category[]>>(`/categories/category/${categorySlug}/subcategories`),

  getChildcategories: (categorySlug: string) => 
    api.get<ApiResponse<Category[]>>(`/categories/category/${categorySlug}/childcategories`),

  getSubcategoryChildcategories: (categorySlug: string, subcategorySlug: string) => 
    api.get<ApiResponse<Category[]>>(`/categories/category/${categorySlug}/subcategory/${subcategorySlug}/childcategories`),

  getCategoryBrands: (categorySlug: string) => 
    api.get<ApiResponse<unknown[]>>(`/categories/category/${categorySlug}/brands`),

  getSubcategoryBrands: (categorySlug: string, subcategorySlug: string) => 
    api.get<ApiResponse<unknown[]>>(`/categories/category/${categorySlug}/subcategory/${subcategorySlug}/brands`),

  getCategorySubcategoryBrands: () =>
    api.get<ApiResponse<CategorySubcategoryBrandCategory[]>>('/category-subcategory-brands'),

  getFeaturedCategories: () =>
    api.get<ApiResponse<Category[]>>('/categories/featured-categories'),
};

export default categoryService;

