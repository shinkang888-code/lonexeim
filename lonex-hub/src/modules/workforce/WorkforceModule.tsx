"use client";

import { useEffect, useState } from "react";
import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { HUB_DOCK_PAD, HubButton, hubModuleShell } from "@/components/hub/hub-ui";
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
    <div className={`${hubModuleShell} ${HUB_DOCK_PAD}`}>
      <ModulePageHeader title="직원 설정" />
      <div className="mx-auto max-w-lg space-y-4 p-3 sm:p-4">
        <OssBadge moduleId="workforce" />
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-neutral-900">실행 환경</p>
          <p className="mt-1 text-sm text-neutral-600">
            {desktop ? "LONEX Workforce Desktop" : "웹 브라우저 (동기화 미지원)"}
          </p>
        </div>
        {config && (
          <dl className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-4 text-sm shadow-sm">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
              <dt className="text-neutral-500">본사 서버</dt>
              <dd className="font-medium text-neutral-900">{String(config.hqServerUrl ?? "—")}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
              <dt className="text-neutral-500">API Key</dt>
              <dd className="break-all font-mono text-xs text-neutral-800">{String(config.apiKey ?? "—")}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
              <dt className="text-neutral-500">엔드포인트</dt>
              <dd className="font-medium text-neutral-900">{String(config.endpointHostname ?? "—")}</dd>
            </div>
          </dl>
        )}
        <HubButton onClick={testSync} className="w-full">
          테스트 동기화 (본사 업로드)
        </HubButton>
        {syncMsg && <p className="text-center text-sm text-neutral-600">{syncMsg}</p>}
        <p className="text-xs leading-relaxed text-neutral-500">
          Hub 모듈에서 생성·수정된 데이터는 Workforce Desktop Sync Agent가 본사 HQ에 업로드합니다.
          LogShield 보안 이벤트는 실시간 전송됩니다.
        </p>
      </div>
    </div>
  );
}
