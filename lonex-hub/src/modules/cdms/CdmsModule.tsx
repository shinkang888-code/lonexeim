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

export default function CdmsModule() {
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
        await syncToHq("cdms", `CDMS 자막: ${file.name}`, data.text, { source_module: "cdms" });
      } else if (data.message) setSubtitle(data.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-28">
      <ModulePageHeader
        title="콘텐츠 개발 도구"
        action={<span className="rounded-lg border px-2 py-1 text-xs text-neutral-600">Windows 앱</span>}
      />
      <HubTabBar tabs={TABS} active={tab} onChange={setTab} />
      <div className="mx-auto max-w-3xl p-4">
        <OssBadge moduleId="cdms" />

        {(tab === "cut" || tab === "edit") && (
          <div className="mb-4 rounded-xl border bg-white p-4">
            <p className="mb-2 text-sm font-medium">Whisper 자막 생성 (MediaCMS 파이프)</p>
            <input ref={fileRef} type="file" accept="audio/*,video/*" className="mb-2 w-full text-sm" />
            <button
              type="button"
              disabled={busy}
              onClick={generateSubtitle}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {busy ? "생성 중…" : "자막 생성 + 본사 업로드"}
            </button>
            {subtitle && (
              <textarea className="mt-3 min-h-[100px] w-full rounded border p-2 text-sm" value={subtitle} readOnly />
            )}
          </div>
        )}

        <button type="button" className="mb-4 w-full rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white">
          + 새 워크플로우
        </button>
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="grid grid-cols-2 bg-neutral-100 px-4 py-2 text-xs text-neutral-500">
            <span>이름</span>
            <span>진행</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2 px-4 py-4 text-sm">
            <span>새 워크플로우</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">0/5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
