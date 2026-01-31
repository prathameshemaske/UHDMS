alter table public.test_cases
add column if not exists function_name text default 'General';

-- Update existing cases to have 'General' if null
update public.test_cases set function_name = 'General' where function_name is null;
