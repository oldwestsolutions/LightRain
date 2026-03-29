import { Link } from "react-router-dom";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

export function CompanyPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <MarketingPageShell
      backTo={isLoggedIn ? "/dashboard" : "/"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}
    >
      <article className="rounded-2xl border border-neutral-200/90 bg-white/92 p-6 shadow-card backdrop-blur-md sm:p-8">
        <h1 className="font-display text-2xl font-normal tracking-[0.08em] text-neutral-900 sm:text-3xl">
          Company
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <span className="font-display text-lg font-normal tracking-[0.06em] text-neutral-900">LightRain</span>
          {" — "}
          Federation addresses and settlement tooling for high-risk commerce.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <Link to="/legal" className="font-medium text-accent underline-offset-2 hover:underline">
            Legal
          </Link>
        </p>

        <div className="mt-8 border-t border-neutral-200/80 pt-6 text-sm text-muted">
          <p className="font-medium text-neutral-900">Hated By Many LLC</p>
          <p className="mt-2 leading-relaxed">© 2026 · Demo product direction only.</p>
          <p className="mt-3">
            <a
              href="mailto:press@lightrain.in"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              press@lightrain.in
            </a>
          </p>
        </div>
      </article>
    </MarketingPageShell>
  );
}
