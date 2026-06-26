"use client";

import { useRef, useState } from "react";
import { HubTabBar, ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { syncToHq } from "@/lib/workforce-sync";

const TABS = [
  { id: "workflow", label: "워크플로우", count: 1 },
  { id: "filming", label: "촬영", count: 0 },
  { id: "cut", label: "컷편집", count: 0 },
  { id: "edit", label: "편집(종합)", count: 0 },
];

export default function MediaModule() {
  const [tab, setTab] = useState("workflow");
  const [subtitle, setSubtitle] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function generateSubtitle() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setBusy(true);
    const form = new FormData();
    form.append("action", "transcribe");
    form.append("file", file);
    try {
      const res = await fetch("/api/media/pipeline", { method: "POST", body: form });
      const data = await res.json();
      if (data.text) {
        setSubtitle(data.text);
        await syncToHq("media", `Media 자막: ${file.name}`, data.text, { source_module: "media" });
      } else if (data.message) setSubtitle(data.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-28">
      <ModulePageHeader
        title="콘텐츠 제작"
        action={<span className="rounded-lg border px-2 py-1 text-xs text-neutral-600">Windows 앱</span>}
      />
      <HubTabBar tabs={TABS} active={tab} onChange={setTab} />
      <div className="mx-auto max-w-3xl p-4">
        <OssBadge moduleId="media" />

        {(tab === "cut" || tab === "edit") && (
          <div className="mb-4 rounded-xl border bg-white p-4">
            <p className="text-sm text-neutral-600">
              LONEX EIM 데스크톱 앱에서 컷편집·종합편집을 실행하세요.
            </p>
          </div>
        )}

        {tab === "workflow" && (
          <div className="space-y-4 rounded-xl border bg-white p-4">
            <p className="text-sm text-neutral-700">MediaCMS + Whisper 자막 파이프라인 (Hub API)</p>
            <input ref={fileRef} type="file" accept="audio/*,video/*" className="text-sm" />
            <button
              type="button"
              disabled={busy}
              onClick={generateSubtitle}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {busy ? "처리 중…" : "자막 생성"}
            </button>
            {subtitle && (
              <pre className="max-h-60 overflow-auto rounded-lg bg-neutral-50 p-3 text-xs">{subtitle}</pre>
            )}
          </div>
        )}

        {tab === "filming" && (
          <div className="rounded-xl border bg-white p-4 text-sm text-neutral-600">
            촬영기는 LONEX EIM Windows 앱에서 실행됩니다.
          </div>
        )}
      </div>
    </div>
  );
}
