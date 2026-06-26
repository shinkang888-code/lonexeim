import { OsShellDesktop } from "@/components/os/OsShellDesktop";

export default function OsDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-32 pt-4">
      <header className="mb-4">
        <h1 className="text-lg font-bold text-neutral-900">LONEX OS Shell (POC)</h1>
        <p className="text-sm text-neutral-600">
          특허 제1발명 — 부동 윈도우 · MemoryRouter 격리 · z-컴팩션 · 초성 통합검색
        </p>
      </header>
      <OsShellDesktop />
    </div>
  );
}
