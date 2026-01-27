-- Allow Admins and HR to create/update/delete ANY profile
-- This is necessary for the "Add Employee" feature where an Admin creates a profile for someone else.

-- 1. Drop conflicting or restrictive policies if appropriate (or we add a new permissive one)
DROP POLICY IF EXISTS "Admins and HR can manage all profiles" ON public.profiles;

-- 2. Create the new policy
-- Note: We assume 'profiles' is viewable by authenticated users (existing policy), avoiding recursion issues usually.
CREATE POLICY "Admins and HR can manage all profiles"
ON public.profiles
FOR ALL 
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'hr')
);

-- 3. Also ensuring the basic insert policy is not blocking if it's permissive enough
-- (If you are an admin, the above policy covers you. If you are a normal user, you fallback to "Users can insert their own profile" which we checked earlier)

-- 4. Grant usage just in case (usually default for public)
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;
