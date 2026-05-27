"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useGetFeaturedCategoriesQuery,
  useLazyGetCategoryProductsByIdQuery,
  useLazyGetSubcategoryProductsByIdQuery,
} from "@/store/api";
import { ProductCardV1 } from "@/components/product-card/v1";
import { productListHref } from "@/lib/products/productListHref";

function getSubcategories(category) {
  return category?.subcategories || category?.sub_categories || [];
}

function ProductGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="min-h-[520px] animate-pulse bg-white shadow-[0_18px_48px_rgba(18,45,82,0.055)]"
          style={{
            clipPath:
              "polygon(22px 0,100% 0,100% calc(100% - 22px),calc(100% - 22px) 100%,0 100%,0 22px)",
          }}
        >
          <div className="mx-8 mt-10 h-7 w-36 bg-slate-100" />
          <div className="mx-auto mt-8 h-64 w-64 bg-slate-100" />
          <div className="mx-8 mt-8 h-7 bg-slate-100" />
          <div className="mx-8 mt-4 h-5 w-2/3 bg-slate-100" />
          <div className="mx-8 mt-7 h-10 w-36 bg-slate-100" />
          <div className="mx-8 mt-8 h-14 bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

function CategoryProductSection({ category }) {
  const sectionRef = useRef(null);
  const hasRequestedProductsRef = useRef(false);
  const [activeFilter, setActiveFilter] = useState({
    type: "category",
    id: category.id,
    label: category.name,
  });
  const [loadCategoryProducts, categoryProductsResult] = useLazyGetCategoryProductsByIdQuery();
  const [loadSubcategoryProducts, subcategoryProductsResult] = useLazyGetSubcategoryProductsByIdQuery();
  const isCategoryFilter = activeFilter.type === "category";
  const activeProductsResult = isCategoryFilter ? categoryProductsResult : subcategoryProductsResult;
  const products = activeProductsResult.data || [];
  const hasRequestedProducts = !activeProductsResult.isUninitialized;
  const isLoadingProducts = activeProductsResult.isLoading || activeProductsResult.isFetching;
  const visibleProducts = products.slice(0, 6);
  const subcategories = getSubcategories(category).slice(0, 6);

  useEffect(() => {
    if (hasRequestedProductsRef.current) return undefined;

    let observer = null;
    const target = sectionRef.current;

    const requestProducts = () => {
      if (hasRequestedProductsRef.current) return;
      hasRequestedProductsRef.current = true;
      void loadCategoryProducts(category.id);
    };

    if (!target || !("IntersectionObserver" in window)) {
      requestProducts();
      return undefined;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer?.disconnect();
        requestProducts();
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      }
    );

    observer.observe(target);

    return () => {
      observer?.disconnect();
    };
  }, [category.id, loadCategoryProducts]);

  const handleCategoryClick = () => {
    hasRequestedProductsRef.current = true;
    setActiveFilter({
      type: "category",
      id: category.id,
      label: category.name,
    });
    void loadCategoryProducts(category.id);
  };

  const handleSubcategoryClick = (subcategory) => {
    hasRequestedProductsRef.current = true;
    setActiveFilter({
      type: "subcategory",
      id: subcategory.id,
      label: subcategory.name,
    });
    void loadSubcategoryProducts(subcategory.id);
  };

  return (
    <section
      ref={sectionRef}
      id={`featured-${category.slug || category.id}`}
      className="relative overflow-hidden bg-white/90 p-2 shadow-[0_20px_56px_rgba(15,23,42,0.07)] sm:p-6 lg:p-3"
      style={{
        clipPath:
          "polygon(18px 0,100% 0,100% calc(100% - 18px),calc(100% - 18px) 100%,0 100%,0 18px)",
      }}
    >
      <span className="absolute left-6 top-0 h-0.5 w-16 bg-(--bme-accent)" />
      <span className="absolute bottom-0 right-6 h-0.5 w-16 bg-(--bme-primary)/40" />

      <div className="relative mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-(--bme-primary)">
            Featured Products
          </span>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-(--bme-text) sm:text-3xl">
            {category.name}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-(--bme-muted) sm:text-base">
            Category based products are loaded from API when this section comes into view.
          </p>
        </div>

        {category.slug ? (
          <Link
            href={productListHref(category, "category")}
            className="inline-flex h-11 items-center justify-center gap-2 bg-(--bme-primary) px-5 text-sm font-bold text-white transition hover:bg-(--bme-primary-dark)"
            style={{
              clipPath:
                "polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)",
            }}
          >
            View All
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        ) : null}
      </div>

      <div className="relative mb-7 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCategoryClick}
          className={[
            "h-10 px-4 text-[12px] font-bold transition",
            isCategoryFilter
              ? "bg-(--bme-primary) text-white"
              : "border border-(--bme-border) bg-white text-(--bme-text) hover:border-(--bme-primary) hover:text-(--bme-primary)",
          ].join(" ")}
        >
          {category.name}
        </button>

        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            type="button"
            onClick={() => handleSubcategoryClick(subcategory)}
            className={[
              "h-10 px-4 text-[12px] font-bold transition",
              activeFilter.type === "subcategory" && activeFilter.id === subcategory.id
                ? "bg-(--bme-primary) text-white"
                : "border border-(--bme-border) bg-white text-(--bme-text) hover:border-(--bme-primary) hover:text-(--bme-primary)",
            ].join(" ")}
          >
            {subcategory.name}
          </button>
        ))}

        <span className="inline-flex h-10 items-center border border-(--bme-border-soft) bg-(--bme-hover) px-4 text-sm font-semibold text-(--bme-muted)">
          {hasRequestedProducts ? `${products.length} products` : "Standby"}
        </span>
      </div>

      {!hasRequestedProducts || isLoadingProducts ? (
        <ProductGridSkeleton />
      ) : visibleProducts.length ? (
        <div className="gap-2 product_show_auto_grid">
          {visibleProducts.map((product) => (
            <ProductCardV1 key={product.id || product.slug || product.name} product={product} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-(--bme-border) bg-(--bme-hover) px-5 py-10 text-center text-sm font-semibold text-(--bme-muted)">
          No products found for {activeFilter.label}
        </div>
      )}
    </section>
  );
}

export function FeaturedCategoryProducts() {
  const { data: categories = [], isLoading, isError } = useGetFeaturedCategoriesQuery();
  const visibleCategories = categories.slice(0, 4);

  if (isError) return null;

  return (
    <section className="bg-(--bme-bg) py-10 sm:py-12 lg:py-16">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-(--bme-primary)">
            Featured Category Matrix
          </span>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-(--bme-text) sm:text-4xl">
            Featured Category Products
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-(--bme-muted) sm:text-base">
            Draft API-powered section based on the demo project flow: categories first, products loaded per category.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6">
            <ProductGridSkeleton />
          </div>
        ) : visibleCategories.length ? (
          <div className="grid gap-8">
            {visibleCategories.map((category) => (
              <CategoryProductSection key={category.id} category={category} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
