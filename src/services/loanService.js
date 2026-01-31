import { supabase } from '../supabaseClient';

export const loanService = {
    // Fetch all loans (for Admin/HR view)
    getAllLoans: async () => {
        const { data, error } = await supabase
            .from('loans')
            .select(`*, profiles:employee_id (full_name, email)`)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map(loan => ({
            ...loan,
            employee_name: loan.profiles?.full_name || loan.profiles?.email || 'Unknown',
            paid_amount: 0
        }));
    },

    // Fetch loans for the logged-in user
    getMyLoans: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('loans')
            .select('*')
            .eq('employee_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Create a new loan request
    applyForLoan: async (loanData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('loans')
            .insert({
                ...loanData,
                employee_id: user.id,
                status: 'pending'
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update loan status (Approve/Reject)
    updateLoanStatus: async (loanId, status) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('loans')
            .update({ status, approved_by: user?.id })
            .eq('id', loanId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
