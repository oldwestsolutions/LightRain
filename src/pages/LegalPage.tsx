import { Download, FileText } from "lucide-react";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";

type LegalDoc = {
  id: string;
  title: string;
  description: string;
  /** Filename when hosted under /legal/ */
  fileName: string;
  /** Set true once the matching file exists under public/legal/ (see LEGAL_DOCS fileName). */
  available: boolean;
};

const LEGAL_DOCS: LegalDoc[] = [
  {
    id: "privacy",
    title: "Privacy",
    description: "How we handle data and lawful process on the platform.",
    fileName: "LightRain-Privacy.pdf",
    available: false,
  },
  {
    id: "terms",
    title: "Terms",
    description: "Terms of service for using LightRain.",
    fileName: "LightRain-Terms.pdf",
    available: false,
  },
  {
    id: "compliance",
    title: "Compliance",
    description: "State commerce, logging, and integrity practices.",
    fileName: "LightRain-Compliance.pdf",
    available: false,
  },
  {
    id: "taxes",
    title: "Taxes",
    description: "Tax responsibilities and reporting (not tax advice).",
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
      <div className="rounded-xl border border-neutral-200/80 bg-white shadow-soft">
        <div className="border-b border-neutral-200/80 px-5 py-5 sm:px-6 sm:py-6">
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">Legal</h1>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
            Official policies are offered as PDF downloads. If a document is not live yet, you’ll see a short notice
            when you try to download.
          </p>
        </div>

        <ul className="divide-y divide-neutral-100">
          {LEGAL_DOCS.map((doc) => (
            <li key={doc.id}>
              <div className="flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-neutral-50/90 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-3.5">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E3F2FF] text-[#0061FE]">
                    <FileText className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900">{doc.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{doc.description}</p>
                    <p className="mt-1 font-mono text-[11px] text-neutral-500 sm:text-xs">{doc.fileName}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-3 pl-[52px] sm:justify-end sm:pl-0">
                  <span className="text-xs text-neutral-500">PDF {!doc.available ? "· Coming soon" : ""}</span>
                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-[#0061FE] shadow-sm transition-colors hover:border-[#0061FE]/30 hover:bg-[#F0F7FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0061FE]"
                  >
                    <Download className="h-4 w-4 shrink-0" aria-hidden />
                    Download
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MarketingPageShell>
  );
}
