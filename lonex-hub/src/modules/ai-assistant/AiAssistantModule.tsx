"use client";

import { useEffect, useRef, useState } from "react";
import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { syncToHq } from "@/lib/workforce-sync";

type Msg = { role: "user" | "assistant"; content: string };

export default function AiAssistantModule() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Lonex AI 비서입니다. Bllossom/Qwen Legal 모델로 문서 작성·법률 검토·PII 마스킹을 지원합니다.",
    },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"chat" | "legal" | "pii">("chat");
  const [loading, setLoading] = useState(false);
  const [aiReady, setAiReady] = useState<boolean | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/ai/status")
      .then((r) => r.json())
      .then((d) => setAiReady(!!d.configured))
      .catch(() => setAiReady(false));
  }, []);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      if (mode === "pii") {
        const res = await fetch("/api/ai/tools", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "pii", text: userMsg.content }),
        });
        const data = await res.json();
        setMessages([
          ...next,
          {
            role: "assistant",
            content: data.masked ?? data.message ?? "PII 처리 완료",
          },
        ]);
      } else {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: next,
            mode: mode === "legal" ? "legal" : undefined,
          }),
        });
        const data = await res.json();
        const reply = data.content ?? data.detail ?? "응답 없음";
        setMessages([...next, { role: "assistant", content: reply }]);
        await syncToHq("document", "AI 비서 대화", `${userMsg.content}\n---\n${reply}`, {
          source_module: "ai-assistant",
          mode,
        });
      }
    } catch {
      setMessages([...next, { role: "assistant", content: "요청 처리 중 오류가 발생했습니다." }]);
    } finally {
      setLoading(false);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5] pb-28">
      <ModulePageHeader
        title="AI 비서"
        action={
          <span className="rounded-lg border px-2 py-1 text-xs">
            {aiReady === null ? "…" : aiReady ? "HF 연동" : "데모 모드"}
          </span>
        }
      />
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col p-4">
        <OssBadge moduleId="ai-assistant" />
        <div className="mb-3 flex gap-2">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as typeof mode)}
            className="rounded-lg border px-2 py-1 text-xs"
          >
            <option value="chat">일반 (Bllossom)</option>
            <option value="legal">법률 (Qwen Legal)</option>
            <option value="pii">PII 마스킹</option>
          </select>
        </div>
        <div className="mb-4 flex-1 space-y-3 overflow-y-auto rounded-xl border bg-white p-4" style={{ minHeight: 360 }}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`rounded-lg px-3 py-2 text-sm ${
                m.role === "user" ? "ml-8 bg-neutral-900 text-white" : "mr-8 bg-neutral-100"
              }`}
            >
              {m.content}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl border px-3 py-2 text-sm"
            placeholder={mode === "pii" ? "PII 마스킹할 텍스트..." : "메시지 입력..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            type="button"
            disabled={loading}
            onClick={send}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {loading ? "…" : "전송"}
          </button>
        </div>
      </div>
    </div>
  );
}
