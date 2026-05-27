import { API_ENDPOINTS } from "@/config";
import { baseApi } from "./baseApi";

function parseProductsPayload(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  if (data.products) return parseProductsPayload(data.products);

  return [];
}

export const featuredCategoryProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedCategories: builder.query({
      query: () => API_ENDPOINTS.CATEGORIES.FEATURED,
      transformResponse: (response) => (Array.isArray(response?.data) ? response.data : []),
      providesTags: ["Categories"],
    }),
    getCategoryProductsById: builder.query({
      query: (categoryId) => API_ENDPOINTS.PRODUCTS.CATEGORY_PRODUCTS(categoryId),
      transformResponse: (response) => parseProductsPayload(response?.data),
      providesTags: ["Products"],
    }),
    getSubcategoryProductsById: builder.query({
      query: (subcategoryId) => API_ENDPOINTS.PRODUCTS.SUBCATEGORY_PRODUCTS(subcategoryId),
      transformResponse: (response) => parseProductsPayload(response?.data),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetFeaturedCategoriesQuery,
  useLazyGetCategoryProductsByIdQuery,
  useLazyGetSubcategoryProductsByIdQuery,
} = featuredCategoryProductsApi;
