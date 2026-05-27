import { Suspense } from "react";
import { PaymentFailedPage } from "@/components/checkout/PaymentFailedPage";

export const metadata = { title: "Payment Failed" };

export default function Page() {
  return (
    <Suspense>
      <PaymentFailedPage />
    </Suspense>
  );
}
