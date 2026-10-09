export const DIVISION_IDS = ["bbt", "bbm"] as const;
export type DivisionId = (typeof DIVISION_IDS)[number];

export const BRANDS = ["corporate", "tech", "media", "dashboard"] as const;
export type Brand = (typeof BRANDS)[number];

export type DivisionBrand = Extract<Brand, "tech" | "media">;

export const USER_ROLES = ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"] as const;
export type UserRole = (typeof USER_ROLES)[number];
