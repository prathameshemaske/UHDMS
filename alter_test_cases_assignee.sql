alter table public.test_cases 
add column if not exists assigned_to uuid references auth.users(id);

alter table public.test_steps
add column if not exists status text default 'Untested' check (status in ('Untested', 'Passed', 'Failed', 'Blocked', 'Skipped'));

-- Explicitly enable RLS again just in case
alter table public.test_cases enable row level security;
