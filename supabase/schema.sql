-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Publicly visible user data)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  first_name text,
  last_name text,
  avatar_url text,
  department text,
  job_title text,
  role text default 'employee' check (role in ('admin', 'manager', 'employee')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- PAYROLL SETTINGS (Company wide settings)
create table public.payroll_settings (
    id uuid default uuid_generate_v4() primary key,
    company_name text,
    logo_url text,
    brand_color text,
    work_week_start text,
    work_week_end text,
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- EMPLOYEE BANK & SALARY DETAILS (Sensitive)
create table public.employee_financial_details (
    user_id uuid references public.profiles(id) primary key,
    bank_name text,
    account_number text,
    ifsc_code text,
    pan_number text,
    base_salary numeric,
    hra numeric,
    pf_contribution numeric
);
-- RLS: Only user or admin/manager can view
alter table public.employee_financial_details enable row level security;
create policy "Users view own financial details" on public.employee_financial_details for select using (auth.uid() = user_id);

-- PAYSLIPS
create table public.payslips (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id),
    month text, -- e.g., "October"
    year integer,
    total_earnings numeric,
    total_deductions numeric,
    net_pay numeric,
    status text check (status in ('draft', 'processed', 'paid')),
    pdf_url text,
    created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.payslips enable row level security;
create policy "Users view own payslips" on public.payslips for select using (auth.uid() = user_id);

-- REIMBURSEMENTS
create table public.reimbursements (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id),
    category text, -- Travel, Internet, etc.
    amount numeric,
    description text,
    receipt_url text,
    status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
    created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.reimbursements enable row level security;
create policy "Users manage own reimbursements" on public.reimbursements for all using (auth.uid() = user_id);

-- COMMUNICATION: CONVERSATIONS
create table public.conversations (
    id uuid default uuid_generate_v4() primary key,
    type text check (type in ('direct', 'group')),
    name text, -- Null for direct messages
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- COMMUNICATION: PARTICIPANTS
create table public.conversation_participants (
    conversation_id uuid references public.conversations(id),
    user_id uuid references public.profiles(id),
    primary key (conversation_id, user_id)
);

-- COMMUNICATION: MESSAGES
create table public.messages (
    id uuid default uuid_generate_v4() primary key,
    conversation_id uuid references public.conversations(id),
    sender_id uuid references public.profiles(id),
    content text,
    type text default 'text', -- text, image, file
    file_url text,
    created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.messages enable row level security;
create policy "Participants can view conversation messages" on public.messages for select using (
    exists (
        select 1 from public.conversation_participants
        where conversation_id = messages.conversation_id
        and user_id = auth.uid()
    )
);

-- TASKS & BUGS (Simplified)
create table public.tasks (
    id uuid default uuid_generate_v4() primary key,
    title text,
    description text,
    assignee_id uuid references public.profiles(id),
    reporter_id uuid references public.profiles(id),
    status text default 'todo',
    priority text default 'medium',
    due_date timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now())
);
