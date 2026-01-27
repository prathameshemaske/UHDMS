-- 1. Create a function to auto-create profile if it doesn't exist
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (new.id, new.email, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

-- 2. Trigger for future users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Sync existing users (This might fail if you don't have permissions to read auth.users, but it's worth a try)
-- If this fails, we will manually insert a profile for the current user if we knew their ID.
-- Since we can't easily iterate auth.users from here without high privs, we'll try a safe approach.

insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- 4. Temporary Fix for the specific error: "test_cases_author_id_fkey"
-- If strict FK to profiles is annoying, we can drop it or make it reference auth.users directly.
-- For now, let's keep it but ensure the profile exists.

-- If step 3 fails due to permissions, run this:
-- Create a dummy profile for the user if you know the ID.
-- But since I don't know your specific UUID, step 3 is the best bet.
