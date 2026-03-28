const sections = [
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "https://www.lightra.in/help" },
      { label: "Contact", href: "https://www.lightra.in/contact" },
      { label: "Status", href: "https://www.lightra.in/status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "https://www.lightra.in/privacy" },
      { label: "Terms of Service", href: "https://www.lightra.in/terms" },
      { label: "Compliance", href: "https://www.lightra.in/compliance" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "https://www.lightra.in/about" },
      { label: "Careers", href: "https://www.lightra.in/careers" },
      { label: "Press", href: "https://www.lightra.in/press" },
    ],
  },
] as const;

export function LoginFooter() {
  return (
    <footer className="w-full border-t border-neutral-200/90 bg-canvas px-4 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 sm:flex-row sm:justify-between">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {section.title}
            </h2>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-4xl text-center text-xs text-muted">
        © {new Date().getFullYear()} LightRa.in. All rights reserved.
      </p>
    </footer>
  );
}
