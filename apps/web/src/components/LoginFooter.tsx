"use client";

import { Fragment } from "react";
import Link from "next/link";
import { URL_COMPANY, URL_SHOP, URL_SUPPORT } from "@/lib/site";

const microLinks = [
  { label: "Support", href: URL_SUPPORT, external: true },
  { label: "Company", href: URL_COMPANY, external: true },
  { label: "Shop", href: URL_SHOP, external: true },
] as const;

type LoginFooterProps = {
  /** Omit footer nav; copyright only (e.g. secure onboarding). */
  variant?: "default" | "copyrightOnly";
};

export function LoginFooter({ variant = "default" }: LoginFooterProps) {
  const copyrightOnly = variant === "copyrightOnly";

  return (
    <div
      className={`mt-6 w-full px-1 text-center sm:mt-8 ${copyrightOnly ? "mx-auto max-w-2xl" : "max-w-md"}`}
    >
      {!copyrightOnly && (
        <nav
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-muted"
          aria-label="Site links"
        >
          {microLinks.map((link, i) => (
            <Fragment key={link.href}>
              {i > 0 && (
                <span className="select-none text-neutral-300" aria-hidden>
                  ·
                </span>
              )}
              {link.external ? (
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center px-2 py-2 transition-colors duration-200 hover:text-accent active:text-neutral-900"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center px-2 py-2 transition-colors duration-200 hover:text-accent active:text-neutral-900"
                >
                  {link.label}
                </Link>
              )}
            </Fragment>
          ))}
        </nav>
      )}
      <p
        className={`text-[11px] leading-snug text-muted/90 ${copyrightOnly ? "mx-auto max-w-md px-2" : "mt-3 sm:mt-4"}`}
      >
        © 2026 Hated By Many LLC. All Rights Reserved
      </p>
    </div>
  );
}
