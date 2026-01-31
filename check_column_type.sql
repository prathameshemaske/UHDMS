-- Check column type
SELECT data_type 
FROM information_schema.columns 
WHERE table_name = 'notifications' AND column_name = 'related_id';
