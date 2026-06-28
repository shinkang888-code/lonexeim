import type { Metadata } from "next";
import { HubDock, HubHeader } from "@/components/hub/HubShell";
import { LocaleHtmlLang } from "@/components/hub/LocaleHtmlLang";
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
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <LocaleHtmlLang />
        <HubHeader />
        {children}
        <HubDock />
      </body>
    </html>
  );
}
