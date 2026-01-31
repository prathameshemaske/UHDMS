
-- 1. Create a secure function to check roles (bypassing RLS)
CREATE OR REPLACE FUNCTION public.is_admin_or_hr()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with privileges of the creator (postgres), bypassing RLS
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'hr')
  );
END;
$$;

-- 2. Drop the problematic recursive policy
DROP POLICY IF EXISTS "Admins/HR can view all profiles" ON public.profiles;

-- 3. Create new non-recursive policy
CREATE POLICY "Admins/HR can view all profiles" ON public.profiles
    FOR SELECT
    USING (public.is_admin_or_hr());
