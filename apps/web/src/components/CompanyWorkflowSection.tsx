/**
 * Operator workflow narrative — infrastructure documentation tone (no commerce / custody claims).
 * Scroll-linked diagram: sticky illustration highlights the step most in view.
 * Company route passes `allowStickyDescendants` on the shell so horizontal overflow clipping does not suppress
 * `position: sticky` on the diagram column.
 */

import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CompanyWorkflowSection.module.css";

const STEP_COUNT = 6;

function WorkflowScrollDiagram({
  className = "",
  activeStep,
}: {
  className?: string;
  activeStep: number;
}) {
  const dim = (i: number) =>
    activeStep === i ? "opacity-100" : "opacity-[0.32] transition-opacity duration-500 ease-out";
  const strokeMain = (i: number) => (activeStep === i ? "#262626" : "#a3a3a3");
  const strokeSoft = (i: number) => (activeStep === i ? "#525252" : "#d4d4d4");

  return (
    <svg
      className={className}
      viewBox="0 0 300 1120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="300" height="1120" rx="14" className="fill-neutral-100 stroke-neutral-200" strokeWidth="1" />
      <text x="24" y="34" fill="#737373" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.1em">
        NEUTRAL SCENARIO · ILLUSTRATIVE ONLY
      </text>
      <text x="24" y="52" fill="#a3a3a3" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Same controls may run in parallel or batch in your environment.
      </text>

      {/* Connector 0–1 */}
      <path
        d="M150 168v28"
        stroke={activeStep <= 1 ? strokeMain(Math.max(activeStep, 0)) : "#d4d4d4"}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        className="transition-colors duration-500"
      />

      {/* 1 — Operator console / signal inbox */}
      <g className={dim(0)}>
        <rect x="24" y="72" width="252" height="96" rx="10" fill="#fff" stroke={strokeMain(0)} strokeWidth="1.35" />
        <text x="36" y="92" fill="#737373" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.06em">
          OPERATOR SURFACE
        </text>
        {/* Desk */}
        <rect x="44" y="108" width="88" height="48" rx="4" fill="#fafafa" stroke={strokeSoft(0)} strokeWidth="1" />
        <rect x="52" y="114" width="72" height="28" rx="2" fill="#f5f5f5" stroke={strokeSoft(0)} strokeWidth="0.9" />
        {/* “Inbox” lines on monitor */}
        <path d="M58 122h60M58 128h48M58 134h36" stroke={strokeSoft(0)} strokeWidth="1.2" strokeLinecap="round" />
        <rect x="118" y="118" width="28" height="14" rx="2" fill="#f5f5f5" stroke={strokeMain(0)} strokeWidth="1" />
        <text x="132" y="128" textAnchor="middle" fill="#525252" fontSize="7" fontFamily="ui-monospace, monospace">
          EVT
        </text>
        {/* Operator silhouette */}
        <circle cx="214" cy="124" r="10" fill="#e5e5e5" stroke={strokeSoft(0)} strokeWidth="1" />
        <path d="M198 148h32M204 156h20" stroke={strokeSoft(0)} strokeWidth="2" strokeLinecap="round" />
        <text x="150" y="182" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600">
          1 · Signal received
        </text>
      </g>

      <path
        d="M150 200v32"
        stroke={activeStep >= 1 && activeStep <= 2 ? strokeMain(1) : "#d4d4d4"}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        className="transition-colors duration-500"
      />

      {/* 2 — Federation / routing tables */}
      <g className={dim(1)}>
        <rect x="24" y="232" width="252" height="104" rx="10" fill="#fff" stroke={strokeMain(1)} strokeWidth="1.35" />
        <text x="36" y="252" fill="#737373" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.06em">
          ROUTING &amp; CONTEXT
        </text>
        <rect x="40" y="262" width="100" height="62" rx="4" fill="#fafafa" stroke={strokeSoft(1)} strokeWidth="1" />
        <path d="M48 274h84M48 284h72M48 294h84M48 304h60" stroke={strokeSoft(1)} strokeWidth="1" strokeLinecap="round" />
        <text x="48" y="272" fill="#a3a3a3" fontSize="7" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Published tables
        </text>
        <circle cx="188" cy="278" r="6" fill="#f5f5f5" stroke={strokeSoft(1)} strokeWidth="1" />
        <circle cx="214" cy="292" r="6" fill="#f5f5f5" stroke={strokeSoft(1)} strokeWidth="1" />
        <circle cx="232" cy="270" r="6" fill="#f5f5f5" stroke={strokeSoft(1)} strokeWidth="1" />
        <path d="M188 278l18 10M214 292l12-16M232 270l-28 20" stroke={strokeSoft(1)} strokeWidth="1" />
        <rect x="168" y="300" width="92" height="20" rx="3" fill="#fafafa" stroke={strokeMain(1)} strokeWidth="1" />
        <text x="214" y="314" textAnchor="middle" fill="#525252" fontSize="7" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Validation task queue
        </text>
        <text x="150" y="348" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600">
          2 · Address &amp; context
        </text>
      </g>

      <path
        d="M150 352v28"
        stroke={activeStep >= 2 && activeStep <= 3 ? strokeMain(2) : "#d4d4d4"}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        className="transition-colors duration-500"
      />

      {/* 3 — Policy + ML assist */}
      <g className={dim(2)}>
        <rect x="24" y="380" width="252" height="112" rx="10" fill="#fff" stroke={strokeMain(2)} strokeWidth="1.35" />
        <text x="36" y="400" fill="#737373" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.06em">
          POLICY ENGINE · ML ASSIST
        </text>
        <rect x="40" y="410" width="72" height="40" rx="4" fill="#fafafa" stroke={strokeSoft(2)} strokeWidth="1" />
        <path d="M50 422h52M50 432h40M50 442h52" stroke={strokeSoft(2)} strokeWidth="1" strokeLinecap="round" />
        <text x="44" y="418" fill="#a3a3a3" fontSize="6.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Thresholds
        </text>
        <rect x="122" y="410" width="72" height="40" rx="4" fill="#fafafa" stroke={strokeSoft(2)} strokeWidth="1" />
        <path d="M132 424h16l-4 8l4 8h-16l4-8-4-8z" stroke={strokeSoft(2)} strokeWidth="0.9" fill="none" />
        <text x="128" y="418" fill="#a3a3a3" fontSize="6.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Dual control
        </text>
        <rect x="204" y="410" width="64" height="40" rx="4" fill="#fafafa" stroke={strokeMain(2)} strokeWidth="1" />
        <text x="236" y="430" textAnchor="middle" fill="#404040" fontSize="8" fontFamily="ui-monospace, monospace">
          ML
        </text>
        <text x="236" y="440" textAnchor="middle" fill="#737373" fontSize="6" fontFamily="ui-sans-serif, system-ui, sans-serif">
          assist
        </text>
        <rect x="40" y="458" width="228" height="24" rx="4" fill="#f5f5f5" stroke={strokeSoft(2)} strokeWidth="1" />
        <path d="M48 470h200" stroke={strokeSoft(2)} strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="150" y="474" textAnchor="middle" fill="#737373" fontSize="7" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Policy outcomes only — no model override of officer paths
        </text>
        <text x="150" y="506" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600">
          3 · Policy checks
        </text>
      </g>

      <path
        d="M150 508v28"
        stroke={activeStep >= 3 && activeStep <= 4 ? strokeMain(3) : "#d4d4d4"}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        className="transition-colors duration-500"
      />

      {/* 4 — Offline / HSM posture */}
      <g className={dim(3)}>
        <rect x="24" y="536" width="252" height="108" rx="10" fill="#fff" stroke={strokeMain(3)} strokeWidth="1.35" />
        <rect x="34" y="546" width="232" height="88" rx="8" fill="none" stroke={strokeSoft(3)} strokeWidth="1.2" strokeDasharray="6 5" />
        <text x="36" y="562" fill="#737373" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.06em">
          OPTIONAL OFFLINE / SEGREGATED SIGNING
        </text>
        <rect x="48" y="574" width="76" height="48" rx="4" fill="#fafafa" stroke={strokeSoft(3)} strokeWidth="1" />
        <rect x="58" y="584" width="56" height="8" rx="1" fill="#e5e5e5" stroke="none" />
        <rect x="58" y="596" width="40" height="8" rx="1" fill="#e5e5e5" stroke="none" />
        <rect x="58" y="608" width="48" height="8" rx="1" fill="#e5e5e5" stroke="none" />
        <path d="M132 598h36" stroke={strokeMain(3)} strokeWidth="1.2" strokeDasharray="4 3" />
        <rect x="176" y="576" width="84" height="44" rx="4" fill="#f5f5f5" stroke={strokeMain(3)} strokeWidth="1" />
        <rect x="186" y="586" width="20" height="24" rx="2" fill="#e5e5e5" stroke={strokeSoft(3)} strokeWidth="0.9" />
        <rect x="212" y="586" width="20" height="24" rx="2" fill="#e5e5e5" stroke={strokeSoft(3)} strokeWidth="0.9" />
        <rect x="238" y="586" width="14" height="24" rx="2" fill="#e5e5e5" stroke={strokeSoft(3)} strokeWidth="0.9" />
        <text x="218" y="618" textAnchor="middle" fill="#737373" fontSize="6.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Operator devices
        </text>
        <text x="150" y="658" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600">
          4 · Sign / confirm
        </text>
      </g>

      <path
        d="M150 660v28"
        stroke={activeStep >= 4 && activeStep <= 5 ? strokeMain(4) : "#d4d4d4"}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        className="transition-colors duration-500"
      />

      {/* 5 — Execution rail */}
      <g className={dim(4)}>
        <rect x="24" y="688" width="252" height="96" rx="10" fill="#fff" stroke={strokeMain(4)} strokeWidth="1.35" />
        <text x="36" y="708" fill="#737373" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.06em">
          EXECUTION SURFACE
        </text>
        <rect x="40" y="718" width="220" height="28" rx="4" fill="#fafafa" stroke={strokeSoft(4)} strokeWidth="1" />
        <path d="M52 732h196" stroke={strokeSoft(4)} strokeWidth="2" strokeLinecap="round" />
        <polygon points="228,732 238,726 238,738" fill={activeStep === 4 ? "#404040" : "#d4d4d4"} className="transition-colors duration-500" />
        <text x="52" y="728" fill="#a3a3a3" fontSize="7" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Authorized instruction → configured rails
        </text>
        <rect x="40" y="752" width="220" height="22" rx="3" fill="#f5f5f5" stroke={strokeSoft(4)} strokeWidth="0.9" />
        <path d="M48 764h24M80 764h160" stroke={strokeSoft(4)} strokeWidth="1" strokeLinecap="round" />
        <text x="150" y="800" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600">
          5 · Execution
        </text>
      </g>

      <path
        d="M150 804v28"
        stroke={activeStep >= 5 ? strokeMain(5) : "#d4d4d4"}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        className="transition-colors duration-500"
      />

      {/* 6 — Evidence / audit */}
      <g className={dim(5)}>
        <rect x="24" y="832" width="252" height="116" rx="10" fill="#fff" stroke={strokeMain(5)} strokeWidth="1.35" />
        <text x="36" y="852" fill="#737373" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.06em">
          EVIDENCE &amp; SUPERVISORY READOUT
        </text>
        <rect x="40" y="860" width="56" height="72" rx="3" fill="#fafafa" stroke={strokeSoft(5)} strokeWidth="1" />
        <path d="M48 872h40M48 882h32M48 892h40M48 902h28M48 912h36" stroke={strokeSoft(5)} strokeWidth="0.9" strokeLinecap="round" />
        <text x="68" y="942" textAnchor="middle" fill="#a3a3a3" fontSize="6.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Log spine
        </text>
        <rect x="108" y="868" width="72" height="56" rx="4" fill="#f5f5f5" stroke={strokeMain(5)} strokeWidth="1" />
        <path d="M118 880h52M118 890h40M118 900h52" stroke={strokeSoft(5)} strokeWidth="0.9" strokeLinecap="round" />
        <text x="144" y="936" textAnchor="middle" fill="#737373" fontSize="6.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Export bundle
        </text>
        <rect x="192" y="868" width="68" height="56" rx="4" fill="#fafafa" stroke={strokeSoft(5)} strokeWidth="1" />
        <rect x="200" y="878" width="52" height="10" rx="1" fill="#e5e5e5" />
        <text x="226" y="898" textAnchor="middle" fill="#404040" fontSize="7" fontFamily="ui-monospace, monospace">
          ML meta
        </text>
        <text x="226" y="910" textAnchor="middle" fill="#737373" fontSize="6" fontFamily="ui-sans-serif, system-ui, sans-serif">
          id + schema
        </text>
        <text x="150" y="958" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600">
          6 · Evidence &amp; review
        </text>
      </g>
    </svg>
  );
}

const STEPS = [
  {
    n: "1",
    title: "Signal received",
    body:
      "A settlement-related event appears in the operator console: amount band, counterparty label, and routing metadata supplied by your configuration. No asset class or outcome is implied; the signal is a structured notification for review within your own procedures.",
  },
  {
    n: "2",
    title: "Address and context validation",
    body:
      "Federation endpoints and labels are resolved against published routing tables and change windows your team controls. Discrepancies surface as validation tasks—not automatic reroutes—so humans decide whether to proceed, pause, or escalate.",
  },
  {
    n: "3",
    title: "Policy checks",
    body:
      "Thresholds, dual-control rules, and counterparty allow-lists you configured are evaluated before any execution step. ML-assisted layers may flag anomalies against baselines; they do not override policy or substitute for approvals reserved to officers or committees.",
  },
  {
    n: "4",
    title: "Optional offline signing",
    body:
      "Where your program requires it, signing can occur on air-gapped or hardware-assisted workflows outside the primary console. LightRain describes this as an integration posture—operators supply devices and procedures; the platform does not sell or custody hardware.",
  },
  {
    n: "5",
    title: "Execution",
    body:
      "After explicit operator confirmation consistent with policy, execution surfaces record the authorized transition. The system does not perform discretionary trading or rebalance portfolios; it applies the operator-approved instruction set to the configured rails.",
  },
  {
    n: "6",
    title: "Evidence and review",
    body:
      "Immutable-style logs, acknowledgements, and export bundles are assembled for audit and supervisory review. ML-derived annotations, when enabled, are attached with model and schema identifiers so downstream readers can reconstruct what was visible at review time.",
  },
] as const;

function useScrollLinkedStep(stepCount: number, stepsScrollRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  }, []);

  useEffect(() => {
    const elements = refs.current;
    const stepsScroller = stepsScrollRef.current;

    const pickActive = () => {
      let bestIdx = 0;
      let bestRatio = -1;
      for (let i = 0; i < stepCount; i++) {
        const el = elements[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 0;
        const top = Math.max(r.top, 0);
        const bottom = Math.min(r.bottom, vh);
        const visible = Math.max(0, bottom - top);
        const ratio = r.height > 0 ? visible / r.height : 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestIdx = i;
        }
      }
      setActive(Math.min(Math.max(bestIdx, 0), stepCount - 1));
    };

    const observer = new IntersectionObserver(
      () => {
        pickActive();
      },
      { root: null, rootMargin: "-22% 0px -42% 0px", threshold: [0, 0.05, 0.12, 0.2, 0.35, 0.5, 0.65, 0.85, 1] }
    );

    for (let i = 0; i < stepCount; i++) {
      const el = elements[i];
      if (el) observer.observe(el);
    }

    const onScroll = () => pickActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    stepsScroller?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    pickActive();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      stepsScroller?.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [stepCount, stepsScrollRef]);

  return { activeStep: active, setRef };
}

export function CompanyWorkflowSection() {
  const stepsScrollRef = useRef<HTMLDivElement>(null);
  const { activeStep, setRef } = useScrollLinkedStep(STEP_COUNT, stepsScrollRef);

  return (
    <section
      className="rounded-2xl border border-neutral-200/90 bg-white shadow-card"
      aria-labelledby="workflow-heading"
    >
      <div className="border-b border-neutral-200/80 bg-neutral-50/90 px-5 py-6 sm:px-8 sm:py-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Workflow</p>
        <h2 id="workflow-heading" className="mt-1 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
          How an operator uses LightRain
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-[15px]">
          LightRain is infrastructure for settlement discipline—not a storefront, not a custodian, and not a substitute for
          your licensed counterparties. The sequence below is representative of how federation addressing, policy
          engines, ML-assisted integrity signals, and execution surfaces can fit together when your organization wires
          them into its own controls. From medium breakpoints up, use the narrative column’s scrollbar: the schematic
          beside it tracks the active stage, and scroll-bound motion on the diagram is tied to that column’s scroll
          position where the browser exposes named scroll timelines (otherwise it follows the document scroll).
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-[15px]">
          Modern CSS supports scroll-linked animations via animation-timeline—covering staged text reveals, synchronized
          transitions, and scroll-bound motion. The presentation below uses the same intent for legibility: the
          schematic remains anchored while each stage advances in sequence, mirroring how operators read structured
          events under review rather than serving as ornament.
        </p>
      </div>

      <div className="p-5 sm:p-8">
        <div
          className={`grid grid-cols-1 gap-10 md:grid-cols-[minmax(240px,38%)_minmax(0,1fr)] md:items-start md:gap-10 xl:gap-12 ${styles.workflowScrollRoot}`}
        >
          <div className="relative min-w-0">
            <div className="md:sticky md:top-24 md:pb-8">
              <figure
                className={`overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-50/50 shadow-sm ${styles.diagramCard}`}
              >
                <div className={`p-3 sm:p-4 ${styles.diagramSvgMotion}`}>
                  <WorkflowScrollDiagram
                    className="mx-auto h-auto w-full max-w-[320px] text-neutral-900 md:max-w-none"
                    activeStep={activeStep}
                  />
                </div>
                <figcaption
                  className={`border-t border-neutral-200/60 px-3 pb-3 pt-3 text-center text-[11px] leading-relaxed text-muted sm:px-4 sm:pb-4 sm:pt-3.5 sm:text-xs md:text-left ${styles.diagramCaptionMotion}`}
                >
                  Illustrative pipeline: structured events enter the operator surface; routing and federation labels are checked
                  against tables you publish; policy and ML-assist layers produce auditable outcomes without displacing committee
                  approvals; optional segregated signing reflects your hardware posture; execution writes to configured rails
                  only after explicit confirmation; immutable-style logs, acknowledgements, and export bundles (with ML metadata
                  when enabled) complete the supervisory record. Ordering, branching, and omissions are deployment-specific and
                  should follow counsel and supervisory guidance.
                </figcaption>
              </figure>
              <p
                className={`mt-3 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-muted ${styles.activeHintMotion}`}
                aria-live="polite"
              >
                Active stage · {STEPS[activeStep]?.n} — {STEPS[activeStep]?.title}
              </p>
            </div>
          </div>

          <div ref={stepsScrollRef} className={`min-w-0 space-y-0 ${styles.stepsScroller}`}>
            {STEPS.map((step, index) => (
              <article
                key={step.n}
                ref={setRef(index)}
                data-workflow-step={index}
                className={`${styles.stepReveal} scroll-mt-28 border-l-2 py-10 pl-5 transition-[border-color] duration-500 sm:scroll-mt-32 sm:py-12 sm:pl-7 md:min-h-[min(62vh,480px)] md:py-14 md:pl-8 ${
                  activeStep === index ? "border-accent" : "border-neutral-300"
                }`}
              >
                <p className="font-mono text-xs font-bold text-accent">{step.n}</p>
                <h3 className="mt-1 text-base font-semibold text-neutral-900 sm:text-lg">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[15px]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-neutral-200/80 bg-neutral-50/80 px-4 py-4 text-sm leading-relaxed text-neutral-700 md:mt-14">
          <p className="font-medium text-neutral-900">Differentiators in this workflow</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted">
            <li>Federation endpoints and labels that remain legible under review</li>
            <li>ML-assisted integrity signals that assist—not replace—operators and counsel</li>
            <li>Operator-controlled policy and approval boundaries</li>
            <li>Audit-ready evidence exports with stable identifiers for downstream archives</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
