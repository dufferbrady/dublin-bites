-- Run this in Neon (Netlify DB) after adding the database to your site.
-- Creates the table used by netlify/functions/submission-created.js

CREATE TABLE IF NOT EXISTS founding_member_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
