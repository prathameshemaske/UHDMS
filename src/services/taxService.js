import { supabase } from '../supabaseClient';

export const taxService = {
    // Get all declarations (admin view)
    getAll: async () => {
        const { data, error } = await supabase
            .from('employee_tax_declarations')
            .select(`
                *,
                employee:user_id (id, first_name, last_name, avatar_url, job_title)
            `)
            .order('submission_date', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Update status
    updateStatus: async (id, status, remarks) => {
        const { data, error } = await supabase
            .from('employee_tax_declarations')
            .update({ status, admin_remarks: remarks })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Seed some dummy data if empty (Helper for demo)
    seedDummyData: async () => {
        // ... (Skipping complexity for now, relying on manual entry or empty state)
    }
};
