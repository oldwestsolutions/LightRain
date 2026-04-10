import { AlertTriangle, Globe2, ShieldCheck } from "lucide-react";

export function CompliancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Compliance & risk
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Read-only posture for your tenant — full policy engine ships with the API service.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-zinc-700 dark:text-zinc-200" aria-hidden />
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Region restrictions</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between rounded-lg border border-zinc-100 px-3 py-2 dark:border-zinc-800">
              <span className="text-zinc-600 dark:text-zinc-300">US — data residency</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Allowed</span>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-zinc-100 px-3 py-2 dark:border-zinc-800">
              <span className="text-zinc-600 dark:text-zinc-300">EU — restricted workloads</span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Review</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden />
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Blocked transactions</h2>
          </div>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">No blocked ledger entries in the last 7 days.</p>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200/80 bg-amber-50/80 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden />
          <div>
            <h3 className="text-sm font-semibold text-amber-950 dark:text-amber-100">Compliance notice</h3>
            <p className="mt-1 text-sm text-amber-900/90 dark:text-amber-200/90">
              Enhanced due diligence is recommended before raising outbound payment velocity above $50k / day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
