import { supabase } from '../supabaseClient';

export const leaveService = {
    // Get leaves for the current authenticated user
    getMyLeaves: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('leaves')
            .select(`
                *,
                approver:approved_by (first_name, last_name)
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get ALL leaves (For Admin Dashboard)
    getAllLeaves: async () => {
        const { data, error } = await supabase
            .from('leaves')
            .select(`
                 *,
                 profile:user_id (first_name, last_name, avatar_url, job_title),
                 approver:approved_by (first_name, last_name)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Apply for a new leave
    applyForLeave: async (leaveData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('leaves')
            .insert([{
                user_id: user.id,
                leave_type: leaveData.leave_type,
                start_date: leaveData.start_date,
                end_date: leaveData.end_date,
                reason: leaveData.reason,
                status: 'pending'
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update status (Approve/Reject)
    updateLeaveStatus: async (leaveId, status) => {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('leaves')
            .update({
                status: status,
                approved_by: user.id,
                updated_at: new Date().toISOString()
            })
            .eq('id', leaveId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
