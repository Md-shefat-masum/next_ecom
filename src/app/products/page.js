import { Suspense } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { ProductsPageClient } from "@/components/products";

export default function ProductsPage() {
  return (
    <SiteLayout>
      <Suspense fallback={null}>
        <ProductsPageClient />
      </Suspense>
    </SiteLayout>
  );
}
