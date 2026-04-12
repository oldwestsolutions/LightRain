"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { initWebAuth } from "@/authBootstrap";
import { Toast } from "@/components/Toast";
import { IdleActivityBridge } from "@/components/wallet/IdleActivityBridge";

export function Providers({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    initWebAuth();
  }, []);

  return (
    <>
      {children}
      <IdleActivityBridge />
      <Toast />
      <Analytics />
    </>
  );
}
