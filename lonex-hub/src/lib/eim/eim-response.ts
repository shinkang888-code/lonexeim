import { NextResponse } from "next/server";

/** EIM legacy envelope — clients expect `result` or nested `data.result` */
export function eimOk<T>(result: T, status = 200) {
  return NextResponse.json({ result, status: "ok", mode: "hub-bff" }, { status });
}

export function eimList<T>(list: T[], total?: number, extra?: Record<string, unknown>) {
  return eimOk({
    list,
    totalCount: total ?? list.length,
    total: total ?? list.length,
    ...extra,
  });
}

export function eimErr(detail: string, status = 400) {
  return NextResponse.json({ detail, status: "error", mode: "hub-bff" }, { status });
}
