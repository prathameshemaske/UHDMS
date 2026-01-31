
-- Enable RLS on profiles (ensure it is on)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Employees can view their own profile
CREATE POLICY "Employees can view own profile" ON profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Policy: Admins and HR can view ALL profiles
CREATE POLICY "Admins/HR can view all profiles" ON profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles AS p
            WHERE p.id = auth.uid()
            AND p.role IN ('admin', 'hr')
        )
    );
