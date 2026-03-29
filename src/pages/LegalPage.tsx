import { Download, FileText } from "lucide-react";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";

type LegalDoc = {
  id: string;
  title: string;
  description: string;
  fileName: string;
  available: boolean;
};

const LEGAL_DOCS: LegalDoc[] = [
  {
    id: "privacy",
    title: "Privacy policy",
    description: "Data handling, lawful process, and platform scope.",
    fileName: "LightRain-Privacy.pdf",
    available: false,
  },
  {
    id: "terms",
    title: "Terms of service",
    description: "Use of the service, limitations, and responsibilities.",
    fileName: "LightRain-Terms.pdf",
    available: false,
  },
  {
    id: "compliance",
    title: "Compliance",
    description: "State commerce, logging, and record integrity.",
    fileName: "LightRain-Compliance.pdf",
    available: false,
  },
  {
    id: "taxes",
    title: "Taxes",
    description: "Responsibilities and reporting (not tax advice).",
    fileName: "LightRain-Taxes.pdf",
    available: false,
  },
];

export function LegalPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const showToast = useToastStore((s) => s.show);

  const handleDownload = (doc: LegalDoc) => {
    if (doc.available) {
      const a = document.createElement("a");
      a.href = `/legal/${encodeURIComponent(doc.fileName)}`;
      a.download = doc.fileName;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    showToast("This document is not published yet. Check back soon.");
  };

  return (
    <MarketingPageShell backTo={isLoggedIn ? "/dashboard" : "/"} backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}>
      <article className="rounded-2xl border border-neutral-200/90 bg-white/92 p-6 shadow-card backdrop-blur-md sm:p-8">
        <h1 className="font-display text-2xl font-normal tracking-[0.08em] text-neutral-900 sm:text-3xl">Legal</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Policies for using LightRain. PDFs download when published—have counsel review before production use.
        </p>

        <ul className="mt-8 divide-y divide-neutral-100 border-t border-neutral-100">
          {LEGAL_DOCS.map((doc) => (
            <li key={doc.id} className="flex flex-col gap-3 py-5 first:pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
                  <FileText className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-neutral-900">{doc.title}</p>
                  <p className="mt-1 text-sm text-muted">{doc.description}</p>
                  <p className="mt-1 font-mono text-xs text-neutral-500">{doc.fileName}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDownload(doc)}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 self-start rounded-full border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 sm:self-auto"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download
              </button>
            </li>
          ))}
        </ul>
      </article>
    </MarketingPageShell>
  );
}
