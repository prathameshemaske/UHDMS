-- Force Fix Profiles Access (Final)
-- 1. Enable RLS (Ensure it's on)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Drop ALL existing policies on profiles to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;

-- 3. Create a single, simple READ policy for EVERYONE
CREATE POLICY "Profiles are viewable by everyone_final" 
ON public.profiles FOR SELECT 
USING (true);

-- 4. Allow INSERT/UPDATE for Authenticated Users (Self-service)
CREATE POLICY "Users can manage own profile_final" 
ON public.profiles FOR ALL 
USING (auth.uid() = id);

-- 5. Grant Permissions (Crucial for Supabase API)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.teams TO anon, authenticated;
GRANT ALL ON public.team_members TO anon, authenticated;

-- 6. Verify one more time with a count
SELECT count(*) as verified_profiles_count FROM public.profiles;
