import { Suspense } from "react";
import { CheckoutOrderConfirmedPage } from "@/components/checkout/CheckoutOrderConfirmedPage";
import { SiteLayout } from "@/components/layout/site-layout";

export const metadata = { title: "Order Confirmed" };

export default function CheckoutOrderConfirmedRoutePage() {
  return (
    <SiteLayout>
      <Suspense>
        <CheckoutOrderConfirmedPage />
      </Suspense>
    </SiteLayout>
  );
}
