-- Add missing columns to Profiles table
-- The user reported 'department' column missing, and 'start_date' is also likely missing from the original schema.

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS department text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS start_date date;

-- Reload the schema cache is usually automatic, but this ensures the structure exists.
