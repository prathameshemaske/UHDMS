import { supabase } from '../supabaseClient';

export const payrollDataService = {
    // Get all payroll runs
    getAllRuns: async () => {
        const { data, error } = await supabase
            .from('payroll')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    // Create a new payroll run
    createRun: async (payrollRun) => {
        const { data, error } = await supabase
            .from('payroll')
            .insert([payrollRun])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Update payroll status
    updateStatus: async (id, status) => {
        const { data, error } = await supabase
            .from('payroll')
            .update({ status })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }
};
