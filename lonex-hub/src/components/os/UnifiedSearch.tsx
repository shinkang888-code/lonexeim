"use client";

import { useMemo, useState } from "react";
import { MODULE_REGISTRY } from "@/lib/module-registry";
import { getInitials, matchAppQuery } from "@/lib/os/unified-search";

export function UnifiedSearch({ onOpen }: { onOpen: (moduleId: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const hits = useMemo(() => {
    if (!q.trim()) return [];
    return MODULE_REGISTRY.filter((m) => matchAppQuery(q, m)).slice(0, 8);
  }, [q]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border px-3 py-1 text-xs text-neutral-600"
      >
        🔍 통합검색
      </button>
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/30 pt-24">
          <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-2xl">
            <input
              autoFocus
              className="w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="앱 검색 (ㅎㄱ / vacation)..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <ul className="mt-2 max-h-60 overflow-auto">
              {hits.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-neutral-100"
                    onClick={() => {
                      onOpen(m.id);
                      setOpen(false);
                      setQ("");
                    }}
                  >
                    {m.name}
                    <span className="ml-2 text-xs text-neutral-400">{getInitials(m.name)}</span>
                  </button>
                </li>
              ))}
              {q && !hits.length && <li className="px-3 py-2 text-sm text-neutral-500">결과 없음</li>}
            </ul>
            <button type="button" className="mt-3 text-xs text-neutral-500 underline" onClick={() => setOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
