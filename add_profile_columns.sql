-- Add Location and Skills to Profiles (Corrected)
-- 1. Add Columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS skills text[];

-- 2. Backfill Data using CASE for type safety
UPDATE public.profiles 
SET 
  location = CASE floor(random() * 4)
    WHEN 0 THEN 'New York'
    WHEN 1 THEN 'London'
    WHEN 2 THEN 'San Francisco'
    ELSE 'Remote'
  END,
  skills = CASE floor(random() * 4)
    WHEN 0 THEN ARRAY['React', 'Node.js', 'SQL']
    WHEN 1 THEN ARRAY['Design', 'Figma', 'UI/UX']
    WHEN 2 THEN ARRAY['Marketing', 'SEO', 'Content']
    ELSE ARRAY['Management', 'Agile', 'Scrum']
  END,
  department = CASE floor(random() * 4)
    WHEN 0 THEN 'Engineering'
    WHEN 1 THEN 'Design'
    WHEN 2 THEN 'Marketing'
    ELSE 'Product'
  END
WHERE location IS NULL;
