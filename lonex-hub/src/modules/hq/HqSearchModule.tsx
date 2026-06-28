"use client";

import { useEffect, useState } from "react";
import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { HUB_DOCK_PAD, HubButton, hubInputClass, hubModuleShell, hubSelectClass } from "@/components/hub/hub-ui";

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
  const [authed, setAuthed] = useState(false);
  const [secret, setSecret] = useState("");
  const [loginErr, setLoginErr] = useState("");

  async function loadStats() {
    const res = await fetch("/api/hq/admin/stats");
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    setAuthed(true);
    setStats(await res.json());
  }

  useEffect(() => {
    loadStats().catch(() => setStats(null));
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginErr("");
    const res = await fetch("/api/hq/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    if (!res.ok) {
      setLoginErr("관리자 Secret이 올바르지 않습니다.");
      return;
    }
    setSecret("");
    await loadStats();
  }

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
      if (res.status === 401) {
        setAuthed(false);
        throw new Error("관리자 로그인이 필요합니다.");
      }
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
    <div className={`${hubModuleShell} ${HUB_DOCK_PAD}`}>
      <ModulePageHeader title="본사 통합검색" />
      <div className="mx-auto max-w-3xl space-y-4 p-3 sm:p-4">
        <OssBadge moduleId="hq-search" />

        {!authed && (
          <form onSubmit={login} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-medium text-neutral-800">본사 관리자 Secret</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="password"
                className={hubInputClass}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="LONEX_HQ_ADMIN_SECRET"
              />
              <HubButton type="submit" className="w-full sm:w-auto">
                로그인
              </HubButton>
            </div>
            {loginErr && <p className="mt-2 text-sm text-red-600">{loginErr}</p>}
          </form>
        )}

        {stats && !stats.offline && authed && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(
              [
                ["직원", stats.active_employees],
                ["API Key", stats.active_api_keys],
                ["데이터", stats.ingest_records],
                ["보안", stats.security_events],
              ] as [string, number][]
            ).map(([label, val]) => (
              <div key={String(label)} className="rounded-2xl border border-neutral-200 bg-white p-4 text-center shadow-sm">
                <p className="text-xl font-bold text-neutral-900">{val ?? 0}</p>
                <p className="text-xs font-medium text-neutral-500">{label}</p>
              </div>
            ))}
          </div>
        )}
        {stats?.offline && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Neon DATABASE_URL 미연결 — Vercel 환경변수 설정 후 본사 검색이 활성화됩니다.
          </p>
        )}
        <form onSubmit={search} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <input
            className={`${hubInputClass} sm:min-w-0 sm:flex-1`}
            placeholder="이메일·문서·채팅 전체 검색..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            disabled={!authed}
          />
          <select
            className={`${hubSelectClass} w-full sm:w-auto`}
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={!authed}
          >
            <option value="">전체</option>
            <option value="email">이메일</option>
            <option value="document">문서</option>
            <option value="chat">채팅</option>
            <option value="media">Media</option>
            <option value="erp">ERP</option>
          </select>
          <HubButton type="submit" disabled={loading || !authed} className="w-full sm:w-auto">
            {loading ? "검색 중…" : "검색"}
          </HubButton>
        </form>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="space-y-2">
          {results.map((r) => (
            <article key={r.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-neutral-900">{r.title}</p>
                  <p className="text-xs text-neutral-500">
                    {r.employee_name} · {r.dept} · {r.data_type}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-neutral-400">
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
