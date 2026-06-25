import type { Metadata } from "next";
import { HubDock, HubHeader } from "@/components/hub/HubShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lonex Hub",
  description: "Lonex.inc — Modular enterprise hub (Beta)",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
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
