-- Create Likes Table
CREATE TABLE IF NOT EXISTS announcement_likes (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, announcement_id)
);

-- Create Comments Table
CREATE TABLE IF NOT EXISTS announcement_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS Policies (Simple public read/write for auth users for now)
ALTER TABLE announcement_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_comments ENABLE ROW LEVEL SECURITY;

-- Likes Policies
CREATE POLICY "Users can like posts" ON announcement_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike posts" ON announcement_likes FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Everyone can see likes" ON announcement_likes FOR SELECT USING (true);

-- Comments Policies
CREATE POLICY "Users can comment" ON announcement_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON announcement_comments FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Everyone can see comments" ON announcement_comments FOR SELECT USING (true);
