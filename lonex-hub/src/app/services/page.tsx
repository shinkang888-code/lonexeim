"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/ai/models-catalog";

type Model = {
  repo_id: string;
  category: string;
  name: string;
  downloads: number;
  likes: number;
  note: string | null;
};

export default function ServicesPage() {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    fetch("/api/ai/models")
      .then((r) => r.json())
      .then((d) => setModels(d.models ?? []));
  }, []);

  const byRepo = Object.fromEntries(models.map((m) => [m.repo_id, m]));

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 pb-32 pt-6">
      <header className="text-center">
        <Link href="/" className="text-xs text-neutral-500 underline">
          ← Hub
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-wide">Lonex AI Services</h1>
        <p className="mt-2 text-sm text-neutral-600">
          lonex-ai.vercel.app 큐레이션 OSS — 특허·한국어 LLM·RAG·Workforce Hub
        </p>
      </header>

      {SERVICE_CATEGORIES.map((cat) => (
        <section key={cat.id}>
          <h2 className="mb-1 text-lg font-semibold">{cat.title}</h2>
          <p className="mb-4 text-sm text-neutral-500">{cat.description}</p>
          {cat.models.length === 0 ? (
            <Link
              href="/m/logshield"
              className="inline-block rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white"
            >
              LogShield · 본사통합검색 열기
            </Link>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {cat.models.map((repo) => {
                const m = byRepo[repo];
                return (
                  <li key={repo} className="rounded-xl border bg-white p-4 shadow-sm">
                    <p className="font-medium">{m?.name ?? repo.split("/").pop()}</p>
                    <p className="text-xs text-neutral-500">{repo}</p>
                    <p className="mt-2 text-sm text-neutral-600">{m?.note ?? cat.description}</p>
                    {m && (
                      <p className="mt-1 text-[10px] text-neutral-400">
                        ↓ {(Number(m.downloads) / 1e6).toFixed(1)}M · ♥ {m.likes}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
