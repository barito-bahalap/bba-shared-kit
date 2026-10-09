import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";
import type { Profile } from "@baritobahalap/types";

export interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
