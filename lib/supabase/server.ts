import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client using anon (publishable) key.
 * Safe to use in Server Components — anon role only has SELECT on public.agencies.
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
