-- Create Bug Comments Table
create table if not exists bug_comments (
  id uuid default uuid_generate_v4() primary key,
  bug_id bigint references bugs(id) on delete cascade,
  user_id uuid references profiles(id),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on bug_comments
alter table bug_comments enable row level security;
create policy "Comments are viewable by everyone." on bug_comments for select using (true);
create policy "Authenticated users can insert comments." on bug_comments for insert with check (auth.role() = 'authenticated');

-- Create Bug History Table
create table if not exists bug_history (
  id uuid default uuid_generate_v4() primary key,
  bug_id bigint references bugs(id) on delete cascade,
  user_id uuid references profiles(id),
  field_changed text not null,
  old_value text,
  new_value text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on bug_history
alter table bug_history enable row level security;
create policy "History is viewable by everyone." on bug_history for select using (true);
create policy "Authenticated users can insert history." on bug_history for insert with check (auth.role() = 'authenticated');

-- Create Bug Attachments Table
create table if not exists bug_attachments (
  id uuid default uuid_generate_v4() primary key,
  bug_id bigint references bugs(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text,
  uploaded_by uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on bug_attachments
alter table bug_attachments enable row level security;
create policy "Attachments are viewable by everyone." on bug_attachments for select using (true);
create policy "Authenticated users can insert attachments." on bug_attachments for insert with check (auth.role() = 'authenticated');

-- Create Issue Links Table
create table if not exists issue_links (
  id uuid default uuid_generate_v4() primary key,
  source_bug_id bigint references bugs(id) on delete cascade,
  target_task_id bigint references tasks(id), -- Assuming tasks table uses bigint id based on schema
  link_type text default 'relates_to', -- relates_to, blocks, blocked_by
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on issue_links
alter table issue_links enable row level security;
create policy "Links are viewable by everyone." on issue_links for select using (true);
create policy "Authenticated users can insert links." on issue_links for insert with check (auth.role() = 'authenticated');
