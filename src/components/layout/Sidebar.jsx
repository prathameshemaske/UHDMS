import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

const Sidebar = ({ isOpen, onClose }) => {
    // Desktop collapse state
    const [collapsed, setCollapsed] = useState(false);

    // Submenus
    const [testMenuOpen, setTestMenuOpen] = useState(true);
    const [payrollMenuOpen, setPayrollMenuOpen] = useState(false);

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
                    <NavLink to="/announcements" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>campaign</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Announcements</span>}
                            </>
                        )}
                    </NavLink>
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

                    {/* HR Management - Only for HR/Admin */}
                    {isHR && (
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
                        </>
                    )}

                    {/* Payroll Group */}
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => {
                                if (collapsed && window.innerWidth >= 768) {
                                    setCollapsed(false);
                                    setPayrollMenuOpen(true);
                                } else {
                                    setPayrollMenuOpen(!payrollMenuOpen);
                                }
                            }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group w-full text-left text-[#545095] dark:text-gray-300 hover:bg-[#5048e5]/10 hover:text-[#5048e5]`}
                        >
                            <span className="material-symbols-outlined text-[20px]">payments</span>
                            {(!collapsed || window.innerWidth < 768) && (
                                <>
                                    <span className={`text-sm font-medium flex-1 ${collapsed ? 'md:hidden' : ''}`}>Financials</span>
                                    <span className={`material-symbols-outlined text-[16px] transition-transform ${payrollMenuOpen ? 'rotate-180' : ''} ${collapsed ? 'md:hidden' : ''}`}>expand_more</span>
                                </>
                            )}
                        </button>

                        {/* Submenu */}
                        {((!collapsed || window.innerWidth < 768) && payrollMenuOpen) && (
                            <div className="flex flex-col gap-1 pl-4 border-l-2 border-[#e8e8f3] dark:border-[#2d2c44] ml-5 mb-2">
                                <NavLink to="/payslip-view" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">receipt</span>
                                    <span>My Payslips</span>
                                </NavLink>
                                <NavLink to="/bonus-reimbursement" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">wallet</span>
                                    <span>Reimburse</span>
                                </NavLink>
                                <NavLink to="/tax-declaration" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">description</span>
                                    <span>Tax Declaration</span>
                                </NavLink>

                                {isHR && (
                                    <>
                                        <div className="h-px bg-gray-200 dark:bg-gray-700 my-1 mx-2"></div>
                                        <NavLink to="/payroll-overview" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                            <span className="material-symbols-outlined text-[18px]">dashboard</span>
                                            <span>Overview</span>
                                        </NavLink>
                                        <NavLink to="/payroll-approval" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                            <span className="material-symbols-outlined text-[18px]">rule</span>
                                            <span>Approvals</span>
                                        </NavLink>
                                        <NavLink to="/payout-status" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                            <span className="material-symbols-outlined text-[18px]">account_balance</span>
                                            <span>Payouts</span>
                                        </NavLink>
                                        <NavLink to="/payroll-analytics" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                            <span className="material-symbols-outlined text-[18px]">analytics</span>
                                            <span>Analytics</span>
                                        </NavLink>
                                        <NavLink to="/compliance" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                            <span className="material-symbols-outlined text-[18px]">gavel</span>
                                            <span>Compliance</span>
                                        </NavLink>
                                        <NavLink to="/payroll-settings" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                            <span className="material-symbols-outlined text-[18px]">settings</span>
                                            <span>Settings</span>
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {(!collapsed || window.innerWidth < 768) && <div className={`text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6 ${collapsed ? 'md:hidden' : ''}`}>Development</div>}
                    <NavLink to="/tasks" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>check_box</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Tasks</span>}
                            </>
                        )}
                    </NavLink>
                    <NavLink to="/bugs" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>pest_control</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Bug Tracker</span>}
                            </>
                        )}
                    </NavLink>
                    <NavLink to="/projects" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>grid_view</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Projects</span>}
                            </>
                        )}
                    </NavLink>

                    {/* Test Suites Group */}
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => setTestMenuOpen(!testMenuOpen)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group w-full text-left text-[#545095] dark:text-gray-300 hover:bg-[#5048e5]/10 hover:text-[#5048e5]`}
                        >
                            <span className="material-symbols-outlined text-[20px]">biotech</span>
                            {(!collapsed || window.innerWidth < 768) && (
                                <>
                                    <span className={`text-sm font-medium flex-1 ${collapsed ? 'md:hidden' : ''}`}>Test Suites</span>
                                    <span className={`material-symbols-outlined text-[16px] transition-transform ${testMenuOpen ? 'rotate-180' : ''} ${collapsed ? 'md:hidden' : ''}`}>expand_more</span>
                                </>
                            )}
                        </button>

                        {/* Submenu */}
                        {((!collapsed || window.innerWidth < 768) && testMenuOpen) && (
                            <div className="flex flex-col gap-1 pl-4 border-l-2 border-[#e8e8f3] dark:border-[#2d2c44] ml-5 mb-2">
                                <NavLink to="/test-suites" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">list_alt</span>
                                    <span>Test Cases</span>
                                </NavLink>
                                <NavLink to="/repository" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                                    <span>Repository</span>
                                </NavLink>
                                <NavLink to="/executions" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${isActive ? 'text-[#5048e5] font-bold bg-[#5048e5]/5' : 'text-slate-500 hover:text-[#5048e5]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                                    <span>Executions</span>
                                </NavLink>
                            </div>
                        )}
                    </div>
                    <NavLink to="/reports" className={navLinkClass}>
                        {({ isActive }) => (
                            <>
                                <span className={iconClass(isActive)}>analytics</span>
                                {(!collapsed || window.innerWidth < 768) && <span className={`text-sm font-medium ${collapsed ? 'md:hidden' : ''}`}>Reports</span>}
                            </>
                        )}
                    </NavLink>

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
