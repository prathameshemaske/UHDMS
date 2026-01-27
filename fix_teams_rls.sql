-- Fix RLS for Teams and Profiles

-- 1. Ensure Profiles are viewable (already done, but reinforcing)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);

-- 2. Relax Teams creation policy for Development (Allow all authenticated users to create teams)
-- This fixes "Failed to create team" if the user role isn't perfectly set to 'admin'/'hr'.
DROP POLICY IF EXISTS "Admins and HR can manage teams." ON public.teams;

-- Allow SELECT for everyone
DROP POLICY IF EXISTS "Teams are viewable by everyone." ON public.teams;
CREATE POLICY "Teams are viewable by everyone." ON public.teams FOR SELECT USING (true);

-- Allow INSERT/UPDATE/DELETE for Authenticated users (for now)
DROP POLICY IF EXISTS "Authenticated users can manage teams" ON public.teams;
CREATE POLICY "Authenticated users can manage teams" ON public.teams FOR ALL 
USING (auth.role() = 'authenticated');

-- 3. Fix Team Members RLS
DROP POLICY IF EXISTS "Admins and HR can manage team members." ON public.team_members;
DROP POLICY IF EXISTS "Team members are viewable by everyone." ON public.team_members;
CREATE POLICY "Team members are viewable by everyone." ON public.team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage team members" ON public.team_members;
CREATE POLICY "Authenticated users can manage team members" ON public.team_members FOR ALL 
USING (auth.role() = 'authenticated');
