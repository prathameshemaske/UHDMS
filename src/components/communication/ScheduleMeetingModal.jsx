import React from 'react';

const ScheduleMeetingModal = ({ isOpen, onClose }) => {
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
                            className="w-full px-3 py-2 text-sm border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] dark:text-white rounded-lg focus:ring-1 focus:ring-[#5d55e7] focus:border-[#5d55e7] placeholder:text-gray-400 outline-none transition-all"
                            placeholder="e.g., Sprint Planning - Phase 2"
                            type="text"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#121117] dark:text-gray-200">Participants</label>
                        <div className="flex flex-wrap items-center gap-2 p-2 min-h-10 border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] rounded-lg">
                            <div className="flex items-center gap-1.5 bg-[#5d55e7]/10 text-[#5d55e7] border border-[#5d55e7]/20 px-2 py-1 rounded-md">
                                <div className="size-5 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDczfXd8_jpmsiDQgD-cOiUEHbZ-D_2FtIeot5wHLv0RrX8GieBQaFdO0yruN3vR3cZ0AYBUXxNCACOsBB9tlD15g37u8X5zc-oyDs6q99Ssjvd20VAatjrPQ_MVqXspVA7yCP6zZujO2BrF8Xx6Ivg8D8SI1sDh34zF9KI5SO2rzZrsIlzMBuJOmKGm9LMpzhPJxWU6fZ2J4Oj0-qerpkP019SleG5Aagj4CSnC7SqFd7PJ5VAshJEP1JpIBjAsuJeokhEkGp37sdG")' }}></div>
                                <span className="text-xs font-medium">Alice Smith</span>
                                <button className="material-symbols-outlined text-xs">close</button>
                            </div>
                            <input
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-0 min-w-24 placeholder:text-gray-400 text-[#121117] dark:text-white"
                                placeholder="Add participants..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[#121117] dark:text-gray-200">Date</label>
                            <div className="relative">
                                <input
                                    className="w-full pl-3 pr-10 py-2 text-sm border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] dark:text-white rounded-lg focus:ring-1 focus:ring-[#5d55e7] focus:border-[#5d55e7] outline-none transition-all appearance-none"
                                    type="date"
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                />
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">calendar_today</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[#121117] dark:text-gray-200">Time</label>
                            <div className="relative">
                                <input
                                    className="w-full pl-3 pr-10 py-2 text-sm border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] dark:text-white rounded-lg focus:ring-1 focus:ring-[#5d55e7] focus:border-[#5d55e7] outline-none transition-all appearance-none"
                                    type="time"
                                    defaultValue="10:00"
                                />
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">schedule</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#121117] dark:text-gray-200">Meeting Description</label>
                        <textarea
                            className="w-full px-3 py-2 text-sm border border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a] dark:text-white rounded-lg focus:ring-1 focus:ring-[#5d55e7] focus:border-[#5d55e7] placeholder:text-gray-400 outline-none transition-all resize-none"
                            placeholder="Briefly describe the purpose of this call..."
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            defaultChecked
                            id="addToCalendar"
                            type="checkbox"
                            className="w-4 h-4 rounded text-[#5d55e7] focus:ring-[#5d55e7] border-[#f1f0f4] dark:border-[#2a2a3a] dark:bg-[#2a2a3a]"
                        />
                        <label className="text-sm text-[#656487] dark:text-gray-400 cursor-pointer" htmlFor="addToCalendar">Add this event to team calendar</label>
                    </div>
                </div>
                <div className="px-6 py-4 bg-[#f8fafc] dark:bg-[#1a1a2e] border-t border-[#f1f0f4] dark:border-[#2a2a3a] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg text-sm font-bold text-[#656487] hover:bg-gray-100 dark:hover:bg-[#2a2a3a] transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-5 py-2 rounded-lg text-sm font-bold bg-[#5d55e7] text-white hover:bg-[#5d55e7]/90 transition-all shadow-sm">Schedule</button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleMeetingModal;
