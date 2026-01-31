
-- 1. Drop the foreign key constraint that forces every profile to have a matching auth user
-- This allows "Offline Employees" (created by Admin) to exist before they sign up.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'profiles_id_fkey') THEN
        ALTER TABLE public.profiles DROP CONSTRAINT profiles_id_fkey;
    END IF;
END $$;

-- 2. Ensure RLS policies don't break for offline users (auth.uid() will just be null/unmatched)
-- Existing policies use "auth.uid() = id", which is safe (false for offline users).

-- 3. Verify Profiles Table is Writable by Admins
-- (Already covered by existing policies, but good to be sure)
GRANT ALL ON public.profiles TO authenticated;
