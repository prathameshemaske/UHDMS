-- Allow 'clarification_needed' status
ALTER TABLE public.employee_tax_declarations 
DROP CONSTRAINT IF EXISTS employee_tax_declarations_status_check;

ALTER TABLE public.employee_tax_declarations 
ADD CONSTRAINT employee_tax_declarations_status_check 
CHECK (status IN ('pending', 'verified', 'rejected', 'clarification_needed'));
