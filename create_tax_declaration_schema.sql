-- EMPLOYEE TAX DECLARATIONS
CREATE TABLE IF NOT EXISTS public.employee_tax_declarations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    financial_year TEXT DEFAULT '2023-24',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    
    -- Section 80C items (simplified JSON for flexibility or specific columns)
    section_80c_items JSONB DEFAULT '[]'::jsonb, -- e.g. [{"name": "LIC", "amount": 45000, "doc_url": "..."}]
    total_80c_amount NUMERIC DEFAULT 0,
    
    -- Section 80D items
    section_80d_items JSONB DEFAULT '[]'::jsonb,
    total_80d_amount NUMERIC DEFAULT 0,
    
    -- HRA
    hra_receipts JSONB DEFAULT '[]'::jsonb,
    hra_total_rent NUMERIC DEFAULT 0,
    
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    admin_remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.employee_tax_declarations ENABLE ROW LEVEL SECURITY;

-- Admins/Managers can view/update all
CREATE POLICY "Admins manage tax declarations" ON public.employee_tax_declarations
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager', 'hr'))
    );

-- Employees can view/insert their own
CREATE POLICY "Employees catch manage own tax declarations" ON public.employee_tax_declarations
    FOR ALL USING (auth.uid() = user_id);
