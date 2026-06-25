"use client";

import { useEffect, useState } from "react";
import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { isWorkforceDesktop, syncToHq } from "@/lib/workforce-sync";

export default function WorkforceModule() {
  const [desktop, setDesktop] = useState(false);
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);
  const [syncMsg, setSyncMsg] = useState("");

  useEffect(() => {
    const d = isWorkforceDesktop();
    setDesktop(d);
    if (d && window.lonexWorkforce) {
      window.lonexWorkforce.getConfig().then(setConfig);
    }
  }, []);

  async function testSync() {
    const res = await syncToHq(
      "document",
      "테스트 문서 동기화",
      "Lonex Workforce 데스크탑에서 본사 HQ로 업로드 테스트입니다.",
      { source_module: "workforce-settings", test: true }
    );
    setSyncMsg(res.ok ? "본사 업로드 큐에 추가됨" : "데스크탑 앱에서만 동기화 가능");
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-28">
      <ModulePageHeader title="직원 설정" />
      <div className="mx-auto max-w-lg p-4">
        <OssBadge moduleId="workforce" />
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm font-medium">실행 환경</p>
          <p className="mt-1 text-sm text-neutral-600">
            {desktop ? "LONEX Workforce Desktop" : "웹 브라우저 (동기화 미지원)"}
          </p>
        </div>
        {config && (
          <dl className="mt-4 space-y-2 rounded-xl border bg-white p-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500">본사 서버</dt>
              <dd>{String(config.hqServerUrl ?? "—")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">API Key</dt>
              <dd className="font-mono text-xs">{String(config.apiKey ?? "—")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">엔드포인트</dt>
              <dd>{String(config.endpointHostname ?? "—")}</dd>
            </div>
          </dl>
        )}
        <button
          type="button"
          onClick={testSync}
          className="mt-4 w-full rounded-xl bg-neutral-900 py-3 text-sm text-white"
        >
          테스트 동기화 (본사 업로드)
        </button>
        {syncMsg && <p className="mt-2 text-center text-xs text-neutral-600">{syncMsg}</p>}
        <p className="mt-6 text-xs leading-relaxed text-neutral-500">
          모든 Hub 모듈(메일·노트·CDMS·ERP)에서 생성·수정된 데이터는 Workforce Desktop Sync Agent가
          30초마다 본사 HQ에 업로드됩니다. LogShield 보안 이벤트는 실시간 전송됩니다.
        </p>
      </div>
    </div>
  );
}
