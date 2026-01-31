-- Seed Tax Declaration Data (Fixed)
-- This script selects existing profiles and creates tax declarations for them.
-- Changed ORDER BY to 'id' to avoid "column created_at does not exist" error.

WITH target_users AS (
    SELECT id, first_name, last_name, row_number() OVER (ORDER BY id) as rn 
    FROM public.profiles 
    LIMIT 10
)
INSERT INTO public.employee_tax_declarations 
(
    user_id, 
    financial_year, 
    status, 
    total_80c_amount, 
    total_80d_amount, 
    hra_total_rent, 
    section_80c_items, 
    section_80d_items, 
    hra_receipts, 
    submission_date,
    created_at
)
SELECT 
    id, 
    '2023-24',
    CASE 
        WHEN rn % 3 = 1 THEN 'pending'
        WHEN rn % 3 = 2 THEN 'verified'
        ELSE 'rejected'
    END,
    -- 80C Amount
    CASE 
        WHEN rn = 1 THEN 150000 
        WHEN rn = 2 THEN 42000
        WHEN rn = 3 THEN 150000
        ELSE 85000
    END,
    -- 80D Amount
    CASE 
        WHEN rn = 1 THEN 25000 
        WHEN rn = 2 THEN 0
        WHEN rn = 3 THEN 50000
        ELSE 15000
    END,
    -- HRA
    CASE 
        WHEN rn = 1 THEN 120000 
        WHEN rn = 2 THEN 0
        WHEN rn = 3 THEN 60000
        ELSE 240000
    END,
    -- 80C Items (JSON)
    CASE 
        WHEN rn = 1 THEN '[{"name": "LIC Premium", "amount": 45000}, {"name": "PPF Investment", "amount": 105000}]'::jsonb
        WHEN rn = 2 THEN '[{"name": "ELSS", "amount": 42000}]'::jsonb
        ELSE '[{"name": "Life Insurance", "amount": 50000}]'::jsonb
    END,
    -- 80D Items (JSON)
    CASE 
        WHEN rn = 1 THEN '[{"name": "Medical Insurance", "amount": 25000}]'::jsonb
        WHEN rn = 3 THEN '[{"name": "Parents Insurance", "amount": 50000}]'::jsonb
        ELSE '[]'::jsonb
    END,
    -- Receipts
    '["#"]'::jsonb,
    -- Submission Date
    NOW() - (rn * interval '2 day'),
    NOW() - (rn * interval '2 day')
FROM target_users
ON CONFLICT DO NOTHING;
