import { Suspense } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { ProductSlugRouter } from "@/components/products";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  return (
    <SiteLayout>
      <Suspense fallback={null}>
        <ProductSlugRouter slug={slug} />
      </Suspense>
    </SiteLayout>
  );
}
