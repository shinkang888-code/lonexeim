"use client";

import { useEffect } from "react";
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useOsStore } from "@/store/os-store";

function PathSync({ windowId }: { windowId: string }) {
  const loc = useLocation();
  const setPath = useOsStore((s) => s.setPath);
  useEffect(() => {
    setPath(windowId, loc.pathname + loc.search);
  }, [windowId, loc.pathname, loc.search, setPath]);
  return null;
}

function WindowHome({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-white p-6 text-center">
      <p className="text-lg font-semibold text-neutral-900">{title}</p>
      <p className="mt-2 text-sm text-neutral-500">MemoryRouter 격리 — 윈도우별 독립 라우팅 (특허 141)</p>
    </div>
  );
}

function WindowSubPage({ label }: { label: string }) {
  const nav = useNavigate();
  return (
    <div className="h-full bg-white p-4">
      <button type="button" className="text-xs text-blue-600 underline" onClick={() => nav("/")}>
        ← 홈
      </button>
      <h2 className="mt-4 text-base font-semibold">{label}</h2>
      <p className="mt-2 text-sm text-neutral-600">딥라우트 복원 POC — 새로고침 시 path 영속화</p>
    </div>
  );
}

export function OsWindowRouter({
  windowId,
  moduleId,
  title,
  initialPath,
}: {
  windowId: string;
  moduleId: string;
  title: string;
  initialPath: string;
}) {
  return (
    <MemoryRouter initialEntries={[initialPath || "/"]}>
      <PathSync windowId={windowId} />
      <Routes>
        <Route path="/" element={<WindowHome title={title} />} />
        {moduleId === "ai-assistant" && (
          <Route path="/chat" element={<WindowSubPage label="AI 채팅 화면" />} />
        )}
        {moduleId === "hq-search" && (
          <Route path="/results" element={<WindowSubPage label="검색 결과" />} />
        )}
        {moduleId === "media" && (
          <Route path="/editor/:projectId/:slideId" element={<WindowSubPage label="콘텐츠 편집기 (딥라우트)" />} />
        )}
      </Routes>
    </MemoryRouter>
  );
}
