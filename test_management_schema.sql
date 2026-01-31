-- Test Management Module Schema
-- ⚠️ WARNING: This will drop existing test management tables and data to ensure a clean install.
drop table if exists public.test_executions cascade;
drop table if exists public.test_runs cascade;
drop table if exists public.test_steps cascade;
drop table if exists public.test_cases cascade;
drop table if exists public.test_folders cascade;

-- 1. Folders for Hierarchical Organization
create table public.test_folders (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    parent_id uuid references public.test_folders(id),
    project_id text, -- Optional: link to a project if needed
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Test Repository (The Cases)
create table public.test_cases (
    id uuid default gen_random_uuid() primary key,
    folder_id uuid references public.test_folders(id),
    title text not null,
    description text,
    preconditions text,
    priority text check (priority in ('Low', 'Medium', 'High', 'Critical')),
    type text check (type in ('Functional', 'Regression', 'Smoke', 'Performance', 'Other')),
    status text default 'Active' check (status in ('Active', 'Draft', 'Deprecated')),
    created_by uuid references auth.users(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Granular Test Steps
create table public.test_steps (
    id uuid default gen_random_uuid() primary key,
    case_id uuid references public.test_cases(id) on delete cascade,
    step_number integer not null,
    action text not null,
    expected_result text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Test Plans / Runs (Grouping Executions)
create table public.test_runs (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    environment text check (environment in ('Development', 'Staging', 'Production', 'QA')),
    status text default 'Planned' check (status in ('Planned', 'In Progress', 'Completed', 'Archived')),
    created_by uuid references auth.users(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Test Executions (The actual results of a run)
create table public.test_executions (
    id uuid default gen_random_uuid() primary key,
    run_id uuid references public.test_runs(id) on delete cascade,
    case_id uuid references public.test_cases(id),
    status text default 'Untested' check (status in ('Untested', 'Passed', 'Failed', 'Blocked', 'Skipped')),
    actual_result text,
    comment text,
    evidence_url text, -- For screenshots/videos
    executed_by uuid references auth.users(id),
    executed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    duration_seconds integer -- To track "Timer" data
);

-- Enable RLS
alter table public.test_folders enable row level security;
alter table public.test_cases enable row level security;
alter table public.test_steps enable row level security;
alter table public.test_runs enable row level security;
alter table public.test_executions enable row level security;

-- Policies (Open for now for ease of development, can be tightened later)
create policy "Allow all access to test tables" on public.test_folders for all using (true);
create policy "Allow all access to test cases" on public.test_cases for all using (true);
create policy "Allow all access to test steps" on public.test_steps for all using (true);
create policy "Allow all access to test runs" on public.test_runs for all using (true);
create policy "Allow all access to test executions" on public.test_executions for all using (true);
