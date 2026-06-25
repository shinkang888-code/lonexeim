"use client";

import { getModule } from "@/lib/module-registry";
import { OssBadge, ModulePageHeader } from "@/components/hub/ModuleChrome";

export default function GenericModule({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  if (!mod) return <p className="p-8">모듈을 찾을 수 없습니다.</p>;

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-28">
      <ModulePageHeader title={mod.name} />
      <div className="mx-auto max-w-2xl p-4">
        <OssBadge moduleId={moduleId} />
        <p className="mb-4 text-sm text-neutral-600">{mod.description}</p>
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-neutral-700">데모 플레이스홀더</p>
          <p className="mt-2 text-xs text-neutral-500">
            연동 방식: <strong>{mod.oss.integration}</strong>
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            github.com/{mod.oss.github}
          </p>
          <a
            href={`https://github.com/${mod.oss.github}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-lg bg-neutral-900 px-4 py-2 text-xs text-white"
          >
            OSS 리포지토리 열기
          </a>
        </div>
      </div>
    </div>
  );
}
