-- Add Approval Columns to payroll_runs
ALTER TABLE public.payroll_runs
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
ADD COLUMN IF NOT EXISTS approver_comments TEXT,
ADD COLUMN IF NOT EXISTS disbursement_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS variance_data JSONB DEFAULT '{}'::jsonb, -- Store snapshot of departmental variance
ADD COLUMN IF NOT EXISTS integrity_check_data JSONB DEFAULT '{"tax_compliance": true, "duplicate_payment": true, "fund_availability": true, "employee_sync": true}'::jsonb;

-- Update status constraint if needed, or just rely on application logic. 
-- Assuming 'status' column is for overall lifecycle (Draft -> Processing -> Paid), 
-- 'approval_status' tracks the specific review step.
