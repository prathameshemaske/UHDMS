import { supabase } from '../supabaseClient';

export const notificationService = {
    // Get notifications for current user
    getNotifications: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(50); // Limit to last 50

        if (error) throw error;
        return data;
    },

    // Get unread count
    getUnreadCount: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return 0;

        const { count, error } = await supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('is_read', false);

        if (error) throw error;
        return count;
    },

    // Mark as read
    markAsRead: async (notificationId) => {
        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', notificationId);

        if (error) throw error;
    },

    // Mark all as read
    markAllAsRead: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', user.id)
            .eq('is_read', false);

        if (error) throw error;
    },

    // Create a notification
    createNotification: async ({ userId, title, message, type, related_id }) => {
        let targetId = userId;

        if (!targetId) {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            targetId = user.id;
        }

        const { error } = await supabase
            .from('notifications')
            .insert({
                user_id: targetId,
                title,
                message,
                type,
                related_id
            });

        if (error) {
            console.warn("Failed to create notification (likely FK issue or permissions):", error.message);
        } else {
            console.log("Notification created successfully for user:", targetId);
        }
    }
};
