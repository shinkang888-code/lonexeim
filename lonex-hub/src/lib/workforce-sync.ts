declare global {
  interface Window {
    lonexWorkforce?: {
      isDesktop: boolean;
      getConfig: () => Promise<Record<string, unknown>>;
      queueIngest: (items: IngestItem[]) => Promise<{ ok: boolean }>;
      ingestFromModule: (
        dataType: string,
        title: string,
        bodyText: string,
        metadata?: Record<string, unknown>
      ) => Promise<{ ok: boolean }>;
      flushSync: () => Promise<{ ok: boolean }>;
      reportSecurity: (event: Record<string, unknown>) => Promise<{ ok: boolean }>;
    };
  }
}

export interface IngestItem {
  data_type: string;
  title: string;
  body_text: string;
  source_module?: string;
  metadata?: Record<string, unknown>;
  client_created_at?: string;
}

export async function syncToHq(
  dataType: string,
  title: string,
  bodyText: string,
  metadata?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.lonexWorkforce?.isDesktop) {
    return { ok: false, reason: "not_desktop" as const };
  }
  return window.lonexWorkforce.ingestFromModule(dataType, title, bodyText, metadata);
}

export function isWorkforceDesktop() {
  return typeof window !== "undefined" && !!window.lonexWorkforce?.isDesktop;
}
