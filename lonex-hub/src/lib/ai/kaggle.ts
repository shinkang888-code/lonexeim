/** Kaggle API — 서버 전용 (KAGGLE_API_TOKEN) */
export function getKaggleToken(): string | undefined {
  return process.env.KAGGLE_API_TOKEN;
}

export function isKaggleConfigured(): boolean {
  return !!getKaggleToken();
}
