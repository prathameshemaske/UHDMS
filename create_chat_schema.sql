-- Conversations Table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('direct', 'group')),
    name TEXT, -- Null for DMs, required for groups usually
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Participants Table (Join table)
CREATE TABLE IF NOT EXISTS conversation_participants (
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- Link to profiles, not just auth.users
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (conversation_id, user_id)
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    content TEXT,
    type TEXT DEFAULT 'text', -- 'text', 'image', 'file'
    file_url TEXT,
    parent_id UUID REFERENCES messages(id) ON DELETE CASCADE, -- For threads
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies

-- Conversations: Visible if you are a participant
CREATE POLICY "Users can view conversations they are in" ON conversations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM conversation_participants cp 
            WHERE cp.conversation_id = id 
            AND cp.user_id = auth.uid()
        )
    );
-- Allow creation (anyone can start a chat)
CREATE POLICY "Users can create conversations" ON conversations FOR INSERT WITH CHECK (true);

-- Participants: Visible if you are in the conversation or if it involves you
CREATE POLICY "Users can view participants of their chats" ON conversation_participants
    FOR SELECT USING (
        user_id = auth.uid() OR 
        conversation_id IN (
            SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid()
        )
    );
CREATE POLICY "Users can join/add to conversations" ON conversation_participants FOR INSERT WITH CHECK (true); -- Simplified for now

-- Messages: Visible if you are a participant of the conversation
CREATE POLICY "Users can view messages in their chats" ON messages
    FOR SELECT USING (
        conversation_id IN (
            SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert messages in their chats" ON messages
    FOR INSERT WITH CHECK (
        conversation_id IN (
            SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid()
        )
    );

-- Reload Schema
NOTIFY pgrst, 'reload config';
