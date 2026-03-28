import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

export function CompanyPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <MarketingPageShell backTo={isLoggedIn ? "/dashboard" : "/"} backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}>
      <article className="rounded-2xl border border-neutral-200/90 bg-white/92 p-6 shadow-card backdrop-blur-md sm:p-8">
        <h1 className="font-display text-2xl font-normal tracking-[0.08em] text-neutral-900 sm:text-3xl">
          Company
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          LightRain is built for merchants who need clear, modern tooling around blockchain-based settlement.
        </p>

        <section className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">About LightRain</h2>
            <p className="mt-2">
              LightRain focuses on <strong className="font-medium text-neutral-800">private discretionary blockchain ledger</strong>{" "}
              experiences: federation addresses, directory discovery, and payment flows designed to feel as calm
              as consumer banking—while staying honest about crypto rails and regulatory context.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-neutral-900">Hated By Many LLC</h2>
            <p className="mt-2">
              LightRain is offered by <strong className="font-medium text-neutral-800">Hated By Many LLC</strong> ©
              2026. This demo application illustrates the product direction; it is not an offer to sell securities
              or payment services in any specific jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-neutral-900">What we care about</h2>
            <ul className="mt-2 list-inside list-disc space-y-2">
              <li>Clarity for operators in high-risk and regulated categories</li>
              <li>Respect for user attention—minimal chrome, readable typography</li>
              <li>Security-minded defaults as the product matures</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-neutral-900">Press &amp; partnerships</h2>
            <p className="mt-2">
              For media or partnership inquiries, contact{" "}
              <a
                href="mailto:press@lightrain.in"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                press@lightrain.in
              </a>
              .
            </p>
          </div>
        </section>
      </article>
    </MarketingPageShell>
  );
}
