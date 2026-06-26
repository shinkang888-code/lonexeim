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

/** Hub 모듈 페이지를 iframe으로 로드 (OS 윈도우 격리) */
function ModuleFrame({ moduleId }: { moduleId: string }) {
  return (
    <iframe
      title={moduleId}
      src={`/m/${moduleId}`}
      className="h-full min-h-[240px] w-full border-0 bg-white"
      allow="camera; microphone; clipboard-write"
    />
  );
}

function WindowSubPage({ moduleId, label }: { moduleId: string; label: string }) {
  const nav = useNavigate();
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b px-3 py-1.5">
        <button type="button" className="text-xs text-blue-600 underline" onClick={() => nav("/")}>
          ← 홈
        </button>
        <span className="ml-2 text-xs text-neutral-500">{label}</span>
      </div>
      <div className="min-h-0 flex-1">
        <ModuleFrame moduleId={moduleId} />
      </div>
    </div>
  );
}

export function OsWindowRouter({
  windowId,
  moduleId,
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
        <Route path="/" element={<ModuleFrame moduleId={moduleId} />} />
        {moduleId === "ai-assistant" && (
          <Route path="/chat" element={<WindowSubPage moduleId="ai-assistant" label="AI 채팅" />} />
        )}
        {moduleId === "hq-search" && (
          <Route path="/results" element={<WindowSubPage moduleId="hq-search" label="검색 결과" />} />
        )}
        {moduleId === "media" && (
          <Route
            path="/editor/:projectId/:slideId"
            element={<WindowSubPage moduleId="media" label="콘텐츠 편집기" />}
          />
        )}
      </Routes>
    </MemoryRouter>
  );
}
