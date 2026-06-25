import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "lonex-hub",
    timestamp: new Date().toISOString(),
    database: !!process.env.DATABASE_URL,
    ai: !!process.env.HF_TOKEN,
  });
}
