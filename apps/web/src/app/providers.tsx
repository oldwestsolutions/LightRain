"use client";

import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { initWebAuth } from "@/authBootstrap";
import { Toast } from "@/components/Toast";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
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
