-- FORCE FIX NOTIFICATIONS
-- The previous error 'invalid input syntax for type uuid: "9"' happens because 
-- the database expects a UUID but receives a Number (Meeting ID).
-- We MUST change the column type to TEXT to support both.

ALTER TABLE public.notifications 
ALTER COLUMN related_id TYPE text USING related_id::text;

-- Verify it worked
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'notifications' AND column_name = 'related_id';
