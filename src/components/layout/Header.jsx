import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const Header = ({ onMenuClick }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching header user:", error);
            }
        };
        fetchUser();
    }, []);

    const displayName = user ? `${user.first_name || ''} ${user.last_name || ''} `.trim() || user.email : 'Loading...';
    const role = user?.job_title || 'Team Member';
    const avatarUrl = user?.avatar_url;
    const initials = user?.first_name ? user.first_name[0] + (user.last_name ? user.last_name[0] : '') : 'U';

    return (
        <header className="h-16 w-full bg-white dark:bg-[#1a192d] border-b border-[#e8e8f3] dark:border-[#2d2c44] flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
            <div className="flex items-center gap-4 flex-1 max-w-2xl min-w-0">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 -ml-2 text-[#545095] dark:text-gray-300 hover:bg-[#f6f6f8] dark:hover:bg-[#2d2c44] rounded-lg shrink-0"
                >
                    <span className="material-symbols-outlined text-2xl">menu</span>
                </button>

                <div className="relative group overflow-hidden bg-[#f6f6f8] dark:bg-[#2d2c44] rounded-lg w-full max-w-md hidden sm:block">
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
            <div className="flex items-center gap-2 md:gap-6 ml-4 shrink-0">
                <button className="relative p-2 text-[#545095] dark:text-gray-300 hover:bg-[#f6f6f8] dark:hover:bg-[#2d2c44] rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-2xl">notifications</span>
                    <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a192d]"></span>
                </button>
                <div className="h-8 w-px bg-[#e8e8f3] dark:bg-[#2d2c44] hidden md:block"></div>

                <Link to="/profile" className="flex items-center gap-3 pl-2 hover:bg-gray-50 dark:hover:bg-white/5 p-1 rounded-lg transition-colors">
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-bold text-[#0f0e1b] dark:text-white leading-none">{displayName}</p>
                        <p className="text-[11px] font-medium text-[#545095] dark:text-gray-400 mt-1 uppercase tracking-tighter">{role}</p>
                    </div>
                    {/* Avatar */}
                    {avatarUrl ? (
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-cover bg-center border-2 border-[#5048e5]/20 shadow-sm" style={{ backgroundImage: `url("${avatarUrl}")` }}></div>
                    ) : (
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#5048e5] flex items-center justify-center text-white font-bold border-2 border-[#5048e5]/20 shadow-sm text-sm">
                            {initials}
                        </div>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;
