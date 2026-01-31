import { supabase } from '../supabaseClient';

export const bugService = {
    // Fetch bugs with dynamic filters
    getBugs: async ({ status, priority, assignee, severity } = {}) => {
        let query = supabase
            .from('bugs')
            .select('*') // Reverted to simple select as 'assignee' is likely text string, not FK UUID yet
            // Note: If 'assignee' column is currently text name, we might need to adjust or rely on frontend matching.
            // Assuming we will migrate 'assignee' to 'assignee_id' UUID or keep using text for now but fetch properly.
            // For now, let's fetch raw and assume 'assignee' is the text name from previous implementation, 
            // OR if we updated schema to use IDs. 
            // Let's stick to the current schema pattern: 'assignee' (text) vs 'assignee_id' (UUID).
            // If the user hasn't migrated columns yet, we just select *.

            .order('created_at', { ascending: false });

        if (status && status !== 'All') query = query.eq('status', status);
        if (priority && priority !== 'All') query = query.eq('priority', priority);
        if (severity && severity !== 'All') query = query.eq('severity', severity);
        // assignee filter would need exact text match if using names
        if (assignee && assignee !== 'All') query = query.eq('assignee', assignee);

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },
    // Create a new bug
    createBug: async (bugData) => {
        const { data: { user } } = await supabase.auth.getUser();

        // Extract assignee_id for notification, do not send to DB if column doesn't exist
        const { assignee_id, ...dbPayload } = bugData;

        const payload = {
            ...dbPayload,
            reporter_id: user?.id
        };

        const { data, error } = await supabase
            .from('bugs')
            .insert([payload])
            .select()
            .single();

        if (error) throw error;

        // Notify Assignee
        if (bugData.assignee_id) {
            console.log("Debug: Triggering Bug Notification for assignee:", bugData.assignee_id);
            // Use dynamic import to avoid circular dependency
            import('./notificationService').then(({ notificationService }) => {
                notificationService.createNotification({
                    userId: bugData.assignee_id,
                    title: 'New Bug Assigned',
                    message: `You have been assigned a new bug: ${payload.title}`,
                    type: 'bug',
                    related_id: data.id
                }).catch(err => console.error("Bug notification failed", err));
            });
        }

        return data;
    },
    // Fetch single bug details with comments (Manual Join Version)
    getBugDetails: async (id) => {
        const { data: bug, error: bugError } = await supabase
            .from('bugs')
            .select('*')
            .eq('id', id)
            .single();

        if (bugError) throw bugError;

        let comments = [];
        try {
            // 1. Fetch raw comments
            const { data: rawComments, error: commentsError } = await supabase
                .from('bug_comments')
                .select('*')
                .eq('bug_id', id)
                .order('created_at', { ascending: true });

            if (commentsError) throw commentsError;

            // 2. Fetch profiles for comment authors manually
            if (rawComments && rawComments.length > 0) {
                const userIds = [...new Set(rawComments.map(c => c.user_id).filter(Boolean))];
                const { data: profiles } = await supabase
                    .from('profiles')
                    .select('id, first_name, last_name, avatar_url')
                    .in('id', userIds);

                // Map profiles to comments
                comments = rawComments.map(comment => {
                    const author = profiles?.find(p => p.id === comment.user_id);
                    return { ...comment, author }; // Attach author object manually
                });
            } else {
                comments = [];
            }
        } catch (err) {
            console.error("Error fetching comments:", err);
        }

        return { ...bug, comments };
    },

    // Add a comment (Manual Join Return)
    addComment: async (bugId, content) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        await bugService.ensureProfileExists(user);

        const { data: comment, error } = await supabase
            .from('bug_comments')
            .insert({
                bug_id: bugId,
                user_id: user.id,
                content
            })
            .select() // Select raw first
            .single();

        if (error) throw error;

        // Fetch author profile separately
        const { data: profile } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, avatar_url')
            .eq('id', user.id)
            .single();

        return { ...comment, author: profile };
    },

    // Fetch History (Manual Join)
    getHistory: async (bugId) => {
        const { data: rawHistory } = await supabase
            .from('bug_history')
            .select('*') // Raw fetch
            .eq('bug_id', bugId)
            .order('created_at', { ascending: false });

        if (!rawHistory || rawHistory.length === 0) return [];

        const userIds = [...new Set(rawHistory.map(h => h.user_id).filter(Boolean))];
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, first_name, last_name')
            .in('id', userIds);

        return rawHistory.map(item => ({
            ...item,
            author: profiles?.find(p => p.id === item.user_id)
        }));
    },

    // Fetch all profiles (for Assignee dropdown)
    getAllProfiles: async () => {
        const { data } = await supabase.from('profiles').select('id, first_name, last_name, avatar_url');
        return data || [];
    },

    // Fetch Linked Items
    getLinkedItems: async (bugId) => {
        // Safe fetch - check if table exists by try/catch or just run
        try {
            const { data } = await supabase
                .from('issue_links')
                .select(`
                    *,
                    tasks:target_task_id (*)
                `)
                .eq('source_bug_id', bugId);
            return data || [];
        } catch (e) {
            console.warn("Issue links fetch failed", e);
            return [];
        }
    },

    // Link a Task
    linkTask: async (bugId, taskId) => {
        const { data, error } = await supabase
            .from('issue_links')
            .insert({ source_bug_id: bugId, target_task_id: taskId });
        if (error) throw error;
        return data;
    },

    // Upload Attachment
    uploadAttachment: async (bugId, file) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const fileExt = file.name.split('.').pop();
        const fileName = `${bugId}/${Math.random()}.${fileExt}`;

        // 1. Upload to Storage
        const { error: uploadError } = await supabase.storage
            .from('bug_attachments') // Ensure bucket exists
            .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } = {} } = supabase.storage
            .from('bug_attachments')
            .getPublicUrl(fileName);

        // 2. Save generic record in DB
        const { data, error } = await supabase
            .from('bug_attachments')
            .insert({
                bug_id: bugId,
                file_name: file.name,
                file_url: publicUrl,
                file_type: fileExt,
                uploaded_by: user.id
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get Attachments
    getAttachments: async (bugId) => {
        const { data } = await supabase
            .from('bug_attachments')
            .select('*')
            .eq('bug_id', bugId);
        return data || [];
    },

    // Verify profile exists, if not create one
    ensureProfileExists: async (user) => {
        const { count } = await supabase
            .from('profiles')
            .select('id', { count: 'exact', head: true })
            .eq('id', user.id);

        if (count === 0) {
            const { error } = await supabase.from('profiles').insert({
                id: user.id,
                email: user.email,
                first_name: 'User',
                last_name: user.email?.split('@')[0] || 'Unknown',
                role: 'employee'
            });
            if (error) console.error("Failed to auto-create profile:", error);
        }
    },

    // Update bug with History logging
    updateBug: async (id, updates) => {
        const { data: { user } } = await supabase.auth.getUser();

        // 1. Get old values for history
        const { data: oldData } = await supabase.from('bugs').select('*').eq('id', id).single();

        // 2. Perform Update
        const { data, error } = await supabase
            .from('bugs')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        // 3. Log History (Fire and forget)
        if (user && oldData) {
            const historyEntries = Object.keys(updates).map(key => ({
                bug_id: id,
                user_id: user.id,
                field_changed: key,
                old_value: String(oldData[key]),
                new_value: String(updates[key])
            }));

            try {
                if (historyEntries.length > 0) {
                    await supabase.from('bug_history').insert(historyEntries);
                }

                // 4. Notify Reporter
                console.log(`Debug: Checking Bug Notification - Reporter: ${oldData.reporter_id}, Updater: ${user.id}`);
                if (oldData.reporter_id) { // Allow self-notification for debug
                    console.log("Debug: Sending Bug Notification...");
                    // Use dynamic import correctly or switch to top-level if possible
                    import('./notificationService').then(({ notificationService }) => {
                        notificationService.createNotification({
                            userId: oldData.reporter_id,
                            title: 'Bug Updated',
                            message: `Bug "${oldData.title}" has been updated`,
                            type: 'bug',
                            related_id: id
                        }).catch(err => console.error("Notification failed", err));
                    });
                }

            } catch (e) {
                console.warn("Failed to save bug history or notify:", e);
            }
        }
        return data;
    }
};
