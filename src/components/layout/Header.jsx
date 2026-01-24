import React from 'react';

const Header = () => {
    return (
        <header className="h-16 bg-white dark:bg-[#1a192d] border-b border-[#e8e8f3] dark:border-[#2d2c44] flex items-center justify-between px-8 z-10 shrink-0">
            <div className="flex-1 max-w-2xl px-4">
                <div className="relative group overflow-hidden bg-[#f6f6f8] dark:bg-[#2d2c44] rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[#545095] text-xl group-focus-within:text-[#5048e5]">search</span>
                    </div>
                    <input
                        className="block w-full bg-transparent border-none focus:ring-2 focus:ring-[#5048e5]/20 rounded-lg pl-12 pr-4 py-2.5 text-sm placeholder-[#545095] dark:placeholder-gray-500 transition-all outline-none truncate"
                        placeholder="Search for tasks, bugs, or people... (Cmd + K)"
                        type="text"
                    />
                </div>
            </div>
            <div className="flex items-center gap-6 ml-4 shrink-0">
                <button className="relative p-2 text-[#545095] dark:text-gray-300 hover:bg-[#f6f6f8] dark:hover:bg-[#2d2c44] rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-2xl">notifications</span>
                    <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a192d]"></span>
                </button>
                <div className="h-8 w-px bg-[#e8e8f3] dark:bg-[#2d2c44]"></div>
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-[#0f0e1b] dark:text-white leading-none">Jane Doe</p>
                        <p className="text-[11px] font-medium text-[#545095] dark:text-gray-400 mt-1 uppercase tracking-tighter">Product Lead</p>
                    </div>
                    {/* Placeholder Avatar */}
                    <div className="h-10 w-10 rounded-full bg-[#5048e5] flex items-center justify-center text-white font-bold border-2 border-[#5048e5]/20 shadow-sm">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
