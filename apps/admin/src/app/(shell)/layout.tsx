import { AdminGate } from "@/components/AdminGate";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return <AdminGate>{children}</AdminGate>;
}
