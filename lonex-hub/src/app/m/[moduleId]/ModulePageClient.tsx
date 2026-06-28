"use client";

import MediaModule from "@/modules/media/MediaModule";
import BorderlessModule from "@/modules/borderless/BorderlessModule";
import LogshieldModule from "@/modules/logshield/LogshieldModule";
import HqSearchModule from "@/modules/hq/HqSearchModule";
import WorkforceModule from "@/modules/workforce/WorkforceModule";
import AiAssistantModule from "@/modules/ai-assistant/AiAssistantModule";
import BillingModule from "@/modules/billing/BillingModule";
import EmbedModule from "@/modules/EmbedModule";
import GenericModule from "@/modules/GenericModule";

const EMBED_MODULES = [
  "chat",
  "mail",
  "calendar",
  "video-chat",
  "web-drive",
  "notes",
  "support",
] as const;

export default function ModulePageClient({ moduleId }: { moduleId: string }) {
  switch (moduleId) {
    case "media":
      return <MediaModule />;
    case "borderless":
      return <BorderlessModule />;
    case "logshield":
      return <LogshieldModule />;
    case "hq-search":
      return <HqSearchModule />;
    case "workforce":
      return <WorkforceModule />;
    case "ai-assistant":
      return <AiAssistantModule />;
    case "billing":
      return <BillingModule />;
    case "bidding":
      return <EmbedModule moduleId="bidding" fallbackPath="https://www.data.go.kr" />;
    default:
      if (EMBED_MODULES.includes(moduleId as (typeof EMBED_MODULES)[number])) {
        return <EmbedModule moduleId={moduleId} />;
      }
      return <GenericModule moduleId={moduleId} />;
  }
}
