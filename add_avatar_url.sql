-- Add avatar_url column if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Verify it exists (optional check)
SELECT column_name 
FROM information_schema.columns 
WHERE table_name='profiles' AND column_name='avatar_url';

-- Refresh schema cache
NOTIFY pgrst, 'reload config';
