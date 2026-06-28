import Link from "next/link";
import { OsShellDesktop } from "@/components/os/OsShellDesktop";
import { HUB_DOCK_PAD } from "@/components/hub/hub-ui";

export default function OsDashboardPage() {
  return (
    <div className={`mx-auto max-w-6xl px-4 pt-4 ${HUB_DOCK_PAD}`}>
      <header className="mb-4">
        <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">LONEX OS Shell</h1>
        <p className="mt-1 text-sm text-neutral-600">
          멀티 윈도우 데스크톱 — 모듈을 동시에 실행하고 전환합니다.
        </p>
      </header>

      <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 md:hidden">
        OS Shell은 데스크톱 화면에 최적화되어 있습니다.{" "}
        <Link href="/" className="font-semibold underline">
          Hub 런처
        </Link>
        에서 모듈을 이용해 주세요.
      </div>

      <div className="hidden md:block">
        <OsShellDesktop />
      </div>
    </div>
  );
}
