import { supabase } from '../supabaseClient';

export const complianceService = {
    // Get all compliance submission history
    getHistory: async () => {
        const { data, error } = await supabase
            .from('compliance_records')
            .select('*')
            .order('submission_date', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Simulate "Generating" and "Filing" a report
    // In a real app, this might call a server function to generate a PDF/CSV
    generateReport: async (type, period) => {
        // Mock generation
        const ackNumber = `ACK-${type.replace(/\s/g, '').toUpperCase()}-${Date.now().toString().slice(-6)}`;

        const { data, error } = await supabase
            .from('compliance_records')
            .insert([{
                type,
                period,
                submission_date: new Date(),
                acknowledgment_number: ackNumber,
                status: 'filed'
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
