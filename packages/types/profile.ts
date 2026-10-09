import type { UserRole } from "./enums";

export interface Profile {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  bio?: string;
  photoSrc?: string;
  photoAlt?: string;
  published: boolean;
}
