import { WalletGate } from "@/components/WalletGate";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return <WalletGate>{children}</WalletGate>;
}
