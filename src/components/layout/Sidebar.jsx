import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { authService } from '../../services/authService';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [testMenuOpen, setTestMenuOpen] = useState(true);
    const [payrollMenuOpen, setPayrollMenuOpen] = useState(false);

    // Role State
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    setUserRole(user.role || 'employee');
                }
            } catch (error) {
                console.error("Error fetching role:", error);
            }
        };
        fetchRole();
    }, []);

    const isHR = userRole === 'hr' || userRole === 'admin';
    const isAdmin = userRole === 'admin';

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive
            ? 'bg-[#5048e5] text-white shadow-md shadow-[#5048e5]/20'
            : 'text-[#545095] dark:text-gray-300 hover:bg-[#5048e5]/10 hover:text-[#5048e5]'
        }`;

    const iconClass = (isActive) =>
        `material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'group-hover:text-[#5048e5]'}`;

    return (
        <aside className={`${collapsed ? 'w-20' : 'w-64'} flex flex-col bg-white dark:bg-[#1a192d] border-r border-[#e8e8f3] dark:border-[#2d2c44] transition-all duration-300`}>
            <div className={`p-6 flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
                <div className="h-10 w-10 bg-[#5048e5] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#5048e5]/20 flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">layers</span>
                </div>
                {!collapsed && (
                    <div className="flex flex-col overflow-hidden">
                        <h1 className="text-[#0f0e1b] dark:text-white text-lg font-bold leading-none tracking-tight">UHDMS</h1>
                        <span className="text-[#545095] dark:text-gray-400 text-[10px] font-semibold uppercase tracking-widest mt-1">HR & Dev</span>
                    </div>
                )}
            </div>

            <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">

                {!collapsed && <div className="text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-4">General</div>}
                <NavLink to="/dashboard" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            <span className={iconClass(isActive)}>dashboard</span>
                            {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
                        </>
                    )}
                </NavLink>
                <NavLink to="/announcements" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            <span className={iconClass(isActive)}>campaign</span>
                            {!collapsed && <span className="text-sm font-medium">Announcements</span>}
                        </>
                    )}
                </NavLink>
                <NavLink to="/communication" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            <span className={iconClass(isActive)}>chat</span>
                            {!collapsed && <span className="text-sm font-medium">Communication</span>}
                        </>
                    )}
                </NavLink>

                {/* HR Management - Only for HR/Admin */}
                {isHR && (
                    <>
                        {!collapsed && <div className="text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6">HR Management</div>}
                        <NavLink to="/employees" className={navLinkClass}>
                            {({ isActive }) => (
                                <>
                                    <span className={iconClass(isActive)}>group</span>
                                    {!collapsed && <span className="text-sm font-medium">Employees</span>}
                                </>
                            )}
                        </NavLink>
                    </>
                )}

                {/* Payroll Group */}
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => {
                            if (collapsed) {
                                setCollapsed(false);
                                setPayrollMenuOpen(true);
                            } else {
                                setPayrollMenuOpen(!payrollMenuOpen);
                            }
                        }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group w-full text-left text-[#545095] dark:text-gray-300 hover:bg-[#5048e5]/10 hover:text-[#5048e5]`}
                    >
                        <span className="material-symbols-outlined text-[20px]">payments</span>
                        {!collapsed && (
                            <>
                                <span className="text-sm font-medium flex-1">Financials</span>
                                <span className={`material-symbols-outlined text-[16px] transition-transform ${payrollMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                            </>
                        )}
                    </button>

                    {/* Submenu */}
                    {(!collapsed && payrollMenuOpen) && (
                        <div className="flex flex-col gap-1 pl-4 border-l-2 border-[#e8e8f3] dark:border-[#2d2c44] ml-5 mb-2">
                            {/* Everyone sees these */}
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

                            {/* HR Only Items */}
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

                {!collapsed && <div className="text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6">Development</div>}
                <NavLink to="/tasks" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            <span className={iconClass(isActive)}>check_box</span>
                            {!collapsed && <span className="text-sm font-medium">Tasks</span>}
                        </>
                    )}
                </NavLink>
                <NavLink to="/bugs" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            <span className={iconClass(isActive)} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>pest_control</span>
                            {!collapsed && <span className="text-sm font-medium">Bug Tracker</span>}
                        </>
                    )}
                </NavLink>
                <NavLink to="/projects" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            <span className={iconClass(isActive)}>grid_view</span>
                            {!collapsed && <span className="text-sm font-medium">Projects</span>}
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
                        {!collapsed && (
                            <>
                                <span className="text-sm font-medium flex-1">Test Suites</span>
                                <span className={`material-symbols-outlined text-[16px] transition-transform ${testMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                            </>
                        )}
                    </button>

                    {/* Submenu */}
                    {(!collapsed && testMenuOpen) && (
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
                            {!collapsed && <span className="text-sm font-medium">Reports</span>}
                        </>
                    )}
                </NavLink>

                {!collapsed && <div className="text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6">Employee Zone</div>}
                <NavLink to="/employee-dashboard" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            <span className={iconClass(isActive)}>account_circle</span>
                            {!collapsed && <span className="text-sm font-medium">Self Service</span>}
                        </>
                    )}
                </NavLink>
                <NavLink to="/settings" className={navLinkClass}>
                    {({ isActive }) => (
                        <>
                            <span className={iconClass(isActive)}>settings</span>
                            {!collapsed && <span className="text-sm font-medium">Settings</span>}
                        </>
                    )}
                </NavLink>
            </nav>

            <div className="p-4 border-t border-[#e8e8f3] dark:border-[#2d2c44]">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#f6f6f8] dark:bg-[#2d2c44] text-[#545095] dark:text-gray-300 rounded-lg hover:bg-[#e8e8f3] dark:hover:bg-[#3d3c5a] transition-colors text-sm font-semibold"
                >
                    <span className="material-symbols-outlined text-lg">{collapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}</span>
                    {!collapsed && <span>Collapse Sidebar</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
