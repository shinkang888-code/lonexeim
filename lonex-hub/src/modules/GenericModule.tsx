"use client";

import { getModule } from "@/lib/module-registry";
import { useModuleStrings, useT } from "@/lib/i18n/use-translations";
import { OssBadge, ModulePageHeader } from "@/components/hub/ModuleChrome";
import { HUB_DOCK_PAD, HubButton, hubModuleShell } from "@/components/hub/hub-ui";

export default function GenericModule({ moduleId }: { moduleId: string }) {
  const t = useT();
  const { name, description } = useModuleStrings(moduleId);
  const mod = getModule(moduleId);
  if (!mod) return <p className="p-8">{t.generic.notFound}</p>;

  return (
    <div className={`${hubModuleShell} ${HUB_DOCK_PAD}`}>
      <ModulePageHeader title={name} />
      <div className="mx-auto max-w-2xl space-y-4 p-3 sm:p-4">
        <OssBadge moduleId={moduleId} />
        <p className="text-sm text-neutral-600">{description}</p>
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-sm font-medium text-neutral-800">{t.generic.demoPlaceholder}</p>
          <p className="mt-2 text-xs text-neutral-500">
            {t.generic.integration}: <strong>{mod.oss.integration}</strong>
          </p>
          <p className="mt-1 text-xs text-neutral-400">github.com/{mod.oss.github}</p>
          <HubButton size="sm" onClick={() => window.open(`https://github.com/${mod.oss.github}`, "_blank", "noopener,noreferrer")}>
            {t.generic.openRepo}
          </HubButton>
        </div>
      </div>
    </div>
  );
}
