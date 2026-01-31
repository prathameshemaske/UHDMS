-- Ensure reimbursements table exists
CREATE TABLE IF NOT EXISTS public.reimbursements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    category TEXT,
    amount NUMERIC,
    description TEXT,
    receipt_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.reimbursements ENABLE ROW LEVEL SECURITY;

-- Drop potentially conflicting or incorrect policies
DROP POLICY IF EXISTS "Users manage own reimbursements" ON public.reimbursements;
DROP POLICY IF EXISTS "Users can view own reimbursements" ON public.reimbursements;
DROP POLICY IF EXISTS "Users can insert own reimbursements" ON public.reimbursements;
DROP POLICY IF EXISTS "Users can update own reimbursements" ON public.reimbursements;

-- Create granular policies
-- 1. SELECT: Users can see their own reimbursements
CREATE POLICY "Users can view own reimbursements"
ON public.reimbursements FOR SELECT
USING (auth.uid() = user_id);

-- 2. INSERT: Users can create reimbursement requests for themselves
CREATE POLICY "Users can insert own reimbursements"
ON public.reimbursements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 3. UPDATE: Users can update their own reimbursements (e.g. invalidating/editing? maybe restrict to pending? leaving open for now)
CREATE POLICY "Users can update own reimbursements"
ON public.reimbursements FOR UPDATE
USING (auth.uid() = user_id);

-- Grant permissions to authenticated role
GRANT ALL ON TABLE public.reimbursements TO authenticated;
GRANT ALL ON TABLE public.reimbursements TO service_role;
