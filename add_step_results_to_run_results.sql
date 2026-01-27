-- Add JSONB column to store step-level execution results
ALTER TABLE test_run_results 
ADD COLUMN IF NOT EXISTS step_results JSONB DEFAULT '[]'::jsonb;

-- Comment on column
COMMENT ON COLUMN test_run_results.step_results IS 'Array of {step_id, status, comment} objects';
