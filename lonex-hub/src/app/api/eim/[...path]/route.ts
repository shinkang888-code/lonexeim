import { NextRequest, NextResponse } from "next/server";
import {
  EIM_GATEWAY_MAP,
  normalizeEimPath,
} from "@/lib/eim/gateway-routes";
import { handleEimCategoryStub } from "@/lib/eim/category-stub";
import { invokeHubHandler } from "@/lib/eim/hub-handlers";
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
    return handleEimCategoryStub(req, normalized);
  }

  if (!route.methods.includes(req.method as (typeof route.methods)[number])) {
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

  const direct = await invokeHubHandler(req, route.hubPath, body, req.method);
  if (direct) return direct;

  return handleEimCategoryStub(req, normalized);
}
