/** Versioned SQLite migrations for mobile offline DB (architecture Offline-First). */

import { CREATE_TABLES_SQL, SCHEMA_VERSION } from "./schema";
import { openMobileDatabase, getOfflineDbSecurityStatus, withMobileDb } from "../lib/mobileDb";
import { MOBILE_SYNC_DEVICE_ID } from "../lib/phase10bSync";

type DbLike = Awaited<ReturnType<typeof openMobileDatabase>>;

const ALTERS = [
  "ALTER TABLE sync_queue ADD COLUMN next_retry_at TEXT",
  "ALTER TABLE sync_queue ADD COLUMN device_id TEXT",
  "ALTER TABLE sync_queue ADD COLUMN queue_uuid TEXT",
];

async function applySchema(database: DbLike) {
  // Full create-if-not-exists for current SCHEMA_VERSION tables
  for (const stmt of CREATE_TABLES_SQL.split(";")
    .map((s) => s.trim())
    .filter(Boolean)) {
    await database.execAsync(stmt);
  }

  for (const sql of ALTERS) {
    try {
      await database.runAsync(sql);
    } catch {
      /* column may already exist */
    }
  }

  // Backfill device_id + queue_uuid; normalize legacy synced → done
  const now = new Date().toISOString();
  try {
    await database.runAsync(
      `UPDATE sync_queue SET device_id = COALESCE(device_id, ?) WHERE device_id IS NULL OR device_id = ''`,
      [MOBILE_SYNC_DEVICE_ID]
    );
  } catch {
    /* ignore */
  }
  try {
    await database.runAsync(
      `UPDATE sync_queue SET queue_uuid = lower(hex(randomblob(16))) WHERE queue_uuid IS NULL OR queue_uuid = ''`
    );
  } catch {
    /* ignore */
  }
  try {
    await database.runAsync(`UPDATE sync_queue SET status = 'done' WHERE status = 'synced'`);
  } catch {
    /* ignore */
  }

  // Mirror schema_version into both meta tables
  for (const table of ["mobile_meta", "sync_meta"] as const) {
    await database.runAsync(
      `INSERT OR REPLACE INTO ${table} (key, value, updated_at) VALUES (?, ?, ?)`,
      ["schema_version", String(SCHEMA_VERSION), now]
    );
  }
  const security = getOfflineDbSecurityStatus();
  await database.runAsync(
    "INSERT OR REPLACE INTO mobile_meta (key, value, updated_at) VALUES (?, ?, ?)",
    ["db_security_mode", security.mode, now]
  );
  await database.runAsync(
    "INSERT OR REPLACE INTO sync_meta (key, value, updated_at) VALUES (?, ?, ?)",
    ["db_security_mode", security.mode, now]
  );
  await database.runAsync(
    "INSERT OR REPLACE INTO sync_meta (key, value, updated_at) VALUES (?, ?, ?)",
    ["device_id", MOBILE_SYNC_DEVICE_ID, now]
  );
}

export async function runMigrations(db?: DbLike): Promise<{ version: number; mode: string }> {
  if (db) {
    await applySchema(db);
    return { version: SCHEMA_VERSION, mode: getOfflineDbSecurityStatus().mode };
  }
  return withMobileDb(async (database) => {
    await applySchema(database);
    return { version: SCHEMA_VERSION, mode: getOfflineDbSecurityStatus().mode };
  });
}
