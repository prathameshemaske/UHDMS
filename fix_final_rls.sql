
-- Secure function to check role (idempotent)
CREATE OR REPLACE FUNCTION public.is_admin_or_hr()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'hr')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable UUID extension just in case
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Fix Onboarding Details Policies
ALTER TABLE onboarding_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins/HR can manage onboarding details" ON onboarding_details;
DROP POLICY IF EXISTS "Employees can view own onboarding details" ON onboarding_details;

CREATE POLICY "Admins/HR can manage onboarding details" ON onboarding_details
    USING (public.is_admin_or_hr());

CREATE POLICY "Employees can view own onboarding details" ON onboarding_details
    FOR SELECT USING (auth.uid() = employee_id);

-- 2. Fix Offboarding Details Policies
ALTER TABLE offboarding_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins/HR can manage offboarding details" ON offboarding_details;
DROP POLICY IF EXISTS "Employees can view own offboarding details" ON offboarding_details;

CREATE POLICY "Admins/HR can manage offboarding details" ON offboarding_details
    USING (public.is_admin_or_hr());

CREATE POLICY "Employees can view own offboarding details" ON offboarding_details
    FOR SELECT USING (auth.uid() = employee_id);

-- 3. Ensure Profiles are Visible to Admins/HR (Critical for the sidebar list)
DROP POLICY IF EXISTS "Admins and HR can view all profiles" ON profiles;
CREATE POLICY "Admins and HR can view all profiles" ON profiles
    FOR SELECT
    USING (public.is_admin_or_hr());

-- 4. Grant Permissions
GRANT ALL ON onboarding_details TO authenticated;
GRANT ALL ON offboarding_details TO authenticated;
