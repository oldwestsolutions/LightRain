import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

const navPill =
  "rounded-full bg-neutral-100 px-3 py-1.5 text-neutral-800 transition-colors hover:bg-neutral-200";

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

        <nav className="mt-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-4 text-sm" aria-label="Legal sections">
          <a href="#privacy" className={navPill}>
            Privacy
          </a>
          <a href="#terms" className={navPill}>
            Terms
          </a>
          <a href="#compliance" className={navPill}>
            Compliance
          </a>
          <a href="#taxes" className={navPill}>
            Taxes
          </a>
        </nav>

        <div className="mt-8 space-y-10 text-sm leading-relaxed text-muted">
          <section id="privacy" className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-neutral-900">Privacy policy</h2>
            <p className="mt-3 font-medium text-neutral-800">
              You do not have a right to legal privacy in connection with LightRain.
            </p>
            <p className="mt-3">
              You receive only <strong className="text-neutral-900">basic legal protections</strong> as they relate
              to the services and to data processed on the platform—such as limitations described in applicable
              consumer or data-protection statutes where they apply to our role as a service provider. Those
              protections are narrow and contextual; they do not create a general expectation of confidentiality for
              conduct that may be subject to lawful process, regulatory inquiry, or network rules.
            </p>
            <p className="mt-3">
              By using the platform, you acknowledge that information may be used and retained only in ways
              consistent with law and with our operational needs. Data will{" "}
              <strong className="text-neutral-900">not</strong> be used in furtherance of anything that is not
              permissible by law. If a use is prohibited, we do not undertake it; this statement does not shield
              unlawful activity or relieve you of your own compliance obligations.
            </p>
            <p className="mt-3">
              In this demo, session data may be stored locally in your browser. A production service would spell out
              retention, subprocessors, and lawful requests in detail.
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
            <h2 className="text-lg font-semibold text-neutral-900">Compliance</h2>
            <p className="mt-3 font-medium text-neutral-800">State-by-state commerce and oversight</p>
            <p className="mt-3">
              Commerce is regulated differently in each U.S. state and territory. When you operate in or direct
              activity toward a given state, the rules of that jurisdiction—including licensing, product
              categories, advertising, record-keeping, and enforcement—may apply to you independently of where you
              or we are located.
            </p>
            <p className="mt-3">
              <strong className="text-neutral-900">LightRain governs commerce according to state laws within the
              respective states</strong> in which activity is directed or occurs, to the extent we are able to
              reflect those requirements in product configuration, disclosures, and operational policy. We do not
              waive your obligation to obtain and maintain your own authorizations or to interpret how multi-state
              or federal law interacts with your facts.
            </p>
            <p className="mt-3">
              We maintain <strong className="text-neutral-900">security parameters</strong> designed to{" "}
              <strong className="text-neutral-900">log and verify</strong> transactions and to support the{" "}
              <strong className="text-neutral-900">integrity</strong> of settlement records available through the
              platform—including audit trails appropriate to our architecture. Those measures support compliance
              and fraud resistance; they are not a substitute for your legal counsel, tax advisor, or regulator.
            </p>
            <p className="mt-3">
              Crypto and payment flows may implicate AML/KYC, money transmission, sanctions, and industry-specific
              regimes. You remain responsible for screening, reporting, and maintaining records required of you.
            </p>
          </section>

          <section id="taxes" className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-neutral-900">Taxes</h2>
            <p className="mt-3">
              LightRain does not provide tax advice. You are solely responsible for determining and remitting sales,
              use, excise, income, and other taxes arising from your use of the platform and from your underlying
              business, in each jurisdiction where you have a filing or collection obligation.
            </p>
            <p className="mt-3">
              Settlement in digital assets or stablecoins may have tax character (e.g., gain/loss, information
              reporting) that differs from traditional card rails. Consult a qualified tax professional. We may
              furnish statements or exports where required by law; absence of a form does not mean no tax is due.
            </p>
          </section>
        </div>
      </article>
    </MarketingPageShell>
  );
}
