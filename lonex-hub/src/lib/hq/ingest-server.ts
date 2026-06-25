import { requireSql } from "@/lib/db";
import { hashApiKey } from "@/lib/hq/auth";
import { randomUUID } from "crypto";

export async function syncToHqServer(
  apiKey: string,
  item: { data_type: string; title: string; body_text: string; source_module: string }
) {
  if (!apiKey.startsWith("lnx_sk_")) return;
  const sql = requireSql();
  const rows = await sql`
    SELECT k.employee_id FROM hub_api_keys k
    JOIN hub_employees e ON e.id = k.employee_id
    WHERE k.key_hash = ${hashApiKey(apiKey)} AND k.revoked_at IS NULL LIMIT 1
  `;
  if (!rows[0]) return;
  const id = `REC-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
  await sql`
    INSERT INTO hub_ingest_records (id, employee_id, data_type, title, body_text, source_module)
    VALUES (${id}, ${rows[0].employee_id}, ${item.data_type}, ${item.title}, ${item.body_text}, ${item.source_module})
  `;
}
