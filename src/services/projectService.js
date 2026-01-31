import { supabase } from '../supabaseClient';

export const projectService = {
    // Fetch all projects
    getProjects: async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
        return data || [];
    },

    // Create a new project
    createProject: async (projectData) => {
        const { data, error } = await supabase
            .from('projects')
            .insert([{
                name: projectData.name,
                description: projectData.description,
                status: projectData.status || 'Active',
                start_date: projectData.startDate || null,
                end_date: projectData.endDate || null,
                manager_id: projectData.managerId || null
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update an existing project
    updateProject: async (id, updates) => {
        const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete a project
    deleteProject: async (id) => {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
