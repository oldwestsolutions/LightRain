"use client";

import Link from "next/link";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

const POINTS = [
  {
    title: "Local-first identity",
    body:
      "Your sign-in and device posture are designed around you controlling the session—not a distant account warehouse that can be reset by a bored support agent. Strong onboarding and recovery exist precisely so you stay in charge.",
  },
  {
    title: "Operator-controlled keys",
    body:
      "Keys and signing policy are yours to configure within the product’s model. LightRain does not present itself as a custodial omnibus where “we” move funds on your behalf without your explicit operator actions.",
  },
  {
    title: "Hardware-backed recovery paths",
    body:
      "Recovery is described in terms of passphrases, backup codes, hardware keys, and encrypted files you hold—not a single reset button that bypasses everything you set up.",
  },
  {
    title: "No pooled funds",
    body:
      "The architecture narrative assumes segregated, attributable flows—not a black pool where customer balances are merged in a way that obscures who owns what on-ledger.",
  },
  {
    title: "No omnibus accounts",
    body:
      "We do not market omnibus settlement as a consumer wallet feature. If your deployment involves omnibus structures, that is a licensed-entity design conversation—not a default LightRain consumer story.",
  },
  {
    title: "No hidden delegation",
    body:
      "Delegation and policy are meant to be visible in the product story: who can sign, what limits apply, and what history exists. “Magic” routing that moves value without a clear actor is contrary to the posture this page describes.",
  },
] as const;

export function SecurityModelPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <MarketingPageShell
      wide
      backTo={isLoggedIn ? "/dashboard" : "/company"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to company"}
    >
      <header className="mb-10 border-b border-neutral-200/80 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Security</p>
        <h1 className="mt-3 font-display text-3xl font-normal tracking-[0.06em] text-neutral-900 sm:text-4xl">
          Security model
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
          Conceptual overview only—not a substitute for technical documentation, penetration tests, or your own threat
          modeling. Use this page to understand how we talk about safety and control in plain language.
        </p>
      </header>

      <ul className="space-y-6">
        {POINTS.map((p) => (
          <li
            key={p.title}
            className="rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-white to-neutral-50/90 p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-lg font-semibold text-neutral-900">{p.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[15px]">{p.body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/governance-risk" className="font-medium text-accent underline-offset-2 hover:underline">
          Governance &amp; risk posture
        </Link>
        <span className="mx-2 text-neutral-300" aria-hidden>
          ·
        </span>
        <Link href="/legal" className="font-medium text-accent underline-offset-2 hover:underline">
          Legal
        </Link>
      </p>
    </MarketingPageShell>
  );
}
