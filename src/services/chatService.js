import { supabase } from '../supabaseClient';
import { encryptMessage, decryptMessage } from '../utils/encryption';
import { notificationService } from './notificationService';

export const chatService = {
    // Get all conversations with participant details
    getConversations: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data: myConvs, error: myConvsError } = await supabase
            .from('conversation_participants')
            .select('conversation_id')
            .eq('user_id', user.id);

        if (myConvsError) throw myConvsError;

        const convIds = myConvs.map(c => c.conversation_id);
        if (convIds.length === 0) return [];

        const { data: conversations, error: convError } = await supabase
            .from('conversations')
            .select(`
                *,
                participants:conversation_participants(
                    user_id,
                    profiles(first_name, last_name, avatar_url)
                )
            `)
            .in('id', convIds)
            .order('created_at', { ascending: false });

        if (convError) throw convError;

        // Fetch unread counts for all conversations in parallel
        const enrichedConversations = await Promise.all(conversations.map(async (c) => {
            // Count unread messages for this user in this conversation
            const { count } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true })
                .eq('conversation_id', c.id)
                .eq('is_read', false)
                .neq('sender_id', user.id); // Only messages from others

            if (c.type === 'direct') {
                const other = c.participants.find(p => p.user_id !== user.id);
                if (other && other.profiles) {
                    return {
                        ...c,
                        name: `${other.profiles.first_name} ${other.profiles.last_name}`,
                        avatar_url: other.profiles.avatar_url || null,
                        is_online: false, // Online status disabled until schema update
                        unread_count: count || 0
                    };
                } else {
                    return { ...c, name: 'Unknown User', avatar_url: null, unread_count: count || 0 };
                }
            }
            return { ...c, unread_count: count || 0 };
        }));

        return enrichedConversations;
    },

    // Create Group Conversation (Fixed with RPC)
    createGroupConversation: async (name, participantIds) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const allUserIds = [...new Set([user.id, ...participantIds])];

        // RPC call to bypass RLS
        const { data, error } = await supabase.rpc('create_new_conversation', {
            p_type: 'group',
            p_name: name,
            p_participant_ids: allUserIds
        });

        if (error) throw error;
        return data; // Returns object directly
    },

    // Create Direct Conversation (Fixed with RPC)
    createDirectConversation: async (otherUserId) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // RPC call
        const { data, error } = await supabase.rpc('create_new_conversation', {
            p_type: 'direct',
            p_name: null,
            p_participant_ids: [user.id, otherUserId]
        });

        if (error) throw error;
        return data;
    },

    // Get messages (Decrypted)
    getMessages: async (conversationId) => {
        const { data, error } = await supabase
            .from('messages')
            .select(`*, profiles:sender_id (first_name, last_name, avatar_url)`)
            .eq('conversation_id', conversationId)
            .is('parent_id', null)
            .order('created_at', { ascending: true });

        if (error) throw error;

        // Decrypt all
        const decryptedUrl = await Promise.all(data.map(async (msg) => ({
            ...msg,
            content: await decryptMessage(msg.content, conversationId)
        })));

        return decryptedUrl;
    },

    // Get thread replies (Decrypted)
    getThreadReplies: async (messageId) => {
        // Need conversation_id for key derivation. 
        // We'll fetch it from the parent message first if not available, OR assume the caller knows it.
        // For simplicity, let's just fetch messages and then decrypt. 
        // NOTE: Does 'messages' result include conversation_id? Yes, select * covers it.

        const { data, error } = await supabase
            .from('messages')
            .select(`*, profiles:sender_id (first_name, last_name, avatar_url)`)
            .eq('parent_id', messageId)
            .order('created_at', { ascending: true });

        if (error) throw error;

        const decrypted = await Promise.all(data.map(async (msg) => ({
            ...msg,
            content: await decryptMessage(msg.content, msg.conversation_id)
        })));

        return decrypted;
    },

    // Send a message (Encrypted)
    sendMessage: async (conversationId, content, type = 'text', fileUrl = null, parentId = null) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const encryptedContent = await encryptMessage(content, conversationId);

        const { data, error } = await supabase
            .from('messages')
            .insert({
                conversation_id: conversationId,
                sender_id: user.id,
                content: encryptedContent, // Store encrypted
                type,
                file_url: fileUrl,
                parent_id: parentId
            })
            .select(`*, profiles:sender_id (first_name, last_name, avatar_url)`)
            .single();

        if (error) throw error;

        // 3. Notify Recipients (Debug: Notify Everyone)
        // Get conversation participants first
        const { data: participants } = await supabase
            .from('conversation_participants')
            .select('user_id')
            .eq('conversation_id', conversationId);

        if (participants) {
            console.log(`Debug: Chat Notification - Total Participants: ${participants.length}`);

            participants.forEach(p => {
                console.log(`Debug: Notifying recipient ${p.user_id}`);
                notificationService.createNotification({
                    userId: p.user_id,
                    title: 'New Message',
                    message: `You have a new message`,
                    type: 'chat',
                    related_id: conversationId
                }).catch(err => console.error("Chat notification failed", err));
            });
        }

        // Return DECRYPTED version to UI immediately so it shows up correctly
        return {
            ...data,
            content: content // Optimization: avoid decrypting what we just encrypted
        };
    },

    // Real-time subscription (Decrypt incoming)
    subscribeToMessages: (conversationId, callback) => {
        return supabase
            .channel(`public:messages:conversation_id=eq.${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${conversationId}`,
                },
                async (payload) => {
                    const decryptedContent = await decryptMessage(payload.new.content, conversationId);
                    callback({ ...payload.new, content: decryptedContent });
                }
            )
            .subscribe();
    },

    // --- Meeting Features (New) ---

    // Create a new meeting
    createMeeting: async (meetingData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User authentication failed");

        const { title, description, start_time, end_time, participant_ids, meeting_link } = meetingData;

        // 1. Create Meeting
        const { data: meeting, error: meetingError } = await supabase
            .from('meetings')
            .insert({
                title,
                description,
                start_time,
                end_time,
                host_id: user.id,
                meeting_link
            })
            .select()
            .single();

        if (meetingError) throw meetingError;

        // 2. Add Participants
        const participants = [...new Set([user.id, ...(participant_ids || [])])].map(uid => ({
            meeting_id: meeting.id,
            user_id: uid,
            status: uid === user.id ? 'accepted' : 'pending'
        }));

        const { error: partError } = await supabase
            .from('meeting_participants')
            .insert(participants);

        if (partError) {
            console.error("Error adding participants", partError);
            // Optionally rollback meeting creation here if critical
        }

        // 3. Send Notifications
        const invitees = participant_ids.filter(id => id !== user.id);
        await Promise.all(invitees.map(async (id) => {
            await notificationService.createNotification({
                userId: id,
                title: 'New Meeting Invite',
                message: `You have been invited to a meeting: ${title}`,
                type: 'info',
                related_id: meeting.id
            });
        }));

        return meeting;
    },

    // Search Users
    searchUsers: async (query) => {
        if (!query || query.length < 2) return [];
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
            .limit(10);

        if (error) throw error;
        return data;
    },

    // Search Messages (Content)
    searchMessages: async (query) => {
        if (!query || query.length < 3) return [];
        // Note: Searching encrypted content is hard without server-side support or downloading all.
        // For this demo, assuming we might only search unencrypted metadata OR 
        // if we are searching LOCAL cached messages.
        // HOWEVER, since messages are encrypted in DB, raw SQL search won't work on 'content' column.
        // We will return empty or mock this for now, OR fetch recent messages and filter client-side.
        // Let's implement client-side filtering of recent conversations for now as a fallback.

        // Fetch recent messages from active conversations (optimistic approach)
        // Ideally we need a searchable index of decrypted content, which is complex for E2EE.
        // We will SKIP DB search for encrypted content and return empty to avoid misleading results,
        // unless we want to compromise security for convenience.
        // Let's return empty for now with a comment.
        return [];
    }
};
