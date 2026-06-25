import type { ComponentType } from "react";
import CdmsModule from "@/modules/cdms/CdmsModule";
import BorderlessModule from "@/modules/borderless/BorderlessModule";
import LogshieldModule from "@/modules/logshield/LogshieldModule";
import HqSearchModule from "@/modules/hq/HqSearchModule";
import WorkforceModule from "@/modules/workforce/WorkforceModule";
import AiAssistantModule from "@/modules/ai-assistant/AiAssistantModule";
import EmbedModule from "@/modules/EmbedModule";
import GenericModule from "@/modules/GenericModule";

const CUSTOM: Record<string, ComponentType> = {
  cdms: CdmsModule,
  borderless: BorderlessModule,
  logshield: LogshieldModule,
  "hq-search": HqSearchModule,
  workforce: WorkforceModule,
  "ai-assistant": AiAssistantModule,
  chat: () => <EmbedModule moduleId="chat" title="웹채팅" />,
  mail: () => <EmbedModule moduleId="mail" title="웹메일" />,
  calendar: () => <EmbedModule moduleId="calendar" title="캘린더" />,
  "video-chat": () => <EmbedModule moduleId="video-chat" title="화상채팅" />,
  "web-drive": () => <EmbedModule moduleId="web-drive" title="웹드라이브" />,
  notes: () => <EmbedModule moduleId="notes" title="노트" />,
  support: () => <EmbedModule moduleId="support" title="고객센터" />,
  billing: () => <EmbedModule moduleId="billing" title="요금관리" />,
  bidding: () => <EmbedModule moduleId="bidding" title="입찰정보" fallbackPath="https://www.data.go.kr" />,
};

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const Custom = CUSTOM[moduleId];
  if (Custom) return <Custom />;
  return <GenericModule moduleId={moduleId} />;
}
