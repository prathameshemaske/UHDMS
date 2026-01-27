-- Fix Foreign Keys to allow Client-side Joins to Profiles
-- Problem: teams.leader_id referenced auth.users (hidden). Supabase client couldn't join to 'profiles'.
-- Solution: Point FKs to public.profiles.

-- 1. Fix teams.leader_id
ALTER TABLE public.teams
DROP CONSTRAINT IF EXISTS teams_leader_id_fkey;

ALTER TABLE public.teams
ADD CONSTRAINT teams_leader_id_fkey
FOREIGN KEY (leader_id) REFERENCES public.profiles(id);

-- 2. Fix team_members.user_id
ALTER TABLE public.team_members
DROP CONSTRAINT IF EXISTS team_members_user_id_fkey;

ALTER TABLE public.team_members
ADD CONSTRAINT team_members_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.profiles(id);

-- 3. (Optional but good practice) Ensure profile deletes cascade?
-- Not adding ON DELETE CASCADE yet for safety, but typically preferred.
