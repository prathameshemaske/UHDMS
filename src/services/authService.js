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

        // Hardcoded Role Map (Enforce these roles regardless of DB state)
        const emailRoles = {
            'prathameshmaske007@gmail.com': 'admin',
            'maske.prathamesh@gmail.com': 'hr',
            'pratu.mamata08@gmail.com': 'employee' // Corrected from 'emplyee' if it was a typo in my thought
        };
        const forcedRole = emailRoles[user.email];

        if (error) {
            console.error('Error fetching profile:', error);
            // Fallback to auth user data if profile is missing, applying forced role if exists
            return {
                id: user.id,
                email: user.email,
                ...user.user_metadata,
                role: forcedRole || user.user_metadata?.role || 'employee'
            };
        }

        // Apply forced role to returned data
        if (forcedRole) {
            data.role = forcedRole;
        }

        return data;
    },

    // Update Profile (Upsert to handle missing rows)
    updateProfile: async (userId, updates) => {
        // Ensure ID is included for upsert
        const profileData = { id: userId, ...updates };

        const { data, error } = await supabase
            .from('profiles')
            .upsert(profileData)
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
    },

    // Get Single Profile by ID
    getProfileById: async (id) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    // Update Password (authenticated user)
    updatePassword: async (newPassword) => {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error) throw error;
        return data;
    },

    // Delete Account (rpc call)
    deleteAccount: async () => {
        const { error } = await supabase.rpc('delete_own_account');
        if (error) throw error;
        // Sign out locally as well
        await supabase.auth.signOut();
    },

    // Create New Employee (Insert into profiles directly for directory listing)
    // Note: Real auth user creation requires Admin API or Invite flow.
    createEmployee: async (employeeData) => {
        // Generate a random ID since we can't create auth.user from client easily without logging out
        const fakeId = crypto.randomUUID();

        const { data, error } = await supabase
            .from('profiles')
            .insert([{
                id: fakeId,
                email: employeeData.email,
                first_name: employeeData.first_name,
                last_name: employeeData.last_name,
                phone: employeeData.phone,
                job_title: employeeData.job_title,
                start_date: employeeData.start_date,
                department: employeeData.department,
                location: employeeData.location,
                skills: employeeData.skills ? employeeData.skills.split(',').map(s => s.trim()) : [],
                bio: employeeData.bio,
                employment_type: employeeData.employment_type || 'Full-Time'
            }])
            .select();

        if (error) throw error;
        return data;
    }
};
