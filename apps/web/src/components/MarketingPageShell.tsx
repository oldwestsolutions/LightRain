"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { resolveMarketingBackHref } from "@/lib/navigation";
import { LoginFooter } from "./LoginFooter";
import { RainBackground } from "./RainBackground";

type Props = {
  children: ReactNode;
  backTo: string;
  backLabel: string;
  /** Wider content column */
  wide?: boolean;
  /** Full storefront / two-pane layouts */
  extraWide?: boolean;
  /** Less top padding — dense pages (e.g. Company) */
  compactTop?: boolean;
};

export function MarketingPageShell({ children, backTo, backLabel, wide, extraWide, compactTop }: Props) {
  const [resolvedBack, setResolvedBack] = useState(backTo);
  useEffect(() => {
    setResolvedBack(resolveMarketingBackHref(backTo));
  }, [backTo]);

  const maxClass = extraWide ? "max-w-7xl" : wide ? "max-w-4xl" : "max-w-2xl";
  const topPad = compactTop ? "pt-2 sm:pt-3" : "pt-[6vh] sm:pt-[8vh]";
  const backMb = compactTop ? "mb-3 sm:mb-4" : "mb-6";
  const footerMt = compactTop ? "mt-8" : "mt-12";
  const backExternal = resolvedBack.startsWith("http");
  return (
    <div className="relative flex min-h-screen min-h-[100dvh] flex-col bg-canvas safe-pt">
      <RainBackground />
      <div
        className="pointer-events-none fixed inset-0 z-[2] bg-gradient-to-b from-canvas/88 via-canvas/45 to-canvas/82"
        aria-hidden
      />
      <div className={`relative z-10 flex flex-1 flex-col overflow-x-hidden px-4 pb-10 ${topPad} sm:px-6`}>
        <div className={`mx-auto w-full flex-1 ${maxClass}`}>
          {backExternal ? (
            <a
              href={resolvedBack}
              className={`${backMb} inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent`}
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </a>
          ) : (
            <Link
              href={resolvedBack}
              className={`${backMb} inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent`}
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          )}
          {children}
        </div>
        <div className={`mx-auto w-full max-w-md ${footerMt}`}>
          <LoginFooter />
        </div>
      </div>
    </div>
  );
}
