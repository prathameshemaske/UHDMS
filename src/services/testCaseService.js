import { supabase } from '../supabaseClient';

export const testCaseService = {
    // Get all test cases
    getAll: async () => {
        const { data, error } = await supabase
            .from('test_cases')
            .select('*')
            .order('id', { ascending: true });
        if (error) throw error;
        return data;
    },

    // Create a new test case
    create: async (testCase) => {
        const { data, error } = await supabase
            .from('test_cases')
            .insert([testCase])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Update a test case
    update: async (id, updates) => {
        const { data, error } = await supabase
            .from('test_cases')
            .update({
                ...updates,
                updated_at: new Date()
            })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }
};
