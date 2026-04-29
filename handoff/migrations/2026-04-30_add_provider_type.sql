-- Migration: Add provider_type to agencies for multi-vertical expansion
-- Date: 2026-04-30
-- Run in Supabase SQL Editor (Project: oyiscanwalgstffskcvt)
--
-- Why: We're a Houston home care directory today, but the strategic plan
-- is the full senior-care vertical (home health → SNF → hospice → assisted
-- living). Adding provider_type now means we don't have to rebuild later.
--
-- Safe to run: additive, idempotent, all 259 existing rows get default
-- 'home_care' automatically. Frontend doesn't read this column yet, so
-- zero behavior change today.

-- Step 1: Define the enum of valid provider types.
-- New verticals can be added later via:
--   ALTER TYPE provider_type ADD VALUE 'adult_day_care';
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'provider_type') THEN
    CREATE TYPE provider_type AS ENUM (
      'home_care',         -- non-medical: bathing, meals, companion (private pay / Medicaid)
      'home_health',       -- medical: nursing, PT/OT/ST (Medicare-covered)
      'hospice',           -- end-of-life
      'snf',               -- Skilled Nursing Facility / nursing home
      'assisted_living',   -- residential care, less medical
      'memory_care'        -- dementia-specific facility
    );
  END IF;
END $$;

-- Step 2: Add the column with a sensible default.
-- All 259 existing rows are home_care, so the default backfills correctly.
ALTER TABLE public.agencies
  ADD COLUMN IF NOT EXISTS provider_type provider_type NOT NULL DEFAULT 'home_care';

-- Step 3: Index for fast filtering when we eventually have mixed types.
CREATE INDEX IF NOT EXISTS idx_agencies_provider_type
  ON public.agencies (provider_type);

-- Step 4: Verification — should show 259 rows, all home_care.
-- SELECT provider_type, count(*) FROM public.agencies GROUP BY provider_type;
