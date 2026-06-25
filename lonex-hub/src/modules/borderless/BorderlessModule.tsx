"use client";

import { OssBadge, ModulePageHeader } from "@/components/hub/ModuleChrome";

const LANGS = ["KO", "EN", "ZH", "JA", "VI", "RU"];

export default function BorderlessModule() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-28">
      <ModulePageHeader title="borderless" />
      <div className="mx-auto max-w-lg p-4">
        <OssBadge moduleId="borderless" />
        <p className="mb-4 text-sm text-neutral-600">
          오디오 → 자막 추출 + 다국어 번역
        </p>
        <div className="mb-4 flex gap-2">
          <input
            className="flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-sm"
            placeholder="제목 검색..."
          />
          <button
            type="button"
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white"
          >
            검색
          </button>
        </div>
        <button
          type="button"
          className="mb-6 w-full rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white"
        >
          + 새 프로젝트 만들기
        </button>
        <p className="mb-2 text-xs text-neutral-500">총 1 건</p>
        <article className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-neutral-900">정몽자목소리녹음5분</h3>
          <p className="text-xs text-neutral-500">정몽자목소리녹음5분.m4a</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
            <span className="rounded bg-neutral-100 px-2 py-0.5">완료</span>
            <span>5분 6초</span>
            <span>kangjunchul</span>
            <span>26. 06. 21. 오후 02:15</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {LANGS.map((l) => (
              <span
                key={l}
                className={`rounded-full px-2 py-0.5 text-xs ${
                  l === "KO" ? "bg-neutral-900 text-white" : "bg-neutral-100"
                }`}
              >
                {l === "KO" ? "✓ " : ""}
                {l}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
