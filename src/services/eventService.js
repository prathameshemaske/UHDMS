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
        const { data: meetings, error: meetingsError } = await supabase
            .from('meetings')
            .select('*')
            .eq('host_id', user.id); // + logic for participants

        if (meetingsError) throw meetingsError;

        // 3. Fetch Tasks with deadlines
        const { data: tasks, error: tasksError } = await supabase
            .from('tasks')
            .select('*')
            .eq('assignee_id', user.id)
            .not('due_date', 'is', null);

        if (tasksError) throw tasksError;

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
                link: m.meeting_link
            })),
            ...tasks.map(t => ({
                id: `tsk-${t.id}`,
                title: `✅ ${t.title}`,
                start: new Date(t.due_date),
                end: new Date(t.due_date),
                allDay: true,
                type: 'task',
                desc: t.details,
                color: '#f59e0b', // Amber for tasks
                origin: 'task'
            }))
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
    }
};
