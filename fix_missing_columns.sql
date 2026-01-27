-- FINAL COMPREHENSIVE FIX for 'bugs' table
-- Covers all fields: PROJECT, ISSUE TYPE, SUMMARY, DESCRIPTION, PRIORITY, SEVERITY, ASSIGNEE, ENVIRONMENT, ATTACHMENTS

DO $$
BEGIN
    -- 1. PROJECT
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'project') THEN
        ALTER TABLE bugs ADD COLUMN project text;
    END IF;

    -- 2. ISSUE TYPE
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'issue_type') THEN
        ALTER TABLE bugs ADD COLUMN issue_type text DEFAULT 'Bug';
    END IF;

    -- 3. SUMMARY (Mapped to 'title' column)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'title') THEN
        ALTER TABLE bugs ADD COLUMN title text;
    END IF;

    -- 4. DESCRIPTION
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'description') THEN
        ALTER TABLE bugs ADD COLUMN description text;
    END IF;

    -- 5. PRIORITY
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'priority') THEN
        ALTER TABLE bugs ADD COLUMN priority text DEFAULT 'Medium';
    END IF;

    -- 6. SEVERITY
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'severity') THEN
        ALTER TABLE bugs ADD COLUMN severity text DEFAULT 'Major';
    END IF;

    -- 7. ASSIGNEE
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'assignee') THEN
        ALTER TABLE bugs ADD COLUMN assignee text;
    END IF;

    -- 8. ENVIRONMENT
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'environment') THEN
        ALTER TABLE bugs ADD COLUMN environment text;
    END IF;

    -- 9. ATTACHMENTS (JSONB array for multiple files or URLs)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'attachments') THEN
        ALTER TABLE bugs ADD COLUMN attachments jsonb DEFAULT '[]'::jsonb;
    END IF;

    -- Extra: STATUS (Essential for flow)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bugs' AND column_name = 'status') THEN
        ALTER TABLE bugs ADD COLUMN status text DEFAULT 'To Do';
    END IF;

END $$;

-- Reload Supabase Schema Cache
NOTIFY pgrst, 'reload config';
