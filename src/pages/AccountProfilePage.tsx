import { useAuthStore } from "../store/useAuthStore";

export function AccountProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <main>
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl sm:font-medium">Profile & settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Your account details (demo).</p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:rounded-[24px]">
        <div className="border-b border-neutral-100 px-5 py-4 sm:px-8 sm:py-5">
          <p className="text-xs font-medium text-neutral-500">Name</p>
          <p className="mt-1 text-base font-medium text-neutral-900">{user?.name ?? "—"}</p>
        </div>
        <div className="px-5 py-4 sm:px-8 sm:py-5">
          <p className="text-xs font-medium text-neutral-500">Email</p>
          <p className="mt-1 text-base text-neutral-900">{user?.email ?? "—"}</p>
        </div>
      </section>

      <p className="mt-6 text-center text-xs text-neutral-500">
        Contact support to change legal name or email on a live account.
      </p>
    </main>
  );
}
