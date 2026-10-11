import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://svdypqnngotkqtafjwha.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZHlwcW5uZ290a3F0YWZqd2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3MTUzMjUsImV4cCI6MjEwNzI5MTMyNX0.FSmO4skdk1e4sYAxXBxt46xM2LSkDOPL6dUkx6OEl7A";
const adminSecret = process.env.ADMIN_JWT_SECRET || "birta-mai-jewellers-super-secret-luxury-key-2026-birtamai";

/**
 * Public client for general access (adheres to standard public RLS policies)
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Server-side elevated client for authorized administrative operations
 * (Uses internal admin secret header evaluated by PostgreSQL is_admin_request RLS function)
 */
export function getSupabaseAdminClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "x-bmj-secret": adminSecret,
      },
    },
  });
}
