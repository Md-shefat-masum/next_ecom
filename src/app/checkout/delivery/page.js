import { CheckoutDeliveryPage } from "@/components/checkout/CheckoutDeliveryPage";
import { SiteLayout } from "@/components/layout/site-layout";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function CheckoutDeliveryRoutePage() {
  return (
    <SiteLayout>
      <AuthGuard>
        <CheckoutDeliveryPage />
      </AuthGuard>
    </SiteLayout>
  );
}
