-- Change related_id from UUID to TEXT to support integer IDs (like meetings)
ALTER TABLE public.notifications 
ALTER COLUMN related_id TYPE text USING related_id::text;
