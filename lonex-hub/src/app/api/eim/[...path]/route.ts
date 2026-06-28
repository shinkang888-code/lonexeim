import { NextRequest, NextResponse } from "next/server";
import {
  EIM_GATEWAY_MAP,
  EIM_TOTAL_PATHS,
  migratedPathCount,
  normalizeEimPath,
} from "@/lib/eim/gateway-routes";
import { resolveApiKey } from "@/lib/hq/resolve-api-key";
import { resolveTenant } from "@/lib/tenant/resolve-tenant";

export const dynamic = "force-dynamic";

type RouteCtx = { params: Promise<{ path: string[] }> };

async function handleMemberStub(req: NextRequest, subpath: string) {
  const tenant = await resolveTenant(req);
  if (subpath === "session-check" || subpath === "home-session-check") {
    const ctx = await resolveApiKey(req);
    return NextResponse.json({
      ok: !!ctx,
      tenant: tenant.slug,
      employee_id: ctx?.employee_id ?? null,
      mode: "hub-bff",
    });
  }
  if (subpath === "login" && req.method === "POST") {
    return NextResponse.json(
      {
        detail: "Use X-Lonex-Api-Key from /api/hq/keys (workforce module). Password login Phase 3.",
        tenant: tenant.slug,
      },
      { status: 501 }
    );
  }
  return null;
}

async function forwardToHub(req: NextRequest, hubPath: string, body?: unknown) {
  const url = new URL(hubPath, req.url);
  const headers = new Headers();
  req.headers.forEach((v, k) => {
    if (k.toLowerCase() === "host") return;
    headers.set(k, v);
  });

  const init: RequestInit = { method: req.method, headers };
  if (body !== undefined && req.method !== "GET" && req.method !== "HEAD") {
    headers.set("content-type", "application/json");
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}

export async function GET(req: NextRequest, ctx: RouteCtx) {
  return dispatch(req, ctx);
}
export async function POST(req: NextRequest, ctx: RouteCtx) {
  return dispatch(req, ctx);
}
export async function PUT(req: NextRequest, ctx: RouteCtx) {
  return dispatch(req, ctx);
}
export async function PATCH(req: NextRequest, ctx: RouteCtx) {
  return dispatch(req, ctx);
}
export async function DELETE(req: NextRequest, ctx: RouteCtx) {
  return dispatch(req, ctx);
}

async function dispatch(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  const normalized = normalizeEimPath(path ?? []);

  if (normalized.startsWith("member/")) {
    const stub = await handleMemberStub(req, normalized.replace(/^member\//, ""));
    if (stub) return stub;
  }

  const route = EIM_GATEWAY_MAP[normalized];
  if (!route) {
    return NextResponse.json(
      {
        detail: "EIM path not yet migrated to Hub BFF",
        eim_path: `/API/${normalized}`,
        migrated: migratedPathCount(),
        total: EIM_TOTAL_PATHS,
        docs: "docs/eim-api-paths.txt",
      },
      { status: 501 }
    );
  }

  if (!route.methods.includes(req.method as "GET")) {
    return NextResponse.json({ detail: "Method not allowed" }, { status: 405 });
  }

  let body: unknown;
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      body = await req.json();
    } catch {
      body = {};
    }
    if (route.mapBody && body && typeof body === "object") {
      body = route.mapBody(body as Record<string, unknown>);
    }
  }

  return forwardToHub(req, route.hubPath, body);
}
