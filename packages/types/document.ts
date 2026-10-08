import type { ContentStatus, DocumentCategory } from "./enums";

export interface OrgDocument {
  id: string;
  organization_id: string;
  uploaded_by: string | null;
  title: string;
  description: string | null;
  category: DocumentCategory;
  file_path: string;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
