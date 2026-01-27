-- Add execution status to Test Cases
ALTER TABLE test_cases 
ADD COLUMN IF NOT EXISTS execution_status text DEFAULT 'Not Run',
ADD COLUMN IF NOT EXISTS bug_id uuid REFERENCES bugs(id);

-- Add execution status to Test Steps
ALTER TABLE test_steps 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'Not Run';

-- Comment on columns
COMMENT ON COLUMN test_cases.execution_status IS 'Current execution status: Not Run, Pass, Fail, Blocked';
COMMENT ON COLUMN test_steps.status IS 'Current step status: Not Run, Pass, Fail, Blocked';
