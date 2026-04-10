import { Search } from "lucide-react";

const sample = [
  '[splunk] index=lightrain_prod sourcetype=lr_api status=500 | stats count by route',
  "trace_id=8f2c…  payment_router  ERROR  upstream timeout  820ms",
  "trace_id=21ab…  ledger_writer  INFO  batch committed  seq=904221",
];

export function LogsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Logs & observability
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Splunk-ready queries — connect HEC in production to stream structured events.
        </p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="search"
          placeholder='Search logs (e.g. "trace_id:8f2c")'
          className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-3 text-sm outline-none ring-zinc-400/20 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100 dark:border-zinc-800">
        {sample.map((line) => (
          <p key={line} className="border-b border-zinc-800 py-2 last:border-0">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
