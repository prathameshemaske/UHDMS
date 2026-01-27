import { supabase } from '../supabaseClient';

export const teamsService = {
    // Get all teams with their members and leaders
    getAllTeams: async () => {
        const { data, error } = await supabase
            .from('teams')
            .select(`
                *,
                team_members (
                    user_id,
                    role,
                    joined_at
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Create a new team
    createTeam: async (teamData) => {
        const payload = {
            name: teamData.name,
            description: teamData.description,
            leader_id: teamData.leader_id || null, // Ensure empty string becomes null
            type: teamData.type // Add Team Type
        };

        const { data, error } = await supabase
            .from('teams')
            .insert([payload])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Add a member to a team
    addMember: async (teamId, userId, role = 'Member') => {
        const { data, error } = await supabase
            .from('team_members')
            .insert([{
                team_id: teamId,
                user_id: userId,
                role: role
            }])
            .select();

        if (error) throw error;
        return data;
    },

    // Remove a member
    removeMember: async (teamId, userId) => {
        const { error } = await supabase
            .from('team_members')
            .delete()
            .match({ team_id: teamId, user_id: userId });

        if (error) throw error;
    }
};
