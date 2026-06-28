"use client";

import { useRef, useState } from "react";
import { HubTabBar, ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { HUB_DOCK_PAD, HubButton, hubModuleShell } from "@/components/hub/hub-ui";
import { syncToHq } from "@/lib/workforce-sync";

const TABS = [
  { id: "workflow", label: "워크플로우", count: 1 },
  { id: "filming", label: "촬영", count: 0 },
  { id: "cut", label: "컷편집", count: 0 },
  { id: "edit", label: "편집(종합)", count: 0 },
];

export default function MediaModule() {
  const cmsUrl = process.env.NEXT_PUBLIC_MEDIACMS_URL ?? "";
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
    <div className={`${hubModuleShell} ${HUB_DOCK_PAD}`}>
      <ModulePageHeader
        title="콘텐츠 제작"
        action={
          <span className="inline-flex min-h-9 items-center rounded-xl border border-neutral-200 px-3 text-xs font-medium text-neutral-600">
            Windows 앱
          </span>
        }
      />
      <HubTabBar tabs={TABS} active={tab} onChange={setTab} />
      <div className="mx-auto max-w-3xl space-y-4 p-3 sm:p-4">
        <OssBadge moduleId="media" />

        {cmsUrl && (
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <iframe title="MediaCMS" src={cmsUrl} className="min-h-[40vh] w-full" />
          </div>
        )}

        {(tab === "cut" || tab === "edit") && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-600">
              LONEX EIM 데스크톱 앱에서 컷편집·종합편집을 실행하세요.
            </p>
          </div>
        )}

        {tab === "workflow" && (
          <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-neutral-800">MediaCMS + Whisper 자막 파이프라인</p>
            <input ref={fileRef} type="file" accept="audio/*,video/*" className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-100 file:px-3 file:py-2" />
            <HubButton disabled={busy} onClick={generateSubtitle}>
              {busy ? "처리 중…" : "자막 생성"}
            </HubButton>
            {subtitle && (
              <pre className="max-h-60 overflow-auto rounded-xl bg-neutral-50 p-3 text-xs leading-relaxed text-neutral-800">
                {subtitle}
              </pre>
            )}
          </div>
        )}

        {tab === "filming" && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600 shadow-sm">
            촬영기는 LONEX EIM Windows 앱에서 실행됩니다.
          </div>
        )}
      </div>
    </div>
  );
}
