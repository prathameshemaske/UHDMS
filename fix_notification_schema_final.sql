-- 1. FIX COLUMN TYPE (UUID -> TEXT)
-- This allows storing BigInts (Meetings: '9') and UUIDs (Tasks/Chats) in the same column
ALTER TABLE public.notifications 
ALTER COLUMN related_id TYPE text USING related_id::text;

-- 2. FIX RLS POLICIES (Ensure anyone can insert)
DROP POLICY IF EXISTS "Authenticated users can create notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can insert notifications (for self)" ON public.notifications;

CREATE POLICY "Authenticated users can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- 3. FIX SELECT POLICY (Ensure users can see their own)
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

-- 4. FIX UPDATE POLICY (Mark as read)
DROP POLICY IF EXISTS "Users can update their own notifications (mark as read)" ON public.notifications;

CREATE POLICY "Users can update their own notifications (mark as read)"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

-- 5. VERIFY
select column_name, data_type 
from information_schema.columns 
where table_name = 'notifications' and column_name = 'related_id';
