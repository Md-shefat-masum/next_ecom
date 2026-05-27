import { SimplePage } from "@/components/common/SimplePage";
import { SiteLayout } from "@/components/layout/site-layout";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  return (
    <SiteLayout>
      <SimplePage
        title="Product Details"
        description={`This is the public product details page demo content for ${slug}.`}
      />
    </SiteLayout>
  );
}
