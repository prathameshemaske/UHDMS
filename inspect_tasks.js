
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flijfunryuvdqjurwawl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsaWpmdW5yeXV2ZHFqdXJ3YXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNDIwNTYsImV4cCI6MjA4NDgxODA1Nn0.YYttzz3ePAyiC6yey36FFKXUssLjs5cyRnnJoJKCOY0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    console.log("Inspecting Tasks Table...");

    const { data: tasks, error } = await supabase
        .from('tasks')
        .select('id, title, assignee_id, reporter_id');

    if (error) {
        console.error("Error fetching tasks:", error);
    } else {
        console.log(`Found ${tasks.length} tasks:`);
        tasks.forEach(t => {
            console.log(`- [${t.title}] Assigned To: ${t.assignee_id} | Reporter: ${t.reporter_id}`);
        });
    }
}

inspect();
