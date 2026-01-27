-- Backfill Profiles from Auth.Users
-- Run this if your 'profiles' table is empty but you have logged-in users.

INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT 
    id, 
    email, 
    COALESCE(raw_user_meta_data->>'first_name', 'User') as first_name,
    COALESCE(raw_user_meta_data->>'last_name', substr(id::text, 1, 4)) as last_name,
    COALESCE(raw_user_meta_data->>'role', 'employee') as role
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);

-- Verify Counts (Output will show in SQL Editor results)
SELECT count(*) as total_profiles FROM public.profiles;
