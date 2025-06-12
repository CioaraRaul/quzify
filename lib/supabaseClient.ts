// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Replace with your actual Supabase URL and public anon key
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL and Anon Key must be provided in environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
