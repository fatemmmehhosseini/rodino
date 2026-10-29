import { Suspense } from "react";

import PaymentPageContent from "@/components/events/payment/PaymentPageContent";

export default function PaymentPage() {
  return (
    <Suspense fallback={null}>
      <PaymentPageContent />
    </Suspense>
  );
}