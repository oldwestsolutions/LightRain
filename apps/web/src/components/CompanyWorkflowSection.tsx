/**
 * Operator workflow narrative — infrastructure documentation tone (no commerce / custody claims).
 */

function WorkflowSceneIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="640" height="200" rx="12" className="fill-neutral-100 stroke-neutral-200" strokeWidth="1" />
      <text x="32" y="36" fill="#a3a3a3" fontSize="11" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.08em">
        NEUTRAL SCENARIO · ILLUSTRATIVE ONLY
      </text>
      {/* Operator */}
      <rect x="40" y="60" width="72" height="88" rx="8" className="fill-white stroke-neutral-300" strokeWidth="1.25" />
      <circle cx="76" cy="92" r="12" className="fill-neutral-200" />
      <path d="M56 118h40M56 128h32" className="stroke-neutral-400" strokeWidth="2" strokeLinecap="round" />
      <text x="76" y="182" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Operator
      </text>
      {/* Signal */}
      <path d="M130 104h72" className="stroke-neutral-500" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="210" y="76" width="88" height="56" rx="6" className="fill-neutral-50 stroke-neutral-400" strokeWidth="1.25" />
      <text x="254" y="110" textAnchor="middle" className="fill-neutral-700 text-[10px] font-sans">
        Signal
      </text>
      {/* Policy / ML */}
      <path d="M306 104h64" className="stroke-neutral-500" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="378" y="68" width="100" height="72" rx="8" className="fill-white stroke-neutral-400" strokeWidth="1.25" />
      <text x="428" y="98" textAnchor="middle" fill="#404040" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Address
      </text>
      <text x="428" y="114" textAnchor="middle" fill="#404040" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Policy · ML assist
      </text>
      {/* Signing (conceptual) */}
      <path d="M484 104h56" className="stroke-neutral-500" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="546" y="72" width="64" height="64" rx="8" className="fill-neutral-800/5 stroke-neutral-600" strokeWidth="1.25" />
      <path d="M566 108h24M578 96v24" className="stroke-neutral-600" strokeWidth="2" strokeLinecap="round" />
      <text x="578" y="182" textAnchor="middle" fill="#525252" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Sign / confirm
      </text>
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

export function CompanyWorkflowSection() {
  return (
    <section
      className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card"
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
          them into its own controls.
        </p>
      </div>

      <div className="space-y-8 p-5 sm:p-8">
        <figure className="overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-3 sm:p-4">
          <WorkflowSceneIllustration className="h-auto w-full text-neutral-900" />
          <figcaption className="mt-3 text-center text-[11px] leading-relaxed text-muted">
            Illustrative flow: operator receives a signal, validates federation context, runs policy and assisted checks,
            may use separate signing procedures, then records execution and evidence. Your deployment may reorder or omit
            steps according to counsel and supervisors.
          </figcaption>
        </figure>

        <div className="space-y-8">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="border-l-2 border-neutral-300 pl-5 sm:pl-6"
            >
              <p className="font-mono text-xs font-bold text-accent">{step.n}</p>
              <h3 className="mt-1 text-base font-semibold text-neutral-900 sm:text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 sm:text-[15px]">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/80 px-4 py-4 text-sm leading-relaxed text-neutral-700">
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
