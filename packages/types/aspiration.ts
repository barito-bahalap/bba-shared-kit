import type { AspirationStatus } from "./enums";

export type AspirationCategory =
  | "pendidikan"
  | "infrastruktur"
  | "ekonomi"
  | "kepemudaan"
  | "lainnya";

export interface Aspiration {
  id: string;
  organization_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
  status: AspirationStatus;
  category: AspirationCategory;
  created_at: string;
}
