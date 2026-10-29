import { Suspense } from "react";
import CheckoutPageContent from "@/components/events/checkout/CheckoutPageContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutPageContent />
    </Suspense>
  );
}