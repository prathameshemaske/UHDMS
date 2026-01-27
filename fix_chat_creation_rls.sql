-- Function to create a conversation and participants atomically
-- SECURITY DEFINER allows this to run with owner privileges, bypassing RLS checks during insertion
CREATE OR REPLACE FUNCTION create_new_conversation(
  p_type text,
  p_name text,
  p_participant_ids uuid[]
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_conv_id uuid;
  v_created_at timestamptz;
  v_user_id uuid;
BEGIN
  -- 1. Insert Conversation
  INSERT INTO conversations (type, name)
  VALUES (p_type, p_name)
  RETURNING id, created_at INTO v_conv_id, v_created_at;

  -- 2. Insert Participants
  FOREACH v_user_id IN ARRAY p_participant_ids
  LOOP
    INSERT INTO conversation_participants (conversation_id, user_id)
    VALUES (v_conv_id, v_user_id);
  END LOOP;

  -- 3. Return the new conversation object
  RETURN json_build_object(
    'id', v_conv_id,
    'type', p_type,
    'name', p_name,
    'created_at', v_created_at
  );
END;
$$;

-- Reload Schema Cache to make RPC available
NOTIFY pgrst, 'reload config';
