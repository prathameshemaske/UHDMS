import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { chatService } from '../../services/chatService';

const NewChatModal = ({ isOpen, onClose, mode = 'direct' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [channelName, setChannelName] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadUsers();
            setSearchTerm('');
            setSelectedUsers([]);
            setChannelName('');
        }
    }, [isOpen]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const allUsers = await authService.getAllProfiles();
            const currentUser = await authService.getCurrentUser();
            // Filter out self
            setUsers(allUsers.filter(u => u.id !== currentUser.id) || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectUser = (user) => {
        if (selectedUsers.find(u => u.id === user.id)) {
            setSelectedUsers(prev => prev.filter(u => u.id !== user.id));
        } else {
            setSelectedUsers(prev => [...prev, user]);
        }
    };

    const handleStartChat = async () => {
        if (selectedUsers.length === 0) return;

        try {
            if (mode === 'direct') {
                // strict DM creation
                await chatService.createDirectConversation(selectedUsers[0].id);
            } else {
                // Group Channel
                const name = channelName.trim() || selectedUsers.map(u => u.first_name).join(', ').substring(0, 30);
                await chatService.createGroupConversation(name, selectedUsers.map(u => u.id));
            }
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Failed to start chat", error);
            alert("Error creating chat");
        }
    };

    const filteredUsers = users.filter(u =>
        u.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="absolute inset-0 z-40" onClick={onClose}></div>
            <div className="relative z-50 w-full max-w-[520px] bg-white dark:bg-[#1a1a2e] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-5 border-b border-[#f1f0f4] dark:border-[#2a2a3a] flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#121117] dark:text-white">New Chat</h2>
                    <button className="text-[#656487] hover:text-[#121117] dark:hover:text-white" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <div className="flex items-center w-full rounded-lg bg-[#f1f0f4] dark:bg-[#2a2a3a] border border-transparent focus-within:border-[#5d55e7]/50 focus-within:bg-white dark:focus-within:bg-[#1a1a2e] transition-all">
                        <div className="pl-4 text-[#656487]">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input
                            className="w-full border-none bg-transparent focus:ring-0 text-sm py-3 px-3 placeholder:text-[#656487] dark:text-white outline-none"
                            placeholder="Search people..."
                            type="text"
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="px-6 py-2 flex flex-wrap gap-2">
                    {selectedUsers.map(u => (
                        <div key={u.id} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#5d55e7]/10 rounded-full border border-[#5d55e7]/20">
                            <span className="text-xs font-semibold text-[#5d55e7]">{u.first_name}</span>
                            <button onClick={() => handleSelectUser(u)} className="text-[#5d55e7]/70 hover:text-[#5d55e7] flex items-center">
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="px-2 py-2 max-h-[320px] overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="p-4 text-center text-slate-400">Loading users...</div>
                    ) : (
                        filteredUsers.map(user => {
                            const isSelected = selectedUsers.some(u => u.id === user.id);
                            return (
                                <div
                                    key={user.id}
                                    onClick={() => handleSelectUser(user)}
                                    className={`px-4 py-3 flex items-center justify-between hover:bg-[#f1f0f4] dark:hover:bg-[#2a2a3a] rounded-lg cursor-pointer group mx-2 ${isSelected ? 'bg-[#f1f0f4] dark:bg-[#2a2a3a]' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="size-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url("${user.avatar_url || `https://ui-avatars.com/api/?name=${user.first_name}&background=random`}")` }}></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#121117] dark:text-white">{user.first_name} {user.last_name}</p>
                                            <p className="text-xs text-[#656487]">{user.job_title || 'Employee'}</p>
                                        </div>
                                    </div>
                                    <div className={`size-5 rounded border flex items-center justify-center ${isSelected ? 'border-[#5d55e7] bg-[#5d55e7]' : 'border-[#e2e8f0] dark:border-gray-600'}`}>
                                        {isSelected && <span className="material-symbols-outlined text-white text-sm font-bold">check</span>}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="px-6 py-4 border-t border-[#f1f0f4] dark:border-[#2a2a3a] flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
                    {mode === 'group' ? (
                        <div className="flex-1 mr-4">
                            <input
                                className="w-full bg-white dark:bg-[#1a1a2e] border border-[#f1f0f4] dark:border-[#2a2a3a] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                placeholder="Channel Name..."
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value)}
                            />
                        </div>
                    ) : (
                        <p className="text-xs text-[#656487]">Select a user to chat</p>
                    )}
                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-lg text-sm font-bold text-[#656487] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={onClose}>Cancel</button>
                        <button
                            onClick={handleStartChat}
                            disabled={selectedUsers.length === 0 || (mode === 'group' && !channelName.trim())}
                            className="px-6 py-2 rounded-lg bg-[#5d55e7] disabled:opacity-50 text-white text-sm font-bold hover:bg-[#5d55e7]/90 transition-all shadow-md shadow-[#5d55e7]/20"
                        >
                            {mode === 'group' ? 'Create Channel' : 'Start Chat'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewChatModal;
