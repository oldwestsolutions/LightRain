"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { initWebAuth } from "@/authBootstrap";
import { Toast } from "@/components/Toast";

export function Providers({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    initWebAuth();
  }, []);

  return (
    <>
      {children}
      <Toast />
      <Analytics />
    </>
  );
}
