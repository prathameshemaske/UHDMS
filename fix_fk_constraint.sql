-- Fix: Allow creating profiles without a matching auth.users record
-- This is essential for HR/Directory functionality where an employee exists before they sign up.

-- 1. Drop the existing foreign key constraint
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 2. (Optional) Re-add it as nullable or just leave it decoupled for now?
-- For maximum flexibility in this dev phase, we leave it decoupled. 
-- Ideally, we would have `id` (uuid primary key) and `user_id` (uuid references auth.users nullable).
-- But changing the primary key structure is risky now. 
-- Dropping the constraint is the enabling move.

-- 3. Ensure ID is still a valid UUID (it is Primary Key, so it is)
