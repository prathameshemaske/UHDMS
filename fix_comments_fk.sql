-- Fix FK to point to public.profiles instead of auth.users to allow joining
ALTER TABLE test_case_comments
DROP CONSTRAINT IF EXISTS test_case_comments_user_id_fkey;

ALTER TABLE test_case_comments
ADD CONSTRAINT test_case_comments_user_id_fkey
FOREIGN KEY (user_id) REFERENCES profiles(id);
