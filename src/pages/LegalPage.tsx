import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Folder,
  Home,
} from "lucide-react";
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

type LegalFolder = {
  id: string;
  label: string;
  docs: LegalDoc[];
};

/** Set shared Dropbox links here when ready — opens in new tab for preview. */
const DROPBOX_SHARED_LINK: Partial<Record<string, string>> = {
  // privacy: "https://www.dropbox.com/s/xxxx/LightRain-Privacy.pdf?dl=0",
};

const LEGAL_FOLDERS: LegalFolder[] = [
  {
    id: "privacy",
    label: "Privacy",
    docs: [
      {
        id: "privacy",
        title: "Privacy policy",
        description: "Data handling, lawful process, and platform scope.",
        fileName: "LightRain-Privacy.pdf",
        available: false,
      },
    ],
  },
  {
    id: "terms",
    label: "Terms",
    docs: [
      {
        id: "terms",
        title: "Terms of service",
        description: "Use of the service, limitations, and responsibilities.",
        fileName: "LightRain-Terms.pdf",
        available: false,
      },
    ],
  },
  {
    id: "compliance",
    label: "Compliance",
    docs: [
      {
        id: "compliance",
        title: "Compliance overview",
        description: "State commerce, logging, and record integrity.",
        fileName: "LightRain-Compliance.pdf",
        available: false,
      },
    ],
  },
  {
    id: "taxes",
    label: "Taxes",
    docs: [
      {
        id: "taxes",
        title: "Tax information",
        description: "Responsibilities and reporting (not tax advice).",
        fileName: "LightRain-Taxes.pdf",
        available: false,
      },
    ],
  },
];

export function LegalPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const showToast = useToastStore((s) => s.show);
  const [folderId, setFolderId] = useState(LEGAL_FOLDERS[0].id);
  const [docId, setDocId] = useState(LEGAL_FOLDERS[0].docs[0].id);

  const folder = useMemo(
    () => LEGAL_FOLDERS.find((f) => f.id === folderId) ?? LEGAL_FOLDERS[0],
    [folderId]
  );

  const selectedDoc = useMemo(() => {
    const d = folder.docs.find((x) => x.id === docId);
    return d ?? folder.docs[0];
  }, [folder, docId]);

  useEffect(() => {
    const exists = folder.docs.some((d) => d.id === docId);
    if (!exists) setDocId(folder.docs[0].id);
  }, [folder, docId]);

  const dropboxLink = DROPBOX_SHARED_LINK[selectedDoc.id];

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

  const openDropbox = () => {
    if (dropboxLink) {
      window.open(dropboxLink, "_blank", "noopener,noreferrer");
      return;
    }
    showToast("No Dropbox link configured for this file yet.");
  };

  return (
    <MarketingPageShell
      extraWide
      backTo={isLoggedIn ? "/dashboard" : "/"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}
    >
      <div className="mb-4">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">Legal</h1>
        <p className="mt-1 text-sm text-muted">Browse folders like Dropbox, pick a file, then preview or download.</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-[#F7F9FA] shadow-soft">
        <div className="flex flex-wrap items-center gap-1 border-b border-neutral-200/90 bg-white px-3 py-2.5 text-sm text-neutral-600 sm:px-4">
          <span className="inline-flex items-center gap-1 font-medium text-neutral-900">
            <Home className="h-4 w-4 text-[#0061FE]" aria-hidden />
            All files
          </span>
          <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden />
          <span className="font-medium text-neutral-900">Legal workspace</span>
          <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden />
          <span className="max-w-[12rem] truncate text-neutral-800">{folder.label}</span>
        </div>

        <div className="flex flex-col lg:min-h-[420px] lg:flex-row">
          <aside className="border-b border-neutral-200/80 bg-[#F7F9FA] lg:w-[220px] lg:shrink-0 lg:border-b-0 lg:border-r">
            <p className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">Folders</p>
            <nav className="flex gap-1 overflow-x-auto px-2 pb-3 lg:flex-col lg:overflow-visible lg:px-2 lg:pb-4">
              {LEGAL_FOLDERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFolderId(f.id)}
                  className={`flex min-w-[8.5rem] shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors lg:min-w-0 ${
                    folderId === f.id
                      ? "bg-white text-[#0061FE] shadow-sm ring-1 ring-neutral-200/80"
                      : "text-neutral-700 hover:bg-white/70"
                  }`}
                >
                  <Folder
                    className={`h-5 w-5 shrink-0 ${folderId === f.id ? "text-[#0061FE]" : "text-[#0061FE]/70"}`}
                    aria-hidden
                  />
                  {f.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 border-b border-neutral-200/80 bg-white lg:border-b-0 lg:border-r">
            <div className="border-b border-neutral-100 px-4 py-3">
              <p className="text-xs font-medium text-neutral-500">Name</p>
            </div>
            <ul className="divide-y divide-neutral-100">
              {folder.docs.map((doc) => (
                <li key={doc.id}>
                  <div
                    className={`flex items-stretch gap-0 ${
                      docId === doc.id ? "bg-[#E8F3FF]/60" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setDocId(doc.id)}
                      className="flex min-h-[52px] min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-[#F7F9FA]"
                    >
                      <FileText className="h-5 w-5 shrink-0 text-[#0061FE]" aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-neutral-900">{doc.title}</p>
                        <p className="truncate text-xs text-muted">{doc.fileName}</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(doc)}
                      className="flex shrink-0 items-center justify-center border-l border-neutral-100 px-3 text-[#0061FE] hover:bg-[#F0F7FF]"
                      aria-label={`Download ${doc.fileName}`}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-h-[280px] w-full flex-col bg-[#F7F9FA] lg:max-w-[380px] lg:shrink-0">
            <div className="border-b border-neutral-200/80 bg-white px-4 py-3">
              <p className="text-xs font-medium text-neutral-500">Preview</p>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex flex-1 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-neutral-300 bg-white p-4 text-center shadow-inner">
                {dropboxLink ? (
                  <p className="text-sm text-neutral-700">
                    Linked to Dropbox — use <span className="font-medium">Open in Dropbox</span> below.
                  </p>
                ) : (
                  <>
                    <FileText className="h-12 w-12 text-neutral-300" aria-hidden />
                    <p className="mt-3 text-sm font-medium text-neutral-800">No preview linked</p>
                    <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-muted">
                      When you attach a Dropbox shared link for this file, preview and “Open in Dropbox” will match
                      your live folder. Until then, use the list or download.
                    </p>
                    <p className="mt-3 text-xs text-neutral-600">{selectedDoc.description}</p>
                  </>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={openDropbox}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#0061FE] bg-white px-4 text-sm font-semibold text-[#0061FE] transition-colors hover:bg-[#F0F7FF]"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Open in Dropbox
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(selectedDoc)}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#0061FE] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0052d4]"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingPageShell>
  );
}
