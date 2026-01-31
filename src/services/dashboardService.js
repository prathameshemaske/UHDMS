import { supabase } from '../supabaseClient';

export const dashboardService = {
    // Get Recent Activities (Feed)
    getRecentActivities: async (limit = 5) => {
        const { data, error } = await supabase
            .from('activities')
            .select('*') // foreign key might be missing, so we skip joining user for now
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching activities:', error);
            return [];
        }

        // We might want to fetch profiles to get names if they aren't in auth metadata accessible here easily
        // For now, we'll try to map user_id to a profile name in the frontend or join if possible.
        // Since Supabase join with auth.users is tricky (foreign key exists but RLS/permissions vary), 
        // we usually join with 'profiles' table. 
        // Let's adjust to Fetch profiles separately or assuming the frontend handles the ID->Name lookup?
        // Better: Join with profiles if 'activities' had user_id referencing profiles.
        // My schema referenced auth.users. 
        // Let's fetch profiles manually for these users to be safe or rely on the UI to display 'User'.

        // Actually, let's try to join 'profiles' if possible. 
        // But wait, the Foreign Key in 'activities' points to auth.users.
        // We can't directly select from 'profiles' via that foreign key unless we defined a relationship explicitly in Supabase UI or SQL.
        // Standard practice: Fetch raw and let UI resolve or fetch profiles in parallel.
        return data;
    },

    // Get Upcoming Interviews
    getUpcomingInterviews: async () => {
        const today = new Date().toISOString();
        const { data, error } = await supabase
            .from('interviews')
            .select('*')
            .gte('scheduled_at', today) // specific logic for upcoming
            .order('scheduled_at', { ascending: true })
            .limit(3);

        if (error) throw error;
        return data;
    },

    // Get Active Announcements
    getAnnouncements: async () => {
        const { data, error } = await supabase
            .from('announcements')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false })
            .limit(1); // Just the latest one for the card

        if (error) throw error;
        return data[0]; // Return single object or undefined
    },

    // Get Aggregated Metrics
    getMetrics: async () => {
        try {
            // Run in parallel for speed
            const [tasksReq, bugsReq, teamReq] = await Promise.all([
                supabase.from('tasks').select('*', { count: 'exact', head: true }).neq('status', 'completed'),
                supabase.from('bugs').select('*', { count: 'exact', head: true }).neq('status', 'Done'),
                supabase.from('profiles').select('*', { count: 'exact', head: true })
            ]);

            return {
                activeTasks: tasksReq.count || 0,
                openBugs: bugsReq.count || 0,
                teamSize: teamReq.count || 0,
                velocity: 94 // Placeholder/calculated for now
            };
        } catch (error) {
            console.error('Error fetching metrics:', error);
            return { activeTasks: 0, openBugs: 0, teamSize: 0, velocity: 0 };
        }
    }
};
