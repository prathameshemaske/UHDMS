-- 1. FIX DASHBOARD: Announcements 'active' column
ALTER TABLE public.announcements ADD COLUMN IF NOT EXISTS active boolean DEFAULT true;

-- 2. FIX DASHBOARD: Activities Foreign Key
-- Attempt to add FK to auth.users if possible, or profiles
-- Using auth.users is standard for 'user_id'
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'activities_user_id_fkey'
    ) THEN
        ALTER TABLE public.activities
        ADD CONSTRAINT activities_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES auth.users(id)
        ON DELETE CASCADE;
    END IF;
END $$;

-- 3. FIX NOTIFICATIONS: ID Type (Text vs UUID)
-- This allows storing BigInts (Meetings: '9') and UUIDs (Tasks/Chats) in the same column
ALTER TABLE public.notifications 
ALTER COLUMN related_id TYPE text USING related_id::text;

-- 4. FIX NOTIFICATIONS: RLS Policies (Ensure everything flows)
-- Clean slate for policies
DROP POLICY IF EXISTS "Authenticated users can create notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can insert notifications (for self)" ON public.notifications;

CREATE POLICY "Authenticated users can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Select / Update policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own notifications (mark as read)" ON public.notifications;

CREATE POLICY "Users can update their own notifications (mark as read)"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);
