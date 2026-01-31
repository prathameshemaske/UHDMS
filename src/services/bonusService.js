import { supabase } from '../supabaseClient';

export const bonusService = {
    // Get all bonuses (RLS filters visibility)
    getAll: async () => {
        const { data, error } = await supabase
            .from('bonuses')
            .select(`
                *,
                employee:user_id (first_name, last_name, avatar_url, job_title),
                issuer:issued_by (first_name, last_name)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Create a new bonus
    create: async (bonusData) => {
        // bonusData: { user_id, amount, reason }
        // Auto-assign issued_by to current user (manager/admin)
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('bonuses')
            .insert([{
                ...bonusData,
                issued_by: user.id,
                status: 'pending'
            }])
            .select()
            .single();

        if (error) throw error;

        // Log Audit
        await supabase.from('financial_audit_logs').insert({
            action: 'create_bonus',
            performed_by: user.id,
            target_id: data.id,
            target_type: 'bonus',
            details: `Bonus of ${bonusData.amount} created for user ${bonusData.user_id}`
        });

        return data;
    },

    // Update Status
    updateStatus: async (id, status) => {
        const { data, error } = await supabase
            .from('bonuses')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
