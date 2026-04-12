import { Suspense } from "react";
import { ShopOrderConfirmPage } from "@/views/ShopOrderConfirmPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-muted">Loading…</div>}>
      <ShopOrderConfirmPage />
    </Suspense>
  );
}
