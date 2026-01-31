import { supabase } from '../supabaseClient';

export const settlementService = {
    // Fetch all settlements (Admin view)
    getAllSettlements: async () => {
        const { data, error } = await supabase
            .from('settlements')
            .select(`
                *,
                profiles:employee_id (full_name, email, department, designation)
            `)
            .order('resignation_date', { ascending: false });

        if (error) throw error;

        return data.map(item => ({
            ...item,
            employee_name: item.profiles?.full_name || item.profiles?.email || 'Unknown',
            department: item.profiles?.department,
            designation: item.profiles?.designation
        }));
    },

    // Initiate a new settlement (Resignation)
    initiateSettlement: async (data) => {
        const { data: { user } } = await supabase.auth.getUser();
        // Ideally checking permissions here

        const { error } = await supabase
            .from('settlements')
            .insert(data);

        if (error) throw error;
    },

    // Update clearance status (e.g. IT, Finance, Assets)
    updateClearance: async (id, type, isCleared) => {
        // First get current clearance
        const { data: current, error: fetchError } = await supabase
            .from('settlements')
            .select('clearance_details')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        const updatedClearance = {
            ...current.clearance_details,
            [type]: isCleared
        };

        const { data, error } = await supabase
            .from('settlements')
            .update({ clearance_details: updatedClearance })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update overall status (e.g. 'approved', 'paid')
    updateStatus: async (id, status) => {
        const { data, error } = await supabase
            .from('settlements')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
