export function SignInGate() {
  const web = (process.env.NEXT_PUBLIC_WEB_ORIGIN || "https://lightra.in").replace(/\/$/, "");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-zinc-50">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-xl font-semibold tracking-tight">Staff sign-in required</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          The admin plane accepts sessions issued from the marketing site. Use an authorized staff account (for
          example <span className="font-mono text-zinc-300">admin@lightra.in</span> in the demo).
        </p>
        <a
          href={`${web}/`}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-500"
        >
          Go to lightra.in
        </a>
      </div>
    </div>
  );
}
