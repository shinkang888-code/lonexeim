"use client";

import { ModulePageHeader, OssBadge } from "@/components/hub/ModuleChrome";
import { useModuleStrings, useT } from "@/lib/i18n/use-translations";
import { syncToHq } from "@/lib/workforce-sync";

const ENV_KEYS: Record<string, string> = {
  "ai-assistant": "NEXT_PUBLIC_DIFY_URL",
  chat: "NEXT_PUBLIC_ROCKETCHAT_URL",
  mail: "NEXT_PUBLIC_ROUNDCUBE_URL",
  calendar: "NEXT_PUBLIC_CALCOM_URL",
  "video-chat": "NEXT_PUBLIC_LIVEKIT_URL",
  "web-drive": "NEXT_PUBLIC_NEXTCLOUD_URL",
  notes: "NEXT_PUBLIC_OUTLINE_URL",
  support: "NEXT_PUBLIC_CHATWOOT_URL",
  billing: "NEXT_PUBLIC_AKAUNTING_URL",
  cdms: "NEXT_PUBLIC_MEDIACMS_URL",
  logshield: "NEXT_PUBLIC_LOGSHIELD_CONSOLE_URL",
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
    <div className="flex min-h-screen flex-col bg-[#f5f5f5] pb-28">
      <ModulePageHeader
        title={name}
        action={
          <button
            type="button"
            onClick={handleSyncDemo}
            className="rounded-lg bg-neutral-900 px-3 py-1 text-xs text-white"
          >
            {t.embed.syncToHq}
          </button>
        }
      />
      <div className="flex flex-1 flex-col p-4">
        <OssBadge moduleId={moduleId} />
        {embedUrl ? (
          <iframe
            title={name}
            src={embedUrl}
            className="min-h-[70vh] flex-1 rounded-xl border bg-white shadow-sm"
            allow="camera; microphone; clipboard-write"
          />
        ) : (
          <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center">
            <p className="text-sm font-medium text-neutral-700">{name}</p>
            <p className="mt-2 max-w-md text-xs text-neutral-500">{t.embed.backendHint}</p>
            <code className="mt-2 block rounded bg-neutral-100 p-2 text-left text-xs">
              docker compose -f docker-compose.oss.yml --profile {moduleId} up -d
              <br />
              {envKey ?? "URL"}
            </code>
            <button
              type="button"
              onClick={handleSyncDemo}
              className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-xs text-white"
            >
              {t.embed.demoUpload}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
