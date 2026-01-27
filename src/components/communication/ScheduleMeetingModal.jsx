import React, { useState, useEffect } from 'react';
import { chatService } from '../../services/chatService';
import { authService } from '../../services/authService';

const ScheduleMeetingModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState('10:00');
    const [duration, setDuration] = useState(60); // minutes

    // Participant State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Reset state
            setTitle('');
            setDescription('');
            setSearchQuery('');
            setSelectedParticipants([]);
            setLoading(false);
        }
    }, [isOpen]);

    // Search Users
    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                try {
                    const users = await chatService.searchUsers(searchQuery);
                    // Filter out already selected
                    setSearchResults(users.filter(u => !selectedParticipants.find(sp => sp.id === u.id)));
                } catch (error) {
                    console.error(error);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchQuery, selectedParticipants]);

    const handleAddParticipant = (user) => {
        setSelectedParticipants([...selectedParticipants, user]);
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleRemoveParticipant = (userId) => {
        setSelectedParticipants(selectedParticipants.filter(u => u.id !== userId));
    };

    const handleSchedule = async () => {
        if (!title.trim() || !date || !time) return;

        setLoading(true);
        try {
            const startDateTime = new Date(`${date}T${time}`);
            const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

            // Generate Jitsi Link
            const link = `https://meet.jit.si/UHDMS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}#config.language="en"`;

            await chatService.createMeeting({
                title,
                description,
                start_time: startDateTime.toISOString(),
                end_time: endDateTime.toISOString(),
                participant_ids: selectedParticipants.map(u => u.id),
                meeting_link: link
            });

            alert(`Meeting Scheduled! Link: ${link}`);
            onClose();
        } catch (error) {
            console.error("Failed to schedule meeting", error);
            alert("Error scheduling meeting");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-[1px]">
            <div className="bg-white dark:bg-[#1a1a2e] w-full max-w-lg rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-[#f1f0f4] dark:border-[#2a2a3a] flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#121117] dark:text-white">Schedule Meeting</h2>
                    <button
                        onClick={onClose}
                        className="text-[#656487] hover:text-[#121117] dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#121117] dark:text-gray-200">Call Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] dark:text-white rounded-lg focus:ring-1 focus:ring-[#5d55e7] focus:border-[#5d55e7] placeholder:text-gray-400 outline-none transition-all"
                            placeholder="e.g., Sprint Planning - Phase 2"
                            type="text"
                        />
                    </div>
                    <div className="space-y-1.5 relative">
                        <label className="text-sm font-semibold text-[#121117] dark:text-gray-200">Participants</label>
                        <div className="flex flex-wrap items-center gap-2 p-2 min-h-10 border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] rounded-lg">
                            {selectedParticipants.map(user => (
                                <div key={user.id} className="flex items-center gap-1.5 bg-[#5d55e7]/10 text-[#5d55e7] border border-[#5d55e7]/20 px-2 py-1 rounded-md">
                                    <div className="size-5 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${user.avatar_url || `https://ui-avatars.com/api/?name=${user.first_name}`}")` }}></div>
                                    <span className="text-xs font-medium">{user.first_name}</span>
                                    <button onClick={() => handleRemoveParticipant(user.id)} className="material-symbols-outlined text-xs hover:text-red-500">close</button>
                                </div>
                            ))}
                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-0 min-w-24 placeholder:text-gray-400 text-[#121117] dark:text-white"
                                placeholder="Add participants..."
                                type="text"
                            />
                        </div>
                        {/* Search Dropdown */}
                        {searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1a1a2e] border border-[#f1f0f4] dark:border-[#2a2a3a] rounded-lg shadow-xl z-20 max-h-40 overflow-y-auto">
                                {searchResults.map(user => (
                                    <div
                                        key={user.id}
                                        onClick={() => handleAddParticipant(user)}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a3a] cursor-pointer"
                                    >
                                        <div className="size-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${user.avatar_url || `https://ui-avatars.com/api/?name=${user.first_name}`}")` }}></div>
                                        <div>
                                            <p className="text-sm font-bold text-[#121117] dark:text-white">{user.first_name} {user.last_name}</p>
                                            <p className="text-xs text-[#656487]">{user.job_title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[#121117] dark:text-gray-200">Date</label>
                            <div className="relative">
                                <input
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    className="w-full pl-3 pr-10 py-2 text-sm border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] dark:text-white rounded-lg focus:ring-1 focus:ring-[#5d55e7] focus:border-[#5d55e7] outline-none transition-all appearance-none"
                                    type="date"
                                />
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">calendar_today</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[#121117] dark:text-gray-200">Time</label>
                            <div className="relative">
                                <input
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    className="w-full pl-3 pr-10 py-2 text-sm border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] dark:text-white rounded-lg focus:ring-1 focus:ring-[#5d55e7] focus:border-[#5d55e7] outline-none transition-all appearance-none"
                                    type="time"
                                />
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">schedule</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#121117] dark:text-gray-200">Meeting Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] dark:text-white rounded-lg focus:ring-1 focus:ring-[#5d55e7] focus:border-[#5d55e7] placeholder:text-gray-400 outline-none transition-all resize-none"
                            placeholder="Briefly describe the purpose of this call..."
                            rows="3"
                        ></textarea>
                    </div>
                </div>
                <div className="px-6 py-4 bg-[#f8fafc] dark:bg-[#1a1a2e] border-t border-[#f1f0f4] dark:border-[#2a2a3a] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg text-sm font-bold text-[#656487] hover:bg-gray-100 dark:hover:bg-[#2a2a3a] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSchedule}
                        disabled={loading || !title.trim()}
                        className="px-5 py-2 rounded-lg text-sm font-bold bg-[#5d55e7] text-white hover:bg-[#5d55e7]/90 transition-all shadow-sm disabled:opacity-50"
                    >
                        {loading ? 'Scheduling...' : 'Schedule'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleMeetingModal;
