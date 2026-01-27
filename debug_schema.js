
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Try to find .env file
const envPath = path.resolve(process.cwd(), '.env');
const envConfig = dotenv.config({ path: envPath });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

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

    console.log("\n--- CHECKING BUG COMMENTS ---");
    const { data: comments, error: cError } = await supabase.from('bug_comments').select('*').limit(1);
    if (cError) console.error("Comments Error:", cError);
    else console.log("Comments Keys:", comments.length ? Object.keys(comments[0]) : "No comments found");
}

checkSchema();
