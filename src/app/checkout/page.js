import { CheckoutShippingPage } from "@/components/checkout/CheckoutShippingPage";
import { SiteLayout } from "@/components/layout/site-layout";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function CheckoutPage() {
  return (
    <SiteLayout>
      <AuthGuard>
        <CheckoutShippingPage />
      </AuthGuard>
    </SiteLayout>
  );
}
