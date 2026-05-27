import { redirect } from "next/navigation";
import { SimplePage } from "@/components/common/SimplePage";
import { SiteLayout } from "@/components/layout/site-layout";

const isAuth = true;

export default function ProfilePage() {
  if (!isAuth) {
    redirect("/login");
  }

  return (
    <SiteLayout>
      <SimplePage title="Profile" description="This is the authenticated profile page demo content." />
    </SiteLayout>
  );
}
