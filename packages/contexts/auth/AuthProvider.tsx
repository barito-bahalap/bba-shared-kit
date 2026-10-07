import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Profile } from "@bba/types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
  supabaseClient: SupabaseClient;
}

export function AuthProvider({ children, supabaseClient }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(
    async (userId: string) => {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Failed to load profile:", error.message);
        setProfile(null);
        return;
      }

      setProfile(data as Profile);
    },
    [supabaseClient],
  );

  const refreshProfile = useCallback(async () => {
    if (!session?.user.id) return;
    await loadProfile(session.user.id);
  }, [session, loadProfile]);

  const signOut = useCallback(async () => {
    await supabaseClient.auth.signOut();
    setSession(null);
    setProfile(null);
  }, [supabaseClient]);

  useEffect(() => {
    let active = true;

    supabaseClient.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      if (data.session?.user.id) {
        await loadProfile(data.session.user.id);
      }
      if (active) setLoading(false);
    });

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!active) return;
        setSession(nextSession);
        if (nextSession?.user.id) {
          void loadProfile(nextSession.user.id);
        } else {
          setProfile(null);
        }
      },
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabaseClient, loadProfile]);

  const value = useMemo(
    () => ({ session, profile, loading, signOut, refreshProfile }),
    [session, profile, loading, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
