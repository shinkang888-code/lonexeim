"use client";

import { useEffect, useState } from "react";
import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { isWorkforceDesktop } from "@/lib/workforce-sync";

const CONSOLE =
  process.env.NEXT_PUBLIC_LOGSHIELD_CONSOLE_URL || "https://logshield-phi.vercel.app";

const TABS = [
  { id: "events", label: "이벤트", embed: false },
  { id: "console", label: "대시보드", embed: "/" },
  { id: "endpoints", label: "엔드포인트", embed: "/endpoints" },
  { id: "usb", label: "USB", embed: "/usb" },
  { id: "ueba", label: "UEBA", embed: "/ueba" },
] as const;

type SecEvent = {
  id: number;
  event_type: string;
  action: string;
  detail: string;
  severity: string;
  employee_name?: string;
  created_at: string;
};

export default function LogshieldModule() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("console");
  const [desktop, setDesktop] = useState(false);
  const [events, setEvents] = useState<SecEvent[]>([]);

  useEffect(() => {
    setDesktop(isWorkforceDesktop());
    fetch("/api/hq/admin/security?limit=20")
      .then((r) => r.json())
      .then((d) => setEvents(d.data ?? []));
  }, []);

  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div className="flex min-h-screen flex-col bg-[#0f1419] pb-28 text-neutral-100">
      <ModulePageHeader
        title="LogShield 보안관제"
        action={
          <span className="rounded-lg border border-emerald-600/50 bg-emerald-950 px-2 py-1 text-xs text-emerald-400">
            {desktop ? "에이전트 연결됨" : "웹 콘솔"}
          </span>
        }
      />
      <div className="flex flex-1 flex-col p-4">
        <OssBadge moduleId="logshield" />
        <div className="mb-4 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-3 py-1.5 text-xs ${
                tab === t.id ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "events" ? (
          <div className="space-y-2">
            {events.length === 0 ? (
              <p className="text-sm text-neutral-500">HQ 보안 이벤트 없음 — Agent → Desktop → Hub 업로드 대기</p>
            ) : (
              events.map((ev) => (
                <article key={ev.id} className="rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{ev.event_type}</span>
                    <span className="text-xs text-amber-400">{ev.severity}</span>
                  </div>
                  <p className="text-neutral-400">{ev.detail}</p>
                </article>
              ))
            )}
          </div>
        ) : (
          <iframe
            title={`LogShield ${tab}`}
            src={`${CONSOLE}${current.embed}`}
            className="min-h-[70vh] flex-1 rounded-xl border border-neutral-700 bg-neutral-900"
            allow="clipboard-write"
          />
        )}
      </div>
    </div>
  );
}
