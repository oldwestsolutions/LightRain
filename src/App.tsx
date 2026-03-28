import { Analytics } from "@vercel/analytics/react";
import { useAuthStore } from "./store/useAuthStore";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Toast } from "./components/Toast";

function App() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <>
      {isLoggedIn ? <Dashboard /> : <Login />}
      <Toast />
      <Analytics />
    </>
  );
}

export default App;
