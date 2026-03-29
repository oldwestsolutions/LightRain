import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PageTransitionLayout } from "./components/PageTransitionLayout";
import { AuthenticatedLayout } from "./components/AuthenticatedLayout";
import { useAuthStore } from "./store/useAuthStore";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Toast } from "./components/Toast";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { SupportPage } from "./pages/SupportPage";
import { LegalPage } from "./pages/LegalPage";
import { CompanyPage } from "./pages/CompanyPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { AccountProfilePage } from "./pages/AccountProfilePage";
import { AccountSecurityPage } from "./pages/AccountSecurityPage";
import { AccountStatementsPage } from "./pages/AccountStatementsPage";

function LoginRoute() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  return <Login />;
}

function CreateAccountRoute() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  return <CreateAccountPage />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageTransitionLayout />}>
        <Route path="/" element={<LoginRoute />} />
        <Route path="/create-account" element={<CreateAccountRoute />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/account/profile" element={<AccountProfilePage />} />
          <Route path="/account/security" element={<AccountSecurityPage />} />
          <Route path="/account/statements" element={<AccountStatementsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toast />
      <Analytics />
    </BrowserRouter>
  );
}
