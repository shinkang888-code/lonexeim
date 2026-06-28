"use client";

import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { HUB_DOCK_PAD, HubButton, hubModuleShellCol } from "@/components/hub/hub-ui";
import { useModuleStrings, useT } from "@/lib/i18n/use-translations";
import { syncToHq } from "@/lib/workforce-sync";

const ENV_KEYS: Record<string, string> = {
  "ai-assistant": "NEXT_PUBLIC_DIFY_URL",
  chat: "NEXT_PUBLIC_ROCKETCHAT_URL",
  mail: "NEXT_PUBLIC_ROUNDCUBE_URL",
  calendar: "NEXT_PUBLIC_CALCOM_URL",
  "video-chat": "NEXT_PUBLIC_LIVEKIT_MEET_URL",
  "web-drive": "NEXT_PUBLIC_NEXTCLOUD_URL",
  notes: "NEXT_PUBLIC_OUTLINE_URL",
  support: "NEXT_PUBLIC_CHATWOOT_URL",
  billing: "NEXT_PUBLIC_AKAUNTING_URL",
  media: "NEXT_PUBLIC_MEDIACMS_URL",
  logshield: "NEXT_PUBLIC_LOGSHIELD_CONSOLE_URL",
};

const ENV_FALLBACK: Record<string, string> = {
  "video-chat": "NEXT_PUBLIC_LIVEKIT_URL",
};

export default function EmbedModule({
  moduleId,
  fallbackPath,
}: {
  moduleId: string;
  fallbackPath?: string;
}) {
  const t = useT();
  const { name } = useModuleStrings(moduleId);
  const envKey = ENV_KEYS[moduleId];
  const embedUrl =
    (typeof process !== "undefined" && envKey && process.env[envKey]) ||
    (typeof process !== "undefined" &&
      ENV_FALLBACK[moduleId] &&
      process.env[ENV_FALLBACK[moduleId]]) ||
    fallbackPath ||
    "";

  async function handleSyncDemo() {
    await syncToHq(
      moduleId === "mail" ? "email" : "document",
      `${name}`,
      `${name} — HQ sync demo`,
      { source_module: moduleId }
    );
  }

  return (
    <div className={`${hubModuleShellCol} ${HUB_DOCK_PAD}`}>
      <ModulePageHeader
        title={name}
        action={
          <HubButton size="sm" onClick={handleSyncDemo}>
            {t.embed.syncToHq}
          </HubButton>
        }
      />
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <OssBadge moduleId={moduleId} />
        {embedUrl ? (
          <iframe
            title={name}
            src={embedUrl}
            className="min-h-[60vh] flex-1 rounded-2xl border border-neutral-200 bg-white shadow-sm sm:min-h-[70vh]"
            allow="camera; microphone; clipboard-write"
          />
        ) : (
          <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-10 text-center">
            <p className="text-base font-semibold text-neutral-800">{name}</p>
            <p className="mt-2 max-w-sm text-sm text-neutral-600">{t.embed.backendHint}</p>
            <p className="mt-4 hidden max-w-md rounded-xl bg-neutral-50 px-4 py-3 text-left text-xs text-neutral-500 md:block">
              관리자: Docker OSS 또는 Render 배포 후 환경 변수({envKey ?? "URL"})를 설정하세요.
            </p>
            <HubButton className="mt-6" onClick={handleSyncDemo}>
              {t.embed.demoUpload}
            </HubButton>
          </div>
        )}
      </div>
    </div>
  );
}
