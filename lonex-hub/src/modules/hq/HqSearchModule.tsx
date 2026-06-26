"use client";

import { useEffect, useState } from "react";
import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";

interface SearchHit {
  id: string;
  employee_name: string;
  dept: string;
  data_type: string;
  title: string;
  snippet: string;
  ingested_at: string;
}

interface Stats {
  active_employees?: number;
  active_api_keys?: number;
  ingest_records?: number;
  security_events?: number;
  offline?: boolean;
}

export default function HqSearchModule() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/hq/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ q: q.trim() });
      if (type) params.set("data_type", type);
      const res = await fetch(`/api/hq/admin/search?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "검색 실패");
      setResults(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "검색 오류");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-28">
      <ModulePageHeader title="본사 통합검색" />
      <div className="mx-auto max-w-3xl p-4">
        <OssBadge moduleId="hq-search" />
        {stats && !stats.offline && (
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(
              [
                ["직원", stats.active_employees],
                ["API Key", stats.active_api_keys],
                ["데이터", stats.ingest_records],
                ["보안", stats.security_events],
              ] as [string, number][]
            ).map(([label, val]) => (
              <div key={String(label)} className="rounded-xl bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-bold">{val}</p>
                <p className="text-xs text-neutral-500">{label}</p>
              </div>
            ))}
          </div>
        )}
        {stats?.offline && (
          <p className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            Neon DATABASE_URL 미연결 — Vercel 환경변수 설정 후 본사 검색이 활성화됩니다.
          </p>
        )}
        <form onSubmit={search} className="mb-4 flex flex-wrap gap-2">
          <input
            className="min-w-[200px] flex-1 rounded-xl border px-3 py-2 text-sm"
            placeholder="이메일·문서·채팅 전체 검색..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="rounded-xl border px-3 py-2 text-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">전체</option>
            <option value="email">이메일</option>
            <option value="document">문서</option>
            <option value="chat">채팅</option>
            <option value="cdms">EIM</option>
            <option value="erp">ERP</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {loading ? "검색 중…" : "검색"}
          </button>
        </form>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <div className="space-y-2">
          {results.map((r) => (
            <article key={r.id} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-neutral-900">{r.title}</p>
                  <p className="text-xs text-neutral-500">
                    {r.employee_name} · {r.dept} · {r.data_type}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] text-neutral-400">
                  {String(r.ingested_at).slice(0, 16)}
                </span>
              </div>
              {r.snippet && (
                <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{r.snippet}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
