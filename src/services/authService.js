import { supabase } from '../supabaseClient';

export const authService = {
    // Sign Up
    signUp: async (email, password, metadata = {}) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata, // e.g., first_name, last_name, role
            },
        });
        if (error) throw error;
        return data;
    },

    // Sign In
    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    // Reset Password
    resetPasswordForEmail: async (email) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/update-password',
        });
        if (error) throw error;
        return data;
    },

    // Update User (for password reset)
    updateUser: async (updates) => {
        const { data, error } = await supabase.auth.updateUser(updates);
        if (error) throw error;
        return data;
    },

    // Sign Out
    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Get Current Session
    getSession: async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    },

    // Get Current User Profile (joined with users table if needed, but we rely on 'profiles')
    getCurrentUser: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            // Fallback to auth user data if profile is missing
            return { id: user.id, email: user.email, ...user.user_metadata };
        }
        return data;
    },

    // Update Profile
    updateProfile: async (userId, updates) => {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select();

        if (error) throw error;
        return data[0];
    },

    // Get All Profiles (Employees)
    getAllProfiles: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*');
        if (error) throw error;
        return data;
    }
};
