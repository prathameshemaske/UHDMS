-- Update the check constraint for profiles.role to include 'hr'
ALTER TABLE public.profiles
DROP CONSTRAINT profiles_role_check;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_role_check
CHECK (role IN ('admin', 'manager', 'employee', 'hr'));
