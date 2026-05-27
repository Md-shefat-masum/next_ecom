import { Suspense } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ProfilePage } from "@/components/profile/ProfilePage";

export const metadata = { title: "My Profile — BME" };

export default function ProfileRoutePage() {
  return (
    <SiteLayout>
      <AuthGuard>
        <Suspense>
          <ProfilePage />
        </Suspense>
      </AuthGuard>
    </SiteLayout>
  );
}
