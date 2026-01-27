-- Add tags column to test_cases
ALTER TABLE test_cases 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

COMMENT ON COLUMN test_cases.tags IS 'Array of tags for categorization';
