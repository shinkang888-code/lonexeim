"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { isWorkforceDesktop } from "@/lib/workforce-sync";

const CONSOLE =
  process.env.NEXT_PUBLIC_LOGSHIELD_CONSOLE_URL || "https://logshield-phi.vercel.app";

const TABS = [
  { id: "events", label: "HQ 이벤트", embed: false },
  { id: "console", label: "대시보드", embed: "/?embed=1" },
  { id: "endpoints", label: "엔드포인트", embed: "/endpoints?embed=1" },
  { id: "usb", label: "USB", embed: "/usb?embed=1" },
  { id: "ueba", label: "UEBA", embed: "/ueba?embed=1" },
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
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("events");
  const [desktop, setDesktop] = useState(false);
  const [events, setEvents] = useState<SecEvent[]>([]);
  const [iframeBlocked, setIframeBlocked] = useState(false);

  useEffect(() => {
    setDesktop(isWorkforceDesktop());
    fetch("/api/hq/admin/security?limit=20")
      .then((r) => r.json())
      .then((d) => setEvents(d.data ?? []))
      .catch(() => setEvents([]));
  }, []);

  const current = TABS.find((t) => t.id === tab)!;
  const embedSrc = current.embed ? `${CONSOLE}${current.embed}` : "";

  function openConsole(path = "/") {
    window.open(`${CONSOLE}${path}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0f1419] pb-28 text-neutral-100">
      <ModulePageHeader
        title="LogShield 보안관제"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openConsole(current.embed || "/")}
              className="flex items-center gap-1 rounded-lg border border-neutral-600 px-2 py-1 text-xs text-neutral-200 hover:bg-neutral-800"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              새 창
            </button>
            <span className="rounded-lg border border-emerald-600/50 bg-emerald-950 px-2 py-1 text-xs text-emerald-400">
              {desktop ? "에이전트 연결됨" : "웹 콘솔"}
            </span>
          </div>
        }
      />
      <div className="flex flex-1 flex-col p-4">
        <OssBadge moduleId="logshield" />
        <p className="mb-3 text-xs text-neutral-500">
          Hub 임베드는 LogShield 콘솔 iframe 정책에 따라 로그인 화면이 표시될 수 있습니다. 로그인 후에도
          보이지 않으면 <button type="button" className="underline" onClick={() => openConsole("/login")}>새 창에서 LogShield 열기</button>
          를 사용하세요.
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setIframeBlocked(false);
                setTab(t.id);
              }}
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
              <p className="text-sm text-neutral-500">
                HQ 보안 이벤트 없음 — Desktop Agent → Hub 업로드 대기. 콘솔은{" "}
                <button type="button" className="text-emerald-400 underline" onClick={() => setTab("console")}>
                  대시보드 탭
                </button>
                또는 새 창에서 확인하세요.
              </p>
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
          <div className="relative flex min-h-[70vh] flex-1 flex-col">
            {iframeBlocked && (
              <div className="mb-3 rounded-xl border border-amber-700/50 bg-amber-950/40 p-3 text-sm text-amber-200">
                iframe 로드가 차단되었습니다. LogShield 콘솔 헤더(X-Frame-Options) 배포 후 새로고침하거나{" "}
                <button type="button" className="underline" onClick={() => openConsole(current.embed || "/")}>
                  새 창에서 열기
                </button>
                를 사용하세요.
              </div>
            )}
            <iframe
              title={`LogShield ${tab}`}
              src={embedSrc}
              className="min-h-[70vh] flex-1 rounded-xl border border-neutral-700 bg-neutral-900"
              allow="clipboard-write"
              onError={() => setIframeBlocked(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
