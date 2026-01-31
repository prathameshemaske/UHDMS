
-- 1. Create a secure function to check roles (bypassing RLS)
CREATE OR REPLACE FUNCTION public.is_admin_or_hr()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
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

-- 2. Drop problematic recursive policies on profiles
DROP POLICY IF EXISTS "Admins/HR can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;

-- 3. Create clean RLS policies for profiles
-- Allow users to see their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Allow Admins/HR to view ALL profiles (using the safe function)
CREATE POLICY "Admins/HR can view all profiles" ON public.profiles
    FOR SELECT USING (public.is_admin_or_hr());

-- 4. Enable RLS on Payroll tables (just in case)
ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;

-- 5. Fix Payroll Policies
DROP POLICY IF EXISTS "Admins can manage payroll runs" ON payroll_runs;
DROP POLICY IF EXISTS "Admins can manage payslips" ON payslips;
DROP POLICY IF EXISTS "Admins/HR can manage payroll runs" ON payroll_runs;
DROP POLICY IF EXISTS "Admins/HR can manage payslips" ON payslips;

-- Create correct policies using the secure function
CREATE POLICY "Admins/HR can manage payroll runs" ON payroll_runs
    FOR ALL USING (public.is_admin_or_hr());

CREATE POLICY "Admins/HR can manage payslips" ON payslips
    FOR ALL USING (public.is_admin_or_hr());

-- Allow employees to see their own payslips
CREATE POLICY "Employees can view own payslips" ON payslips
    FOR SELECT USING (auth.uid() = user_id);
