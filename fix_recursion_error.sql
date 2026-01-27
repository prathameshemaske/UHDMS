-- 1. Create a helper function to get conversations without triggering RLS recursively
-- SECURITY DEFINER means this runs with admin privileges, bypassing the RLS on conversation_participants temporarily for this check.
CREATE OR REPLACE FUNCTION get_user_conversation_ids(uid uuid)
RETURNS TABLE (conversation_id uuid) 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY SELECT cp.conversation_id FROM conversation_participants cp WHERE cp.user_id = uid;
END;
$$ LANGUAGE plpgsql;

-- 2. Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view conversations they are in" ON conversations;
DROP POLICY IF EXISTS "Users can view participants of their chats" ON conversation_participants;
DROP POLICY IF EXISTS "Users can view messages in their chats" ON messages;
DROP POLICY IF EXISTS "Users can insert messages in their chats" ON messages;

-- 3. Re-create/Update Policies using the helper function

-- Conversations: Visible if ID is in the user's list
CREATE POLICY "Users can view conversations they are in" ON conversations
    FOR SELECT USING (
        id IN (SELECT * FROM get_user_conversation_ids(auth.uid()))
    );

-- Participants: Visible if conversation_id is in the user's list
CREATE POLICY "Users can view participants of their chats" ON conversation_participants
    FOR SELECT USING (
        conversation_id IN (SELECT * FROM get_user_conversation_ids(auth.uid()))
    );

-- Messages: Visible if conversation_id is in the user's list
CREATE POLICY "Users can view messages in their chats" ON messages
    FOR SELECT USING (
        conversation_id IN (SELECT * FROM get_user_conversation_ids(auth.uid()))
    );

CREATE POLICY "Users can insert messages in their chats" ON messages
    FOR INSERT WITH CHECK (
        conversation_id IN (SELECT * FROM get_user_conversation_ids(auth.uid()))
    );

-- Ensure Insert policies for Conversations/Participants exist and don't conflict
-- (Existing policies "Users can create conversations" and "Users can join/add to conversations" are likely fine if they are CHECK(true))
-- Just in case, ensuring they are open for this phase:
DROP POLICY IF EXISTS "Users can create conversations" ON conversations;
CREATE POLICY "Users can create conversations" ON conversations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can join/add to conversations" ON conversation_participants;
CREATE POLICY "Users can join/add to conversations" ON conversation_participants FOR INSERT WITH CHECK (true);

-- Reload Schema
NOTIFY pgrst, 'reload config';
