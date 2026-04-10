export function ForbiddenPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Restricted control plane</h1>
      <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        This demo only allows operator accounts (for example{" "}
        <span className="font-mono text-zinc-800 dark:text-zinc-200">admin@lightra.in</span>). Sign out and try again,
        or contact security if you believe this is an error.
      </p>
    </div>
  );
}
