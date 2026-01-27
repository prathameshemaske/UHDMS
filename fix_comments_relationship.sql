-- Fix 1: Update Comments table to reference profiles(id)
ALTER TABLE announcement_comments
  DROP CONSTRAINT IF EXISTS announcement_comments_user_id_fkey;

ALTER TABLE announcement_comments
  ADD CONSTRAINT announcement_comments_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Fix 2: Update Likes table to reference profiles(id) as well, to be safe/consistent
ALTER TABLE announcement_likes
  DROP CONSTRAINT IF EXISTS announcement_likes_user_id_fkey;

ALTER TABLE announcement_likes
  ADD CONSTRAINT announcement_likes_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;

-- Reload Schema Cache
NOTIFY pgrst, 'reload config';
