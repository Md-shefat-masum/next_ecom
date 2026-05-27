import { SiteLayout } from "@/components/layout/site-layout";
import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm";

export const metadata = { title: "Forgot Password — BME" };

export default function ForgetPasswordPage() {
  return (
    <SiteLayout>
      <section className="min-h-[calc(100vh-200px)] bg-[#F1F5F9] px-4 py-12">
        <ForgetPasswordForm />
      </section>
    </SiteLayout>
  );
}
