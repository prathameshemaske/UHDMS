
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://flijfunryuvdqjurwawl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsaWpmdW5yeXV2ZHFqdXJ3YXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNDIwNTYsImV4cCI6MjA4NDgxODA1Nn0.YYttzz3ePAyiC6yey36FFKXUssLjs5cyRnnJoJKCOY0";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log("--- CHECKING PROFILES ---");
    const { data: profiles, error: pError } = await supabase.from('profiles').select('*').limit(1);
    if (pError) console.error("Profile Error:", pError);
    else console.log("Profile Keys:", profiles.length ? Object.keys(profiles[0]) : "No profiles found");

    console.log("\n--- CHECKING BUGS ---");
    const { data: bugs, error: bError } = await supabase.from('bugs').select('*').limit(1);
    if (bError) console.error("Bugs Error:", bError);
    else console.log("Bugs Keys:", bugs.length ? Object.keys(bugs[0]) : "No bugs found");

    console.log("\n--- CHECKING TASKS ---");
    const { data: tasks, error: tError } = await supabase.from('tasks').select('*').limit(1);
    if (tError) console.error("Tasks Error:", tError);
    else {
        console.log("Tasks Keys:", tasks.length ? Object.keys(tasks[0]) : "No tasks found");
        if (tasks.length) console.log("Task ID Type:", typeof tasks[0].id);
    }
}

checkSchema();
