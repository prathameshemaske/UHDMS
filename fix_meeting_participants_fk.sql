-- Add explicit Foreign Key from meeting_participants.user_id to profiles.id
-- This enables Supabase PostgREST to join meeting_participants -> profiles

DO $$
BEGIN
    -- Check if constraint exists, if not add it
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'meeting_participants_user_id_fkey_profiles' 
        AND table_name = 'meeting_participants'
    ) THEN
        -- We might need to drop the old FK to auth.users if it conflicts or just add this as a second one?
        -- Actually, a column can have multiple FKs but it's rare/messy. 
        -- Usually we want it to reference profiles primarily for app logic.
        -- But let's just TRY adding it. If it fails due to existing data, we'll know.
        -- Ideally, referencing profiles is better for these joins.
        
        ALTER TABLE meeting_participants
        ADD CONSTRAINT meeting_participants_user_id_fkey_profiles
        FOREIGN KEY (user_id) REFERENCES profiles(id)
        ON DELETE CASCADE;
        
    END IF;
END $$;
