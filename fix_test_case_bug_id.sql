-- Change bug_id to UUID to match bugs table
ALTER TABLE test_cases 
  DROP COLUMN IF EXISTS bug_id;

ALTER TABLE test_cases 
  ADD COLUMN bug_id uuid REFERENCES bugs(id);
