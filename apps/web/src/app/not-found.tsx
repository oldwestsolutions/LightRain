import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col items-center justify-center bg-canvas px-6 text-center">
      <p className="font-display text-2xl tracking-[0.12em] text-neutral-900">
        Light<span className="text-accent">Rain</span>
      </p>
      <h1 className="mt-6 text-lg font-medium text-neutral-800">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">That route does not exist in this app.</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center rounded-xl border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-400"
      >
        Back to home
      </Link>
    </div>
  );
}
