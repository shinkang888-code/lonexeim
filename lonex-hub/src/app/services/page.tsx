"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/ai/models-catalog";
import { HUB_DOCK_PAD, HubButton, hubCardClass } from "@/components/hub/hub-ui";
import { useT } from "@/lib/i18n/use-translations";

type Model = {
  repo_id: string;
  category: string;
  name: string;
  downloads: number;
  likes: number;
  note: string | null;
};

export default function ServicesPage() {
  const t = useT();
  const router = useRouter();
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    fetch("/api/ai/models")
      .then((r) => r.json())
      .then((d) => setModels(d.models ?? []));
  }, []);

  const byRepo = Object.fromEntries(models.map((m) => [m.repo_id, m]));

  return (
    <div className={`mx-auto max-w-4xl space-y-8 px-4 pt-5 sm:space-y-10 sm:pt-6 ${HUB_DOCK_PAD}`}>
      <header className={`${hubCardClass} p-6 text-center sm:p-8`}>
        <Link
          href="/"
          className="inline-flex min-h-9 items-center text-xs font-medium text-[var(--hub-color-primary,#4f46e5)] hover:underline"
        >
          ← {t.services.backHub}
        </Link>
        <div className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-md">
          <Sparkles className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h1 className="mt-3 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
          {t.services.title}
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-sm text-neutral-600">{t.services.subtitle}</p>
      </header>

      {SERVICE_CATEGORIES.map((cat) => (
        <section key={cat.id}>
          <h2 className="mb-1 text-base font-semibold text-neutral-900 sm:text-lg">{cat.title}</h2>
          <p className="mb-4 text-sm text-neutral-500">{cat.description}</p>
          {cat.models.length === 0 ? (
            <HubButton onClick={() => router.push("/m/logshield")}>{t.services.openLogshield}</HubButton>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {cat.models.map((repo) => {
                const m = byRepo[repo];
                return (
                  <li key={repo} className={`${hubCardClass} p-4 transition hover:shadow-md sm:p-5`}>
                    <p className="font-semibold text-neutral-900">{m?.name ?? repo.split("/").pop()}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{repo}</p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {m?.note ?? cat.description}
                    </p>
                    {m && (
                      <p className="mt-3 text-xs font-medium text-neutral-400">
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
