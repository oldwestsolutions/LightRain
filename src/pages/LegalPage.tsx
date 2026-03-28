import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

export function LegalPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <MarketingPageShell backTo={isLoggedIn ? "/dashboard" : "/"} backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}>
      <article className="rounded-2xl border border-neutral-200/90 bg-white/92 p-6 shadow-card backdrop-blur-md sm:p-8">
        <h1 className="font-display text-2xl font-normal tracking-[0.08em] text-neutral-900 sm:text-3xl">
          Legal
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Policies and terms for using LightRain. This is a demo product; have counsel review before production use.
        </p>

        <nav className="mt-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-4 text-sm">
          <a href="#privacy" className="rounded-full bg-neutral-100 px-3 py-1.5 text-neutral-800 hover:bg-neutral-200">
            Privacy
          </a>
          <a href="#terms" className="rounded-full bg-neutral-100 px-3 py-1.5 text-neutral-800 hover:bg-neutral-200">
            Terms
          </a>
          <a href="#compliance" className="rounded-full bg-neutral-100 px-3 py-1.5 text-neutral-800 hover:bg-neutral-200">
            Compliance
          </a>
        </nav>

        <div className="mt-8 space-y-10 text-sm leading-relaxed text-muted">
          <section id="privacy" className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-neutral-900">Privacy policy</h2>
            <p className="mt-3">
              LightRain processes the information you provide (such as email) to operate your session and display
              the dashboard. In this demo, data is stored locally in the browser and is not sent to a live
              backend. A production service would describe data retention, subprocessors, and your rights (access,
              deletion, portability) under applicable law (e.g. GDPR, CCPA).
            </p>
            <p className="mt-3">
              Federation addresses and merchant directory entries shown in the app are illustrative. Do not use
              mock data as legal or financial guidance.
            </p>
          </section>

          <section id="terms" className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-neutral-900">Terms of service</h2>
            <p className="mt-3">
              By using LightRain you agree not to misuse the interface or attempt to access systems you are not
              authorized to use. High-risk and regulated activities (including cannabis-related commerce where
              restricted) require your own licenses and compliance programs. LightRain does not guarantee
              settlement times, network availability, or regulatory outcomes.
            </p>
            <p className="mt-3">
              The service is provided “as is” without warranties. Limitation of liability and dispute resolution
              clauses would be expanded in a production agreement.
            </p>
          </section>

          <section id="compliance" className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-neutral-900">Compliance &amp; risk</h2>
            <p className="mt-3">
              Crypto payments may be subject to AML/KYC, money transmission, and industry-specific rules. You are
              responsible for sanctions screening, record-keeping, and reporting in your jurisdiction. LightRain’s
              private discretionary ledger positioning is descriptive of the product vision—not a legal
              classification.
            </p>
            <p className="mt-3">
              For questions about how these obligations apply to you, consult qualified legal and compliance
              advisors.
            </p>
          </section>
        </div>
      </article>
    </MarketingPageShell>
  );
}
