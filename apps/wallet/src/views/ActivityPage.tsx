"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";

const rows = [
  { id: "evt_1", ts: "Today 09:14", type: "API usage", detail: "inference.batch", amount: "-$42.10" },
  { id: "evt_2", ts: "Today 08:02", type: "Payment", detail: "ACH top-up settled", amount: "+$2,000.00" },
  { id: "evt_3", ts: "Yesterday", type: "API usage", detail: "webhooks.retry", amount: "-$3.22" },
  { id: "evt_4", ts: "Apr 8", type: "Compliance hold", detail: "Region check — cleared", amount: "—" },
  { id: "evt_5", ts: "Apr 7", type: "API usage", detail: "ledger.sign", amount: "-$18.90" },
];

export function ActivityPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter((r) => `${r.type} ${r.detail} ${r.ts}`.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Activity ledger
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Unified timeline of charges, payments, and platform events.
          </p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            placeholder="Filter timeline…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none ring-zinc-400/20 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-100 bg-zinc-50/80 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Detail</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600 dark:text-zinc-300">{r.ts}</td>
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{r.type}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{r.detail}</td>
                <td className="px-4 py-3 text-right font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                  {r.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
