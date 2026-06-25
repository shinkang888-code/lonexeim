import type { Metadata } from "next";
import { HubDock, HubHeader } from "@/components/hub/HubShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lonex Hub",
  description: "Lonex.inc — Modular enterprise hub (Beta)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#f5f5f5] antialiased">
        <HubHeader />
        {children}
        <HubDock />
      </body>
    </html>
  );
}
