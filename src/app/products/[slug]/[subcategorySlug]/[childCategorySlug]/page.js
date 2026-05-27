import { Suspense } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { ProductsPageClient } from "@/components/products";

export default async function ProductChildCategoryPage({ params }) {
  const { slug, subcategorySlug, childCategorySlug } = await params;

  return (
    <SiteLayout>
      <Suspense fallback={null}>
        <ProductsPageClient routeSlugs={{ categorySlug: slug, subcategorySlug, childCategorySlug }} />
      </Suspense>
    </SiteLayout>
  );
}
