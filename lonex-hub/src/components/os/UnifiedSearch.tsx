"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { MODULE_REGISTRY } from "@/lib/module-registry";
import { getInitials, matchAppQuery } from "@/lib/os/unified-search";
import { hubInputClass, HubButton } from "@/components/hub/hub-ui";

export function UnifiedSearch({ onOpen }: { onOpen: (moduleId: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const hits = useMemo(() => {
    if (!q.trim()) return [];
    return MODULE_REGISTRY.filter((m) => matchAppQuery(q, m)).slice(0, 8);
  }, [q]);

  return (
    <>
      <HubButton size="sm" variant="secondary" onClick={() => setOpen(true)}>
        <Search className="mr-1.5 h-4 w-4" />
        통합검색
      </HubButton>
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/40 p-4 pt-20 sm:pt-24">
          <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-2xl">
            <input
              autoFocus
              className={hubInputClass}
              placeholder="앱 검색 (ㅎㄱ / vacation)..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <ul className="mt-3 max-h-60 overflow-auto">
              {hits.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm hover:bg-neutral-100"
                    onClick={() => {
                      onOpen(m.id);
                      setOpen(false);
                      setQ("");
                    }}
                  >
                    <span>{m.name}</span>
                    <span className="text-xs text-neutral-400">{getInitials(m.name)}</span>
                  </button>
                </li>
              ))}
              {q && !hits.length && <li className="px-3 py-3 text-sm text-neutral-500">결과 없음</li>}
            </ul>
            <HubButton variant="ghost" size="sm" className="mt-3 w-full" onClick={() => setOpen(false)}>
              닫기
            </HubButton>
          </div>
        </div>
      )}
    </>
  );
}
