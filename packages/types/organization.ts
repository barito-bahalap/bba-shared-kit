import type { OrganizationType } from "./enums";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
  parent_id: string | null;
  logo_path: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}
