import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Toast } from "./components/Toast";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { SupportPage } from "./pages/SupportPage";
import { LegalPage } from "./pages/LegalPage";
import { CompanyPage } from "./pages/CompanyPage";

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

function DashboardRoute() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <Dashboard />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginRoute />} />
      <Route path="/create-account" element={<CreateAccountRoute />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/company" element={<CompanyPage />} />
      <Route path="/dashboard" element={<DashboardRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
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
