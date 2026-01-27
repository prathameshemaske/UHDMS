-- Add bug_id column to test_run_results to link failures to bugs
-- Using UUID to match the existing bugs table primary key
alter table test_run_results 
add column if not exists bug_id uuid references bugs(id);
