-- Create Loans Table
CREATE TABLE IF NOT EXISTS public.loans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employee_id UUID REFERENCES public.profiles(id) NOT NULL,
    request_amount DECIMAL(10,2) NOT NULL,
    tenure_months INTEGER NOT NULL,
    monthly_emi DECIMAL(10,2),
    reason TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'active', 'closed')),
    approved_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Loans
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

-- Policies for Loans
CREATE POLICY "Employees can view their own loans" ON public.loans
    FOR SELECT USING (auth.uid() = employee_id);

CREATE POLICY "Employees can insert loan requests" ON public.loans
    FOR INSERT WITH CHECK (auth.uid() = employee_id);

CREATE POLICY "Admins and HR can view all loans" ON public.loans
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'hr')
        )
    );

CREATE POLICY "Admins and HR can update loans" ON public.loans
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'hr')
        )
    );

-- Create Settlements Table (FnF)
CREATE TABLE IF NOT EXISTS public.settlements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employee_id UUID REFERENCES public.profiles(id) NOT NULL,
    resignation_date DATE NOT NULL,
    last_working_day DATE NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
    it_clearance BOOLEAN DEFAULT FALSE,
    finance_clearance BOOLEAN DEFAULT FALSE,
    final_payout DECIMAL(10,2),
    processed_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Settlements
ALTER TABLE public.settlements ENABLE ROW LEVEL SECURITY;

-- Policies for Settlements
CREATE POLICY "Admins and HR can view/manage settlements" ON public.settlements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'hr')
        )
    );

CREATE POLICY "Employees can view their own settlement" ON public.settlements
    FOR SELECT USING (auth.uid() = employee_id);
