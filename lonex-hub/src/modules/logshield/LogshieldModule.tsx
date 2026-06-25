"use client";

import { useEffect, useState } from "react";
import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { isWorkforceDesktop } from "@/lib/workforce-sync";

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
  const [tab, setTab] = useState("events");
  const [desktop, setDesktop] = useState(false);
  const [events, setEvents] = useState<SecEvent[]>([]);

  useEffect(() => {
    setDesktop(isWorkforceDesktop());
    fetch("/api/hq/admin/security?limit=20")
      .then((r) => r.json())
      .then((d) => setEvents(d.data ?? []));
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1419] pb-28 text-neutral-100">
      <ModulePageHeader
        title="LogShield 보안관제"
        action={
          <span className="rounded-lg border border-emerald-600/50 bg-emerald-950 px-2 py-1 text-xs text-emerald-400">
            {desktop ? "에이전트 연결됨" : "웹 콘솔"}
          </span>
        }
      />
      <div className="mx-auto max-w-4xl p-4">
        <OssBadge moduleId="logshield" />
        <div className="mb-4 flex gap-2">
          {["events", "endpoints", "usb", "ueba"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-xs capitalize ${
                tab === t ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "events" && (
          <div className="space-y-2">
            {events.length === 0 ? (
              <p className="text-sm text-neutral-500">보안 이벤트 없음 — LogShield Agent 연동 대기</p>
            ) : (
              events.map((ev) => (
                <article key={ev.id} className="rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{ev.event_type}</span>
                    <span
                      className={`text-xs ${
                        ev.severity === "critical" ? "text-red-400" : "text-amber-400"
                      }`}
                    >
                      {ev.severity}
                    </span>
                  </div>
                  <p className="text-neutral-400">{ev.detail}</p>
                  <p className="mt-1 text-[10px] text-neutral-600">
                    {ev.employee_name ?? "—"} · {String(ev.created_at).slice(0, 19)}
                  </p>
                </article>
              ))
            )}
          </div>
        )}

        {tab !== "events" && (
          <div className="rounded-xl border border-dashed border-neutral-600 p-8 text-center text-sm text-neutral-500">
            LogShield {tab} — shinkang888-code/logshield Admin Console 연동
          </div>
        )}
      </div>
    </div>
  );
}
