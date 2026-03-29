import { Download } from "lucide-react";

const ROWS = [
  { id: "2025-q4", label: "Q4 2025", sub: "Account statement" },
  { id: "2025-q3", label: "Q3 2025", sub: "Account statement" },
  { id: "2025-q2", label: "Q2 2025", sub: "Account statement" },
  { id: "2024-annual", label: "2024", sub: "Tax documents" },
] as const;

export function AccountStatementsPage() {
  return (
    <main>
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl sm:font-medium">Statements & taxes</h1>
        <p className="mt-1 text-sm text-neutral-500">Download past statements (demo — files not generated).</p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:rounded-[24px]">
        <ul className="divide-y divide-neutral-100">
          {ROWS.map((row) => (
            <li key={row.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-neutral-50 sm:px-8 sm:py-4"
              >
                <span>
                  <span className="block font-medium text-neutral-900">{row.label}</span>
                  <span className="mt-0.5 block text-sm text-neutral-500">{row.sub}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neutral-900">
                  <Download className="h-4 w-4 text-neutral-500" aria-hidden />
                  PDF
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
