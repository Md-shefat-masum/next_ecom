import { CheckoutPaymentPage } from "@/components/checkout/CheckoutPaymentPage";
import { SiteLayout } from "@/components/layout/site-layout";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function CheckoutPaymentRoutePage() {
  return (
    <SiteLayout>
      <AuthGuard>
        <CheckoutPaymentPage />
      </AuthGuard>
    </SiteLayout>
  );
}
