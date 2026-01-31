import { supabase } from '../supabaseClient';

export const reimbursementService = {
    // Get all reimbursements
    getAll: async () => {
        const { data, error } = await supabase
            .from('reimbursements')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    // Create a new reimbursement request
    create: async (reimbursement) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('reimbursements')
            .insert([{ ...reimbursement, user_id: user.id }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update status (Approve/Reject)
    updateStatus: async (id, status) => {
        const { data, error } = await supabase
            .from('reimbursements')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Bulk Approve
    bulkApprove: async (ids) => {
        const { data, error } = await supabase
            .from('reimbursements')
            .update({ status: 'approved' })
            .in('id', ids)
            .select();

        if (error) throw error;
        return data;
    },

    // Delete
    delete: async (id) => {
        const { error } = await supabase
            .from('reimbursements')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
