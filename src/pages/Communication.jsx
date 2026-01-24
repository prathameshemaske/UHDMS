
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

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#121117] dark:text-white">
            {/* Column 1: Navigation Sidebar (20%) */}
            <aside className="w-[20%] flex flex-col border-r border-[#f1f0f4] dark:border-[#2a293a] bg-white dark:bg-[#1a192b]">
                <div className="p-4 flex items-center gap-3 border-b border-[#f1f0f4] dark:border-[#2a293a] min-h-[64px]">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-lg">grid_view</span>
                    </div>
                    <div className="flex flex-col">
                        <Link to="/" className="text-[#121117] dark:text-white text-sm font-bold leading-tight hover:underline">UHDMS</Link>
                        <p className="text-[#656487] dark:text-[#a0a0c0] text-xs font-medium">Engineering Team</p>
                    </div>
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
                                <span className="text-sm font-semibold">{channel.name}</span>
                            </button>
                        ))}
                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#121117] dark:text-white hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a] transition-colors w-full text-left" onClick={() => setShowNewChat(true)}>
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            <span className="text-sm font-medium">Add channel</span>
                        </button>
                    </div>
                    {/* DMs Section (Placeholder logic for now as we don't distinguish DM names easily without complex logic) */}
                    <div className="flex flex-col gap-1">
                        <h3 className="text-[#656487] dark:text-[#a0a0c0] text-[11px] font-bold uppercase tracking-wider px-3 mb-2">Direct Messages</h3>
                        {/* Static DMs for visual completeness until backend supports dynamic DM naming */}
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a] cursor-pointer">
                            <div className="relative">
                                <div className="size-6 bg-center bg-cover rounded-full" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB31rbV1iWWGA9Xibo601AD5kOINXRmo54IZXP4m7p8UotUqqLNZiGFXygHv1ufytbj370IMj5mPn89fRK9qdGxPNUcUc_tSlhXDx-FtMYbzH66imR9GdLgWcgBC8H4kIyiXQPzd2nS1ntZ-r-QywKj1IGcyerlYQxq1G3xoECtAgraUPOz_P3lqPD1NZ4doFWiKAPP8wxVg4XIQRoKEfnnzmoUgq1IMYGGT7qTn4tEHUp0USVfwtZvBbbYqieEMpYXGL_KXumf2CM1")' }}></div>
                                <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-green-500 border-2 border-white dark:border-[#1a192b] rounded-full"></div>
                            </div>
                            <p className="text-[#121117] dark:text-white text-sm font-medium">Marcus Miller</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-[#f1f0f4] dark:border-[#2a293a] space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-primary text-white text-sm font-bold" onClick={() => setShowNewChat(true)}>
                        <span className="material-symbols-outlined text-sm">person_add</span>
                        Invite Members
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-[#f1f0f4] dark:bg-[#2a293a] hover:bg-[#e8e8f3] dark:hover:bg-[#3a394a] text-[#121117] dark:text-white text-sm font-bold transition-colors" onClick={() => setShowScheduleMeeting(true)}>
                        <span className="material-symbols-outlined text-sm">videocam</span>
                        Schedule Call
                    </button>
                </div>
            </aside>
            {/* Column 2: Main Chat Feed (40%) */}
            <main className="w-[40%] flex flex-col bg-white dark:bg-background-dark border-r border-[#f1f0f4] dark:border-[#2a293a]">
                {/* Main Header */}
                <header className="flex items-center justify-between px-6 h-[64px] border-b border-[#f1f0f4] dark:border-[#2a293a] sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-10 shrink-0">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xl text-[#656487]">{activeConversation?.type === 'group' ? 'tag' : 'person'}</span>
                            {activeConversation?.name || 'Select a chat'}
                        </h2>
                        <div className="flex items-center gap-2">
                            {/* Placeholder for member count */}
                            <span className="text-xs text-[#656487] font-medium">3 members</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-[#2a293a] text-[#656487] transition-colors" title="Call Now">
                            <span className="material-symbols-outlined">call</span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-[#2a293a] text-[#656487] transition-colors" onClick={() => setShowScheduleMeeting(true)} title="Schedule Meeting">
                            <span className="material-symbols-outlined">calendar_today</span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-[#2a293a] text-[#656487] transition-colors" onClick={() => setShowSearch(true)} title="Search">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-[#2a293a] text-[#656487] transition-colors" title="Channel Info">
                            <span className="material-symbols-outlined">info</span>
                        </button>
                    </div>
                </header>
                {/* Chat Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar py-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 px-6 py-3 hover:bg-[#f8fafc] dark:hover:bg-[#1a192b] group relative transition-colors ${msg.sender_id === currentUser?.id ? 'opacity-100' : ''}`}>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10 flex-shrink-0" style={{ backgroundImage: `url("${msg.profiles?.avatar_url || 'https://via.placeholder.com/40'}")` }}></div>
                            <div className="flex flex-1 flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <p className="text-[#121117] dark:text-white text-sm font-bold leading-tight">{msg.profiles?.first_name || 'Unknown'} {msg.profiles?.last_name || ''}</p>
                                    <p className="text-[#656487] text-[11px] font-medium leading-normal">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                <p className="text-[#121117] dark:text-white text-sm font-normal leading-relaxed">{msg.content}</p>
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
            {/* Column 3: Thread Panel (40%) - Placeholder Static for now as threads require messages v2 */}
            <section className="w-[40%] flex flex-col bg-[#f8fafc] dark:bg-[#161527]">
                {/* Keep Thread UI Static for Phase 1 of Integration or disable it if preferred. Keeping it static for visual consistency. */}
                <header className="flex items-center justify-between px-6 h-[64px] border-b border-[#f1f0f4] dark:border-[#2a293a] bg-white/80 dark:bg-[#1a192b]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-base font-bold text-[#121117] dark:text-white">Thread</h2>
                        <span className="text-xs text-[#656487] font-medium">#general</span>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-[#f1f0f4] dark:hover:bg-[#2a293a] text-[#656487] transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>
                <div className="flex-1 flex items-center justify-center text-[#656487]">
                    <p>Select a message to view thread (Coming Soon)</p>
                </div>
            </section>
            {/* Column 4: Collapsed Profile Pane */}
            <div className="w-12 flex flex-col items-center py-4 bg-white dark:bg-[#1a192b] border-l border-[#f1f0f4] dark:border-[#2a293a] shrink-0">
                <Link to="/profile" className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                </Link>
                <div className="mt-auto space-y-4">
                    <Link to="/settings" className="p-2 text-[#656487] hover:text-primary transition-colors block">
                        <span className="material-symbols-outlined">settings</span>
                    </Link>
                    {/* Real User Avatar */}
                    <div className="size-8 rounded-full bg-center bg-cover border-2 border-primary" style={{ backgroundImage: `url("${currentUser?.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                </div>
            </div>

            <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
            <NewChatModal isOpen={showNewChat} onClose={() => setShowNewChat(false)} />
            <ScheduleMeetingModal isOpen={showScheduleMeeting} onClose={() => setShowScheduleMeeting(false)} />
        </div>
    );
};

export default Communication;
