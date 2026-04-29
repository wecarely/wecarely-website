-- Migration: Enable Row Level Security on public tables
-- Date: 2026-04-30
-- Run in Supabase SQL Editor (Project: oyiscanwalgstffskcvt)
--
-- Why: Supabase Security Advisor flagged `rls_disabled_in_public` —
-- without RLS, anyone holding the publishable (anon) key (which is
-- exposed in our browser bundle by design) can INSERT, UPDATE, or
-- DELETE any row in our public tables. We want anon to only SELECT
-- the `agencies` table, nothing else.
--
-- Safe to run: enabling RLS + adding a permissive SELECT policy keeps
-- the live site working unchanged. Verifying after run:
--   curl -H "apikey: <PUBLISHABLE_KEY>" \
--     "https://oyiscanwalgstffskcvt.supabase.co/rest/v1/agencies?limit=1"
-- → should return one row (200 OK)
--   Same with -X POST → should return 401/403

-- Step 1: Enumerate all current public-schema tables (run for visibility)
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Step 2: Enable RLS on the agencies table (the only one our app queries)
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;

-- Step 3: Allow anon (and authenticated) to SELECT all rows.
-- The site shows the full Houston directory publicly — this is intentional.
DROP POLICY IF EXISTS "Public read agencies" ON public.agencies;
CREATE POLICY "Public read agencies"
  ON public.agencies
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Step 4: Force RLS even for the table owner (defense in depth).
-- Without FORCE, Postgres bypasses RLS for the table owner role.
ALTER TABLE public.agencies FORCE ROW LEVEL SECURITY;

-- Note: We deliberately do NOT add INSERT/UPDATE/DELETE policies for anon.
-- All write operations (data import, trust score updates, sponsor flips)
-- run from the home-care-directory Python scripts using the SECRET key,
-- which bypasses RLS by design — those keep working unchanged.

-- Step 5: Catch-all — any OTHER table that exists in public schema.
-- If you've created tables via Studio that the app doesn't read, this
-- block enables RLS on them with NO policy (anon can do nothing).
-- Safe because nothing in our codebase reads them via the publishable key.
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename != 'agencies'
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE public.%I FORCE ROW LEVEL SECURITY', t);
    RAISE NOTICE 'RLS enabled on public.%', t;
  END LOOP;
END $$;
