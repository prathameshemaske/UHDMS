import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskService } from '../services/taskService';
import { authService } from '../services/authService';

const Dashboard = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Real Data State
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);

                if (currentUser) {
                    const fetchedTasks = await taskService.getTasks();
                    setTasks(fetchedTasks || []);
                }
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    const activeTaskCount = tasks.filter(t => t.status !== 'completed').length;

    // Additional Real Data State
    const [openBugCount, setOpenBugCount] = useState(0);
    const [teamSize, setTeamSize] = useState(0);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                // Fetch Open Bugs
                const { count: bugCount, error: bugError } = await authService.supabase
                    .from('bugs')
                    .select('*', { count: 'exact', head: true })
                    .neq('status', 'Done');

                if (!bugError) setOpenBugCount(bugCount || 0);

                // Fetch Team Size
                const { count: profileCount, error: profileError } = await authService.supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true });

                if (!profileError) setTeamSize(profileCount || 0);

            } catch (err) {
                console.error("Error fetching dashboard metrics", err);
            }
        };
        fetchMetrics();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-[#0f0e1b] dark:text-white antialiased font-display">
            <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col bg-white dark:bg-[#1a192d] border-r border-[#e8e8f3] dark:border-[#2d2c44] transition-all duration-300`}>
                <div className="p-6 flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
                        <span className="material-symbols-outlined text-2xl">layers</span>
                    </div>
                    {!isSidebarCollapsed && (
                        <div className="flex flex-col">
                            <h1 className="text-[#0f0e1b] dark:text-white text-lg font-bold leading-none tracking-tight">UHDMS</h1>
                            <span className="text-[#545095] dark:text-gray-400 text-[10px] font-semibold uppercase tracking-widest mt-1">HR & Dev</span>
                        </div>
                    )}
                </div>
                <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
                    {!isSidebarCollapsed && <div className="text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-4">General</div>}
                    <Link className="flex items-center gap-3 px-3 py-2 rounded-lg sidebar-active transition-all group" to="/">
                        <span className="material-symbols-outlined text-xl">dashboard</span>
                        {!isSidebarCollapsed && <span className="text-sm font-medium">Dashboard</span>}
                    </Link>
                    {!isSidebarCollapsed && <div className="text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6">HR Management</div>}
                    <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#545095] dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all group" to="/employees">
                        <span className="material-symbols-outlined text-xl group-hover:text-primary">group</span>
                        {!isSidebarCollapsed && <span className="text-sm font-medium">Employees</span>}
                    </Link>
                    {!isSidebarCollapsed && <div className="text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6">Development</div>}
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#545095] dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all group" href="#">
                        <span className="material-symbols-outlined text-xl group-hover:text-primary">check_box</span>
                        {!isSidebarCollapsed && <span className="text-sm font-medium">Tasks</span>}
                    </a>
                    <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#545095] dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all group" to="/bug-tracker">
                        <span className="material-symbols-outlined text-xl group-hover:text-primary">bug_report</span>
                        {!isSidebarCollapsed && <span className="text-sm font-medium">Bug Tracker</span>}
                    </Link>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#545095] dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all group" href="#">
                        <span className="material-symbols-outlined text-xl group-hover:text-primary">biotech</span>
                        {!isSidebarCollapsed && <span className="text-sm font-medium">Test Suites</span>}
                    </a>
                    <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#545095] dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all group" to="/communication">
                        <span className="material-symbols-outlined text-xl group-hover:text-primary">chat</span>
                        {!isSidebarCollapsed && <span className="text-sm font-medium">Communication</span>}
                    </Link>
                    {/* Add Payroll Link for easy access */}
                    {!isSidebarCollapsed && <div className="text-[#545095] dark:text-gray-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6">Financials</div>}
                    <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#545095] dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all group" to="/payroll/payslip">
                        <span className="material-symbols-outlined text-xl group-hover:text-primary">receipt_long</span>
                        {!isSidebarCollapsed && <span className="text-sm font-medium">My Payslips</span>}
                    </Link>
                </nav>
                <div className="p-4 border-t border-[#e8e8f3] dark:border-[#2d2c44]">
                    <button
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-background-light dark:bg-[#2d2c44] text-[#545095] dark:text-gray-300 rounded-lg hover:bg-[#e8e8f3] dark:hover:bg-[#3d3c5a] transition-colors text-sm font-semibold"
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    >
                        <span className="material-symbols-outlined text-lg">{isSidebarCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}</span>
                        {!isSidebarCollapsed && <span>Collapse Sidebar</span>}
                    </button>
                </div>
            </aside>
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-16 bg-white dark:bg-[#1a192d] border-b border-[#e8e8f3] dark:border-[#2d2c44] flex items-center justify-between px-8 z-20">
                    <div className="flex-1 max-w-2xl">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#545095] text-xl group-focus-within:text-primary">search</span>
                            </div>
                            <input className="block w-full bg-[#f6f6f8] dark:bg-[#2d2c44] border-none focus:ring-2 focus:ring-primary/20 rounded-lg pl-11 pr-4 py-2 text-sm placeholder-[#545095] dark:placeholder-gray-500 transition-all" placeholder="Search for tasks, bugs, or people... (Cmd + K)" type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-6 ml-4">
                        <div className="relative">
                            <button
                                className={`relative p-2 rounded-lg transition-colors ring-2 ${showNotifications ? 'text-primary bg-primary/5 ring-primary/10' : 'text-[#545095] dark:text-gray-300 hover:bg-background-light dark:hover:bg-[#2d2c44] ring-transparent active:ring-primary/20'}`}
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <span className="material-symbols-outlined text-2xl">notifications</span>
                                <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a192d]"></span>
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1a192d] rounded-lg border border-[#e8e8f3] dark:border-[#2d2c44] notification-dropdown z-50 overflow-hidden shadow-xl">
                                    <div className="px-4 py-3 border-b border-[#e8e8f3] dark:border-[#2d2c44] flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-[#0f0e1b] dark:text-white">Notifications</h3>
                                        <div className="flex items-center gap-3">
                                            <button className="text-[11px] font-semibold text-primary hover:underline">Mark all as read</button>
                                            <button className="text-[#545095] dark:text-gray-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-lg">settings</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="max-h-[400px] overflow-y-auto">
                                        <div className="px-4 py-3 flex gap-3 hover:bg-background-light dark:hover:bg-[#2d2c44] transition-all cursor-pointer border-b border-[#f1f1f8] dark:border-[#2d2c44]/50">
                                            <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-xl">chat_bubble</span>
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-[13px] leading-tight text-[#0f0e1b] dark:text-white">
                                                    <span className="font-bold">Rahul</span> mentioned you in <span className="text-primary font-medium">#qa-team</span>
                                                </p>
                                                <span className="text-[10px] font-medium text-[#545095] dark:text-gray-400">2m ago</span>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 flex gap-3 hover:bg-background-light dark:hover:bg-[#2d2c44] transition-all cursor-pointer border-b border-[#f1f1f8] dark:border-[#2d2c44]/50">
                                            <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">assignment</span>
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-[13px] leading-tight text-[#0f0e1b] dark:text-white">
                                                    Task <span className="font-bold text-[#0f0e1b] dark:text-white">#402</span> status changed to <span className="text-blue-600 dark:text-blue-400 font-medium italic">Ready for QA</span>
                                                </p>
                                                <span className="text-[10px] font-medium text-[#545095] dark:text-gray-400">45m ago</span>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 flex gap-3 hover:bg-background-light dark:hover:bg-[#2d2c44] transition-all cursor-pointer">
                                            <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-xl">verified_user</span>
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-[13px] leading-tight text-[#0f0e1b] dark:text-white">
                                                    Your <span className="font-bold">leave request</span> has been approved
                                                </p>
                                                <span className="text-[10px] font-medium text-[#545095] dark:text-gray-400">3h ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-[#f8f9fc] dark:bg-[#232238] border-t border-[#e8e8f3] dark:border-[#2d2c44] text-center">
                                        <button className="text-[11px] font-bold text-[#545095] dark:text-gray-400 hover:text-primary transition-colors">See all notifications</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="h-8 w-px bg-[#e8e8f3] dark:bg-[#2d2c44]"></div>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#0f0e1b] dark:text-white leading-none">{user?.first_name || 'User'} {user?.last_name || ''}</p>
                                <p className="text-[11px] font-medium text-[#545095] dark:text-gray-400 mt-1 uppercase tracking-tighter">{user?.job_title || 'Employee'}</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-center bg-cover border-2 border-primary/20 shadow-sm" style={{ backgroundImage: `url("${user?.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8 bg-background-light dark:bg-background-dark">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-3xl font-black text-[#0f0e1b] dark:text-white tracking-tight">Dashboard Overview</h2>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-white dark:bg-[#1a192d] border border-[#e8e8f3] dark:border-[#2d2c44] text-[#545095] dark:text-gray-300 text-sm font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-[#2d2c44] transition-colors flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">calendar_today</span>
                                    {new Date().toLocaleDateString()}
                                </button>
                                <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    Create New
                                </button>
                            </div>
                        </div>
                        <p className="text-[#545095] dark:text-gray-400 text-base">Welcome back, {user?.first_name || 'User'}. Here's what's happening today.</p>
                    </div>
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Task Metric */}
                        <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">task</span>
                                </div>
                                <span className="text-green-500 text-xs font-bold bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded">Update</span>
                            </div>
                            <p className="text-[#545095] dark:text-gray-400 text-sm font-medium">Active Tasks</p>
                            <h3 className="text-2xl font-black text-[#0f0e1b] dark:text-white mt-1">{loading ? '...' : activeTaskCount}</h3>
                        </div>
                        {/* Other Metrics (Static for now, can be connected later) */}
                        <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg">
                                    <span className="material-symbols-outlined text-red-500">bug_report</span>
                                </div>
                                <span className="text-red-500 text-xs font-bold bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded">-4%</span>
                            </div>
                            <p className="text-[#545095] dark:text-gray-400 text-sm font-medium">Open Bugs</p>
                            <h3 className="text-2xl font-black text-[#0f0e1b] dark:text-white mt-1">{loading ? '...' : openBugCount}</h3>
                        </div>
                        <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
                                    <span className="material-symbols-outlined text-blue-500">groups</span>
                                </div>
                                <span className="text-green-500 text-xs font-bold bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded">+2</span>
                            </div>
                            <p className="text-[#545095] dark:text-gray-400 text-sm font-medium">Team Size</p>
                            <h3 className="text-2xl font-black text-[#0f0e1b] dark:text-white mt-1">{loading ? '...' : teamSize}</h3>
                        </div>
                        <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-amber-100 dark:bg-amber-500/10 rounded-lg">
                                    <span className="material-symbols-outlined text-amber-500">bolt</span>
                                </div>
                                <span className="text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded">Stable</span>
                            </div>
                            <p className="text-[#545095] dark:text-gray-400 text-sm font-medium">Dev Velocity</p>
                            <h3 className="text-2xl font-black text-[#0f0e1b] dark:text-white mt-1">94%</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 space-y-8">
                            <div className="bg-white dark:bg-[#1a192d] rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-lg font-bold text-[#0f0e1b] dark:text-white">Recent Activity</h4>
                                    <button className="text-primary text-sm font-bold hover:underline">View all</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-background-light dark:bg-[#2d2c44] flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-primary">commit</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-[#0f0e1b] dark:text-white font-medium">New commit in <span className="text-primary">uhdms-core</span></p>
                                            <p className="text-xs text-[#545095] dark:text-gray-400 mt-1">2 hours ago by Alex Rivers</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-background-light dark:bg-[#2d2c44] flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-amber-500">assignment_turned_in</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-[#0f0e1b] dark:text-white font-medium">Test suite <span className="text-primary">#441-Production</span> passed</p>
                                            <p className="text-xs text-[#545095] dark:text-gray-400 mt-1">4 hours ago • QA Environment</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-background-light dark:bg-[#2d2c44] flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-red-500">warning</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-[#0f0e1b] dark:text-white font-medium">Critical bug reported by <span className="text-primary">Client Support</span></p>
                                            <p className="text-xs text-[#545095] dark:text-gray-400 mt-1">6 hours ago • High Priority</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#1a192d] rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm p-6 h-64 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-3xl text-primary/40">auto_graph</span>
                                </div>
                                <h4 className="text-[#0f0e1b] dark:text-white font-bold mb-2">Development Burndown</h4>
                                <p className="text-[#545095] dark:text-gray-400 text-sm max-w-xs">Analytics for current sprint are still calculating. Check back in a few minutes.</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="bg-white dark:bg-[#1a192d] rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm p-6">
                                <h4 class="text-lg font-bold text-[#0f0e1b] dark:text-white mb-6">Upcoming Interviews</h4>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-background-light dark:bg-[#2d2c44] border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                                        <p className="text-sm font-bold text-[#0f0e1b] dark:text-white">Marcus Sterling</p>
                                        <p className="text-xs text-[#545095] dark:text-gray-400 mt-1">Senior Frontend Engineer</p>
                                        <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-primary uppercase">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            10:30 AM Today
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-background-light dark:bg-[#2d2c44] border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                                        <p className="text-sm font-bold text-[#0f0e1b] dark:text-white">Sarah Jenkins</p>
                                        <p className="text-xs text-[#545095] dark:text-gray-400 mt-1">HR Generalist</p>
                                        <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-primary uppercase">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            02:00 PM Tomorrow
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-2.5 text-sm font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
                                    View HR Calendar
                                </button>
                            </div>
                            <div className="bg-primary rounded-xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-lg font-bold mb-2">New Feature!</h4>
                                    <p className="text-primary-foreground/80 text-sm mb-4 leading-relaxed">The Test Suite runner now supports automated UI regression testing with AI analysis.</p>
                                    <button className="px-4 py-2 bg-white text-primary text-xs font-bold rounded-lg shadow-sm">Explore Pro</button>
                                </div>
                                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10">science</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
