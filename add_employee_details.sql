-- Add Bio and Employment Type to Profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS employment_type text default 'Full-Time'; -- Full-Time, Part-Time, Contract, Intern
