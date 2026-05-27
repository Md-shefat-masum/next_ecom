import { API_ENDPOINTS } from "@/config";
import { baseApi } from "./baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => API_ENDPOINTS.CATEGORIES.LIST,
      transformResponse: (response) => response?.data || [],
      providesTags: ["Categories"],
    }),
    getCategoryBySlug: builder.query({
      query: (slug) => API_ENDPOINTS.CATEGORIES.DETAIL(slug),
      transformResponse: (response) => response?.data || null,
      providesTags: (_result, _error, slug) => [{ type: "Categories", id: slug }],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryBySlugQuery } = categoriesApi;

