const HF_ROUTER = "https://router.huggingface.co/v1/chat/completions";
const HF_INFERENCE = "https://api-inference.huggingface.co/models";

export function getHfToken(): string | undefined {
  return process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY;
}

export function isHfConfigured(): boolean {
  return !!getHfToken();
}

function hfHeaders() {
  const token = getHfToken();
  if (!token) throw new Error("HF_TOKEN is not configured");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/** Router API (OpenAI 호환) → 실패 시 text-generation 폴백 */
export async function hfChat(
  modelId: string,
  messages: { role: string; content: string }[],
  maxTokens = 512
): Promise<string> {
  const token = getHfToken();
  if (!token) throw new Error("HF_TOKEN is not configured");

  const routerRes = await fetch(HF_ROUTER, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({
      model: modelId,
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

  const prompt = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");
  const genRes = await fetch(`${HF_INFERENCE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({
      inputs: prompt + "\nAssistant:",
      parameters: { max_new_tokens: maxTokens, return_full_text: false },
    }),
  });

  if (!genRes.ok) {
    const err = await genRes.text();
    throw new Error(`HF inference failed (${genRes.status}): ${err.slice(0, 200)}`);
  }

  const genData = (await genRes.json()) as { generated_text?: string } | { generated_text?: string }[];
  if (Array.isArray(genData)) return genData[0]?.generated_text?.trim() ?? "";
  return genData.generated_text?.trim() ?? "응답을 생성하지 못했습니다.";
}

export async function hfTranscribe(
  audioBase64: string,
  modelId = "ghost613/whisper-large-v3-turbo-korean"
): Promise<string> {
  const binary = Buffer.from(audioBase64, "base64");
  const res = await fetch(`${HF_INFERENCE}/${modelId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getHfToken()}`,
      "Content-Type": "audio/wav",
    },
    body: binary,
  });
  if (!res.ok) throw new Error(`Whisper failed (${res.status})`);
  const data = (await res.json()) as { text?: string } | { text?: string }[];
  if (Array.isArray(data)) return data.map((d) => d.text).join(" ");
  return data.text ?? "";
}

export async function hfTranslate(
  text: string,
  srcLang = "kor_Hang",
  tgtLang = "eng_Latn",
  modelId = "facebook/nllb-200-distilled-600M"
): Promise<string> {
  const res = await fetch(`${HF_INFERENCE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({ inputs: text, parameters: { src_lang: srcLang, tgt_lang: tgtLang } }),
  });
  if (!res.ok) throw new Error(`Translation failed (${res.status})`);
  const data = (await res.json()) as { translation_text?: string } | { translation_text?: string }[];
  if (Array.isArray(data)) return data[0]?.translation_text ?? text;
  return data.translation_text ?? text;
}

export async function hfEmbed(modelId: string, inputs: string[]): Promise<number[][]> {
  const res = await fetch(`${HF_INFERENCE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({ inputs }),
  });
  if (!res.ok) throw new Error(`HF embed failed (${res.status})`);
  const data = await res.json();
  if (Array.isArray(data) && Array.isArray(data[0])) return data as number[][];
  if (Array.isArray(data) && typeof data[0] === "number") return [data as number[]];
  throw new Error("Unexpected embed response shape");
}

export async function hfPiiMask(text: string, modelId: string): Promise<string> {
  const res = await fetch(`${HF_INFERENCE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({ inputs: text }),
  });
  if (!res.ok) throw new Error(`HF PII failed (${res.status})`);
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
