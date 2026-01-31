import { supabase } from '../supabaseClient';

export const financialService = {
    // Get Audit Logs
    getAuditLogs: async () => {
        const { data, error } = await supabase
            .from('financial_audit_logs')
            .select(`
                *,
                performer:performed_by (first_name, last_name, email)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Fetch All Employees (for dropdowns in Bonus modal)
    getAllEmployees: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, email, job_title')
            .order('first_name');

        if (error) throw error;
        return data;
    }
};
