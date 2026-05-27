"use client";

import { ProductDetailsV1 } from "@/components/product-details/v1";
import { useGetCategoriesQuery } from "@/store/api";
import { ProductsPageClient } from "./ProductsPageClient";

export function ProductSlugRouter({ slug }) {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <section className="productsV1_page">
        <div className="productsV1_header">
          <div>
            <span className="productsV1_kicker">Product Catalogue</span>
            <h1>Loading...</h1>
          </div>
        </div>
      </section>
    );
  }

  const category = categories.find((item) => item.slug === slug);

  if (category) {
    return <ProductsPageClient routeSlugs={{ categorySlug: slug }} />;
  }

  return <ProductDetailsV1 slug={slug} />;
}
