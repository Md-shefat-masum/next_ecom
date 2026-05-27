"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCardV1 } from "@/components/product-card/v1";
import {
  useGetCategoriesQuery,
  useGetCategoryBySlugQuery,
  useGetProductFiltersQuery,
  useGetProductsQuery,
} from "@/store/api";
import { productListHref } from "@/lib/products/productListHref";
import "./ProductsPageClient.css";

const sortOptions = [
  { label: "Default", value: "" },
  { label: "Price: Low to High", value: "price_low_to_high" },
  { label: "Price: High to Low", value: "price_high_to_low" },
];

const stockOptions = [
  { label: "All", value: "" },
  { label: "In stock", value: "in_stock" },
  { label: "Pre stock", value: "pre_stock" },
  { label: "Upcoming", value: "upcoming" },
];

const emptyRouteSlugs = {};

function getParamObject(searchParams) {
  return Object.fromEntries(searchParams.entries());
}

function getRepeatedParams(searchParams, key) {
  const repeatedValues = searchParams.getAll(key);
  if (repeatedValues.length > 0) return repeatedValues;

  const commaValue = searchParams.get(key);
  return commaValue ? commaValue.split(",").filter(Boolean) : [];
}

function findRouteContext(categories, routeSlugs = {}, categoryDetail = null) {
  const { categorySlug, subcategorySlug, childCategorySlug } = routeSlugs;

  if (!categorySlug) {
    return {
      ready: true,
      type: "all",
      title: "Products",
      description: null,
      fullDescription: null,
      pills: categories.map((category) => ({
        id: category.id,
        label: category.name,
        href: productListHref(category, "category"),
      })),
    };
  }

  if (categories.length === 0) return { ready: false };

  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) return { ready: true, notFound: true, title: "Category not found" };

  const detailedCategory = categoryDetail?.slug === category.slug ? { ...category, ...categoryDetail } : category;
  const subcategories = detailedCategory.subcategories || category.subcategories || [];

  if (!subcategorySlug) {
    return {
      ready: true,
      type: "category",
      category: detailedCategory,
      title: detailedCategory.seo_name || detailedCategory.name,
      description: detailedCategory.short_description,
      fullDescription: detailedCategory.description,
      filters: { category_id: detailedCategory.id },
      pills: subcategories.map((subcategory) => ({
        id: subcategory.id,
        label: subcategory.name,
        href: productListHref(subcategory, "subcategory", { category: detailedCategory }),
      })),
    };
  }

  const subcategory = subcategories.find((item) => item.slug === subcategorySlug);
  if (!subcategory) return { ready: true, notFound: true, title: "Subcategory not found" };

  const childCategories = subcategory.child_categories || [];

  if (!childCategorySlug) {
    return {
      ready: true,
      type: "subcategory",
      category: detailedCategory,
      subcategory,
      title: subcategory.seo_name || subcategory.name,
      description: subcategory.short_description,
      fullDescription: subcategory.description,
      filters: { category_id: detailedCategory.id, subcategory_id: subcategory.id },
      pills: childCategories
        .filter((childCategory) => !childCategory.brand_id)
        .map((childCategory) => ({
          id: childCategory.id,
          label: childCategory.name,
          href: productListHref(childCategory, "child", { category: detailedCategory, subcategory }),
        })),
    };
  }

  const childCategory = childCategories.find((item) => item.slug === childCategorySlug && !item.brand_id);
  if (!childCategory) return { ready: true, notFound: true, title: "Child category not found" };

  return {
    ready: true,
    type: "child",
    category: detailedCategory,
    subcategory,
    childCategory,
    title: childCategory.seo_name || childCategory.name,
    description: childCategory.short_description,
    fullDescription: childCategory.description,
    filters: {
      category_id: detailedCategory.id,
      subcategory_id: subcategory.id,
      childcategory_id: childCategory.id,
    },
    pills: [],
  };
}

function buildProductApiParams(searchParams, routeContext) {
  const params = getParamObject(searchParams);
  const limit = params.limit || params.per_page || 40;
  const apiParams = {
    page: params.page || 1,
    limit,
    per_page: limit,
    q: params.q || params.search,
    category_id: routeContext?.filters?.category_id || params.category_id,
    subcategory_id: routeContext?.filters?.subcategory_id || params.subcategory_id,
    childcategory_id: routeContext?.filters?.childcategory_id || params.childcategory_id,
    brand_id: params.brand_id,
    brands: getRepeatedParams(searchParams, "brands"),
    variants: getRepeatedParams(searchParams, "variants"),
    price_min: params.price_min,
    price_max: params.price_max,
    stock_availability: params.stock_availability,
    sort: params.sort,
    special_offer: params.special_offer,
  };

  return apiParams;
}

function buildFilterApiParams(searchParams, routeContext) {
  const params = buildProductApiParams(searchParams, routeContext);
  delete params.page;
  delete params.per_page;
  delete params.limit;
  delete params.sort;
  delete params.variants;
  return params;
}

function ProductGridSkeleton() {
  return (
    <div className="productsV1_grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="productsV1_cardSkeleton" key={index}>
          <span />
          <i />
          <b />
          <em />
        </div>
      ))}
    </div>
  );
}

function getActiveTitle(filters, params, routeContext) {
  if (params.q || params.search) return `Search results for "${params.q || params.search}"`;
  if (routeContext?.title) return routeContext.title;

  const category = filters.categories.find((item) => String(item.id) === String(params.category_id));
  if (category) return category.name;

  const brand = filters.brands.find((item) => String(item.id) === String(params.brand_id));
  if (brand) return brand.name;

  const flag = filters.flags.find((item) => String(item.id) === String(params.flag_id));
  if (flag) return flag.name;

  return "Products";
}

function FilterBlock({ title, defaultOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="productsV1_filterBlock">
      <button className="productsV1_filterBlockHeader" onClick={() => setIsOpen((current) => !current)} type="button">
        <h2>{title}</h2>
        <ChevronDown className={isOpen ? "is-open" : ""} size={16} />
      </button>
      {isOpen ? <div className="productsV1_filterBlockBody">{children}</div> : null}
    </div>
  );
}

function CheckboxRow({ checked, count, label, onChange }) {
  return (
    <label className="productsV1_checkboxRow">
      <input checked={checked} onChange={onChange} type="checkbox" />
      <span>{label}</span>
      {count !== undefined ? <b>{count}</b> : null}
    </label>
  );
}

function RadioRow({ checked, label, onChange }) {
  return (
    <label className="productsV1_radioRow">
      <input checked={checked} onChange={onChange} type="radio" />
      <span>{label}</span>
    </label>
  );
}

function PageTopPills({ pills }) {
  if (!pills?.length) return null;

  return (
    <div className="productsV1_pills">
      {pills.map((pill) => (
        <Link className="productsV1_topPill" href={pill.href} key={`${pill.href}-${pill.id}`}>
          {pill.label}
        </Link>
      ))}
    </div>
  );
}

function ProductPagination({ pagination, onPageChange }) {
  if (pagination.lastPage <= 1) return null;

  const currentPage = pagination.currentPage;
  const lastPage = pagination.lastPage;
  const pages = Array.from(
    new Set([1, 2, currentPage - 1, currentPage, currentPage + 1, lastPage - 1, lastPage].filter((page) => page >= 1 && page <= lastPage))
  ).sort((a, b) => a - b);

  return (
    <nav className="productsV1_pagination" aria-label="Pagination Navigation">
      <div className="productsV1_paginationSummary">
        Showing <b>{pagination.from || 0}</b> to <b>{pagination.to || 0}</b> of <b>{pagination.total}</b> results
      </div>

      <div className="productsV1_pageButtons">
        <button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} type="button">
          Previous
        </button>

        {pages.map((page, index) => {
          const previousPage = pages[index - 1];
          const hasGap = previousPage && page - previousPage > 1;

          return (
            <span className="productsV1_pageButtonGroup" key={page}>
              {hasGap ? <span className="productsV1_pageDots">...</span> : null}
              <button
                className={currentPage === page ? "is-active" : ""}
                disabled={currentPage === page}
                onClick={() => onPageChange(page)}
                type="button"
              >
                {page}
              </button>
            </span>
          );
        })}

        <button disabled={currentPage >= lastPage} onClick={() => onPageChange(currentPage + 1)} type="button">
          Next
        </button>
      </div>
    </nav>
  );
}

export function ProductsPageClient({ routeSlugs = emptyRouteSlugs }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const params = useMemo(() => getParamObject(searchParams), [searchParams]);
  const selectedBrands = useMemo(() => getRepeatedParams(searchParams, "brands"), [searchParams]);
  const selectedVariants = useMemo(() => getRepeatedParams(searchParams, "variants"), [searchParams]);
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: categoryDetail = null } = useGetCategoryBySlugQuery(routeSlugs.categorySlug || "", {
    skip: !routeSlugs.categorySlug,
  });
  const routeContext = useMemo(
    () => findRouteContext(categories, routeSlugs, categoryDetail),
    [categories, categoryDetail, routeSlugs]
  );
  const productApiParams = useMemo(() => buildProductApiParams(searchParams, routeContext), [searchParams, routeContext]);
  const filterApiParams = useMemo(() => buildFilterApiParams(searchParams, routeContext), [searchParams, routeContext]);
  const shouldSkipProducts = !routeContext.ready || routeContext.notFound;
  const { data: productsData, isFetching, isLoading, isError } = useGetProductsQuery(productApiParams, {
    skip: shouldSkipProducts,
  });
  const { data: filters = { priceRange: {}, categories: [], brands: [], flags: [], variants: {} } } =
    useGetProductFiltersQuery(filterApiParams, {
      skip: shouldSkipProducts,
    });

  const products = productsData?.items || [];
  const pagination = productsData?.pagination || { currentPage: 1, lastPage: 1, total: 0, from: 0, to: 0 };
  const title = getActiveTitle(filters, params, routeContext);

  const updateParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        nextParams.delete(key);
        value.forEach((item) => {
          if (item !== undefined && item !== null && item !== "") nextParams.append(key, String(item));
        });
        return;
      }

      if (value === undefined || value === null || value === "") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    if (!Object.prototype.hasOwnProperty.call(updates, "page")) {
      nextParams.delete("page");
    }

    const queryString = nextParams.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const toggleRepeatedFilter = (key, value) => {
    const currentValues = key === "brands" ? selectedBrands : selectedVariants;
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    updateParams({ [key]: nextValues });
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateParams({ q: formData.get("q")?.toString().trim() || "" });
  };

  const handlePriceSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateParams({
      price_min: formData.get("price_min")?.toString() || "",
      price_max: formData.get("price_max")?.toString() || "",
    });
  };

  if (!routeContext.ready) {
    return (
      <section className="productsV1_page">
        <div className="productsV1_header">
          <div>
            <span className="productsV1_kicker">Product Catalogue</span>
            <h1>Loading products...</h1>
          </div>
        </div>
      </section>
    );
  }

  if (routeContext.notFound) {
    return (
      <section className="productsV1_page">
        <div className="productsV1_empty">{routeContext.title || "Category not found"}</div>
      </section>
    );
  }

  return (
    <section className="productsV1_page">
      <div className="productsV1_header">
        <div>
          <span className="productsV1_kicker">Product Catalogue</span>
          <h1>{title}</h1>
          {routeContext.description ? (
            <div className="productsV1_intro" dangerouslySetInnerHTML={{ __html: routeContext.description }} />
          ) : null}
          <p>
            {pagination.total.toLocaleString("en-BD")} products
            {pagination.total > 0 ? ` · showing ${pagination.from || 1}-${pagination.to || products.length}` : ""}
          </p>
          <button className="productsV1_mobileFilterBtn" onClick={() => setIsFilterOpen(true)} type="button">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <form className="productsV1_search" onSubmit={handleSearchSubmit}>
          <Search size={18} />
          <input
            key={params.q || params.search || "empty"}
            name="q"
            defaultValue={params.q || params.search || ""}
            placeholder="Search products..."
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <PageTopPills pills={routeContext.pills} />

      <div className="productsV1_layout">
        <div
          className={`productsV1_filterOverlay${isFilterOpen ? " is-open" : ""}`}
          onClick={() => setIsFilterOpen(false)}
          role="presentation"
        />

        <aside className={`productsV1_sidebar${isFilterOpen ? " is-open" : ""}`}>
          <div className="productsV1_filterTitle">
            <Filter size={18} />
            <span>Filters</span>
            <button className="productsV1_filterCloseBtn" onClick={() => setIsFilterOpen(false)} type="button">
              <X size={15} />
              Close
            </button>
            {searchParams.toString() ? (
              <button onClick={clearFilters} type="button">
                <X size={14} />
                Clear
              </button>
            ) : null}
          </div>

          <FilterBlock title="Price Range">
            <form
              key={`${params.price_min || ""}-${params.price_max || ""}`}
              onSubmit={handlePriceSubmit}
            >
              <div className="productsV1_priceInputs">
                <input
                  name="price_min"
                  type="number"
                  min={filters.priceRange?.min ?? 0}
                  max={filters.priceRange?.max || undefined}
                  placeholder={`Min ${filters.priceRange?.min ?? 0}`}
                  defaultValue={params.price_min || ""}
                />
                <input
                  name="price_max"
                  type="number"
                  min={filters.priceRange?.min ?? 0}
                  max={filters.priceRange?.max || undefined}
                  placeholder={`Max ${filters.priceRange?.max ?? 0}`}
                  defaultValue={params.price_max || ""}
                />
              </div>
              <button className="productsV1_applyBtn" type="submit">
                Apply Price
              </button>
            </form>
          </FilterBlock>

          <FilterBlock title="Sort By Price">
            <div className="productsV1_filterList">
              {sortOptions.map((option) => (
                <RadioRow
                  checked={(params.sort || "") === option.value}
                  key={option.value || "default"}
                  label={option.label}
                  onChange={() => updateParams({ sort: option.value })}
                />
              ))}
            </div>
          </FilterBlock>

          <FilterBlock title="Stock Availability">
            <div className="productsV1_filterList">
              {stockOptions.map((option) => (
                <RadioRow
                  checked={(params.stock_availability || "") === option.value}
                  key={option.value || "all"}
                  label={option.label}
                  onChange={() => updateParams({ stock_availability: option.value })}
                />
              ))}
            </div>
          </FilterBlock>

          {filters.categories.length ? (
            <FilterBlock title="Product Categories">
              <div className="productsV1_filterList">
                {filters.categories.slice(0, 16).map((category) => (
                  <Link className="productsV1_filterPill" href={productListHref(category, "category")} key={category.id}>
                    <span>{category.name}</span>
                    <b>{category.product_count}</b>
                  </Link>
                ))}
              </div>
            </FilterBlock>
          ) : null}

          <FilterBlock title="Brands">
            {filters.brands.length ? (
              <div className="productsV1_filterList">
                {filters.brands.slice(0, 18).map((brand) => {
                  const brandId = String(brand.id);

                  return (
                    <CheckboxRow
                      checked={selectedBrands.includes(brandId)}
                      count={brand.product_count}
                      key={brand.id}
                      label={brand.name}
                      onChange={() => toggleRepeatedFilter("brands", brandId)}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="productsV1_filterMuted">No brands available</p>
            )}
          </FilterBlock>

          {Object.entries(filters.variants || {}).map(([variantType, values]) => (
            <FilterBlock defaultOpen={false} key={variantType} title={variantType}>
              <div className="productsV1_filterList">
                {(values || []).map((item) => {
                  const value = typeof item === "string" ? item : item.value;
                  const count = typeof item === "string" ? undefined : item.count;
                  const filterValue = `${variantType}:${value}`;

                  return (
                    <CheckboxRow
                      checked={selectedVariants.includes(filterValue)}
                      count={count}
                      key={filterValue}
                      label={value}
                      onChange={() => toggleRepeatedFilter("variants", filterValue)}
                    />
                  );
                })}
              </div>
            </FilterBlock>
          ))}
        </aside>

        <div className="productsV1_results">
          <div className="productsV1_toolbar">
            <span>
              <SlidersHorizontal size={17} />
              {isFetching ? "Updating products..." : `${products.length} loaded`}
            </span>
            <select value={params.limit || 40} onChange={(event) => updateParams({ limit: event.target.value })}>
              {[20, 40, 60, 100].map((limit) => (
                <option key={limit} value={limit}>
                  Show {limit}
                </option>
              ))}
            </select>
            <select value={params.sort || ""} onChange={(event) => updateParams({ sort: event.target.value })}>
              {sortOptions.map((option, index) => (
                <option key={option.value || "default-toolbar"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {isLoading || isFetching ? (
            <ProductGridSkeleton />
          ) : isError ? (
            <div className="productsV1_empty">Could not load products. Please try again.</div>
          ) : products.length ? (
            <div className="productsV1_grid">
              {products.map((product) => (
                <ProductCardV1 key={product.id || product.slug || product.name} product={product} />
              ))}
            </div>
          ) : (
            <div className="productsV1_empty">No products found for the selected filters.</div>
          )}

          <ProductPagination pagination={pagination} onPageChange={(page) => updateParams({ page })} />

          {routeContext.fullDescription ? (
            <div className="productsV1_fullDescription" dangerouslySetInnerHTML={{ __html: routeContext.fullDescription }} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
