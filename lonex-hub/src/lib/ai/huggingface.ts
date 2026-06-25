const HF_BASE = "https://api-inference.huggingface.co/models";

function hfHeaders() {
  const token = process.env.HF_TOKEN;
  if (!token) throw new Error("HF_TOKEN is not configured");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function hfChat(
  modelId: string,
  messages: { role: string; content: string }[],
  maxTokens = 512
): Promise<string> {
  const res = await fetch(`${HF_BASE}/${modelId}/v1/chat/completions`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({
      model: modelId,
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HF chat failed (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    generated_text?: string;
  };

  return (
    data.choices?.[0]?.message?.content ??
    data.generated_text ??
    "응답을 생성하지 못했습니다."
  );
}

export async function hfEmbed(modelId: string, inputs: string[]): Promise<number[][]> {
  const res = await fetch(`${HF_BASE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({ inputs }),
  });

  if (!res.ok) {
    throw new Error(`HF embed failed (${res.status})`);
  }

  const data = await res.json();
  if (Array.isArray(data) && Array.isArray(data[0])) return data as number[][];
  if (Array.isArray(data) && typeof data[0] === "number") return [data as number[]];
  throw new Error("Unexpected embed response shape");
}

export async function hfPiiMask(text: string, modelId: string): Promise<string> {
  const res = await fetch(`${HF_BASE}/${modelId}`, {
    method: "POST",
    headers: hfHeaders(),
    body: JSON.stringify({ inputs: text }),
  });

  if (!res.ok) {
    throw new Error(`HF PII failed (${res.status})`);
  }

  const entities = (await res.json()) as { entity_group?: string; word?: string; start?: number; end?: number }[][];
  if (!Array.isArray(entities?.[0])) return text;

  let masked = text;
  for (const ent of entities[0].sort((a, b) => (b.start ?? 0) - (a.start ?? 0))) {
    if (ent.start != null && ent.end != null) {
      masked = masked.slice(0, ent.start) + `[${ent.entity_group ?? "PII"}]` + masked.slice(ent.end);
    }
  }
  return masked;
}

/** HF_TOKEN 없을 때 데모 응답 */
export function demoChatReply(prompt: string): string {
  return `[데모 모드 — HF_TOKEN 설정 후 실제 Bllossom/Qwen 모델 연동]\n\n요청: "${prompt.slice(0, 80)}..."\n\nLonex AI 큐레이션 모델(Bllossom 3B/8B, Qwen Legal)로 문서 작성·법률 검토·PII 마스킹을 지원합니다.`;
}
