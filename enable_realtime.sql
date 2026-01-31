-- Ensure Realtime is enabled for the notifications table
-- This is often the missing piece if policies are correct but events don't fire.

BEGIN;
  -- Add table to publication if not already added
  -- 'supabase_realtime' is the default publication for Supabase
  ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
COMMIT;
