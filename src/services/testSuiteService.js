import { supabase } from '../supabaseClient';

export const testSuiteService = {
    // Get all suites (flat list, can be built into tree on frontend)
    getAll: async () => {
        const { data, error } = await supabase
            .from('test_suites')
            .select('*')
            .order('title', { ascending: true });
        if (error) throw error;
        return data;
    },

    // Get a single suite by ID
    getById: async (id) => {
        const { data, error } = await supabase
            .from('test_suites')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    // Create a new suite
    create: async (suite) => {
        const { data, error } = await supabase
            .from('test_suites')
            .insert([suite])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Update a suite
    update: async (id, updates) => {
        const { data, error } = await supabase
            .from('test_suites')
            .update({ ...updates, updated_at: new Date() })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Delete a suite
    delete: async (id) => {
        const { error } = await supabase
            .from('test_suites')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }
};
