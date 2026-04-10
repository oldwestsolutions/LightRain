import { FileText, Landmark, Wallet } from "lucide-react";

export function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Billing settings
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Funding sources, invoices, and prepaid credits.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            <Landmark className="h-4 w-4" aria-hidden />
            Payment methods
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-800/60">
              <span>ACH •••• 4402</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Default</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-800/60">
              <span>Corporate card •••• 9011</span>
              <span className="text-xs text-zinc-500">Backup</span>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-lg border border-zinc-200 py-2 text-sm font-medium dark:border-zinc-700"
          >
            Add payment method
          </button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            <Wallet className="h-4 w-4" aria-hidden />
            Credits & top-ups
          </div>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            Prepaid credits are consumed after committed discounts. Auto top-up triggers at $2,500 remaining.
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-zinc-900 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Add credits
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <FileText className="h-4 w-4 text-zinc-500" aria-hidden />
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Invoices</h2>
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            { id: "INV-2044", status: "Paid", amount: "$4,120.00" },
            { id: "INV-2031", status: "Open", amount: "$890.42" },
          ].map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="font-mono text-xs text-zinc-700 dark:text-zinc-200">{inv.id}</span>
              <span className="text-zinc-600 dark:text-zinc-400">{inv.status}</span>
              <span className="font-medium tabular-nums text-zinc-900 dark:text-zinc-50">{inv.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
