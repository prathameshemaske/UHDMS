-- Add start_date column if it doesn't exist
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS start_date date;
