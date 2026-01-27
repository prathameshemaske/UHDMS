import { supabase } from '../supabaseClient';

export const taskService = {
    // Get Tasks for current user (My Tasks)
    getMyTasks: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .or(`assignee_id.eq.${user.id},reporter_id.eq.${user.id}`)
            .order('due_date', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Get ALL Tasks (Project View)
    getTasks: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
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

    // Update task (generic)
    updateTask: async (taskId, updates) => {
        const { data, error } = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', taskId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete task
    deleteTask: async (taskId) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId);

        if (error) throw error;
    }
};
