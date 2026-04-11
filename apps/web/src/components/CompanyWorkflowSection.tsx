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

/** Single-stage schematic only — no full-stack pipeline in each row. */
function WorkflowStageIllustration({
  stageIndex,
  energized,
  className = "",
}: {
  stageIndex: number;
  energized: boolean;
  className?: string;
}) {
  const main = energized ? "#262626" : "#a8a8a8";
  const soft = energized ? "#525252" : "#b5b5b5";
  const label = energized ? "#737373" : "#9ca3af";
  const caption = energized ? "#525252" : "#9ca3af";

  return (
    <svg
      className={className}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="300" height="200" rx="12" className="fill-neutral-50 stroke-neutral-200/90" strokeWidth="1" />

      {stageIndex === 0 ? (
        <>
          <rect x="20" y="20" width="260" height="160" rx="10" fill="#fff" stroke={main} strokeWidth="1.35" />
          <text x="32" y="42" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.08em">
            OPERATOR SURFACE
          </text>
          <rect x="32" y="52" width="96" height="52" rx="4" fill="#fafafa" stroke={soft} strokeWidth="1" />
          <rect x="40" y="60" width="80" height="30" rx="2" fill="#f5f5f5" stroke={soft} strokeWidth="0.9" />
          <path d="M46 68h68M46 76h54M46 84h40" stroke={soft} strokeWidth="1.2" strokeLinecap="round" />
          <rect x="138" y="64" width="32" height="16" rx="2" fill="#f5f5f5" stroke={main} strokeWidth="1" />
          <text x="154" y="75" textAnchor="middle" fill={caption} fontSize="8" fontFamily={fontMono}>
            EVT
          </text>
          <circle cx="232" cy="72" r="11" fill="#e5e5e5" stroke={soft} strokeWidth="1" />
          <path d="M212 98h40M220 108h24" stroke={soft} strokeWidth="2" strokeLinecap="round" />
          <text x="150" y="168" textAnchor="middle" fill={caption} fontSize="11" fontFamily={fontSans} fontWeight="600">
            1 · Signal received
          </text>
        </>
      ) : null}

      {stageIndex === 1 ? (
        <>
          <rect x="20" y="20" width="260" height="160" rx="10" fill="#fff" stroke={main} strokeWidth="1.35" />
          <text x="32" y="42" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.08em">
            ROUTING &amp; CONTEXT
          </text>
          <rect x="28" y="52" width="108" height="64" rx="4" fill="#fafafa" stroke={soft} strokeWidth="1" />
          <path d="M36 66h92M36 78h76M36 90h92M36 102h64" stroke={soft} strokeWidth="1" strokeLinecap="round" />
          <text x="36" y="62" fill={label} fontSize="7" fontFamily={fontSans}>
            Published tables
          </text>
          <circle cx="188" cy="70" r="6" fill="#f5f5f5" stroke={soft} strokeWidth="1" />
          <circle cx="218" cy="86" r="6" fill="#f5f5f5" stroke={soft} strokeWidth="1" />
          <circle cx="238" cy="62" r="6" fill="#f5f5f5" stroke={soft} strokeWidth="1" />
          <path d="M188 70l22 12M218 86l14-18M238 62l-32 22" stroke={soft} strokeWidth="1" />
          <rect x="150" y="98" width="118" height="24" rx="3" fill="#fafafa" stroke={main} strokeWidth="1" />
          <text x="209" y="114" textAnchor="middle" fill={caption} fontSize="7.5" fontFamily={fontSans}>
            Validation task queue
          </text>
          <text x="150" y="168" textAnchor="middle" fill={caption} fontSize="11" fontFamily={fontSans} fontWeight="600">
            2 · Address &amp; context
          </text>
        </>
      ) : null}

      {stageIndex === 2 ? (
        <>
          <rect x="20" y="20" width="260" height="160" rx="10" fill="#fff" stroke={main} strokeWidth="1.35" />
          <text x="32" y="42" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.08em">
            POLICY ENGINE · ML ASSIST
          </text>
          <rect x="28" y="52" width="76" height="44" rx="4" fill="#fafafa" stroke={soft} strokeWidth="1" />
          <path d="M38 66h56M38 76h44M38 86h56" stroke={soft} strokeWidth="1" strokeLinecap="round" />
          <text x="32" y="62" fill={label} fontSize="6.5" fontFamily={fontSans}>
            Thresholds
          </text>
          <rect x="112" y="52" width="76" height="44" rx="4" fill="#fafafa" stroke={soft} strokeWidth="1" />
          <path d="M122 68h18l-4 8l4 8h-18l4-8-4-8z" stroke={soft} strokeWidth="0.9" fill="none" />
          <text x="116" y="62" fill={label} fontSize="6.5" fontFamily={fontSans}>
            Dual control
          </text>
          <rect x="196" y="52" width="76" height="44" rx="4" fill="#fafafa" stroke={main} strokeWidth="1" />
          <text x="234" y="74" textAnchor="middle" fill={caption} fontSize="9" fontFamily={fontMono}>
            ML
          </text>
          <text x="234" y="86" textAnchor="middle" fill={label} fontSize="6" fontFamily={fontSans}>
            assist
          </text>
          <rect x="28" y="106" width="244" height="26" rx="4" fill="#f5f5f5" stroke={soft} strokeWidth="1" />
          <path d="M36 120h228" stroke={soft} strokeWidth="1.1" strokeDasharray="3 3" />
          <text x="150" y="124" textAnchor="middle" fill={label} fontSize="6.5" fontFamily={fontSans}>
            Policy outcomes — no model override of officer paths
          </text>
          <text x="150" y="168" textAnchor="middle" fill={caption} fontSize="11" fontFamily={fontSans} fontWeight="600">
            3 · Policy checks
          </text>
        </>
      ) : null}

      {stageIndex === 3 ? (
        <>
          <rect x="20" y="20" width="260" height="160" rx="10" fill="#fff" stroke={main} strokeWidth="1.35" />
          <text x="32" y="42" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.08em">
            EXECUTION SURFACE
          </text>
          <rect x="28" y="56" width="244" height="36" rx="4" fill="#fafafa" stroke={soft} strokeWidth="1" />
          <path d="M40 76h188" stroke={soft} strokeWidth="2.2" strokeLinecap="round" />
          <polygon
            points="220,76 234,68 234,84"
            fill={energized ? "#404040" : "#c4c4c4"}
            stroke={energized ? "#262626" : "#b5b5b5"}
            strokeWidth="0.5"
          />
          <text x="36" y="72" fill={label} fontSize="7.5" fontFamily={fontSans}>
            Authorized instruction → configured rails
          </text>
          <rect x="28" y="104" width="244" height="28" rx="3" fill="#f5f5f5" stroke={soft} strokeWidth="0.9" />
          <path d="M36 118h28M72 118h192" stroke={soft} strokeWidth="1" strokeLinecap="round" />
          <text x="150" y="168" textAnchor="middle" fill={caption} fontSize="11" fontFamily={fontSans} fontWeight="600">
            4 · Execution
          </text>
        </>
      ) : null}

      {stageIndex === 4 ? (
        <>
          <rect x="20" y="20" width="260" height="160" rx="10" fill="#fff" stroke={main} strokeWidth="1.35" />
          <text x="32" y="42" fill={label} fontSize="9" fontFamily={fontSans} letterSpacing="0.08em">
            EVIDENCE &amp; SUPERVISORY READOUT
          </text>
          <rect x="28" y="52" width="58" height="78" rx="3" fill="#fafafa" stroke={soft} strokeWidth="1" />
          <path d="M36 66h42M36 78h34M36 90h42M36 102h28M36 114h38" stroke={soft} strokeWidth="0.9" strokeLinecap="round" />
          <text x="57" y="142" textAnchor="middle" fill={label} fontSize="6.5" fontFamily={fontSans}>
            Log spine
          </text>
          <rect x="96" y="58" width="78" height="62" rx="4" fill="#f5f5f5" stroke={main} strokeWidth="1" />
          <path d="M106 72h58M106 84h46M106 96h58" stroke={soft} strokeWidth="0.9" strokeLinecap="round" />
          <text x="135" y="132" textAnchor="middle" fill={label} fontSize="6.5" fontFamily={fontSans}>
            Export bundle
          </text>
          <rect x="184" y="58" width="74" height="62" rx="4" fill="#fafafa" stroke={soft} strokeWidth="1" />
          <rect x="192" y="68" width="58" height="12" rx="1" fill="#e5e5e5" />
          <text x="221" y="96" textAnchor="middle" fill={caption} fontSize="7" fontFamily={fontMono}>
            ML meta
          </text>
          <text x="221" y="108" textAnchor="middle" fill={label} fontSize="6" fontFamily={fontSans}>
            id + schema
          </text>
          <text x="150" y="168" textAnchor="middle" fill={caption} fontSize="11" fontFamily={fontSans} fontWeight="600">
            5 · Evidence &amp; review
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
