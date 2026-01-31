
-- Salary Structures Table
CREATE TABLE IF NOT EXISTS salary_structures (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    ctc NUMERIC,
    basic NUMERIC,
    hra NUMERIC,
    allowances NUMERIC,
    pf NUMERIC,
    gross NUMERIC,
    net NUMERIC,
    effective_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id)
);

-- RLS Policies
ALTER TABLE salary_structures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins/HR can manage salary structures" ON salary_structures
    FOR ALL
    USING (
        auth.uid() IN (
            SELECT id FROM profiles 
            WHERE role IN ('admin', 'hr')
        )
    );

CREATE POLICY "Employees can view own structure" ON salary_structures
    FOR SELECT
    USING (auth.uid() = employee_id);
