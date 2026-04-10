import { Activity, Clock3, Server } from "lucide-react";

export function HealthPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">System health</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Synthetic checks + SLO burn — demo telemetry.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "API availability", value: "99.992%", icon: Server, tone: "text-emerald-600 dark:text-emerald-400" },
          { label: "p95 latency", value: "182 ms", icon: Clock3, tone: "text-zinc-900 dark:text-zinc-50" },
          { label: "Error rate (5m)", value: "0.08%", icon: Activity, tone: "text-amber-600 dark:text-amber-400" },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <c.icon className="h-3.5 w-3.5" aria-hidden />
              {c.label}
            </div>
            <p className={`mt-3 text-2xl font-semibold tabular-nums ${c.tone}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Dependency matrix</h2>
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {["Ledger writer", "Payments router", "Attestation workers", "Edge cache"].map((name) => (
            <div key={name} className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-zinc-700 dark:text-zinc-200">{name}</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Healthy</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
