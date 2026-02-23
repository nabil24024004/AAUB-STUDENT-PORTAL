import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/clerk-react";
import { useMemo } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client that uses Clerk session tokens for authentication.
 * This uses the official Third-Party Auth integration — Clerk JWTs are trusted
 * by Supabase directly (no JWT templates needed).
 */
export function useSupabaseClient() {
  const { session } = useSession();

  const client = useMemo(() => {
    return createClient(supabaseUrl, supabaseAnonKey, {
      accessToken: async () => {
        return session?.getToken() ?? null;
      },
    });
  }, [session]);

  return client;
}
