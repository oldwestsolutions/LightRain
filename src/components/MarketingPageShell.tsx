import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LoginFooter } from "./LoginFooter";
import { RainBackground } from "./RainBackground";

type Props = {
  children: ReactNode;
  backTo: string;
  backLabel: string;
  /** Wider content column (e.g. immersive company page) */
  wide?: boolean;
};

export function MarketingPageShell({ children, backTo, backLabel, wide }: Props) {
  return (
    <div className="relative flex min-h-screen min-h-[100dvh] flex-col bg-canvas safe-pt">
      <RainBackground />
      <div
        className="pointer-events-none fixed inset-0 z-[2] bg-gradient-to-b from-canvas/88 via-canvas/45 to-canvas/82"
        aria-hidden
      />
      <div className="relative z-10 flex flex-1 flex-col px-4 pb-10 pt-[6vh] sm:px-6 sm:pt-[8vh]">
        <div className={`mx-auto w-full flex-1 ${wide ? "max-w-4xl" : "max-w-2xl"}`}>
          <Link
            to={backTo}
            className="mb-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
          {children}
        </div>
        <div className="mx-auto mt-12 w-full max-w-md">
          <LoginFooter />
        </div>
      </div>
    </div>
  );
}
