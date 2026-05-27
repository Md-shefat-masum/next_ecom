import { baseApi } from "./baseApi";
import { API_ENDPOINTS } from "@/config";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductBySlug: builder.query({
      query: (slug) => API_ENDPOINTS.PRODUCTS.DETAIL(slug),
      transformResponse: (response) => {
        if (response?.data) return response;
        return { success: true, data: response };
      },
      providesTags: (_result, _error, slug) => [{ type: "Products", id: slug }],
    }),
  }),
});

export const { useGetProductBySlugQuery } = productsApi;
