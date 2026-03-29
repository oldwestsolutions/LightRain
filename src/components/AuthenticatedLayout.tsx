import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Navbar } from "./Navbar";

export function AuthenticatedLayout() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="relative flex min-h-screen min-h-[100dvh] flex-col bg-[#ECECEF] text-neutral-900">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-grid-faint bg-[length:32px_32px] opacity-25 sm:bg-[length:40px_40px] sm:opacity-30"
        aria-hidden
      />
      <Navbar onLogout={handleLogout} />
      <div className="relative z-[2] mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-3 pb-28 pt-[calc(4.75rem+env(safe-area-inset-top))] safe-pb sm:px-4 sm:pb-24 sm:pt-[calc(6rem+env(safe-area-inset-top))] lg:px-8 lg:pt-[calc(6.5rem+env(safe-area-inset-top))]">
        <Outlet />
      </div>
    </div>
  );
}
