import { supabase } from '../supabaseClient';

export const announcementService = {
    // Fetch latest announcements
    getAnnouncements: async () => {
        const { data, error } = await supabase
            .from('announcements')
            .select('*') // simplified for debugging
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) {
            console.error('Error fetching announcements:', error);
            throw error;
        }
        return data;
    },

    // Create a new announcement
    createAnnouncement: async (announcementData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // Check if profile exists to avoid FK violation
        const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('id', user.id);

        const { data, error } = await supabase
            .from('announcements')
            .insert({
                ...announcementData,
                created_by: count > 0 ? user.id : null // Safe fallback
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating announcement:', error);
            throw error;
        }
        return data;
    },

    // Upload image for announcement
    uploadImage: async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
            .from('announcements')
            .upload(filePath, file);

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('announcements')
            .getPublicUrl(filePath);

        return publicUrl;
    },

    // --- Interactions ---

    // Toggle Like
    toggleLike: async (announcementId) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // Check if already liked
        const { data: existingLike } = await supabase
            .from('announcement_likes')
            .select('*')
            .eq('announcement_id', announcementId)
            .eq('user_id', user.id)
            .single();

        if (existingLike) {
            // Unlike
            await supabase
                .from('announcement_likes')
                .delete()
                .eq('announcement_id', announcementId)
                .eq('user_id', user.id);
            return 'unliked';
        } else {
            // Like
            await supabase
                .from('announcement_likes')
                .insert({ announcement_id: announcementId, user_id: user.id });
            return 'liked';
        }
    },

    // Get Comments for an announcement
    getComments: async (announcementId) => {
        const { data, error } = await supabase
            .from('announcement_comments')
            .select(`
                *,
                profile:profiles!user_id (id, first_name, last_name, avatar_url)
            `)
            .eq('announcement_id', announcementId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Add Comment
    addComment: async (announcementId, content) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('announcement_comments')
            .insert({
                announcement_id: announcementId,
                user_id: user.id,
                content: content
            })
            .select(`
                *,
                profile:profiles!user_id (id, first_name, last_name, avatar_url)
            `)
            .single();

        if (error) throw error;
        return data;
    },

    // Get Likes Count and status for a specific user (helper for list)
    getInteractionState: async (announcementId, userId) => {
        const { count } = await supabase
            .from('announcement_likes')
            .select('*', { count: 'exact', head: true })
            .eq('announcement_id', announcementId);

        const { data: userLike } = await supabase
            .from('announcement_likes')
            .select('*')
            .eq('announcement_id', announcementId)
            .eq('user_id', userId)
            .single();

        return {
            likesCount: count || 0,
            isLiked: !!userLike
        };
    }
};
