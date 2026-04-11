"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-8 rounded-2xl border border-neutral-200/90 bg-white/95 p-6 shadow-sm sm:p-8"
      aria-labelledby={`${id}-heading`}
    >
      <h2 id={`${id}-heading`} className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700 sm:text-[15px]">{children}</div>
    </section>
  );
}

export function AssuranceLayersPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <MarketingPageShell
      extraWide
      backTo={isLoggedIn ? "/dashboard" : "/company"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to company"}
    >
      <header className="mb-10 max-w-3xl border-b border-neutral-200/80 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Assurance</p>
        <h1 className="mt-3 font-display text-3xl font-normal tracking-[0.06em] text-neutral-900 sm:text-4xl">
          Assurance layers
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">
          This document describes how LightRain may employ machine-learning techniques to assist human operators and
          supervisory workflows. It is written for risk, compliance, and engineering readers who require legible boundaries
          between software assistance and decision authority. Nothing here constitutes legal advice, an assertion of
          regulatory clearance, or a guarantee of risk outcomes.
        </p>
      </header>

      <div className="mx-auto max-w-3xl space-y-8">
        <DocSection id="overview" title="Overview">
          <p>
            LightRain treats machine learning as an analytical layer over signals the system already records: addressing
            metadata, device and authentication posture, execution and settlement events, and policy configuration supplied
            by the operator. Models may summarize, rank, cluster, or flag deviations from established baselines. They do
            not initiate transfers, override limits, alter policy, or substitute for approvals defined outside the model.
          </p>
          <p>
            Outputs are designed for review: surfaced in consoles, appended to evidence exports where appropriate, and
            attributable to the model version and input window that produced them. Operators and counsel remain accountable
            for actions taken in response to—or in disregard of—assisted signals.
          </p>
        </DocSection>

        <DocSection id="ml-assisted-addressing" title="ML-assisted addressing">
          <p>
            Federation-style identifiers and their on-chain bindings change over time through rotation, routing updates,
            and counterparty edits. LightRain may apply ML-assisted checks to detect structural anomalies in address
            records—such as inconsistent label resolution, unexpected cross-references, or drift between published endpoints
            and observed settlement paths—relative to historical norms for the same operator namespace.
          </p>
          <p>
            Findings are advisory. They do not validate the legal or commercial standing of a counterparty, and they do
            not replace manual verification where your program requires it.
          </p>
        </DocSection>

        <DocSection id="behavioral-baselines" title="Behavioral baselines">
          <p>
            Where enabled, the system may establish statistical baselines over operator-permitted windows: typical signing
            cadence, session geography bands, device class mix, and volume bands appropriate to the declared use case.
            Departures from baseline are scored for visibility, not for automated sanction. Threshold breaches surface as
            ranked signals with supporting context for human triage.
          </p>
          <p>
            Baselines are configurable and auditable; they are not static consumer “fraud scores” and are not marketed as
            definitive measures of intent or creditworthiness.
          </p>
        </DocSection>

        <DocSection id="device-key-anomalies" title="Device and key anomaly detection">
          <p>
            Authentication events, WebAuthn registrations, and key-management operations generate discrete signals suitable
            for change-point and rarity analysis. LightRain may highlight sequences that diverge from the operator’s
            documented recovery posture—for example, atypical re-enrollment bursts, concurrent registrations from
            disjoint device classes, or recovery paths inconsistent with prior policy declarations.
          </p>
          <p>
            Such signals strengthen auditability by reducing silent failure modes; they do not lock accounts or rotate
            credentials unless an explicit, separately configured policy action—defined by the operator—does so.
          </p>
        </DocSection>

        <DocSection id="counterparty-drift" title="Counterparty-context drift detection">
          <p>
            Settlement and messaging context may be compared against stored counterparty metadata and prior interaction
            shapes. ML-assisted comparison can flag material drift: naming collisions, routing table changes that do not
            match published change windows, or message patterns inconsistent with historical correspondence. The objective
            is early visibility for operators who must document due diligence—not automated adjudication of counterparty
            risk.
          </p>
        </DocSection>

        <DocSection id="policy-aligned-detection" title="Policy-aligned detection">
          <p>
            Policy engines encode limits and obligations supplied by the operator and counsel. ML layers may map observed
            flows to those encodings and emit warnings when observed behavior approaches configured boundaries or when
            novel patterns lack a mapped policy branch. Warnings reference the governing policy identifier and the
            evidence slice that triggered review; they do not rewrite policy or infer permissions absent explicit rules.
          </p>
          <p>
            Policy-aligned detection is strictly assistive: it does not approve, reject, or reroute transactions, and it
            does not substitute for supervisory or committee decisions where your program reserves those roles to humans.
          </p>
        </DocSection>

        <DocSection id="execution-integrity" title="Execution integrity">
          <p>
            Execution and settlement telemetry may be monitored for internal consistency: sequencing errors, unexpected
            state transitions, duplicate postings, or latency excursions relative to service-level expectations declared by
            the operator. ML summarization can compress high-volume logs into operator-scoped incident sketches suitable for
            post-trade review. No model output constitutes a trade recommendation, a valuation, or a decision to execute.
          </p>
        </DocSection>

        <DocSection id="evidence-audit" title="Evidence and audit surfaces">
          <p>
            When retained, ML-derived annotations are written to evidence-grade logs with stable identifiers: model
            version, feature schema version, input time bounds, and the operator user or role that acknowledged or
            dismissed the signal. Exports mirror these fields so downstream archival systems can reproduce the context
            that was visible at review time.
          </p>
          <p>
            Enrichment with ML context is optional per deployment; disabling it reduces assisted analytics but does not
            remove underlying transactional records required for ordinary operations.
          </p>
        </DocSection>

        <DocSection id="operator-controls" title="Operator controls">
          <p>
            Operators configure which signals are computed, at what cadence, and which roles may view or acknowledge them.
            Retention windows, redaction rules for exports, and separation-of-duties for model configuration changes follow
            the same administrative controls as other high-privilege settings. Audit trails record configuration mutations.
          </p>
        </DocSection>

        <DocSection id="limits-guarantees" title="Limits and guarantees">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              ML does not eliminate risk, predict outcomes, or certify compliance with any statute or supervisory
              expectation.
            </li>
            <li>
              ML does not execute financial flows, approve transactions, or replace human or committee approvals where
              your program requires them.
            </li>
            <li>
              ML does not provide legal, investment, or regulatory advice; interpretive questions belong with qualified
              counsel and supervisors.
            </li>
            <li>
              Signals may be incomplete, delayed, or incorrect; operators are responsible for escalation paths when
              assisted review conflicts with other controls.
            </li>
          </ul>
        </DocSection>

        <p className="rounded-xl border border-neutral-200/80 bg-neutral-50/90 p-4 text-xs leading-relaxed text-muted">
          Related:{" "}
          <Link href="/governance" className="font-medium text-accent underline-offset-2 hover:underline">
            Governance
          </Link>
          <span className="mx-1.5 text-neutral-300">·</span>
          <Link href="/whitepaper" className="font-medium text-accent underline-offset-2 hover:underline">
            Whitepaper
          </Link>
          <span className="mx-1.5 text-neutral-300">·</span>
          <Link href="/legal" className="font-medium text-accent underline-offset-2 hover:underline">
            Legal
          </Link>
        </p>
      </div>
    </MarketingPageShell>
  );
}
