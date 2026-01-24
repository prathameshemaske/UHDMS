import React from 'react';

const SearchModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
            <div className="absolute inset-0 bg-slate-900/40 overlay-blur" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a1a2e] rounded-xl shadow-2xl flex flex-col max-h-[75vh] border border-[#f1f0f4] dark:border-[#2a2a3a] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-[#f1f0f4] dark:border-[#2a2a3a] flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#5d55e7] text-2xl">search</span>
                    <input className="flex-1 bg-transparent border-none focus:ring-0 text-lg font-medium placeholder:text-[#656487] p-0 text-[#121117] dark:text-white" placeholder="Search for users or messages..." type="text" autoFocus />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#656487] px-1.5 py-0.5 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 cursor-pointer" onClick={onClose}>ESC</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-8">
                    <section>
                        <h3 className="text-[11px] font-bold text-[#656487] uppercase tracking-widest px-2 mb-4">Users</h3>
                        <div className="space-y-1">
                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#5d55e7]/5 cursor-pointer group transition-colors border border-transparent hover:border-[#5d55e7]/10">
                                <div className="relative">
                                    <div className="size-12 rounded-xl bg-center bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDczfXd8_jpmsiDQgD-cOiUEHbZ-D_2FtIeot5wHLv0RrX8GieBQaFdO0yruN3vR3cZ0AYBUXxNCACOsBB9tlD15g37u8X5zc-oyDs6q99Ssjvd20VAatjrPQ_MVqXspVA7yCP6zZujO2BrF8Xx6Ivg8D8SI1sDh34zF9KI5SO2rzZrsIlzMBuJOmKGm9LMpzhPJxWU6fZ2J4Oj0-qerpkP019SleG5Aagj4CSnC7SqFd7PJ5VAshJEP1JpIBjAsuJeokhEkGp37sdG")' }}></div>
                                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#1a1a2e] rounded-full"></div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[#121117] dark:text-white">Alice Smith</span>
                                        <span className="text-[10px] bg-[#5d55e7]/10 text-[#5d55e7] px-1.5 py-0.5 rounded font-bold uppercase">Staff</span>
                                    </div>
                                    <span className="text-sm text-[#656487]">Senior Project Manager • HR Department</span>
                                </div>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-[#5d55e7]">arrow_forward_ios</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="flex items-center justify-between px-2 mb-4">
                            <h3 className="text-[11px] font-bold text-[#656487] uppercase tracking-widest">Messages</h3>
                            <span className="text-[10px] font-bold text-[#5d55e7] hover:underline cursor-pointer">12 results</span>
                        </div>
                        <div className="space-y-3">
                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#121121] border border-[#f1f0f4] dark:border-[#2a2a3a] hover:border-[#5d55e7]/30 cursor-pointer transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded bg-center bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtiOxG1ceovyBZ0IXQ0QDbZPMuUyawYoTud81Z16laYJvJFkUGNcH5_5TkGUlHZzA56141lM9CZYUl0usqX4sx9w4FQBgaVI1mEjpneAFcQrm0Gl0ILdPi-r8cNAnpFEaSaJFRhxxK6KNQXp-M7ooWWeY7r0iglej4WQIgHQVUA6yvCJXdOawpEspAR4bUsBPS_kzmMBhA5lK7akN7EJezz-HVDfxcwzLLv2cenqs7JCIvkJ7BhTI4cIggsTbpX-b1ck1ck2I4zxJ4")' }}></div>
                                        <span className="text-xs font-bold">Alice Smith</span>
                                        <span className="text-[10px] text-[#656487]">#dev-sprint-1</span>
                                    </div>
                                    <span className="text-[10px] text-[#656487]">Oct 12, 10:24 AM</span>
                                </div>
                                <p className="text-sm text-[#121117] dark:text-gray-300 leading-relaxed">
                                    "Has everyone reviewed the new sprint goals for the UHDMS platform? I've updated the roadmap..."
                                </p>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="text-[10px] font-medium text-[#5d55e7]">View in conversation</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#121121] border border-[#f1f0f4] dark:border-[#2a2a3a] hover:border-[#5d55e7]/30 cursor-pointer transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded bg-center bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVqL6JG4kgHlK1sj-bqlWPtW5ziXGTPu25nz49p2l217f38hkzDMS4kzGKGMGJSqZekXRdDqfSh6TRfurDYaCL8DzI_61nBQqWzoIk96Qlc9BPlgEuMIDQPcfLh737VcATkTBw6hi_iB4v2wMx8A_Nv42pVZ7I7RBYxyNEmbkUiPNZ2xcq3zGi3Q9WHVB2LqoOZV6MkGrrE3NjG4RY5yRVnQUDGT_Y8N2Qnm6bZ9IwGlNlQcSDAEt0p_XZkWJOne6Xh9_y_FmdaQ4R")' }}></div>
                                        <span className="text-xs font-bold">Charlie Davis</span>
                                        <span className="text-[10px] text-[#656487]">#qa-team</span>
                                    </div>
                                    <span className="text-[10px] text-[#656487]">Yesterday, 4:15 PM</span>
                                </div>
                                <p className="text-sm text-[#121117] dark:text-gray-300 leading-relaxed">
                                    "I'll double check with <span className="bg-[#5d55e7]/10 text-[#5d55e7] px-1 rounded">@Alice</span> about the API documentation before the release."
                                </p>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="text-[10px] font-medium text-[#5d55e7]">View in conversation</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="bg-gray-50 dark:bg-[#1a1a2e] p-3 px-6 border-t border-[#f1f0f4] dark:border-[#2a2a3a] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#656487]">
                            <span className="material-symbols-outlined text-sm">keyboard_return</span>
                            <span>to select</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#656487]">
                            <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
                            <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                            <span>to navigate</span>
                        </div>
                    </div>
                    <div className="text-[10px] font-bold text-[#656487]">
                        UHDMS SEARCH v1.0
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
