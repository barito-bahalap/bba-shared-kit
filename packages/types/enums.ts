export const USER_ROLES = ["admin", "staff"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const DIVISION_IDS = ["bbt", "bbm"] as const;

export type DivisionId = (typeof DIVISION_IDS)[number];
