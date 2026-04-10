import { AlertCircle, CheckCircle2 } from "lucide-react";

const incidents = [
  {
    id: "INC-204",
    title: "Elevated webhook retries — us-east-1",
    severity: "SEV-2",
    status: "Active",
    updated: "12m ago",
  },
  {
    id: "INC-203",
    title: "Splunk indexer lag",
    severity: "SEV-3",
    status: "Monitoring",
    updated: "1h ago",
  },
  {
    id: "INC-198",
    title: "Certificate rotation — edge",
    severity: "SEV-4",
    status: "Resolved",
    updated: "Yesterday",
  },
];

export function IncidentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Incident management
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Commander view with severity and timeline.</p>
      </div>

      <div className="space-y-3">
        {incidents.map((i) => (
          <div
            key={i.id}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex gap-3">
                {i.status === "Resolved" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" aria-hidden />
                ) : (
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" aria-hidden />
                )}
                <div>
                  <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{i.id}</p>
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{i.title}</h2>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Last update · {i.updated}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-800 dark:bg-red-950/60 dark:text-red-200">
                  {i.severity}
                </span>
                <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {i.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
