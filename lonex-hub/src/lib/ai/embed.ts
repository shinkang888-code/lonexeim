import { hfEmbed, isHfConfigured } from "@/lib/ai/huggingface";

/** 384-dim — matches ai_embeddings.vector(384) and migrate-vector.sql */
export const DEFAULT_EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2";

export async function embedQuery(text: string): Promise<number[] | null> {
  if (!isHfConfigured() || !text.trim()) return null;
  try {
    const vectors = await hfEmbed(DEFAULT_EMBED_MODEL, [text.trim()]);
    return vectors[0] ?? null;
  } catch {
    return null;
  }
}

/** pgvector literal: [0.1,0.2,...] */
export function vectorLiteral(values: number[]): string {
  return `[${values.join(",")}]`;
}
