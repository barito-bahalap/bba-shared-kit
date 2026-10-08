export interface AuditLog {
  id: string;
  actor_id: string | null;
  organization_id: string | null;
  action: string; // e.g. "update.news"
  entity_type: string; // matches tg_table_name, e.g. "news"
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}
