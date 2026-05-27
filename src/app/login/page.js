import { Suspense } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Login — BME" };

export default function LoginPage() {
  return (
    <SiteLayout>
      <section className="min-h-[calc(100vh-200px)] bg-[#F1F5F9] px-4 py-12">
        <Suspense>
          <LoginForm />
        </Suspense>
      </section>
    </SiteLayout>
  );
}
