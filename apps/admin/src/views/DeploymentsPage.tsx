import { GitBranch, RotateCcw } from "lucide-react";

const releases = [
  { tag: "2026.04.10-14", env: "production", actor: "ci@lightrain", status: "Live" },
  { tag: "2026.04.09-22", env: "staging", actor: "ci@lightrain", status: "Candidate" },
  { tag: "2026.04.08-09", env: "production", actor: "rollback-bot", status: "Superseded" },
];

export function DeploymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Deployments</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Release history and rollback posture.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          <GitBranch className="h-4 w-4" aria-hidden />
          Switch environment
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold dark:border-zinc-700"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Rollback previous
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-100 bg-zinc-50/80 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3">Release</th>
              <th className="px-4 py-3">Environment</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {releases.map((r) => (
              <tr key={r.tag} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-zinc-100">{r.tag}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{r.env}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{r.actor}</td>
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
