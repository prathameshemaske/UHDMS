import { supabase } from '../supabaseClient';

export const taskService = {
    // Get Tasks assigned to current user
    getTasks: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('assignee_id', user.id)
            .order('due_date', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Create a new task
    createTask: async (taskData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('tasks')
            .insert({
                ...taskData,
                reporter_id: user.id
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update task status
    updateTaskStatus: async (taskId, status) => {
        const { data, error } = await supabase
            .from('tasks')
            .update({ status })
            .eq('id', taskId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
