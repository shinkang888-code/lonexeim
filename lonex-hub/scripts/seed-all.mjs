import { neon } from "@neondatabase/serverless";
import crypto from "node:crypto";

const MODELS = [
  ["BAAI/bge-m3", "Embedding", "BGE-M3", 31502520, 3145, "다국어 임베딩 표준"],
  ["BAAI/bge-reranker-v2-m3", "Embedding", "BGE Reranker v2 M3", 16443234, 1053, "리랭커"],
  ["Qwen/Qwen2.5-VL-7B-Instruct", "Vision", "Qwen2.5-VL 7B", 9287080, 1590, "문서/이미지 통합 이해"],
  ["docling-project/docling-models", "Office/Doc", "Docling Models", 3683328, 212, "PDF 파싱 표준"],
  ["microsoft/table-transformer-detection", "Office/Doc", "Table Transformer", 1784400, 425, "표 검출"],
  ["Qwen/Qwen2.5-Coder-32B-Instruct", "Coding", "Qwen2.5 Coder 32B", 1647223, 2052, "오픈코딩"],
  ["facebook/nllb-200-distilled-600M", "Translation", "NLLB 200 600M", 1471409, 926, "한↔영 번역"],
  ["deepseek-ai/DeepSeek-R1-Distill-Qwen-14B", "Reasoning", "DeepSeek R1 Distill 14B", 544872, 656, "추론"],
  ["moonshotai/Kimi-K2.7-Code", "Coding", "Kimi K2.7 Code", 480013, 984, "코딩 특화"],
  ["AI-Growth-Lab/PatentSBERTa", "Patent", "PatentSBERTa", 50915, 54, "특허 임베딩"],
  ["Bllossom/llama-3.2-Korean-Bllossom-3B", "Korean LLM", "Bllossom 3B", 15845, 194, "경량 3B"],
  ["MLP-KTLim/llama-3-Korean-Bllossom-8B", "Korean LLM", "Bllossom 8B", 4450, 391, "메인 한국어"],
  ["vmaca123/korean-pii-ner-v3", "NER/PII", "Korean PII NER v3", 166, 1, "PII 마스킹"],
  ["Aniyooo/Qwen3-8B-Legal-Korean", "Legal", "Qwen3 Legal Korean", 15, 0, "법률 SFT"],
];

const url = process.env.DATABASE_URL?.replace(/^["']|["']$/g, "");
if (!url) {
  console.error("DATABASE_URL required");
  process.exit(1);
}
const sql = neon(url);
const pepper = process.env.LONEX_HQ_KEY_PEPPER || "lonex-pepper-dev";

function hashKey(raw) {
  return crypto.createHmac("sha256", pepper).update(raw).digest("hex");
}

async function main() {
  for (const [repo, cat, name, dl, likes, note] of MODELS) {
    await sql`
      INSERT INTO models (repo_id, category, name, downloads, likes, note)
      VALUES (${repo}, ${cat}, ${name}, ${dl}, ${likes}, ${note})
      ON CONFLICT (repo_id) DO UPDATE SET downloads = EXCLUDED.downloads, likes = EXCLUDED.likes
    `;
  }
  console.log(`Models: ${MODELS.length} seeded`);

  await sql`
    INSERT INTO hub_employees (id, name, email, dept, endpoint_hostname, status)
    VALUES ('EMP-DEMO0001', '김준호', 'kim.junho@lonex.kr', '재무팀', 'FIN-DESK-01', 'active')
    ON CONFLICT (id) DO NOTHING
  `;

  const token = crypto.randomBytes(24).toString("base64url");
  const fullKey = `lnx_sk_${token}`;
  const prefix = fullKey.slice(0, 16);
  const keyHash = hashKey(fullKey);

  await sql`
    INSERT INTO hub_api_keys (id, employee_id, key_prefix, key_hash, scopes, label)
    VALUES ('KEY-DEMO0001', 'EMP-DEMO0001', ${prefix}, ${keyHash}, '["ingest:write","security:write"]', 'demo-desktop')
    ON CONFLICT (id) DO UPDATE SET key_prefix = EXCLUDED.key_prefix, key_hash = EXCLUDED.key_hash, revoked_at = NULL
  `;

  console.log("\n=== Demo credentials ===");
  console.log("Employee: EMP-DEMO0001");
  console.log("API Key: ", fullKey);
  console.log("Admin:   ", process.env.LONEX_HQ_ADMIN_SECRET || "lonex-hq-admin-dev-secret");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
