
-- Table to store detailed Onboarding Form data
CREATE TABLE IF NOT EXISTS onboarding_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    personal_details JSONB DEFAULT '{}', -- Full Name, ID, Email, Dept, Designation, Manager, Joining Date
    asset_details JSONB DEFAULT '{}',    -- Laptop Required, Serial No, Software Access, Physical Access
    documents JSONB DEFAULT '{}',        -- URLs for Signed Offer, IDs, Certs, Relieving Letter
    status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table to store detailed Offboarding Form data
CREATE TABLE IF NOT EXISTS offboarding_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    termination_details JSONB DEFAULT '{}', -- Last Day, Reason, Notice, Exit Interview
    asset_recovery JSONB DEFAULT '{}',      -- Laptop Returned, ID Returned, Cards Cancelled
    it_deprovisioning JSONB DEFAULT '{}',   -- Email Deactivated, Slack/Jira/GitHub Revoked
    final_settlement JSONB DEFAULT '{}',    -- Gratuity, Leave Encashment, Final Dues
    status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE onboarding_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE offboarding_details ENABLE ROW LEVEL SECURITY;

-- Policies for Onboarding Details
-- Admins and HR can manage everything
CREATE POLICY "Admins/HR can manage onboarding details" ON onboarding_details
    USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
    );

-- Employees can view their own details
CREATE POLICY "Employees can view own onboarding details" ON onboarding_details
    FOR SELECT USING (auth.uid() = employee_id);

-- Policies for Offboarding Details
-- Admins and HR can manage everything
CREATE POLICY "Admins/HR can manage offboarding details" ON offboarding_details
    USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
    );

-- Employees can view their own details
CREATE POLICY "Employees can view own offboarding details" ON offboarding_details
    FOR SELECT USING (auth.uid() = employee_id);
