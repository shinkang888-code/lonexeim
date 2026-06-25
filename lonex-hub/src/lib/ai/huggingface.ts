const HF_ROUTER = "https://router.huggingface.co/v1/chat/completions";
/** api-inference.huggingface.co 는 2025년 폐기 — Router hf-inference 사용 */
const HF_INFERENCE = "https://router.huggingface.co/hf-inference/models";

/** 커뮤니티 한국어 모델 → HF Serverless Router에서 지원하는 모델로 매핑 */
const ROUTER_CHAT_ALIASES: Record<string, string> = {
  "Bllossom/llama-3.2-Korean-Bllossom-3B": "Qwen/Qwen2.5-7B-Instruct",
  "MLP-KTLim/llama-3-Korean-Bllossom-8B": "Qwen/Qwen2.5-7B-Instruct",
  "Aniyooo/Qwen3-8B-Legal-Korean": "Qwen/Qwen2.5-7B-Instruct",
};

export const ROUTER_CHAT_MODEL = "Qwen/Qwen2.5-7B-Instruct";
export const ROUTER_TRANSLATE_MODEL = "Helsinki-NLP/opus-mt-ko-en";

export function getHfToken(): string | undefined {
  return process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY;
}

export function isHfConfigured(): boolean {
  return !!getHfToken();
}

export function resolveChatModel(modelId: string): string {
  return ROUTER_CHAT_ALIASES[modelId] ?? modelId;
}

function hfHeaders(contentType = "application/json") {
  const token = getHfToken();
  if (!token) throw new Error("HF_TOKEN is not configured");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": contentType,
    "x-wait-for-model": "true",
  };
}

async function hfFetch(url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (e) {
    const reason = e instanceof Error ? e.message : "network error";
    throw new Error(`HF request failed (${url}): ${reason}`);
  }
}

function parseRouterChatError(status: number, body: string): string {
  try {
    const parsed = JSON.parse(body) as { error?: { message?: string } };
    return parsed.error?.message ?? body.slice(0, 200);
  } catch {
    return body.slice(0, 200) || `HTTP ${status}`;
  }
}

/** Router API (OpenAI 호환) — 미지원 모델은 alias로 자동 전환 */
export async function hfChat(
  modelId: string,
  messages: { role: string; content: string }[],
  maxTokens = 512
): Promise<string> {
  if (!getHfToken()) throw new Error("HF_TOKEN is not configured");

  const resolvedModel = resolveChatModel(modelId);
  const routerRes = await hfFetch(HF_ROUTER, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({
      model: resolvedModel,
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });

  if (routerRes.ok) {
    const data = (await routerRes.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (content) return content;
  }

  const routerErr = await routerRes.text();
  throw new Error(
    `HF chat failed (${routerRes.status}, model=${resolvedModel}): ${parseRouterChatError(routerRes.status, routerErr)}`
  );
}

export async function hfTranscribe(
  audioBase64: string,
  modelId = "openai/whisper-large-v3"
): Promise<string> {
  const binary = Buffer.from(audioBase64, "base64");
  const res = await hfFetch(`${HF_INFERENCE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders("audio/wav"),
    body: binary,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Whisper failed (${res.status}): ${err.slice(0, 200)}`);
  }
  const data = (await res.json()) as { text?: string } | { text?: string }[];
  if (Array.isArray(data)) return data.map((d) => d.text).join(" ");
  return data.text ?? "";
}

export async function hfTranslate(
  text: string,
  modelId = ROUTER_TRANSLATE_MODEL
): Promise<string> {
  const res = await hfFetch(`${HF_INFERENCE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({ inputs: text }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Translation failed (${res.status}): ${err.slice(0, 200)}`);
  }
  const data = (await res.json()) as { translation_text?: string } | { translation_text?: string }[];
  if (Array.isArray(data)) return data[0]?.translation_text ?? text;
  return data.translation_text ?? text;
}

export async function hfEmbed(modelId: string, inputs: string[]): Promise<number[][]> {
  const res = await hfFetch(`${HF_INFERENCE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({ inputs }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HF embed failed (${res.status}): ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  if (Array.isArray(data) && Array.isArray(data[0])) return data as number[][];
  if (Array.isArray(data) && typeof data[0] === "number") return [data as number[]];
  throw new Error("Unexpected embed response shape");
}

export async function hfPiiMask(text: string, modelId: string): Promise<string> {
  const res = await hfFetch(`${HF_INFERENCE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({ inputs: text }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HF PII failed (${res.status}): ${err.slice(0, 200)}`);
  }
  const entities = (await res.json()) as {
    entity_group?: string;
    start?: number;
    end?: number;
  }[][];
  if (!Array.isArray(entities?.[0])) return text;
  let masked = text;
  for (const ent of entities[0].sort((a, b) => (b.start ?? 0) - (a.start ?? 0))) {
    if (ent.start != null && ent.end != null) {
      masked =
        masked.slice(0, ent.start) + `[${ent.entity_group ?? "PII"}]` + masked.slice(ent.end);
    }
  }
  return masked;
}

export function demoChatReply(prompt: string): string {
  return `[데모 모드 — HF_TOKEN 설정 후 실제 Bllossom/Qwen 모델 연동]\n\n요청: "${prompt.slice(0, 80)}..."\n\nLonex AI 큐레이션 모델(Bllossom 3B/8B, Qwen Legal)로 문서 작성·법률 검토·PII 마스킹을 지원합니다.`;
}
