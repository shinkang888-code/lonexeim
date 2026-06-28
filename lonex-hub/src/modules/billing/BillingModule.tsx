"use client";

import { useCallback, useEffect, useState } from "react";
import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { HUB_DOCK_PAD, HubButton, hubCardClass, hubModuleShell } from "@/components/hub/hub-ui";
import { CreditCard, RefreshCw, TrendingUp } from "lucide-react";

type CreditsRes = {
  tenant?: string;
  balance_credits: number | null;
  mode?: string;
};

type UsageRow = {
  id: string;
  endpoint: string;
  model: string | null;
  credits_used: number;
  created_at: string;
};

export default function BillingModule() {
  const [credits, setCredits] = useState<CreditsRes | null>(null);
  const [usage, setUsage] = useState<UsageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [cRes, uRes] = await Promise.all([
        fetch("/api/billing/credits", { headers: { "X-Tenant-Slug": "default" } }),
        fetch("/api/billing/usage?limit=10", { headers: { "X-Tenant-Slug": "default" } }),
      ]);
      if (cRes.ok) setCredits(await cRes.json());
      else setCredits({ balance_credits: null, mode: "error" });
      if (uRes.ok) {
        const u = await uRes.json();
        setUsage(u.data ?? []);
      }
    } catch {
      setError("크레딧 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const balance = credits?.balance_credits;
  const akaunting = process.env.NEXT_PUBLIC_AKAUNTING_URL;

  return (
    <div className={`${hubModuleShell} ${HUB_DOCK_PAD}`}>
      <ModulePageHeader title="요금 · AI 크레딧" />
      <div className="mx-auto max-w-lg space-y-4 p-3 sm:p-4">
        <OssBadge moduleId="billing" />

        <div className={`${hubCardClass} p-5`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--hub-primary)]">
                AI 크레딧 잔액
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-neutral-900">
                {loading ? "…" : balance != null ? balance.toLocaleString() : "—"}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                테넌트: {credits?.tenant ?? "default"}
                {credits?.mode === "offline" && " · DB 마이그레이션 필요"}
              </p>
            </div>
            <CreditCard className="h-10 w-10 text-[var(--hub-primary)]" aria-hidden />
          </div>
          <HubButton variant="secondary" className="mt-4 w-full gap-2" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            새로고침
          </HubButton>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className={`${hubCardClass} p-4`}>
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-neutral-500" />
            <h2 className="text-sm font-semibold text-neutral-900">최근 AI 사용 (aiUsageLog)</h2>
          </div>
          {usage.length === 0 ? (
            <p className="text-sm text-neutral-500">
              {loading ? "불러오는 중…" : "사용 기록 없음 — AI 비서에서 채팅 시 기록됩니다."}
            </p>
          ) : (
            <ul className="divide-y divide-neutral-100 text-sm">
              {usage.map((row) => (
                <li key={row.id} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:justify-between">
                  <span className="truncate text-neutral-700">{row.endpoint}</span>
                  <span className="shrink-0 tabular-nums text-neutral-500">
                    −{Number(row.credits_used).toFixed(4)} · {new Date(row.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {akaunting && (
          <div className={`${hubCardClass} p-4`}>
            <p className="text-sm font-semibold text-neutral-900">회계 · 청구 (Akaunting)</p>
            <p className="mt-1 text-sm text-neutral-500">OSS 회계 모듈은 iframe으로 연동됩니다.</p>
            <a
              href={akaunting}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--hub-color-primary,#4f46e5)] px-4 text-sm font-medium text-white shadow-sm hover:brightness-110"
            >
              Akaunting 열기
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
