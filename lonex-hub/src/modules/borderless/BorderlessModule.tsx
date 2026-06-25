"use client";

import { useRef, useState } from "react";
import { OssBadge, ModulePageHeader } from "@/components/hub/ModuleChrome";
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
    <div className="min-h-screen bg-[#f5f5f5] pb-28">
      <ModulePageHeader title="borderless" />
      <div className="mx-auto max-w-lg p-4">
        <OssBadge moduleId="borderless" />
        <p className="mb-4 text-sm text-neutral-600">Whisper(ko) STT + NLLB 다국어 번역 → 본사 HQ 업로드</p>

        <input ref={fileRef} type="file" accept="audio/*,video/*" className="mb-3 w-full text-sm" />
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={handleTranscribe}
            className="flex-1 rounded-xl bg-neutral-900 py-2 text-sm text-white disabled:opacity-50"
          >
            {busy ? "처리 중…" : "자막 추출 (Whisper)"}
          </button>
          <button
            type="button"
            disabled={busy || !result}
            onClick={handleTranslate}
            className="rounded-xl border px-4 py-2 text-sm disabled:opacity-50"
          >
            EN 번역
          </button>
        </div>
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        {result && (
          <textarea
            className="mb-4 min-h-[120px] w-full rounded-xl border p-3 text-sm"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
        )}

        <p className="mb-2 text-xs text-neutral-500">데모 프로젝트</p>
        <article className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold">정몽자목소리녹음5분</h3>
          <div className="mt-3 flex flex-wrap gap-1">
            {LANGS.map((l) => (
              <span
                key={l}
                className={`rounded-full px-2 py-0.5 text-xs ${l === "KO" ? "bg-neutral-900 text-white" : "bg-neutral-100"}`}
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
