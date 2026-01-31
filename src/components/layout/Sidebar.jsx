import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

const Sidebar = ({ isOpen, onClose }) => {
    // Desktop collapse state
    const [collapsed, setCollapsed] = useState(false);

    // Submenus
    const [testMenuOpen, setTestMenuOpen] = useState(true);
    const [payrollMenuOpen, setPayrollMenuOpen] = useState(false);
    const [projectMenuOpen, setProjectMenuOpen] = useState(false);

    // Role State
    const [userRole, setUserRole] = useState(null);
    const location = useLocation();

    // Close mobile sidebar on navigation
    useEffect(() => {
        if (window.innerWidth < 768) {
            onClose?.();
        }
    }, [location.pathname]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                // Ensure we get the latest profile data from DB
                const user = await authService.getCurrentUser();
                console.log("Sidebar: Current User:", user);

                if (user) {
                    // Normalize role: lowercase and trim
                    const rawRole = user.role || 'employee';
                    const role = String(rawRole).toLowerCase().trim();
                    console.log("Sidebar: Resolved Role (normalized):", role);
                    setUserRole(role);
                } else {
                    console.warn("Sidebar: No user found.");
                    setUserRole('employee');
                }
            } catch (error) {
                console.error("Error fetching role for Sidebar:", error);
                setUserRole('employee');
            }
        };
        fetchRole();

        // Listen for storage events (if we used localStorage) or custom events
        const handleRoleUpdate = () => fetchRole();
        window.addEventListener('role-updated', handleRoleUpdate);
        return () => window.removeEventListener('role-updated', handleRoleUpdate);
    }, [location.pathname]);

    const isHR = userRole === 'hr' || userRole === 'admin';
    const isAdmin = userRole === 'admin';

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive
            ? 'bg-[#5048e5] text-white shadow-md shadow-[#5048e5]/20'
            : 'text-[#545095] dark:text-gray-300 hover:bg-[#5048e5]/10 hover:text-[#5048e5]'
        }`;

    const iconClass = (isActive) =>
        `material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'group-hover:text-[#5048e5]'}`;

    // Conditional classes
    // Mobile: fixed inset-0 z-50 transform transition
    // Desktop: relative flex col h-full border-r

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar Content */}
            <aside className={`
                fixed md:relative z-50 h-full bg-white dark:bg-[#1a192d] border-r border-[#e8e8f3] dark:border-[#2d2c44] flex flex-col transition-all duration-300
                ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full md:translate-x-0 md:shadow-none'}
                ${collapsed ? 'md:w-20' : 'md:w-64'}
                w-64
            `}>
                <div className={`p-6 flex items-center gap-3 ${collapsed ? 'md:justify-center' : ''}`}>
                    <div className="h-10 w-10 bg-[#5048e5] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#5048e5]/20 flex-shrink-0">
                        <span className="material-symbols-outlined text-2xl">layers</span>
                    </div>
                    {/* Show title if (Not Collapsed) OR (Mobile) */}
                    {(!collapsed || window.innerWidth < 768) && (
                        <div className={`flex flex-col overflow-hidden ${collapsed ? 'md:hidden' : ''}`}>
                            <h1 className="text-[#0f0e1b] dark:text-white text-lg font-bold leading-none tracking-tight">UHDMS</h1>
                            <span className="text-[#545095] dark:text-gray-400 text-[10px] font-semibold uppercase tracking-widest mt-1">HR & Dev</span>
                        </div>
                    )}
                    {/* Mobile Close Button */}
                    <button onClick={onClose} className="md:hidden ml-auto text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden custom-scrollbar">

                    {(!collapsed || window.innerWidth < 768) && <div className={`text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-4 ${collapsed ? 'md:hidden' : ''}`}>General</div>}
                    <NavLink to="/dashboard" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>dashboard</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Dashboard</span>}
                            </>
                        )}
                    </NavLink>
                    {/* <NavLink to="/announcements" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>campaign</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Announcements</span>}
                            </>
                        )}
                    </NavLink> */}
                    <NavLink to="/communication" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>chat</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Communication</span>}
                            </>
                        )}
                    </NavLink>
                    <NavLink to="/calendar" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>calendar_month</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Calendar</span>}
                            </>
                        )}
                    </NavLink>

                    {/* HR Management - Only for HR/Admin */
                    /* isHR && (
                        <>
                            {(!collapsed || window.innerWidth < 768) && <div className={`text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6 ${collapsed ? 'md:hidden' : ''}`}>HR Management</div>}
                            <NavLink to="/employees" className={navLinkClass}>
                                {({ isActive }) => (
                                    <>
                                        <span className={iconClass(isActive)}>group</span>
                                        {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Employees</span>}
                                    </>
                                )}
                            </NavLink>
                            <NavLink to="/onboarding" className={navLinkClass}>
                                {({ isActive }) => (
                                    <>
                                        <span className={iconClass(isActive)}>person_add</span>
                                        {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Onboarding</span>}
                                    </>
                                )}
                            </NavLink>
                            <NavLink to="/offboarding" className={navLinkClass}>
                                {({ isActive }) => (
                                    <>
                                        <span className={iconClass(isActive)}>person_remove</span>
                                        {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Offboarding</span>}
                                    </>
                                )}
                            </NavLink>
                        </>
                    ) */}





                    {/* Projects Group */}
                    <div className="flex flex-col gap-1 mt-4">
                        <button
                            onClick={() => setProjectMenuOpen(!projectMenuOpen)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group w-full text-left text-[#545095] dark:text-gray-300 hover:bg-[#5048e5]/10 hover:text-[#5048e5]`}
                        >
                            <span className="material-symbols-outlined text-[20px]">folder_open</span>
                            {(!collapsed || window.innerWidth < 768) && (
                                <>
                                    <span className={`text-sm font-medium flex-1 ${collapsed ? 'md:hidden' : ''}`}>Projects</span>
                                    <span className={`material-symbols-outlined text-[16px] transition-transform ${projectMenuOpen ? 'rotate-180' : ''} ${collapsed ? 'md:hidden' : ''}`}>expand_more</span>
                                </>
                            )}
                        </button>

                        {/* Submenu */}
                        {((!collapsed || window.innerWidth < 768) && projectMenuOpen) && (
                            <div className="flex flex-col gap-1 pl-4 border-l-2 border-[#e8e8f3] dark:border-[#2d2c44] ml-5 mb-2">
                                <NavLink to="/projects" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                                    <span>All Projects</span>
                                </NavLink>
                                <NavLink to="/tasks" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">check_box</span>
                                    <span>Tasks</span>
                                </NavLink>
                                <NavLink to="/bugs" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">pest_control</span>
                                    <span>Bug Tracker</span>
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Test Suites Group */}
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => setTestMenuOpen(!testMenuOpen)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group w-full text-left text-[#545095] dark:text-gray-300 hover:bg-[#5048e5]/10 hover:text-[#5048e5]`}
                        >
                            <span className="material-symbols-outlined text-[20px]">biotech</span>
                            {(!collapsed || window.innerWidth < 768) && (
                                <>
                                    <span className={`text-sm font-medium flex-1 ${collapsed ? 'md:hidden' : ''}`}>Test Management</span>
                                    <span className={`material-symbols-outlined text-[16px] transition-transform ${testMenuOpen ? 'rotate-180' : ''} ${collapsed ? 'md:hidden' : ''}`}>expand_more</span>
                                </>
                            )}
                        </button>

                        {/* Submenu */}
                        {((!collapsed || window.innerWidth < 768) && testMenuOpen) && (
                            <div className="flex flex-col gap-1 pl-4 border-l-2 border-[#e8e8f3] dark:border-[#2d2c44] ml-5 mb-2">
                                <NavLink to="/test-suites" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                                    <span>Test Library</span>
                                </NavLink>
                                <NavLink to="/test-plans" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">playlist_play</span>
                                    <span>Test Plans & Runs</span>
                                </NavLink>
                                <NavLink to="/reports?tab=qa" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">analytics</span>
                                    <span>Test Reports</span>
                                </NavLink>
                            </div>
                        )}
                    </div>


                    {(!collapsed || window.innerWidth < 768) && <div className={`text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6 ${collapsed ? 'md:hidden' : ''}`}>Employee Zone</div>}
                    <NavLink to="/employee-dashboard" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>account_circle</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Self Service</span>}
                            </>
                        )}
                    </NavLink>
                    <NavLink to="/settings" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>settings</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Settings</span>}
                            </>
                        )}
                    </NavLink>
                </nav>

                {/* Collapse Button - only visible on Desktop */}
                <div className="hidden md:block p-4 border-t border-[#e8e8f3] dark:border-[#2d2c44]">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#f6f6f8] dark:bg-[#2d2c44] text-[#545095] dark:text-gray-300 rounded-lg hover:bg-[#e8e8f3] dark:hover:bg-[#3d3c5a] transition-colors text-sm font-semibold"
                    >
                        <span className="material-symbols-outlined text-lg">{collapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}</span>
                        {!collapsed && <span>Collapse Sidebar</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
