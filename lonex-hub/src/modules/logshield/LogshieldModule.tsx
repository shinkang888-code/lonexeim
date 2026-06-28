"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { ModulePageHeader } from "@/components/hub/ModuleChrome";
import { HUB_DOCK_PAD, HubButton } from "@/components/hub/hub-ui";
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
    <div className={`flex min-h-screen flex-col bg-[#0f1419] text-neutral-100 ${HUB_DOCK_PAD}`}>
      <ModulePageHeader
        tone="dark"
        title="LogShield 보안관제"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <HubButton
              size="sm"
              variant="secondary"
              className="border-neutral-600 bg-neutral-900 text-neutral-100 hover:bg-neutral-800"
              onClick={() => openConsole(current.embed || "/")}
            >
              <ExternalLink className="mr-1.5 h-4 w-4" />
              새 창
            </HubButton>
            <span className="inline-flex min-h-9 items-center rounded-xl border border-emerald-600/40 bg-emerald-950/60 px-3 text-xs font-medium text-emerald-400">
              {desktop ? "에이전트 연결됨" : "웹 콘솔"}
            </span>
          </div>
        }
      />
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <p className="text-xs text-neutral-500">OSS · shinkang888-code/logshield · Enterprise Internal</p>
        <p className="text-sm text-neutral-400">
          iframe 정책에 따라 로그인 화면이 보일 수 있습니다.{" "}
          <button type="button" className="font-medium text-emerald-400 underline" onClick={() => openConsole("/login")}>
            새 창에서 LogShield 열기
          </button>
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <HubButton
              key={t.id}
              size="sm"
              variant={tab === t.id ? "primary" : "secondary"}
              className={
                tab === t.id
                  ? "shrink-0 bg-emerald-600 hover:bg-emerald-500"
                  : "shrink-0 border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }
              onClick={() => {
                setIframeBlocked(false);
                setTab(t.id);
              }}
            >
              {t.label}
            </HubButton>
          ))}
        </div>

        {tab === "events" ? (
          <div className="space-y-2">
            {events.length === 0 ? (
              <p className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-sm text-neutral-400">
                HQ 보안 이벤트 없음 — Desktop Agent 업로드 대기.{" "}
                <button type="button" className="text-emerald-400 underline" onClick={() => setTab("console")}>
                  대시보드 탭
                </button>
                에서 확인하세요.
              </p>
            ) : (
              events.map((ev) => (
                <article key={ev.id} className="rounded-xl border border-neutral-700 bg-neutral-900 p-4 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-neutral-100">{ev.event_type}</span>
                    <span className="shrink-0 text-xs font-medium text-amber-400">{ev.severity}</span>
                  </div>
                  <p className="mt-1 text-neutral-400">{ev.detail}</p>
                </article>
              ))
            )}
          </div>
        ) : (
          <div className="relative flex min-h-[55vh] flex-1 flex-col sm:min-h-[65vh]">
            {iframeBlocked && (
              <div className="mb-3 rounded-xl border border-amber-700/50 bg-amber-950/40 p-4 text-sm text-amber-200">
                iframe 로드가 차단되었습니다.{" "}
                <button type="button" className="underline" onClick={() => openConsole(current.embed || "/")}>
                  새 창에서 열기
                </button>
              </div>
            )}
            <iframe
              title={`LogShield ${tab}`}
              src={embedSrc}
              className="min-h-[55vh] flex-1 rounded-2xl border border-neutral-700 bg-neutral-900 sm:min-h-[65vh]"
              allow="clipboard-write"
              onError={() => setIframeBlocked(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
