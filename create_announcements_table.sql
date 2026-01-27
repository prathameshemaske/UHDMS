-- Create the announcements table
-- Dropping if exists to ensure clean slate if partial creation happened
DROP TABLE IF EXISTS public.announcements;

CREATE TABLE public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT CHECK (category IN ('New Joiner', 'Achievement', 'Promotion', 'General')) DEFAULT 'General',
    image_url TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- References public.profiles for easier joins
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read announcements
CREATE POLICY "Allow public read access" 
ON public.announcements FOR SELECT 
USING (true);

-- Policy: Authenticated users can insert
CREATE POLICY "Allow authenticated insert" 
ON public.announcements FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Policy: Creators can update/delete
CREATE POLICY "Allow individual update" 
ON public.announcements FOR UPDATE 
USING (auth.uid() = created_by);

CREATE POLICY "Allow individual delete" 
ON public.announcements FOR DELETE 
USING (auth.uid() = created_by);
