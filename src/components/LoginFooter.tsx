import { Fragment } from "react";
import { Link } from "react-router-dom";

const microLinks = [
  { label: "Support", to: "/support" },
  { label: "Legal", to: "/legal" },
  { label: "Company", to: "/company" },
] as const;

export function LoginFooter() {
  return (
    <div className="mt-6 w-full max-w-md px-1 text-center sm:mt-8">
      <nav
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-muted"
        aria-label="Legal and company links"
      >
        {microLinks.map((link, i) => (
          <Fragment key={link.to}>
            {i > 0 && (
              <span className="select-none text-neutral-300" aria-hidden>
                ·
              </span>
            )}
            <Link
              to={link.to}
              className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center px-2 py-2 transition-colors duration-200 hover:text-accent active:text-neutral-900"
            >
              {link.label}
            </Link>
          </Fragment>
        ))}
      </nav>
      <p className="mt-3 text-[11px] leading-snug text-muted/90 sm:mt-4">
        © 2026 Hated By Many LLC. All Rights Reserved
      </p>
    </div>
  );
}
