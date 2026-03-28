import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";
import { AlertTriangle, FileWarning, Scale, Shield } from "lucide-react";

export function CompanyPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <MarketingPageShell
      wide
      backTo={isLoggedIn ? "/dashboard" : "/"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}
    >
      <div className="space-y-8">
        <header className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-8 text-white shadow-card sm:rounded-3xl sm:p-10 md:p-12">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">Company</p>
            <h1 className="mt-3 font-display text-3xl font-normal tracking-[0.06em] sm:text-4xl md:text-5xl">
              Light<span className="text-neutral-300">Rain</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              A settlement layer for federation addresses and high-risk commerce—built to be legible, not naive.
              What follows is not marketing fluff: it is how responsibility actually moves between you, the network,
              and the law.
            </p>
          </div>
        </header>

        <article className="rounded-2xl border border-neutral-200/90 bg-white/92 p-6 shadow-card backdrop-blur-md sm:p-8 md:p-10">
          <h2 className="text-xl font-semibold text-neutral-900 md:text-2xl">Liabilities &amp; what you should expect</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Using LightRain does not transfer regulatory risk away from you. The mechanics below describe where
            obligations sit in a typical deployment—your counsel should validate them against your licenses,
            geographies, and counterparties.
          </p>

          <div className="mt-10 space-y-10">
            <section className="border-l-4 border-neutral-900 pl-5 md:pl-6">
              <div className="flex items-start gap-3">
                <Scale className="mt-0.5 h-6 w-6 shrink-0 text-neutral-700" aria-hidden />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">1. Primary liability rests with the operator</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                    You—not LightRain—are responsible for the legality of what you sell, how you market it, who you
                    sell to, and how you report it. The platform may display addresses, history, and controls, but
                    it does not obtain licenses on your behalf or certify that a given transaction is authorized in
                    a state. If a regulator challenges your activity, your entity bears the first line of defense:
                    permits, tax accounts, age gates, product testing, and sanctions screening are yours to maintain.
                  </p>
                </div>
              </div>
            </section>

            <section className="border-l-4 border-neutral-400 pl-5 md:pl-6">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-6 w-6 shrink-0 text-neutral-600" aria-hidden />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">2. Network and settlement risk</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                    Settlement depends on underlying ledgers, anchors, and counterparties outside our full control.
                    Finality times, fees, forks, and asset de-pegs can affect value. You assume the risk of choosing
                    assets, routes, and counterparties. LightRain’s role is to present information and flows; it is
                    not a guarantor of counterparty performance or chain liveness.
                  </p>
                </div>
              </div>
            </section>

            <section className="border-l-4 border-amber-600/80 pl-5 md:pl-6">
              <div className="flex items-start gap-3">
                <FileWarning className="mt-0.5 h-6 w-6 shrink-0 text-amber-800" aria-hidden />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">3. Data, logging, and lawful process</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                    Operational logging and verification exist to protect integrity and meet obligations we accept in
                    a production environment. You should expect that records necessary for audits, subpoenas, or
                    network rules may be retained and disclosed when required by law—not because we wish to
                    surveil users, but because running a payments surface responsibly implies accountability. See
                    Legal → Privacy and Compliance for the narrow scope of protections that apply.
                  </p>
                </div>
              </div>
            </section>

            <section className="border-l-4 border-rose-700/70 pl-5 md:pl-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-rose-800" aria-hidden />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">4. No fiduciary duty; no outcome warranty</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                    Nothing on this page or in the product creates a fiduciary relationship. We do not owe you a duty
                    to maximize returns, minimize tax, or avoid enforcement. The demo may omit entire categories of
                    risk (e.g., civil litigation between merchants, insurance gaps, employment law). Your
                    cumulative exposure is the sum of commercial, criminal, civil, and reputational risks inherent
                    in your sector—amplified when payments are fast and cross-border.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-6 md:p-8">
            <h3 className="text-base font-semibold text-neutral-900 md:text-lg">Hated By Many LLC</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
              LightRain is offered by <strong className="font-medium text-neutral-900">Hated By Many LLC</strong> ©
              2026. This application illustrates product direction; it is not an offer of securities, payment
              services, or money transmission in any particular jurisdiction unless and until appropriately
              registered and disclosed.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px]">
              For media or partnerships:{" "}
              <a
                href="mailto:press@lightrain.in"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                press@lightrain.in
              </a>
              .
            </p>
          </div>
        </article>
      </div>
    </MarketingPageShell>
  );
}
