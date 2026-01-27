-- Check Database Counts
-- Run this in your SQL Editor to verify data exists

SELECT 'profiles_count' as metric, count(*) as value FROM public.profiles
UNION ALL
SELECT 'teams_count', count(*) FROM public.teams;
