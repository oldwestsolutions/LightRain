"use client";

import { useState } from "react";
import { Ban, Flag, Power, Wallet } from "lucide-react";

export function ControlsPage() {
  const [flags, setFlags] = useState({
    killSwitch: false,
    payments: true,
    splunk: true,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Controls panel</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Break-glass switches — UI only until wired to the control API.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-red-200 bg-red-50/60 p-5 dark:border-red-900/50 dark:bg-red-950/20">
          <div className="flex items-center gap-2 text-sm font-semibold text-red-900 dark:text-red-100">
            <Power className="h-4 w-4" aria-hidden />
            Global kill switch
          </div>
          <p className="mt-2 text-sm text-red-900/80 dark:text-red-200/80">
            Immediately stops new metered usage across all tenants.
          </p>
          <button
            type="button"
            onClick={() => setFlags((f) => ({ ...f, killSwitch: !f.killSwitch }))}
            className={`mt-4 w-full rounded-lg py-2 text-sm font-semibold text-white ${
              flags.killSwitch ? "bg-emerald-600 hover:bg-emerald-500" : "bg-red-600 hover:bg-red-500"
            }`}
          >
            {flags.killSwitch ? "Disengage kill switch" : "Engage kill switch"}
          </button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            <Wallet className="h-4 w-4" aria-hidden />
            Payment routing
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">ACH / RTP rails — demo toggle.</p>
          <button
            type="button"
            onClick={() => setFlags((f) => ({ ...f, payments: !f.payments }))}
            className="mt-4 w-full rounded-lg border border-zinc-200 py-2 text-sm font-semibold dark:border-zinc-700"
          >
            {flags.payments ? "Disable payment routing" : "Enable payment routing"}
          </button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            <Ban className="h-4 w-4" aria-hidden />
            Block merchants / IPs
          </div>
          <textarea
            placeholder="merchant_id, CIDR…"
            rows={3}
            className="mt-3 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <button
            type="button"
            className="mt-2 w-full rounded-lg bg-zinc-900 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Apply blocks
          </button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            <Flag className="h-4 w-4" aria-hidden />
            Feature flags
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-300">Splunk HEC shipping</span>
            <button
              type="button"
              onClick={() => setFlags((f) => ({ ...f, splunk: !f.splunk }))}
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                flags.splunk ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
              }`}
            >
              {flags.splunk ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
