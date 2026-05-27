import { SiteLayout } from "@/components/layout/site-layout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = { title: "Create Account — BME" };

export default function RegisterPage() {
  return (
    <SiteLayout>
      <section className="min-h-[calc(100vh-200px)] bg-[#F1F5F9] px-4 py-12">
        <RegisterForm />
      </section>
    </SiteLayout>
  );
}
