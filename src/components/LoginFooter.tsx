import { Fragment } from "react";

const microLinks = [
  { label: "Support", href: "https://www.lightrain.in/support" },
  { label: "Legal", href: "https://www.lightrain.in/legal" },
  { label: "Company", href: "https://www.lightrain.in/company" },
] as const;

export function LoginFooter() {
  return (
    <div className="mt-8 w-full max-w-md text-center">
      <nav
        className="flex flex-wrap items-center justify-center gap-x-2 text-xs text-muted"
        aria-label="Legal and company links"
      >
        {microLinks.map((link, i) => (
          <Fragment key={link.href}>
            {i > 0 && (
              <span className="select-none text-neutral-300" aria-hidden>
                ·
              </span>
            )}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </a>
          </Fragment>
        ))}
      </nav>
      <p className="mt-4 text-[11px] leading-snug text-muted/90">
        © 2026 Hated By Many LLC. All Rights Reserved
      </p>
    </div>
  );
}
