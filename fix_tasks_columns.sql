-- FIX for 'tasks' table
-- Ensures all fields used in TaskDetailModal exist in the database

DO $$
BEGIN
    -- 1. title (Already likely exists, but good to check)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'title') THEN
        ALTER TABLE tasks ADD COLUMN title text;
    END IF;

    -- 2. details (Mapped from Description)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'details') THEN
        ALTER TABLE tasks ADD COLUMN details text;
    END IF;

    -- 3. project
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'project') THEN
        ALTER TABLE tasks ADD COLUMN project text;
    END IF;

    -- 4. priority
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'priority') THEN
        ALTER TABLE tasks ADD COLUMN priority text DEFAULT 'Medium';
    END IF;

    -- 5. due_date
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'due_date') THEN
        ALTER TABLE tasks ADD COLUMN due_date timestamp with time zone;
    END IF;

    -- 6. status
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'status') THEN
        ALTER TABLE tasks ADD COLUMN status text DEFAULT 'pending';
    END IF;

    -- 7. assignee_id
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'assignee_id') THEN
        ALTER TABLE tasks ADD COLUMN assignee_id uuid references auth.users;
    END IF;

END $$;

-- Reload Schema Cache
NOTIFY pgrst, 'reload config';
