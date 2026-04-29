-- Migration: Add sponsor columns to agencies table
-- Date: 2026-04-29
-- Run in Supabase SQL Editor (Project: oyiscanwalgstffskcvt)
--
-- Purpose: Enable per-agency sponsorship state so /SponsoredCarousel
-- can render real sponsors mixed with placeholder slots.
-- Default values mean all 259 existing rows are unaffected (is_sponsored=false).
--
-- This is a non-destructive ADD COLUMN — safe, idempotent (CONCURRENTLY skipped
-- since it's a small table, plain ALTER is fine).

ALTER TABLE agencies
  ADD COLUMN IF NOT EXISTS is_sponsored boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sponsor_logo_url text,
  ADD COLUMN IF NOT EXISTS sponsor_hours text,
  ADD COLUMN IF NOT EXISTS sponsor_tagline text,
  ADD COLUMN IF NOT EXISTS sponsor_priority smallint;

-- Index for fast lookup of active sponsors ordered by priority.
-- Partial index: only sponsored rows take up space (so 4 rows, not 259).
CREATE INDEX IF NOT EXISTS agencies_active_sponsors_idx
  ON agencies (sponsor_priority)
  WHERE is_sponsored = true;

-- Optional sanity check: verify the columns exist
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'agencies'
  AND column_name IN (
    'is_sponsored', 'sponsor_logo_url', 'sponsor_hours',
    'sponsor_tagline', 'sponsor_priority'
  )
ORDER BY column_name;
