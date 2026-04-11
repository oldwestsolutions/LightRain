"use client";

import Link from "next/link";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

const SECTIONS = [
  {
    title: "How LightRain avoids custody",
    body:
      "LightRain is built so the product does not take possession of customer funds in the omnibus, pooled sense that regulators associate with custodial platforms. You—or your licensed service provider—remain the party that actually controls movement of value. The software surfaces addresses, history, and policy hooks; it does not substitute for your own custody decisions.",
  },
  {
    title: "How obligations stay on licensed entities",
    body:
      "Where the law expects a licensed money services business, bank, or broker-dealer to own compliance, that entity—not LightRain—carries the obligation. Federation endpoints and settlement views are designed to make those boundaries obvious in day-to-day operations, so teams do not accidentally imply that “the app” is the regulated actor.",
  },
  {
    title: "How federation endpoints support auditability",
    body:
      "Human-readable federation-style addresses and structured activity history are first-class. The goal is an audit trail your finance and risk teams can follow without reverse-engineering raw chain data for every question. Exports and labels are shaped for review conversations—not for hiding movement behind opaque IDs.",
  },
  {
    title: "Avoiding “promises” that trigger regulatory definitions",
    body:
      "We steer clear of marketing and product copy that could be read as guaranteeing yield, insurance, or regulatory approval. LightRain describes what the software does in engineering and operational terms. Anything that sounds like legal, investment, or regulatory advice belongs with your counsel—not in a vendor brochure.",
  },
] as const;

export function GovernancePage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <MarketingPageShell
      wide
      backTo={isLoggedIn ? "/dashboard" : "/company"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to company"}
    >
      <header className="mb-10 border-b border-neutral-200/80 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Governance</p>
        <h1 className="mt-3 font-display text-3xl font-normal tracking-[0.06em] text-neutral-900 sm:text-4xl">
          Governance &amp; risk posture
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
          A high-level explanation of how LightRain is positioned relative to custody, obligations, and auditability. This
          is orientation for operators and the public—it is <strong className="font-medium text-neutral-800">not</strong>{" "}
          legal advice. Engage qualified counsel for your jurisdiction and use case.
        </p>
      </header>

      <div className="space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.title} className="rounded-2xl border border-neutral-200/90 bg-white/95 p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-900 sm:text-xl">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[15px]">{s.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-12 rounded-xl border border-amber-200/80 bg-amber-50/80 p-4 text-sm text-neutral-800">
        For binding terms and policy downloads, see{" "}
        <Link href="/legal" className="font-medium text-accent underline-offset-2 hover:underline">
          Legal
        </Link>
        . For product help, see{" "}
        <a href="https://support.lightra.in" className="font-medium text-accent underline-offset-2 hover:underline">
          Support
        </a>
        . For the conceptual security overview, see the{" "}
        <Link href="/whitepaper" className="font-medium text-accent underline-offset-2 hover:underline">
          Whitepaper
        </Link>
        .
      </p>
    </MarketingPageShell>
  );
}
