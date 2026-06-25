"use client";

import { useState } from "react";
import { HubTabBar, ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";

const TABS = [
  { id: "workflow", label: "워크플로우", count: 1 },
  { id: "filming", label: "촬영", count: 0 },
  { id: "cut", label: "컷편집", count: 0 },
  { id: "edit", label: "편집(종합)", count: 0 },
];

export default function CdmsModule() {
  const [tab, setTab] = useState("workflow");

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-28">
      <ModulePageHeader
        title="콘텐츠 개발 도구"
        action={
          <span className="rounded-lg border px-2 py-1 text-xs text-neutral-600">
            Windows 앱
          </span>
        }
      />
      <HubTabBar tabs={TABS} active={tab} onChange={setTab} />
      <div className="mx-auto max-w-3xl p-4">
        <OssBadge moduleId="cdms" />
        <button
          type="button"
          className="mb-4 w-full rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white"
        >
          + 새 워크플로우
        </button>
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="grid grid-cols-2 bg-neutral-100 px-4 py-2 text-xs text-neutral-500">
            <span>이름</span>
            <span>진행</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2 px-4 py-4 text-sm">
            <span>새 워크플로우</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">0/5</span>
              <button
                type="button"
                className="rounded-lg border border-green-600 px-2 py-1 text-xs text-green-700"
              >
                촬영전 교안
              </button>
              <button
                type="button"
                className="rounded-lg border border-dashed border-green-500 px-2 py-1 text-xs text-green-600"
              >
                + 선택
              </button>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          데모 UI — 프로덕션: MediaCMS API + Whisper/XTTS 자막 파이프 연동
        </p>
      </div>
    </div>
  );
}
