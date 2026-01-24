import { supabase } from '../supabaseClient';

export const chatService = {
    // Get all conversations for the current user
    getConversations: async () => {
        // This is a simplified query. In a real app, you'd likely want to join with participants
        // to get the names of other people in the chat.
        // For now, let's fetch conversations where the user is a participant.

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('conversation_participants')
            .select(`
        conversation_id,
        conversations (
            id,
            type,
            name,
            created_at
        )
      `)
            .eq('user_id', user.id);

        if (error) throw error;

        // Flatten structure
        return data.map(item => item.conversations);
    },

    // Get messages for a specific conversation
    getMessages: async (conversationId) => {
        const { data, error } = await supabase
            .from('messages')
            .select(`
        *,
        profiles:sender_id (first_name, last_name, avatar_url)
      `)
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Send a message
    sendMessage: async (conversationId, content, type = 'text', fileUrl = null) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('messages')
            .insert({
                conversation_id: conversationId,
                sender_id: user.id,
                content,
                type,
                file_url: fileUrl
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Real-time subscription to new messages in a conversation
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
                (payload) => {
                    callback(payload.new);
                }
            )
            .subscribe();
    },

    // Create a direct message conversation
    createDirectConversation: async (otherUserId) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // 1. Create Conversation
        const { data: conversation, error: convError } = await supabase
            .from('conversations')
            .insert({ type: 'direct' })
            .select()
            .single();

        if (convError) throw convError;

        // 2. Add Participants
        const { error: partError } = await supabase
            .from('conversation_participants')
            .insert([
                { conversation_id: conversation.id, user_id: user.id },
                { conversation_id: conversation.id, user_id: otherUserId }
            ]);

        if (partError) throw partError;

        return conversation;
    }
};
