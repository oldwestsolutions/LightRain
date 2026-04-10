import { KeyRound, PauseCircle, SlidersHorizontal } from "lucide-react";

export function SpendControlsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Spend controls
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Hard stops, budgets, and credential governance for production workloads.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            <h2 className="text-sm font-semibold">Monthly budget cap</h2>
          </div>
          <p className="mt-3 text-2xl font-semibold tabular-nums">$25,000</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Hard stop at 100% — notify at 80%</p>
          <button
            type="button"
            className="mt-4 w-full rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Adjust caps
          </button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
            <PauseCircle className="h-4 w-4" aria-hidden />
            <h2 className="text-sm font-semibold">Usage pause</h2>
          </div>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">All metered endpoints are accepting traffic.</p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg bg-amber-600 py-2 text-sm font-semibold text-white hover:bg-amber-700"
            >
              Pause usage
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-600 dark:text-zinc-200"
              disabled
            >
              Resume
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
            <KeyRound className="h-4 w-4" aria-hidden />
            <h2 className="text-sm font-semibold">API keys</h2>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <li className="flex justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/60">
              <span className="font-mono text-xs">lr_live_••••8f3a</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400">Active</span>
            </li>
            <li className="flex justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/60">
              <span className="font-mono text-xs">lr_live_••••21bc</span>
              <span className="text-xs text-zinc-500">Rotating</span>
            </li>
          </ul>
          <button
            type="button"
            className="mt-4 w-full rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Rotate key
          </button>
        </div>
      </div>
    </div>
  );
}
