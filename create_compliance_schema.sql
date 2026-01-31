-- TAX DECLARATIONS / COMPLIANCE Table
CREATE TABLE IF NOT EXISTS public.compliance_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT CHECK (type IN ('PF Challan', 'ESI Contribution', 'TDS Return')), -- Report Type
    period TEXT, -- e.g., "October 2023" or "Q1 2024"
    submission_date DATE DEFAULT CURRENT_DATE,
    acknowledgment_number TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'filed')),
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.compliance_records ENABLE ROW LEVEL SECURITY;

-- Admins/Managers can view/manage
CREATE POLICY "Admins/Managers manage compliance" ON public.compliance_records
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager', 'hr'))
    );

-- Everyone can view (if transparency is needed, or restrict to admin)
-- Let's restrict to admins for now as this seems like an admin dashboard
