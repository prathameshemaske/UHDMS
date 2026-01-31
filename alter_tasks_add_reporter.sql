-- Add reporter_id to tasks table
alter table public.tasks 
add column if not exists reporter_id uuid references auth.users(id);

-- Update RLS if needed (optional, assuming existing policies cover it or need update)
-- Allow users to view tasks they reported
create policy "Users can view tasks reported by them"
on public.tasks for select
using (auth.uid() = reporter_id);

-- Allow users to update tasks reported by them
create policy "Users can update tasks reported by them"
on public.tasks for update
using (auth.uid() = reporter_id);
