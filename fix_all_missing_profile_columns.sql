-- Comprehensive Fix for Profiles Table
-- Run this script to ensure ALL required columns exist.

-- 1. Job Details
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS job_title text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS department text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS employment_type text default 'Full-Time';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS start_date date;

-- 2. Contact & Bio
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio text;

-- 3. Skills (Array of text)
-- Note: If 'skills' exists as text, this might error, but assuming it's missing or already text[]
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS skills text[];

-- 4. Verify RLS (Safety Check)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Grant permissions (just in case)
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
