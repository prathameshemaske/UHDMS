-- Seed Data for UHDMS

-- Note: You will need to replace 'USER_ID_1', 'USER_ID_2' with actual UUIDs from your auth.users table
-- or create users via the Supabase Auth UI first and then update this script.
-- However, for the purpose of a seed script running in an environment where we can execute SQL, 
-- we often insert into auth.users directly if allowed, or we just insert into profiles 
-- assuming the auth users exist. Here we assume auth.users are created separately or manual replacement.

-- For this seed, we will assume you have created a user and you will replace 'PLACEHOLDER_USER_ID'
-- with your actual User UUID to see the data.

-- 1. Insert Profile (Modify ID to match your Auth User ID)
insert into public.profiles (id, email, first_name, last_name, role, job_title, department)
values 
  ('PLACEHOLDER_USER_ID', 'alex.rivera@uhdms.global', 'Alex', 'Rivera', 'admin', 'System Admin', 'IT'),
  ('00000000-0000-0000-0000-000000000001', 'sarah.jones@uhdms.global', 'Sarah', 'Jones', 'manager', 'HR Manager', 'Human Resources'),
  ('00000000-0000-0000-0000-000000000002', 'mike.chen@uhdms.global', 'Mike', 'Chen', 'employee', 'Senior Developer', 'Engineering');

-- 2. Insert Payroll Settings
insert into public.payroll_settings (company_name, brand_color, work_week_start, work_week_end)
values ('UHDMS Global', '#5d55e7', 'Monday', 'Friday');

-- 3. Insert Financial Details
insert into public.employee_financial_details (user_id, bank_name, account_number, ifsc_code, base_salary, hra)
values 
  ('PLACEHOLDER_USER_ID', 'Chase Bank', '1234567890', 'CHAS0001234', 85000, 15000);

-- 4. Insert Payslips
insert into public.payslips (user_id, month, year, total_earnings, total_deductions, net_pay, status)
values
  ('PLACEHOLDER_USER_ID', 'October', 2023, 85000, 5000, 80000, 'paid'),
  ('PLACEHOLDER_USER_ID', 'September', 2023, 85000, 5000, 80000, 'paid');

-- 5. Insert Reimbursements
insert into public.reimbursements (user_id, category, amount, description, status)
values
  ('PLACEHOLDER_USER_ID', 'Travel', 120.50, 'Uber to Client Site', 'pending'),
  ('PLACEHOLDER_USER_ID', 'Internet', 60.00, 'Home Internet Bill', 'approved');

-- 6. Insert Tasks
insert into public.tasks (title, description, assignee_id, reporter_id, status, due_date)
values
  ('Review Q3 Financials', 'Analyze the quarterly reports.', 'PLACEHOLDER_USER_ID', '00000000-0000-0000-0000-000000000001', 'in-progress', now() + interval '3 days'),
  ('Update Security Protocols', 'Implement new 2FA guidelines.', 'PLACEHOLDER_USER_ID', '00000000-0000-0000-0000-000000000001', 'todo', now() + interval '7 days');

-- 7. Insert Conversations & Messages
insert into public.conversations (id, type, name) values ('550e8400-e29b-41d4-a716-446655440000', 'group', 'Product Launch');

insert into public.conversation_participants (conversation_id, user_id)
values 
  ('550e8400-e29b-41d4-a716-446655440000', 'PLACEHOLDER_USER_ID'),
  ('550e8400-e29b-41d4-a716-446655440000', '00000000-0000-0000-0000-000000000001');

insert into public.messages (conversation_id, sender_id, content)
values
  ('550e8400-e29b-41d4-a716-446655440000', '00000000-0000-0000-0000-000000000001', 'Hey Alex, are we ready for the launch?'),
  ('550e8400-e29b-41d4-a716-446655440000', 'PLACEHOLDER_USER_ID', 'Yes, everything is on track.');
