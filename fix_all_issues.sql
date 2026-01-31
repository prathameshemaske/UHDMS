-- 1. FIX NOTIFICATIONS RLS
-- Drop the restrictive policy
DROP POLICY IF EXISTS "Users can insert notifications (for self)" ON public.notifications;

-- Add a permissive policy allowing any authenticated user to create notifications for others
CREATE POLICY "Authenticated users can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');


-- 2. FIX MEETING PARTICIPANTS FOREIGN KEY
-- This is critical for fetching profile data in the join
DO $$
BEGIN
    -- Check if constraint already exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'meeting_participants_user_id_fkey_profiles' 
        AND table_name = 'meeting_participants'
    ) THEN
        -- Add the FK
        ALTER TABLE meeting_participants
        ADD CONSTRAINT meeting_participants_user_id_fkey_profiles
        FOREIGN KEY (user_id) REFERENCES profiles(id)
        ON DELETE CASCADE;
    END IF;
END $$;


-- 3. ENSURE PROFILES ARE PUBLICLY READABLE
-- Sometimes profiles are locked down
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
