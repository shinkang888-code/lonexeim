/** lonex-ai.vercel.app/services 큐레이션 OSS 모델 (DB 시드 + 폴백) */
export const AI_MODELS_SEED = [
  { repo_id: "MLP-KTLim/llama-3-Korean-Bllossom-8B", category: "Korean LLM", name: "Llama-3 Korean Bllossom 8B", downloads: 4450, likes: 391, note: "메인 한국어 instruct" },
  { repo_id: "Bllossom/llama-3.2-Korean-Bllossom-3B", category: "Korean LLM", name: "Llama-3.2 Korean Bllossom 3B", downloads: 15845, likes: 194, note: "경량 3B" },
  { repo_id: "Aniyooo/Qwen3-8B-Legal-Korean", category: "Legal", name: "Qwen3-8B Legal Korean", downloads: 15, likes: 0, note: "법률 SFT" },
  { repo_id: "AI-Growth-Lab/PatentSBERTa", category: "Patent", name: "PatentSBERTa", downloads: 50915, likes: 54, note: "특허 임베딩 표준" },
  { repo_id: "BAAI/bge-m3", category: "Embedding", name: "BGE-M3", downloads: 31502520, likes: 3145, note: "다국어 임베딩 표준" },
  { repo_id: "BAAI/bge-reranker-v2-m3", category: "Embedding", name: "BGE Reranker v2 M3", downloads: 16443234, likes: 1053, note: "리랭커" },
  { repo_id: "vmaca123/korean-pii-ner-v3", category: "NER/PII", name: "Korean PII NER v3", downloads: 166, likes: 1, note: "PII 마스킹" },
  { repo_id: "Qwen/Qwen2.5-VL-7B-Instruct", category: "Vision", name: "Qwen2.5-VL 7B", downloads: 9287080, likes: 1590, note: "문서/이미지 통합 이해" },
  { repo_id: "docling-project/docling-models", category: "Office/Doc", name: "Docling Models", downloads: 3683328, likes: 212, note: "PDF 파싱 표준" },
  { repo_id: "microsoft/table-transformer-detection", category: "Office/Doc", name: "Table Transformer", downloads: 1784400, likes: 425, note: "표 검출" },
  { repo_id: "Qwen/Qwen2.5-Coder-32B-Instruct", category: "Coding", name: "Qwen2.5 Coder 32B", downloads: 1647223, likes: 2052, note: "오픈코딩" },
  { repo_id: "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B", category: "Reasoning", name: "DeepSeek R1 Distill 14B", downloads: 544872, likes: 656, note: "추론" },
  { repo_id: "moonshotai/Kimi-K2.7-Code", category: "Coding", name: "Kimi K2.7 Code", downloads: 480013, likes: 984, note: "코딩 특화" },
  { repo_id: "facebook/nllb-200-distilled-600M", category: "Translation", name: "NLLB 200 600M", downloads: 1471409, likes: 926, note: "한↔영 번역" },
] as const;

export const DEFAULT_CHAT_MODEL = "Bllossom/llama-3.2-Korean-Bllossom-3B";
export const DEFAULT_EMBED_MODEL = "BAAI/bge-m3";
export const DEFAULT_PII_MODEL = "vmaca123/korean-pii-ner-v3";
export const DEFAULT_LEGAL_MODEL = "Aniyooo/Qwen3-8B-Legal-Korean";

export const SERVICE_CATEGORIES = [
  {
    id: "korean",
    title: "Korean LLM — 한국어·법률",
    description: "Bllossom·Qwen Legal·PII NER",
    models: ["MLP-KTLim/llama-3-Korean-Bllossom-8B", "Bllossom/llama-3.2-Korean-Bllossom-3B", "Aniyooo/Qwen3-8B-Legal-Korean", "vmaca123/korean-pii-ner-v3"],
  },
  {
    id: "patent",
    title: "Patent — 특허 AI",
    description: "PatentSBERTa·Docling·Table Transformer·DeepSeek R1",
    models: ["AI-Growth-Lab/PatentSBERTa", "docling-project/docling-models", "microsoft/table-transformer-detection", "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B"],
  },
  {
    id: "embedding",
    title: "Embedding — 검색·RAG",
    description: "BGE-M3 + Reranker + Qwen2.5-VL",
    models: ["BAAI/bge-m3", "BAAI/bge-reranker-v2-m3", "Qwen/Qwen2.5-VL-7B-Instruct"],
  },
  {
    id: "coding",
    title: "Coding — 오픈코딩",
    description: "Qwen Coder·Kimi Code",
    models: ["Qwen/Qwen2.5-Coder-32B-Instruct", "moonshotai/Kimi-K2.7-Code"],
  },
  {
    id: "translation",
    title: "Translation",
    description: "NLLB 다국어 번역",
    models: ["facebook/nllb-200-distilled-600M"],
  },
  {
    id: "workforce",
    title: "Workforce — 직원 Hub",
    description: "LogShield DLP/EDR + 본사 데이터 수집·통합검색",
    models: [],
  },
] as const;
