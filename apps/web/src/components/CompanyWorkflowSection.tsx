/**
 * Operator workflow — infrastructure documentation tone (no commerce / custody claims).
 * Each stage row shows one focused illustration; a slim pipeline rail syncs to scroll position.
 */

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const rowFigureSpring = { type: "spring" as const, stiffness: 380, damping: 34, mass: 0.85 };

const STEP_COUNT = 5;

const fontSans = "ui-sans-serif, system-ui, sans-serif";
const fontMono = "ui-monospace, monospace";

function WorkflowPipelineRail({ activeStep }: { activeStep: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="mb-10 rounded-xl border border-neutral-200/80 bg-neutral-50/80 px-4 py-4 sm:px-5"
      role="group"
      aria-label="Workflow progress across five stages"
    >
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Pipeline position</p>
      <div className="flex items-center gap-1 sm:gap-1.5">
        {Array.from({ length: STEP_COUNT }, (_, i) => (
          <div key={i} className="flex flex-1 items-center gap-1 sm:gap-1.5">
            <motion.div
              initial={false}
              animate={{
                scale: activeStep === i ? 1.12 : 1,
                backgroundColor: activeStep === i ? "#171717" : activeStep > i ? "#404040" : "#d4d4d4",
              }}
              transition={reduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 420, damping: 32 }}
              className="relative z-[1] size-2.5 shrink-0 rounded-full sm:size-3"
            />
            {i < STEP_COUNT - 1 ? (
              <div className="relative h-0.5 min-w-0 flex-1 overflow-hidden rounded-full bg-neutral-200">
                <motion.div
                  initial={false}
                  className="absolute inset-y-0 left-0 rounded-full bg-neutral-800"
                  animate={{
                    width: activeStep > i ? "100%" : activeStep === i ? "50%" : "0%",
                  }}
                  transition={reduceMotion ? { duration: 0.01 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-neutral-600 sm:text-[13px]">
        <span className="font-medium text-neutral-800">Now viewing:</span> stage {activeStep + 1} of {STEP_COUNT}
      </p>
    </div>
  );
}

/** Single-stage schematic — matches hero key/wallet/fed panel language; accent color per stage. */
function WorkflowStageIllustration({
  stageIndex,
  energized,
  className = "",
}: {
  stageIndex: number;
  energized: boolean;
  className?: string;
}) {
  const gid = `wfs${stageIndex}`;
  const main = energized ? "#262626" : "#a3a3a3";
  const soft = energized ? "#64748b" : "#b4b4b4";
  const label = energized ? "#64748b" : "#9ca3af";
  const caption = energized ? "#404040" : "#94a3b8";

  return (
    <svg
      className={className}
      viewBox="0 0 300 212"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${gid}-outer`} x1="0" y1="0" x2="300" y2="212" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f8fafc" />
          <stop offset="1" stopColor="#f1f5f9" />
        </linearGradient>
        <linearGradient id={`${gid}-panel`} x1="20" y1="48" x2="260" y2="188" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#fafafa" />
        </linearGradient>
      </defs>
      <rect width="300" height="212" rx="14" fill={`url(#${gid}-outer)`} stroke="#e2e8f0" strokeWidth="1" />
      <rect x="16" y="16" width="268" height="180" rx="11" fill={`url(#${gid}-panel)`} stroke={main} strokeWidth={energized ? 1.4 : 1.1} />

      {stageIndex === 0 ? (
        <>
          <circle cx="36" cy="36" r="3" fill="#fca5a5" />
          <circle cx="48" cy="36" r="3" fill="#fde047" />
          <circle cx="60" cy="36" r="3" fill="#86efac" />
          <text x="76" y="40" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.1em">
            OPERATOR SURFACE · INBOX
          </text>
          <rect x="28" y="52" width="118" height="72" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="38" y="62" width="98" height="34" rx="3" fill="#fff" stroke="#e2e8f0" strokeWidth="0.9" />
          <path d="M46 72h82M46 80h64M46 88h72" stroke={soft} strokeWidth="1.15" strokeLinecap="round" />
          <rect x="38" y="102" width="52" height="16" rx="2" fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.9" />
          <text x="64" y="113" textAnchor="middle" fill="#1d4ed8" fontSize="7" fontFamily={fontMono}>
            SETTLE
          </text>
          <rect x="156" y="58" width="118" height="66" rx="6" fill="#fff" stroke="#bfdbfe" strokeWidth="1.05" />
          <rect x="168" y="70" width="42" height="20" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
          <text x="189" y="84" textAnchor="middle" fill="#1e40af" fontSize="8.5" fontFamily={fontMono} fontWeight="600">
            EVT
          </text>
          <text x="168" y="104" fill={label} fontSize="6.5" fontFamily={fontSans}>
            Amount band · counterparty
          </text>
          <circle cx="248" cy="88" r="14" fill="#fff7ed" stroke="#fdba74" strokeWidth="1" />
          <circle cx="248" cy="88" r="5" fill="#fb923c" opacity={energized ? 0.95 : 0.45} />
          <path d="M200 128h72" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
          <text x="150" y="178" textAnchor="middle" fill={caption} fontSize="11.5" fontFamily={fontSans} fontWeight="600">
            1 · Signal received
          </text>
          <text x="150" y="198" textAnchor="middle" fill={label} fontSize="7" fontFamily={fontSans}>
            Structured event lands for human review — nothing auto-executes.
          </text>
        </>
      ) : null}

      {stageIndex === 1 ? (
        <>
          <rect x="28" y="30" width="244" height="22" rx="4" fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.85" />
          <text x="38" y="45" fill="#1e40af" fontSize="8" fontFamily={fontMono}>
            route/v1/endpoints · checksum OK
          </text>
          <text x="28" y="68" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.1em">
            ROUTING &amp; CONTEXT
          </text>
          <rect x="28" y="78" width="112" height="78" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M38 92h92M38 104h76M38 116h92M38 128h58" stroke={soft} strokeWidth="1" strokeLinecap="round" />
          <text x="38" y="88" fill="#94a3b8" fontSize="7" fontFamily={fontSans}>
            Published tables
          </text>
          <circle cx="188" cy="94" r="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="224" cy="114" r="7" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1" />
          <circle cx="252" cy="88" r="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <path d="M188 94l28 16M224 114l22-22" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="152" y="124" width="120" height="32" rx="4" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1" />
          <text x="212" y="144" textAnchor="middle" fill="#047857" fontSize="8" fontFamily={fontSans} fontWeight="600">
            Validation queue
          </text>
          <text x="150" y="178" textAnchor="middle" fill={caption} fontSize="11.5" fontFamily={fontSans} fontWeight="600">
            2 · Address &amp; context
          </text>
          <text x="150" y="198" textAnchor="middle" fill={label} fontSize="7" fontFamily={fontSans}>
            Labels resolve to your tables; mismatches become tasks, not silent reroutes.
          </text>
        </>
      ) : null}

      {stageIndex === 2 ? (
        <>
          <text x="28" y="42" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.1em">
            POLICY ENGINE · ML ASSIST
          </text>
          <rect x="28" y="52" width="80" height="50" rx="5" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" />
          <path d="M38 66h60M38 76h48M38 86h56" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
          <text x="34" y="62" fill="#a16207" fontSize="6.5" fontFamily={fontSans}>
            Thresholds
          </text>
          <rect x="118" y="52" width="80" height="50" rx="5" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1" />
          <path d="M128 70h20l-5 10l5 10h-20l5-10-5-10z" stroke="#9333ea" strokeWidth="0.9" fill="none" />
          <text x="124" y="62" fill="#7e22ce" fontSize="6.5" fontFamily={fontSans}>
            Dual control
          </text>
          <rect x="208" y="52" width="64" height="50" rx="5" fill="#eef2ff" stroke="#a5b4fc" strokeWidth="1" />
          <text x="240" y="78" textAnchor="middle" fill="#4338ca" fontSize="10" fontFamily={fontMono} fontWeight="700">
            ML
          </text>
          <text x="240" y="92" textAnchor="middle" fill="#6366f1" fontSize="6" fontFamily={fontSans}>
            assist
          </text>
          <rect x="28" y="112" width="244" height="36" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M40 130h220" stroke="#94a3b8" strokeWidth="1.1" strokeDasharray="4 3" strokeLinecap="round" />
          <text x="150" y="134" textAnchor="middle" fill={label} fontSize="7" fontFamily={fontSans}>
            Outcomes are policy-bound — models flag; they never override officer paths.
          </text>
          <text x="150" y="178" textAnchor="middle" fill={caption} fontSize="11.5" fontFamily={fontSans} fontWeight="600">
            3 · Policy checks
          </text>
          <text x="150" y="198" textAnchor="middle" fill={label} fontSize="7" fontFamily={fontSans}>
            Allow-lists, limits, and approvals run before any execution surface opens.
          </text>
        </>
      ) : null}

      {stageIndex === 3 ? (
        <>
          <text x="28" y="42" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.1em">
            EXECUTION SURFACE
          </text>
          <rect x="28" y="52" width="244" height="44" rx="6" fill="#fff7ed" stroke="#fdba74" strokeWidth="1" />
          <path d="M44 76h176" stroke={energized ? "#ea580c" : soft} strokeWidth="2.5" strokeLinecap="round" />
          <polygon
            points="212,76 232,66 232,86"
            fill={energized ? "#ea580c" : "#d6d3d1"}
            stroke={energized ? "#c2410c" : "#a8a29e"}
            strokeWidth="0.6"
          />
          <text x="40" y="70" fill="#9a3412" fontSize="7.5" fontFamily={fontSans}>
            Authorized instruction → configured rails
          </text>
          <rect x="28" y="108" width="244" height="40" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <path d="M40 128h32M82 128h174" stroke={soft} strokeWidth="1" strokeLinecap="round" />
          <rect x="40" y="118" width="48" height="12" rx="2" fill="#dcfce7" stroke="#4ade80" strokeWidth="0.75" />
          <text x="64" y="127" textAnchor="middle" fill="#166534" fontSize="6" fontFamily={fontMono}>
            ACK
          </text>
          <text x="150" y="178" textAnchor="middle" fill={caption} fontSize="11.5" fontFamily={fontSans} fontWeight="600">
            4 · Execution
          </text>
          <text x="150" y="198" textAnchor="middle" fill={label} fontSize="7" fontFamily={fontSans}>
            Confirmed operator action applied to rails you configured — no hidden discretion.
          </text>
        </>
      ) : null}

      {stageIndex === 4 ? (
        <>
          <text x="28" y="42" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.08em">
            EVIDENCE &amp; SUPERVISORY READOUT
          </text>
          <rect x="28" y="52" width="62" height="88" rx="4" fill="#f0fdfa" stroke="#5eead4" strokeWidth="1" />
          <path d="M38 66h42M38 78h34M38 90h42M38 102h28M38 114h38M38 126h32" stroke={soft} strokeWidth="0.95" strokeLinecap="round" />
          <text x="59" y="148" textAnchor="middle" fill="#0f766e" fontSize="6.5" fontFamily={fontSans}>
            Log spine
          </text>
          <rect x="100" y="56" width="86" height="80" rx="6" fill="#ecfdf5" stroke="#34d399" strokeWidth="1.05" />
          <path d="M112 72h62M112 86h50M112 100h62" stroke="#059669" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          <text x="143" y="128" textAnchor="middle" fill="#047857" fontSize="7" fontFamily={fontSans} fontWeight="600">
            Export .zip
          </text>
          <rect x="196" y="56" width="76" height="80" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="206" y="68" width="56" height="14" rx="2" fill="#e0e7ff" stroke="#818cf8" strokeWidth="0.8" />
          <text x="234" y="100" textAnchor="middle" fill="#4338ca" fontSize="7" fontFamily={fontMono}>
            ML meta
          </text>
          <text x="234" y="114" textAnchor="middle" fill={label} fontSize="6" fontFamily={fontSans}>
            model · schema id
          </text>
          <text x="150" y="178" textAnchor="middle" fill={caption} fontSize="11.5" fontFamily={fontSans} fontWeight="600">
            5 · Evidence &amp; review
          </text>
          <text x="150" y="198" textAnchor="middle" fill={label} fontSize="7" fontFamily={fontSans}>
            Immutable-style trail plus exports auditors can file without re-parsing your UI.
          </text>
        </>
      ) : null}
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

function WorkflowStageFigure({
  stageIndex,
  isRowActive,
  className = "",
}: {
  stageIndex: number;
  isRowActive: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const figTransition = reduceMotion ? { duration: 0.01 } : rowFigureSpring;

  return (
    <motion.figure
      initial={false}
      animate={{
        scale: isRowActive ? 1 : 0.97,
        opacity: isRowActive ? 1 : 0.78,
        boxShadow: isRowActive
          ? "0 18px 48px -16px rgba(0,0,0,0.14), 0 0 0 1px rgba(23,23,23,0.1)"
          : "0 1px 0 rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.05)",
      }}
      transition={figTransition}
      className={`overflow-hidden rounded-xl border border-neutral-200/90 bg-white p-2 ring-1 ring-black/[0.03] sm:p-4 ${className}`}
      aria-label={`Illustration for workflow stage ${stageIndex + 1}`}
    >
      <motion.div
        initial={false}
        animate={
          reduceMotion
            ? {}
            : {
                y: isRowActive ? 0 : 4,
              }
        }
        transition={figTransition}
      >
        <WorkflowStageIllustration
          stageIndex={stageIndex}
          energized={isRowActive}
          className="mx-auto h-auto w-full max-w-[min(100%,440px)] text-neutral-900"
        />
      </motion.div>
    </motion.figure>
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
            Figures below show one stage at a time. The pipeline rail tracks your scroll position; the illustration beside
            each section is only for that step. Diagrams are illustrative—not deployment blueprints.
          </p>
        </div>
      </header>

      <div className="w-full px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        <WorkflowPipelineRail activeStep={activeStep} />

        <p className="mb-8 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 md:text-left" aria-live="polite">
          Stage in view · {STEPS[activeStep]?.n} — {STEPS[activeStep]?.title}
        </p>

        <ol className="list-none space-y-0 divide-y divide-neutral-200/80 p-0">
          {STEPS.map((step, index) => (
            <li key={step.n}>
              <article
                ref={setRef(index)}
                id={`workflow-stage-${step.n}`}
                aria-labelledby={`workflow-stage-title-${step.n}`}
                className={`scroll-mt-28 py-10 transition-[background-color,box-shadow] duration-300 sm:scroll-mt-32 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center md:gap-10 md:py-12 lg:gap-12 xl:gap-14 ${
                  activeStep === index ? "bg-neutral-50/80 md:shadow-[inset_0_0_0_1px_rgba(23,23,23,0.08)]" : "bg-transparent"
                }`}
              >
                <div className="flex min-w-0 flex-col justify-center px-1 md:px-2">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 md:mb-4">
                    Stage illustration
                  </p>
                  <WorkflowStageFigure stageIndex={index} isRowActive={activeStep === index} className="w-full" />
                </div>

                <div className="mt-8 min-w-0 border-t border-neutral-100 pt-8 md:mt-0 md:border-t-0 md:py-2 md:pl-2">
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
