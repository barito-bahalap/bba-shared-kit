import type { UserRole } from "./enums";

export interface Profile {
  id: string;
  name: string;
  role: UserRole;
  bio?: string;
  photoSrc?: string;
  photoAlt?: string;
  published: boolean;
}
