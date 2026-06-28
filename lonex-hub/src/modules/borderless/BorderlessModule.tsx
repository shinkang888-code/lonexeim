"use client";

import { useRef, useState } from "react";
import { OssBadge, ModulePageHeader } from "@/components/hub/ModuleChrome";
import { HUB_DOCK_PAD, HubButton, hubModuleShell } from "@/components/hub/hub-ui";
import { syncToHq } from "@/lib/workforce-sync";

const LANGS = ["KO", "EN", "ZH", "JA", "VI", "RU"];

export default function BorderlessModule() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function handleTranscribe() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("오디오 파일을 선택하세요.");
      return;
    }
    setBusy(true);
    setError("");
    const form = new FormData();
    form.append("action", "transcribe");
    form.append("file", file);
    try {
      const res = await fetch("/api/media/pipeline", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? data.message ?? "STT 실패");
      if (data.demo) {
        setResult(data.message);
      } else {
        setResult(data.text ?? "");
        await syncToHq("document", `borderless STT: ${file.name}`, data.text ?? "", {
          source_module: "borderless",
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류");
    } finally {
      setBusy(false);
    }
  }

  async function handleTranslate() {
    if (!result.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/media/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "translate",
          text: result,
          src_lang: "kor_Hang",
          tgt_lang: "eng_Latn",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "번역 실패");
      if (!data.demo) setResult(data.translated ?? result);
      else setError(data.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "번역 오류");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`${hubModuleShell} ${HUB_DOCK_PAD}`}>
      <ModulePageHeader title="borderless" />
      <div className="mx-auto max-w-lg space-y-4 p-3 sm:p-4">
        <OssBadge moduleId="borderless" />
        <p className="text-sm text-neutral-600">Whisper(ko) STT + NLLB 다국어 번역 → 본사 HQ 업로드</p>

        <input
          ref={fileRef}
          type="file"
          accept="audio/*,video/*"
          className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-100 file:px-3 file:py-2"
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <HubButton disabled={busy} onClick={handleTranscribe} className="flex-1">
            {busy ? "처리 중…" : "자막 추출 (Whisper)"}
          </HubButton>
          <HubButton disabled={busy || !result} variant="secondary" onClick={handleTranslate}>
            EN 번역
          </HubButton>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {result && (
          <textarea
            className="min-h-[140px] w-full rounded-2xl border border-neutral-200 p-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
        )}

        <article className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-neutral-900">정몽자목소리녹음5분</h3>
          <p className="mt-1 text-xs text-neutral-500">데모 프로젝트</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {LANGS.map((l) => (
              <span
                key={l}
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  l === "KO" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"
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
