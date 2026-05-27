import { Suspense } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { ProductsPageClient } from "@/components/products";

export default async function ProductSubcategoryPage({ params }) {
  const { slug, subcategorySlug } = await params;

  return (
    <SiteLayout>
      <Suspense fallback={null}>
        <ProductsPageClient routeSlugs={{ categorySlug: slug, subcategorySlug }} />
      </Suspense>
    </SiteLayout>
  );
}
