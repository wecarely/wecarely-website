-- Migration: 2026-05-02_add_overview_and_languages
-- Adds agency overview (Claude-generated) and expanded language columns

ALTER TABLE agencies
  ADD COLUMN IF NOT EXISTS overview       TEXT,
  ADD COLUMN IF NOT EXISTS has_arabic     BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS has_korean     BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS has_tagalog    BOOLEAN NOT NULL DEFAULT FALSE;
