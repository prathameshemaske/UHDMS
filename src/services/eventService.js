import { supabase } from '../supabaseClient';

export const eventService = {
    // Fetch all calendar items (events, meetings, tasks)
    getAllEvents: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // 1. Fetch Custom Events
        const { data: events, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .or(`is_public.eq.true,user_id.eq.${user.id}`);

        if (eventsError) throw eventsError;

        // 2. Fetch Meetings (where user is host or participant)
        // For simplicity, fetching all where user is host for now, 
        // real implementation would join meeting_participants
        // 2. Fetch Meetings
        let meetings = [];
        try {
            // A. Fetch Hosted Meetings
            const { data: hosted, error: hostedError } = await supabase
                .from('meetings')
                .select(`
                *,
                participants:meeting_participants(
                    status,
                    user_id,
                    profiles:user_id (
                        first_name, last_name, avatar_url
                    )
                )
            `)
                .eq('host_id', user.id);

            if (hostedError) throw hostedError;

            // B. Fetch Participating Meetings
            // 1. Get meeting IDs where I am a participant
            const { data: myParticipations, error: partError } = await supabase
                .from('meeting_participants')
                .select('meeting_id')
                .eq('user_id', user.id);

            let participantMeetings = [];
            if (myParticipations && myParticipations.length > 0) {
                const meetingIds = myParticipations.map(mp => mp.meeting_id);
                const { data: partData, error: partMeetingsError } = await supabase
                    .from('meetings')
                    .select(`
                        *,
                        participants:meeting_participants(
                            status,
                            user_id,
                            profiles:user_id (
                                first_name, last_name, avatar_url
                            )
                        )
                    `)
                    .in('id', meetingIds)
                    // Exclude ones where I am host (already fetched)
                    .neq('host_id', user.id);

                if (!partMeetingsError) participantMeetings = partData || [];
            }

            meetings = [...(hosted || []), ...participantMeetings];

        } catch (err) {
            console.error("Meetings fetch FAILED (Complex Join):", err);
            if (err.message) console.error("Error Message:", err.message);
            if (err.details) console.error("Error Details:", err.details);
            if (err.hint) console.error("Error Hint:", err.hint);

            // Fallback: minimal fetch if complex query fails
            const { data: simpleMeetings } = await supabase
                .from('meetings')
                .select('*')
                .or(`host_id.eq.${user.id}`); // simpler fallback
            meetings = simpleMeetings || [];
        }

        // 3. Fetch Tasks with deadlines
        // 3. Fetch Tasks with deadlines
        let tasks = [];
        try {
            // Try fetching with reporter_id (assuming column exists)
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .or(`assignee_id.eq.${user.id},reporter_id.eq.${user.id}`)
                .not('due_date', 'is', null);

            if (error) {
                // If error is about missing column, fallback
                if (error.code === '42703') throw error;
                console.error("Task fetch error:", error);
            } else {
                tasks = data;
            }
        } catch (err) {
            console.warn("Falling back to simple task fetch (reporter_id might be missing)", err.message);
            // Fallback: Fetch only assigned tasks
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('assignee_id', user.id)
                .not('due_date', 'is', null);

            if (!error) tasks = data || [];
        }

        // Normalize data for Calendar
        const normalizedEvents = [
            ...events.map(e => ({
                id: `evt-${e.id}`,
                title: e.title,
                start: new Date(e.start_time),
                end: new Date(e.end_time),
                allDay: e.all_day,
                type: e.type, // 'event', 'holiday'
                desc: e.description,
                color: e.color || '#5d55e7',
                origin: 'event'
            })),
            ...meetings.map(m => ({
                id: `mtg-${m.id}`,
                title: `📅 ${m.title}`,
                start: new Date(m.start_time),
                end: m.end_time ? new Date(m.end_time) : new Date(new Date(m.start_time).getTime() + 60 * 60000),
                type: 'meeting',
                desc: m.description,
                color: '#10b981', // Emerald for meetings
                origin: 'meeting',
                link: m.meeting_link,
                participants: m.participants || []
            })),
            ...tasks.map(t => {
                // Parse date string (YYYY-MM-DD) to local date object
                // Appending T00:00:00 aligns it with start of day in local time when parsed by Date constructor in most browsers
                // essentially treating "2024-01-29" as "2024-01-29 00:00:00 Local"
                const dateStr = t.due_date.includes('T') ? t.due_date : `${t.due_date}T00:00:00`;
                const dateObj = new Date(dateStr);

                return {
                    id: `tsk-${t.id}`,
                    title: `✅ ${t.title}`,
                    start: dateObj,
                    end: dateObj,
                    allDay: true,
                    type: 'task',
                    desc: t.details,
                    color: '#f59e0b', // Amber for tasks
                    origin: 'task'
                };
            })
        ];

        return normalizedEvents;
    },

    // Create new event
    createEvent: async (eventData) => {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('events')
            .insert({
                ...eventData,
                user_id: user.id
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete event
    deleteEvent: async (eventId) => {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', eventId);

        if (error) throw error;
    },

    // Respond to Meeting Invite
    updateMeetingStatus: async (meetingId, status) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { error } = await supabase
            .from('meeting_participants')
            .update({ status })
            .eq('meeting_id', meetingId)
            .eq('user_id', user.id);

        if (error) throw error;
    }
};
