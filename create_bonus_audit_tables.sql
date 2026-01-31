-- BONUSES Table
CREATE TABLE IF NOT EXISTS public.bonuses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    amount NUMERIC NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
    issued_by UUID REFERENCES public.profiles(id), -- Manager who gave it
    issued_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS for Bonuses
ALTER TABLE public.bonuses ENABLE ROW LEVEL SECURITY;

-- Policy: Employees can view their own bonuses
CREATE POLICY "Users can view own bonuses" ON public.bonuses 
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Managers/Admins can view ALL bonuses (Simplified: allow auth users to read all for now, or refine if roles exist)
-- For now, let's stick to: Everyone can see their own. Managers/Admins needs specific role check.
-- Assuming 'role' column in profiles.
CREATE POLICY "Admins/Managers can view all bonuses" ON public.bonuses
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager'))
    );

-- Policy: Only Admins/Managers can insert/update bonuses
CREATE POLICY "Admins/Managers can manage bonuses" ON public.bonuses
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager'))
    );


-- AUDIT LOGS Table (Simple generic log for Financials)
CREATE TABLE IF NOT EXISTS public.financial_audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    action TEXT, -- 'create_reimbursement', 'approve_bonus', etc.
    performed_by UUID REFERENCES public.profiles(id),
    target_id UUID, -- ID of the bonus/reimbursement
    target_type TEXT, -- 'bonus', 'reimbursement'
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.financial_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins/Managers view audit logs" ON public.financial_audit_logs
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager'))
    );
CREATE POLICY "Authenticated can insert logs" ON public.financial_audit_logs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
