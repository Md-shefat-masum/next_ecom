import { API_ENDPOINTS } from "@/config";
import { baseApi } from "./baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => API_ENDPOINTS.CATEGORIES.LIST,
      transformResponse: (response) => response?.data || [],
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;

