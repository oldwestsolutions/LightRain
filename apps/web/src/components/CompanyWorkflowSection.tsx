/**
 * Operator workflow — infrastructure documentation tone (no commerce / custody claims).
 * Five stages in parallel rows: each row is diagram + narrative side-by-side (md+).
 * Scroll-based highlighting: active row accent + diagrams use global active step for sync.
 */

import { useCallback, useEffect, useRef, useState } from "react";

const STEP_COUNT = 5;

/** Full pipeline; indices 0–4 (offline-signing stage omitted). Execution & evidence translated up in SVG. */
function WorkflowScrollDiagram({
  className = "",
  activeStep,
}: {
  className?: string;
  activeStep: number;
}) {
  const dim = (i: number) =>
    activeStep === i ? "opacity-100" : "opacity-[0.28] transition-opacity duration-500 ease-out";
  const strokeMain = (i: number) => (activeStep === i ? "#262626" : "#a3a3a3");
  const strokeSoft = (i: number) => (activeStep === i ? "#525252" : "#d4d4d4");

  return (
    <svg
      className={className}
      viewBox="0 0 300 830"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="300" height="830" rx="14" className="fill-neutral-100 stroke-neutral-200" strokeWidth="1" />
      <text x="24" y="34" fill="#737373" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.1em">
        NEUTRAL SCENARIO · ILLUSTRATIVE ONLY
      </text>
      <text x="24" y="52" fill="#a3a3a3" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Same controls may run in parallel or batch in your environment.
      </text>

      <path
        d="M150 168v28"
        stroke={activeStep <= 1 ? strokeMain(Math.max(activeStep, 0)) : "#d4d4d4"}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        className="transition-colors duration-500"
      />

      <g className={dim(0)}>
        <rect x="24" y="72" width="252" height="96" rx="10" fill="#fff" stroke={strokeMain(0)} strokeWidth="1.35" />
        <text x="36" y="92" fill="#737373" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.06em">
          OPERATOR SURFACE
        </text>
        <rect x="44" y="108" width="88" height="48" rx="4" fill="#fafafa" stroke={strokeSoft(0)} strokeWidth="1" />
        <rect x="52" y="114" width="72" height="28" rx="2" fill="#f5f5f5" stroke={strokeSoft(0)} strokeWidth="0.9" />
        <path d="M58 122h60M58 128h48M58 134h36" stroke={strokeSoft(0)} strokeWidth="1.2" strokeLinecap="round" />
        <rect x="118" y="118" width="28" height="14" rx="2" fill="#f5f5f5" stroke={strokeMain(0)} strokeWidth="1" />
        <text x="132" y="128" textAnchor="middle" fill="#525252" fontSize="7" fontFamily="ui-monospace, monospace">
          EVT
        </text>
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
        stroke={activeStep >= 2 && activeStep <= 3 ? strokeMain(Math.min(Math.max(activeStep, 2), 3)) : "#d4d4d4"}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        className="transition-colors duration-500"
      />

      <g transform="translate(0 -152)">
        <g className={dim(3)}>
          <rect x="24" y="688" width="252" height="96" rx="10" fill="#fff" stroke={strokeMain(3)} strokeWidth="1.35" />
          <text x="36" y="708" fill="#737373" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.06em">
            EXECUTION SURFACE
          </text>
          <rect x="40" y="718" width="220" height="28" rx="4" fill="#fafafa" stroke={strokeSoft(3)} strokeWidth="1" />
          <path d="M52 732h196" stroke={strokeSoft(3)} strokeWidth="2" strokeLinecap="round" />
          <polygon points="228,732 238,726 238,738" fill={activeStep === 3 ? "#404040" : "#d4d4d4"} className="transition-colors duration-500" />
          <text x="52" y="728" fill="#a3a3a3" fontSize="7" fontFamily="ui-sans-serif, system-ui, sans-serif">
            Authorized instruction → configured rails
          </text>
          <rect x="40" y="752" width="220" height="22" rx="3" fill="#f5f5f5" stroke={strokeSoft(3)} strokeWidth="0.9" />
          <path d="M48 764h24M80 764h160" stroke={strokeSoft(3)} strokeWidth="1" strokeLinecap="round" />
          <text x="150" y="800" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600">
            4 · Execution
          </text>
        </g>

        <path
          d="M150 804v28"
          stroke={activeStep >= 3 ? strokeMain(Math.max(activeStep, 3)) : "#d4d4d4"}
          strokeWidth="1.5"
          strokeDasharray="5 4"
          className="transition-colors duration-500"
        />

        <g className={dim(4)}>
          <rect x="24" y="832" width="252" height="116" rx="10" fill="#fff" stroke={strokeMain(4)} strokeWidth="1.35" />
          <text x="36" y="852" fill="#737373" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.06em">
            EVIDENCE &amp; SUPERVISORY READOUT
          </text>
          <rect x="40" y="860" width="56" height="72" rx="3" fill="#fafafa" stroke={strokeSoft(4)} strokeWidth="1" />
          <path d="M48 872h40M48 882h32M48 892h40M48 902h28M48 912h36" stroke={strokeSoft(4)} strokeWidth="0.9" strokeLinecap="round" />
          <text x="68" y="942" textAnchor="middle" fill="#a3a3a3" fontSize="6.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
            Log spine
          </text>
          <rect x="108" y="868" width="72" height="56" rx="4" fill="#f5f5f5" stroke={strokeMain(4)} strokeWidth="1" />
          <path d="M118 880h52M118 890h40M118 900h52" stroke={strokeSoft(4)} strokeWidth="0.9" strokeLinecap="round" />
          <text x="144" y="936" textAnchor="middle" fill="#737373" fontSize="6.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
            Export bundle
          </text>
          <rect x="192" y="868" width="68" height="56" rx="4" fill="#fafafa" stroke={strokeSoft(4)} strokeWidth="1" />
          <rect x="200" y="878" width="52" height="10" rx="1" fill="#e5e5e5" />
          <text x="226" y="898" textAnchor="middle" fill="#404040" fontSize="7" fontFamily="ui-monospace, monospace">
            ML meta
          </text>
          <text x="226" y="910" textAnchor="middle" fill="#737373" fontSize="6" fontFamily="ui-sans-serif, system-ui, sans-serif">
            id + schema
          </text>
          <text x="150" y="958" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600">
            5 · Evidence &amp; review
          </text>
        </g>
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
    title: "Execution",
    body:
      "After explicit operator confirmation consistent with policy, execution surfaces record the authorized transition. The system does not perform discretionary trading or rebalance portfolios; it applies the operator-approved instruction set to the configured rails.",
  },
  {
    n: "5",
    title: "Evidence and review",
    body:
      "Immutable-style logs, acknowledgements, and export bundles are assembled for audit and supervisory review. ML-derived annotations, when enabled, are attached with model and schema identifiers so downstream readers can reconstruct what was visible at review time.",
  },
] as const;

function useActiveWorkflowStep(stepCount: number) {
  const [activeStep, setActiveStep] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  }, []);

  useEffect(() => {
    const elements = refs.current;

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
      setActiveStep(Math.min(Math.max(bestIdx, 0), stepCount - 1));
    };

    const observer = new IntersectionObserver(pickActive, {
      root: null,
      rootMargin: "-10% 0px -35% 0px",
      threshold: [0, 0.08, 0.2, 0.35, 0.5, 0.65, 0.85, 1],
    });

    for (let i = 0; i < stepCount; i++) {
      const el = elements[i];
      if (el) observer.observe(el);
    }

    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive, { passive: true });
    pickActive();

    return () => {
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
      observer.disconnect();
    };
  }, [stepCount]);

  return { activeStep, setRef };
}

function WorkflowFigure({ activeStep, className = "" }: { activeStep: number; className?: string }) {
  return (
    <figure
      className={`rounded-xl border border-neutral-200/90 bg-white p-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-black/[0.03] sm:p-4 ${className}`}
      aria-label="Illustrative workflow schematic"
    >
      <WorkflowScrollDiagram
        className="mx-auto h-auto w-full max-w-[min(100%,280px)] text-neutral-900 sm:max-w-[300px] md:max-w-[min(100%,260px)] lg:max-w-[280px]"
        activeStep={activeStep}
      />
    </figure>
  );
}

export function CompanyWorkflowSection() {
  const { activeStep, setRef } = useActiveWorkflowStep(STEP_COUNT);

  return (
    <section className="rounded-2xl border border-neutral-200/90 bg-white shadow-card" aria-labelledby="workflow-heading">
      <header className="border-b border-neutral-200/80 bg-gradient-to-b from-neutral-50/95 to-neutral-50/60 px-6 py-8 sm:px-10 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Workflow</p>
        <h2 id="workflow-heading" className="mt-2 font-display text-2xl font-normal tracking-[0.04em] text-neutral-900 sm:text-3xl">
          How an operator uses LightRain
        </h2>
        <div className="mt-6 max-w-4xl space-y-4 text-sm leading-[1.7] text-neutral-600 sm:text-[15px]">
          <p>
            LightRain is infrastructure for settlement discipline—not a storefront, not a custodian, and not a substitute
            for your licensed counterparties. The sequence that follows is representative of how federation addressing,
            policy engines, ML-assisted integrity signals, and execution surfaces can fit together when your organization
            wires them into its own controls.
          </p>
          <p className="text-neutral-500">
            Each row pairs the reference schematic with one stage. The schematic highlights the stage most in view as you
            scroll. Deployment order, branching, and omissions remain subject to counsel and supervisory guidance.
          </p>
        </div>
      </header>

      <div className="w-full px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        <p className="mb-8 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 md:text-left" aria-live="polite">
          Pipeline highlight · {STEPS[activeStep]?.n} — {STEPS[activeStep]?.title}
        </p>

        <ol className="list-none space-y-0 divide-y divide-neutral-200/80 p-0">
          {STEPS.map((step, index) => (
            <li key={step.n}>
              <article
                ref={setRef(index)}
                id={`workflow-stage-${step.n}`}
                aria-labelledby={`workflow-stage-title-${step.n}`}
                className={`scroll-mt-28 py-10 transition-[background-color,box-shadow] duration-300 sm:scroll-mt-32 md:grid md:grid-cols-2 md:items-start md:gap-8 md:py-12 lg:gap-10 xl:gap-12 ${
                  activeStep === index ? "bg-neutral-50/80 md:shadow-[inset_0_0_0_1px_rgba(23,23,23,0.08)]" : "bg-transparent"
                }`}
              >
                <div className="min-w-0 px-1 md:px-2 md:pt-1">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 md:mb-4">
                    Reference schematic
                  </p>
                  <WorkflowFigure activeStep={activeStep} className="w-full" />
                </div>

                <div className="mt-8 min-w-0 border-t border-neutral-100 pt-8 md:mt-0 md:border-t-0 md:pt-1 md:pl-2">
                  <div className="flex gap-4 sm:gap-6">
                    <span
                      className="w-8 shrink-0 font-mono text-[11px] font-semibold tabular-nums text-neutral-400 sm:w-9"
                      aria-hidden
                    >
                      {step.n.padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        id={`workflow-stage-title-${step.n}`}
                        className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl"
                      >
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.75] text-neutral-600 sm:mt-4 sm:text-base sm:leading-[1.8]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <footer className="mt-12 border-t border-neutral-200/90 pt-10 sm:mt-14 sm:pt-12">
          <p className="text-sm font-semibold text-neutral-900">Differentiators in this workflow</p>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-neutral-600 sm:grid-cols-2 sm:gap-x-10 lg:max-w-5xl">
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span>Federation endpoints and labels that remain legible under review</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span>ML-assisted integrity signals that assist—not replace—operators and counsel</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span>Operator-controlled policy and approval boundaries</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span>Audit-ready evidence exports with stable identifiers for downstream archives</span>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
}
