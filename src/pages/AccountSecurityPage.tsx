import { ShieldCheck, Smartphone } from "lucide-react";

export function AccountSecurityPage() {
  return (
    <main>
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl sm:font-medium">Security</h1>
        <p className="mt-1 text-sm text-neutral-500">How you sign in and protect your account (demo).</p>
      </header>

      <section className="divide-y divide-neutral-100 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:rounded-[24px]">
        <button
          type="button"
          className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-neutral-50 sm:px-8 sm:py-5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
            <ShieldCheck className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-neutral-900">Password</span>
            <span className="mt-0.5 block text-sm text-neutral-500">Last updated · Not shown in demo</span>
          </span>
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-neutral-50 sm:px-8 sm:py-5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
            <Smartphone className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-neutral-900">Two-step verification</span>
            <span className="mt-0.5 block text-sm text-neutral-500">Add an extra step when you sign in</span>
          </span>
        </button>
      </section>
    </main>
  );
}
