import { baseApi } from "./baseApi";
import { API_ENDPOINTS } from "@/config";

function buildQueryParams(params = {}) {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== "") {
          queryParams.append(key, String(item));
        }
      });
      return;
    }
    queryParams.set(key, String(value));
  });

  return queryParams.toString();
}

function parsePaginatedProducts(response) {
  const payload = response?.data ?? response ?? {};
  const paginator = payload.products ?? payload;
  const items = Array.isArray(paginator)
    ? paginator
    : Array.isArray(paginator.data)
      ? paginator.data
      : Array.isArray(paginator.items)
        ? paginator.items
        : [];

  return {
    items,
    pagination: {
      currentPage: Number(paginator.current_page ?? paginator.page ?? 1),
      lastPage: Number(paginator.last_page ?? paginator.total_pages ?? 1),
      perPage: Number(paginator.per_page ?? paginator.perPage ?? items.length),
      total: Number(paginator.total ?? items.length),
      from: paginator.from ?? (items.length ? 1 : 0),
      to: paginator.to ?? items.length,
      links: Array.isArray(paginator.links) ? paginator.links : [],
    },
  };
}

function parseFilterOptions(response) {
  const payload = response?.data ?? response ?? {};

  return {
    priceRange: payload.price_range || payload.price || { min: 0, max: 0 },
    categories: Array.isArray(payload.categories) ? payload.categories : [],
    brands: Array.isArray(payload.brands) ? payload.brands : [],
    flags: Array.isArray(payload.flags) ? payload.flags : [],
    variants: payload.variants && typeof payload.variants === "object" ? payload.variants : {},
  };
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params = {}) => {
        const queryString = buildQueryParams(params);
        return `${API_ENDPOINTS.PRODUCTS.LIST}${queryString ? `?${queryString}` : ""}`;
      },
      transformResponse: parsePaginatedProducts,
      providesTags: ["Products"],
    }),
    getProductFilters: builder.query({
      query: (params = {}) => {
        const queryString = buildQueryParams(params);
        return `${API_ENDPOINTS.PRODUCTS.FILTERS}${queryString ? `?${queryString}` : ""}`;
      },
      transformResponse: parseFilterOptions,
      providesTags: ["Products"],
    }),
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

export const { useGetProductsQuery, useGetProductFiltersQuery, useGetProductBySlugQuery } = productsApi;
