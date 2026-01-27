-- Add status column to test_steps to persist step-level results in the repository view
ALTER TABLE test_steps 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'Not Run';
