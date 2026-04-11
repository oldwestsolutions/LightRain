import Link from "next/link";
import { Activity, ArrowUpRight, FileText, Headphones, Mail, Scale, Shield } from "lucide-react";
import { URL_SUPPORT } from "@/lib/site";

const links = [
  { to: "/assurance-layers", label: "Assurance layers", icon: Activity, external: false },
  { to: "/governance", label: "Governance", icon: Scale, external: false },
  { to: "/whitepaper", label: "Whitepaper", icon: Shield, external: false },
  { to: "/legal", label: "Legal & policies", icon: FileText, external: false },
  { to: URL_SUPPORT, label: "Support", icon: Headphones, external: true },
] as const;

export function CompanySidebar() {
  return (
    <aside className="lg:sticky lg:top-[calc(5rem+env(safe-area-inset-top))] lg:self-start">
      <div className="space-y-6 rounded-2xl border border-neutral-200/90 bg-white/95 p-5 shadow-card sm:p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Quick links</p>
          <nav className="mt-3 flex flex-col gap-1" aria-label="Company sidebar">
            {links.map(({ to, label, icon: Icon, external }) =>
              external ? (
                <a
                  key={to}
                  href={to}
                  className="group flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted group-hover:text-neutral-900" aria-hidden />
                  <span className="flex-1">{label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </a>
              ) : (
                <Link
                  key={to}
                  href={to}
                  className="group flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted group-hover:text-neutral-900" aria-hidden />
                  <span className="flex-1">{label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="border-t border-neutral-100 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">At a glance</p>
          <ul className="mt-3 space-y-2.5 text-sm leading-snug text-muted">
            <li>Federation-native settlement rails</li>
            <li>Built for regulated & high-risk commerce</li>
            <li>Hardware catalog is illustrative—checkout demo only</li>
          </ul>
        </div>

        <div className="border-t border-neutral-100 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Operator</p>
          <p className="mt-2 text-sm font-medium text-neutral-900">Hated By Many LLC</p>
          <p className="mt-1 text-xs text-muted">© 2026 · Demo only</p>
          <a
            href="mailto:press@lightrain.in"
            className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-accent underline-offset-2 hover:underline"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden />
            press@lightrain.in
          </a>
        </div>
      </div>
    </aside>
  );
}
