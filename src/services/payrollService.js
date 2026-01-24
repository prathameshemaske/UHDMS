import { supabase } from '../supabaseClient';

export const payrollService = {
    // Get Payslips for current user
    getPayslips: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('payslips')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get Reimbursements
    getReimbursements: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('reimbursements')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Create Reimbursement Request
    createReimbursement: async (reimbursementData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('reimbursements')
            .insert({
                ...reimbursementData,
                user_id: user.id,
                status: 'pending'
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get Financial Details
    getFinancialDetails: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('employee_financial_details')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // Allow "no rows found"
        return data;
    }
};
