import { supabase } from '../supabaseClient';

export const attendanceService = {
    // Get today's attendance status
    getTodayStatus: async (userId) => {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
            .from('attendance_logs')
            .select('*')
            .eq('employee_id', userId)
            .eq('date', today)
            .maybeSingle();

        if (error) throw error;
        return data;
    },

    // Clock In
    clockIn: async (userId) => {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date().toISOString();

        const { data, error } = await supabase
            .from('attendance_logs')
            .insert({
                employee_id: userId,
                date: today,
                clock_in: now
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Clock Out
    clockOut: async (recordId) => {
        const now = new Date().toISOString();
        const { data, error } = await supabase
            .from('attendance_logs')
            .update({ clock_out: now })
            .eq('id', recordId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get History
    getHistory: async (userId) => {
        const { data, error } = await supabase
            .from('attendance_logs')
            .select('*')
            .eq('employee_id', userId)
            .order('date', { ascending: false });

        if (error) throw error;
        return data;
    }
};
