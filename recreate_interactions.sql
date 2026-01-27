-- Rerun: Create Likes Table if not exists
CREATE TABLE IF NOT EXISTS announcement_likes (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, announcement_id)
);

-- Rerun: Create Comments Table if not exists
CREATE TABLE IF NOT EXISTS announcement_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Force refresh schema cache (sometimes needed)
NOTIFY pgrst, 'reload config';

-- Add RLS Policies (Simple public read/write for auth users for now)
ALTER TABLE announcement_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_comments ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    -- Likes Policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can like posts') THEN
        CREATE POLICY "Users can like posts" ON announcement_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can unlike posts') THEN
        CREATE POLICY "Users can unlike posts" ON announcement_likes FOR DELETE USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Everyone can see likes') THEN
        CREATE POLICY "Everyone can see likes" ON announcement_likes FOR SELECT USING (true);
    END IF;

    -- Comments Policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can comment') THEN
        CREATE POLICY "Users can comment" ON announcement_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete own comments') THEN
        CREATE POLICY "Users can delete own comments" ON announcement_comments FOR DELETE USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Everyone can see comments') THEN
        CREATE POLICY "Everyone can see comments" ON announcement_comments FOR SELECT USING (true);
    END IF;
END $$;
