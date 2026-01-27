-- 1. Add email column if it doesn't exist
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'email') then
        alter table public.profiles add column email text;
    end if;
end $$;

-- 2. Sync existing users (Insert missing profiles)
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do update
set email = excluded.email
where profiles.email is null;

-- 3. Update the trigger function to include email
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'first_name', 
    new.raw_user_meta_data->>'last_name'
  )
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;
