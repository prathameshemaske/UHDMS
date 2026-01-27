-- 1. Add missing columns used in UserProfile.jsx
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS job_title text;

-- 2. Enable RLS (Row Level Security) just in case (good practice even if not strictly causing the error)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy: Allow Users to Update their OWN profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- 4. Create Policy: Allow Users to View profiles (needed for Team View/Header)
-- For now, allow authenticated users to see all profiles (like a directory)
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles
FOR SELECT
USING (auth.role() = 'authenticated');

-- 5. Create Policy: Allow Users to Insert their own profile (handled by trigger usually, but safe to add)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);
