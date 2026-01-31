
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScheduleMeetingModal from '../components/communication/ScheduleMeetingModal';
import SearchModal from '../components/communication/SearchModal';
import NewChatModal from '../components/communication/NewChatModal';
import { chatService } from '../services/chatService';
import { authService } from '../services/authService';

const Communication = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showNewChat, setShowNewChat] = useState(false);
    const [showScheduleMeeting, setShowScheduleMeeting] = useState(false);

    // State for Real Data
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    // Initial Data Fetch
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) setCurrentUser(user);

                const convs = await chatService.getConversations();
                setConversations(convs);

                if (convs.length > 0) {
                    setActiveConversation(convs[0]);
                }
            } catch (error) {
                console.error("Failed to load chat data", error);
            }
        };
        loadInitialData();
    }, []);

    // Fetch Messages when Active Conversation changes
    useEffect(() => {
        if (!activeConversation) return;

        const loadMessages = async () => {
            try {
                const msgs = await chatService.getMessages(activeConversation.id);
                setMessages(msgs);
            } catch (error) {
                console.error("Failed to load messages", error);
            }
        };
        loadMessages();

        // Real-time subscription
        const subscription = chatService.subscribeToMessages(activeConversation.id, (payload) => {
            setMessages(prev => [...prev, payload]);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [activeConversation]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !activeConversation) return;

        try {
            await chatService.sendMessage(activeConversation.id, newMessage);
            setNewMessage(""); // Clear input
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    // Thread State
    const [activeThread, setActiveThread] = useState(null);
    const [threadMessages, setThreadMessages] = useState([]);
    const [newReply, setNewReply] = useState("");
    const [showThreadPanel, setShowThreadPanel] = useState(false);

    // Modal State
    const [modalMode, setModalMode] = useState('direct'); // 'direct' or 'group'

    const openNewChatModal = (mode) => {
        setModalMode(mode);
        setShowNewChat(true);
    };

    // Fetch Thread Messages
    useEffect(() => {
        if (!activeThread) return;
        setShowThreadPanel(true);

        const loadThreadMessages = async () => {
            try {
                const replies = await chatService.getThreadReplies(activeThread.id);
                setThreadMessages(replies);
            } catch (error) {
                console.error("Failed to load thread replies", error);
            }
        };
        loadThreadMessages();
    }, [activeThread]);

    const handleOpenThread = (msg) => {
        setActiveThread(msg);
        setShowThreadPanel(true);
    };

    const handleSendReply = async () => {
        if (!newReply.trim() || !activeThread || !activeConversation) return;

        try {
            await chatService.sendMessage(activeConversation.id, newReply, 'text', null, activeThread.id);
            setNewReply("");
            const replies = await chatService.getThreadReplies(activeThread.id);
            setThreadMessages(replies);
        } catch (error) {
            console.error("Failed to send reply", error);
        }
    };

    const closeThread = () => {
        setActiveThread(null);
        setThreadMessages([]);
        setShowThreadPanel(false);
    };

    const handleQuickCall = async () => {
        const link = `https://meet.jit.si/UHDMS-Quick-${Date.now()}-${Math.random().toString(36).substr(2, 9)}#config.language="en"`;

        // Open call immediately
        window.open(link, '_blank');

        // Post link to chat if active
        if (activeConversation) {
            try {
                const content = `📞 Started a secure video call. Click to join: ${link}`;
                // Send as text for now, could be special type later
                await chatService.sendMessage(activeConversation.id, content);
            } catch (error) {
                console.error("Failed to post call link to chat", error);
            }
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#121117] dark:text-white">
            {/* Column 1: Navigation Sidebar (20%) */}
            <aside className="w-[20%] flex flex-col border-r border-[#f1f0f4] dark:border-[#2a293a] bg-white dark:bg-[#1a192b]">
                <div className="p-4 border-b border-[#f1f0f4] dark:border-[#2a293a] min-h-[64px] flex items-center">
                    <h1 className="text-xl font-bold text-[#121117] dark:text-white">Chat</h1>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Channels Section */}
                    <div className="flex flex-col gap-1">
                        <h3 className="text-[#656487] dark:text-[#a0a0c0] text-[11px] font-bold uppercase tracking-wider px-3 mb-2">Channels</h3>
                        {conversations.filter(c => c.type === 'group').map(channel => (
                            <button
                                key={channel.id}
                                onClick={() => setActiveConversation(channel)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left transition-colors ${activeConversation?.id === channel.id ? 'bg-primary/10 text-primary' : 'text-[#121117] dark:text-white hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a]'}`}
                            >
                                <span className="material-symbols-outlined text-[20px] fill-icon">tag</span>
                                <span className="text-sm font-semibold flex-1 truncate">{channel.name}</span>
                                {channel.unread_count > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                        {channel.unread_count}
                                    </span>
                                )}
                            </button>
                        ))}
                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#121117] dark:text-white hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a] transition-colors w-full text-left" onClick={() => openNewChatModal('group')}>
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            <span className="text-sm font-medium">Add channel</span>
                        </button>
                    </div>
                    {/* DMs Section */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between px-3 mb-2">
                            <h3 className="text-[#656487] dark:text-[#a0a0c0] text-[11px] font-bold uppercase tracking-wider">Direct Messages</h3>
                            <button onClick={() => openNewChatModal('direct')} className="text-[#656487] hover:text-primary transition-colors" title="New Message">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                            </button>
                        </div>
                        {conversations.filter(c => c.type === 'direct').map(dm => (
                            <button
                                key={dm.id}
                                onClick={() => setActiveConversation(dm)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left transition-colors ${activeConversation?.id === dm.id ? 'bg-primary/10 text-primary' : 'text-[#121117] dark:text-white hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a]'}`}
                            >
                                <div className="relative">
                                    <div className="size-6 bg-center bg-cover rounded-full" style={{ backgroundImage: `url("${dm.avatar_url || `https://ui-avatars.com/api/?name=${dm.name}&background=random`}")` }}></div>
                                    <div className={`absolute -bottom-0.5 -right-0.5 size-2.5 border-2 border-white dark:border-[#1a192b] rounded-full ${dm.is_online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                </div>
                                <span className="text-sm font-medium truncate flex-1">{dm.name}</span>
                                {dm.unread_count > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                        {dm.unread_count}
                                    </span>
                                )}
                            </button>
                        ))}
                        {conversations.filter(c => c.type === 'direct').length === 0 && (
                            <div className="px-3 py-4 text-center">
                                <p className="text-xs text-[#656487] italic mb-2">No conversations yet</p>
                                <button onClick={() => openNewChatModal('direct')} className="text-xs font-bold text-primary hover:underline">Start a chat</button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
            {/* Column 2: Main Chat Feed (Fluid width) */}
            <main className={`flex-1 flex flex-col bg-white dark:bg-background-dark border-r border-[#f1f0f4] dark:border-[#2a293a] transition-all duration-300 ${showThreadPanel ? 'w-[45%]' : 'w-[80%]'}`}>
                {/* Main Header */}
                <header className="flex items-center justify-between px-6 h-[64px] border-b border-[#f1f0f4] dark:border-[#2a293a] sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-10 shrink-0">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xl text-[#656487]">{activeConversation?.type === 'group' ? 'tag' : 'person'}</span>
                            {activeConversation?.name || 'Select a chat'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleQuickCall} className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-[#2a293a] text-[#656487] transition-colors" title="Quick Call">
                            <span className="material-symbols-outlined">call</span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-[#2a293a] text-[#656487] transition-colors" onClick={() => setShowScheduleMeeting(true)} title="Schedule Meeting">
                            <span className="material-symbols-outlined">calendar_today</span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-[#2a293a] text-[#656487] transition-colors" onClick={() => setShowSearch(true)} title="Search">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>
                </header>
                {/* Chat Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar py-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 px-6 py-3 hover:bg-[#f8fafc] dark:hover:bg-[#1a192b] group relative transition-colors ${activeThread?.id === msg.id ? 'bg-[#f1f0f4] dark:bg-[#2a293a]' : ''}`}>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10 flex-shrink-0" style={{ backgroundImage: `url("${msg.profiles?.avatar_url || 'https://via.placeholder.com/40'}")` }}></div>
                            <div className="flex flex-1 flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <p className="text-[#121117] dark:text-white text-sm font-bold leading-tight">{msg.profiles?.first_name || 'Unknown'} {msg.profiles?.last_name || ''}</p>
                                    <p className="text-[#656487] text-[11px] font-medium leading-normal">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                <p className="text-[#121117] dark:text-white text-sm font-normal leading-relaxed">{msg.content}</p>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleOpenThread(msg)} className="text-xs text-[#5048e5] font-bold hover:underline flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-[14px]">forum</span> Reply in thread
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                {/* Main Input Area */}
                <div className="p-6 border-t border-[#f1f0f4] dark:border-[#2a293a] shrink-0">
                    <div className="flex flex-col border border-[#f1f0f4] dark:border-[#2a293a] rounded-xl bg-white dark:bg-[#1a192b] focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            className="w-full bg-transparent border-none focus:ring-0 p-4 text-sm min-h-[80px] placeholder:text-[#656487] dark:placeholder:text-[#a0a0c0] resize-none"
                            placeholder={`Message #${activeConversation?.name || 'chat'}`}
                        ></textarea>
                        <div className="flex items-center justify-between px-4 py-2 bg-background-light dark:bg-[#2a293a]/50 rounded-b-xl">
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 rounded-lg hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a] text-[#656487] transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">format_bold</span>
                                </button>
                                <button className="p-1.5 rounded-lg hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a] text-[#656487] transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">format_italic</span>
                                </button>
                                <button className="p-1.5 rounded-lg hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a] text-[#656487] transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">link</span>
                                </button>
                                <button className="p-1.5 rounded-lg hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a] text-[#656487] transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">code</span>
                                </button>
                                <div className="w-px h-4 bg-[#f1f0f4] dark:bg-[#2a293a] mx-1"></div>
                                <button className="p-1.5 rounded-lg hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a] text-[#656487] transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">attach_file</span>
                                </button>
                            </div>
                            <button onClick={handleSendMessage} disabled={!newMessage.trim()} className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
                                <span className="material-symbols-outlined text-lg">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {/* Column 3: Thread Panel (35% - Conditional) */}
            {showThreadPanel && (
                <section className="w-[35%] flex flex-col bg-[#f8fafc] dark:bg-[#161527] border-l border-[#f1f0f4] dark:border-[#2a293a] animate-in slide-in-from-right duration-300">
                    <header className="flex items-center justify-between px-6 h-[64px] border-b border-[#f1f0f4] dark:border-[#2a293a] bg-white/80 dark:bg-[#1a192b]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
                        <div className="flex items-center gap-3">
                            <h2 className="text-base font-bold text-[#121117] dark:text-white">Thread</h2>
                            <span className="text-xs text-[#656487] font-medium">#{activeConversation?.name}</span>
                        </div>
                        <button onClick={closeThread} className="p-2 rounded-lg hover:bg-[#f1f0f4] dark:hover:bg-[#2a2a3a] text-[#656487] transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </header>
                    {activeThread ? (
                        <>
                            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                                {/* Parent Message */}
                                <div className="mb-6 pb-6 border-b border-[#f1f0f4] dark:border-[#2a293a]">
                                    <div className="flex gap-4">
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10 flex-shrink-0" style={{ backgroundImage: `url("${activeThread.profiles?.avatar_url || 'https://via.placeholder.com/40'}")` }}></div>
                                        <div className="flex flex-1 flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-[#121117] dark:text-white text-sm font-bold leading-tight">{activeThread.profiles?.first_name} {activeThread.profiles?.last_name}</p>
                                                <p className="text-[#656487] text-[11px] font-medium leading-normal">{new Date(activeThread.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                            <p className="text-[#121117] dark:text-white text-sm font-normal leading-relaxed">{activeThread.content}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Replies */}
                                <div className="space-y-6">
                                    {threadMessages.map(reply => (
                                        <div key={reply.id} className="flex gap-4">
                                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-8 flex-shrink-0" style={{ backgroundImage: `url("${reply.profiles?.avatar_url || 'https://via.placeholder.com/40'}")` }}></div>
                                            <div className="flex flex-1 flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[#121117] dark:text-white text-sm font-bold leading-tight">{reply.profiles?.first_name} {reply.profiles?.last_name}</p>
                                                    <p className="text-[#656487] text-[11px] font-medium leading-normal">{new Date(reply.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                                <p className="text-[#121117] dark:text-white text-sm font-normal leading-relaxed">{reply.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Thread Input */}
                            <div className="p-6 border-t border-[#f1f0f4] dark:border-[#2a293a] shrink-0 bg-white dark:bg-[#1a192b]">
                                <div className="flex flex-col border border-[#f1f0f4] dark:border-[#2a293a] rounded-xl focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                                    <textarea
                                        value={newReply}
                                        onChange={(e) => setNewReply(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendReply();
                                            }
                                        }}
                                        className="w-full bg-transparent border-none focus:ring-0 p-3 text-sm min-h-[60px] placeholder:text-[#656487] dark:placeholder:text-[#a0a0c0] resize-none"
                                        placeholder="Reply..."
                                    ></textarea>
                                    <div className="flex justify-end p-2 bg-background-light dark:bg-[#2a293a]/50 rounded-b-xl">
                                        <button onClick={handleSendReply} disabled={!newReply.trim()} className="bg-primary text-white p-1.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
                                            <span className="material-symbols-outlined text-lg">send</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-[#656487]">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">forum</span>
                                <p className="text-sm font-medium">Select a message to view thread</p>
                            </div>
                        </div>
                    )}
                </section>
            )}

            <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
            <NewChatModal isOpen={showNewChat} onClose={() => setShowNewChat(false)} mode={modalMode} />
            <ScheduleMeetingModal isOpen={showScheduleMeeting} onClose={() => setShowScheduleMeeting(false)} />
        </div>
    );
};

export default Communication;
