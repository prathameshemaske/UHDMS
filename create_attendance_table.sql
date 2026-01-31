-- Create attendance_logs table
CREATE TABLE IF NOT EXISTS attendance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    clock_in TIMESTAMPTZ NOT NULL,
    clock_out TIMESTAMPTZ,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own attendance" ON attendance_logs
    FOR SELECT USING (auth.uid() = employee_id);

CREATE POLICY "Users can insert their own attendance" ON attendance_logs
    FOR INSERT WITH CHECK (auth.uid() = employee_id);

CREATE POLICY "Users can update their own attendance" ON attendance_logs
    FOR UPDATE USING (auth.uid() = employee_id);
