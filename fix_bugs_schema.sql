-- Ensure bugs table has all necessary columns for the enhanced Report Bug modal
ALTER TABLE bugs 
ADD COLUMN IF NOT EXISTS severity text DEFAULT 'Major',
ADD COLUMN IF NOT EXISTS environment text,
ADD COLUMN IF NOT EXISTS assignee text, -- Using text for now to match frontend "Name" logic
ADD COLUMN IF NOT EXISTS project text DEFAULT 'UHDMS',
ADD COLUMN IF NOT EXISTS issue_type text DEFAULT 'Bug';

-- Also ensure priority is there (likely is, but just in case)
ALTER TABLE bugs 
ADD COLUMN IF NOT EXISTS priority text DEFAULT 'Medium';
