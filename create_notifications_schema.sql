-- Notifications Table
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text not null, -- 'task_reminder', 'system', etc.
  related_id uuid, -- e.g. task_id
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.notifications enable row level security;

create policy "Users can view their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications (mark as read)"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "Users can insert notifications (for self)" 
  on public.notifications for insert
  with check (auth.uid() = user_id);
