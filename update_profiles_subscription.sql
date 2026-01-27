-- Add Subscription Fields to Profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'Free',
ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'Active',
ADD COLUMN IF NOT EXISTS subscription_renews_at timestamp with time zone;

-- Secure Function to Delete Own Account
-- This allows a user to delete their own account from auth.users (which cascades to profiles if set up, or we handle it manually)
-- Note: Direct deletion from auth.users via client is usually restricted. usage of RPC is safer.

CREATE OR REPLACE FUNCTION delete_own_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if user is logged in
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Delete from auth.users (Cascades to public.profiles if FK exists, otherwise we should delete manually first if needed)
  -- But usually we just delete the user.
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$;
