import { SimplePage } from "@/components/common/SimplePage";
import { SiteLayout } from "@/components/layout/site-layout";

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  return (
    <SiteLayout>
      <SimplePage
        title="Blog Details"
        description={`This is the public blog details page demo content for ${slug}.`}
      />
    </SiteLayout>
  );
}
