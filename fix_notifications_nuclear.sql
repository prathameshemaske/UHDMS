-- NUCLEAR OPTION: FIX NOTIFICATIONS RLS AND SCHEMA

-- 1. Ensure related_id is TEXT (Fixes UUID vs Int error)
ALTER TABLE public.notifications 
ALTER COLUMN related_id TYPE text USING related_id::text;

-- 2. RESET RLS POLICIES COMPLETELY
-- Drop ALL existing policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can create notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can insert notifications (for self)" ON public.notifications;
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications (mark as read)" ON public.notifications;

-- 3. ENABLE PERMISSIVE POLICIES

-- ALLOW INSERT for ANY Authenticated User (Crucial for cross-user notifications)
CREATE POLICY "Enable insert for authenticated users" 
ON public.notifications FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- ALLOW SELECT for Own Notifications
CREATE POLICY "Enable select for users based on user_id" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

-- ALLOW UPDATE for Own Notifications (Mark as read)
CREATE POLICY "Enable update for users based on user_id" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

-- 4. FORCE REFRESH SCHEMA CACHE (By altering comment)
COMMENT ON TABLE public.notifications IS 'Notifications table with fixed RLS';
