import type { PartnershipStatus } from "./enums";

export interface Partnership {
  id: string;
  organization_id: string;
  contact_name: string;
  contact_position: string | null;
  contact_phone: string;
  contact_email: string | null;
  message: string | null;
  status: PartnershipStatus;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

// Shape returned by the `public_partnership_status` view (public_partnership_status).
// Intentionally excludes contact_* fields
// Those never leave the base table for anonymous/public reads.
export interface PublicPartnershipStatus {
  organization_id: string;
  status: "verified";
  created_at: string;
}
