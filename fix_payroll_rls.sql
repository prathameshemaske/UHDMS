
-- Enable RLS
ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;

-- Payroll Runs Policies
CREATE POLICY "Admins/HR can manage payroll runs" ON payroll_runs
    FOR ALL
    USING (
        auth.uid() IN (
            SELECT id FROM profiles 
            WHERE role IN ('admin', 'hr')
        )
    );

-- Payslips Policies
CREATE POLICY "Admins/HR can manage payslips" ON payslips
    FOR ALL
    USING (
        auth.uid() IN (
            SELECT id FROM profiles 
            WHERE role IN ('admin', 'hr')
        )
    );

CREATE POLICY "Employees can view own payslips" ON payslips
    FOR SELECT
    USING (auth.uid() = user_id);
