import { Mail, MessageCircle, Clock, BookOpen } from "lucide-react";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

export function SupportPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <MarketingPageShell backTo={isLoggedIn ? "/dashboard" : "/"} backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}>
      <article className="rounded-2xl border border-neutral-200/90 bg-white/92 p-6 shadow-card backdrop-blur-md sm:p-8">
        <h1 className="font-display text-2xl font-normal tracking-[0.08em] text-neutral-900 sm:text-3xl">
          Support
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Help with LightRain federation addresses, settlements, and your merchant dashboard.
        </p>

        <section className="mt-8 space-y-6">
          <div className="flex gap-4 rounded-xl border border-neutral-100 bg-neutral-50/80 p-4">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
            <div>
              <h2 className="font-semibold text-neutral-900">Getting started</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                After you sign in, your Stellar federation address is shown on the dashboard. Use it to receive
                settlements; copy it to share with payers. The merchant directory helps you find other partners on
                the network.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-neutral-100 bg-neutral-50/80 p-4">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
            <div>
              <h2 className="font-semibold text-neutral-900">Contact us</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Email{" "}
                <a href="mailto:support@lightrain.in" className="font-medium text-accent underline-offset-2 hover:underline">
                  support@lightrain.in
                </a>{" "}
                for account questions, technical issues, or settlement inquiries. Include your federation address
                and a short description of the issue.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-neutral-100 bg-neutral-50/80 p-4">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
            <div>
              <h2 className="font-semibold text-neutral-900">Response times</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                We aim to reply within one business day. Critical settlement or security issues are prioritized.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-neutral-100 bg-neutral-50/80 p-4">
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
            <div>
              <h2 className="font-semibold text-neutral-900">Common questions</h2>
              <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-muted">
                <li>
                  <strong className="text-neutral-800">What is a federation address?</strong> A human-readable Stellar
                  identifier (e.g. <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-xs">name*lightrain.in</code>)
                  that maps to your receiving endpoint.
                </li>
                <li>
                  <strong className="text-neutral-800">Is this production financial advice?</strong> No. LightRain is
                  a payments interface; comply with laws in your jurisdiction.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </article>
    </MarketingPageShell>
  );
}
