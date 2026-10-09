import { useContext } from "react";
import type { Profile, UserRole } from "@baritobahalap/types";
import { AuthContext, type AuthContextValue } from "./AuthContext";

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

export function useProfile(): Profile | null {
  const { profile } = useAuthContext();
  return profile;
}

export function useHasRole(role: UserRole): boolean {
  const { profile } = useAuthContext();
  return profile?.role === role;
}
