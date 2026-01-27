-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. Test Suites (Folders)
create table if not exists test_suites (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  parent_id uuid references test_suites(id), -- For nested folders
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Test Cases
create table if not exists test_cases (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  pre_conditions text,
  suite_id uuid references test_suites(id),
  priority text check (priority in ('Low', 'Medium', 'High', 'Critical')),
  status text default 'Draft', -- Draft, Active, Deprecated
  author_id uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Test Steps
create table if not exists test_steps (
  id uuid default uuid_generate_v4() primary key,
  case_id uuid references test_cases(id) on delete cascade,
  step_number integer not null,
  action text not null,
  expected_result text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Test Runs (Execution Sessions)
create table if not exists test_runs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  status text default 'In Progress', -- In Progress, Completed, Aborted
  environment text, -- QA, Staging, Prod
  executed_by uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

-- 5. Test Run Results (Link between Run and Case)
create table if not exists test_run_results (
  id uuid default uuid_generate_v4() primary key,
  run_id uuid references test_runs(id) on delete cascade,
  case_id uuid references test_cases(id),
  status text default 'Untested', -- Untested, Pass, Fail, Block, Skip
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table test_suites enable row level security;
alter table test_cases enable row level security;
alter table test_steps enable row level security;
alter table test_runs enable row level security;
alter table test_run_results enable row level security;

-- Simple Policies (Open for now, can be restricted later)
create policy "Enable all access for authenticated users" on test_suites for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on test_cases for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on test_steps for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on test_runs for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on test_run_results for all using (auth.role() = 'authenticated');

-- Insert some sample data (optional, for initial view)
-- You can run this if you want some initial suites
/*
insert into test_suites (title, description) values ('Smoke Tests', 'Critical path tests');
insert into test_suites (title, description) values ('Regression', 'Full system regression');
*/
