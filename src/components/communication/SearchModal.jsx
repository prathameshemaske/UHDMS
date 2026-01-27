import React, { useState, useEffect } from 'react';
import { chatService } from '../../services/chatService';

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setUserResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (query.length >= 2) {
                setLoading(true);
                try {
                    const users = await chatService.searchUsers(query);
                    setUserResults(users);
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setUserResults([]);
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
            <div className="absolute inset-0 bg-slate-900/40 overlay-blur" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a1a2e] rounded-xl shadow-2xl flex flex-col max-h-[75vh] border border-[#f1f0f4] dark:border-[#2a2a3a] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-[#f1f0f4] dark:border-[#2a2a3a] flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#5d55e7] text-2xl">search</span>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none focus:ring-0 text-lg font-medium placeholder:text-[#656487] p-0 text-[#121117] dark:text-white"
                        placeholder="Search for people..."
                        type="text"
                        autoFocus
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#656487] px-1.5 py-0.5 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 cursor-pointer" onClick={onClose}>ESC</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-8">
                    {loading && (
                        <div className="text-center text-[#656487] py-4">Searching...</div>
                    )}

                    {!loading && userResults.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold text-[#656487] uppercase tracking-widest px-2 mb-4">Users</h3>
                            <div className="space-y-1">
                                {userResults.map(user => (
                                    <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#5d55e7]/5 cursor-pointer group transition-colors border border-transparent hover:border-[#5d55e7]/10">
                                        <div className="relative">
                                            <div className="size-12 rounded-xl bg-center bg-cover" style={{ backgroundImage: `url("${user.avatar_url || `https://ui-avatars.com/api/?name=${user.first_name}`}")` }}></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-[#121117] dark:text-white">{user.first_name} {user.last_name}</span>
                                                <span className="text-[10px] bg-[#5d55e7]/10 text-[#5d55e7] px-1.5 py-0.5 rounded font-bold uppercase">{user.role || 'Member'}</span>
                                            </div>
                                            <span className="text-sm text-[#656487]">{user.job_title || 'Employee'} • {user.department || 'General'}</span>
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-[#5d55e7]">arrow_forward_ios</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {!loading && query.length >= 2 && userResults.length === 0 && (
                        <div className="text-center py-8">
                            <span className="material-symbols-outlined text-4xl text-gray-300">search_off</span>
                            <p className="text-[#656487] mt-2">No results found for "{query}"</p>
                        </div>
                    )}
                </div>
                <div className="bg-gray-50 dark:bg-[#1a1a2e] p-3 px-6 border-t border-[#f1f0f4] dark:border-[#2a2a3a] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#656487]">
                            <span className="material-symbols-outlined text-sm">keyboard_return</span>
                            <span>to select</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
