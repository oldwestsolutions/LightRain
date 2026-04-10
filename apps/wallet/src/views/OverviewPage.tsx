import { Activity, CreditCard, TrendingUp } from "lucide-react";

export function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Wallet overview
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Balances, burn rate, and live usage for your API programs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            <CreditCard className="h-3.5 w-3.5" aria-hidden />
            Available credits
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">$24,180.42</p>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">+2.4% vs last week</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            Spend (30d)
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">$6,902.11</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">On track vs budget</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            <Activity className="h-3.5 w-3.5" aria-hidden />
            Active services
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">12</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">3 nearing soft limit</p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Usage snapshot</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Rolling 24h — demo data</p>
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            { name: "Inference API — prod", pct: 72, qty: "1.2M tokens" },
            { name: "Webhook delivery", pct: 44, qty: "892k calls" },
            { name: "Cold storage attestations", pct: 18, qty: "120 proofs" },
          ].map((row) => (
            <div key={row.name} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{row.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{row.qty}</p>
              </div>
              <div className="flex w-full max-w-xs items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-xs font-medium tabular-nums text-zinc-600 dark:text-zinc-300">
                  {row.pct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
