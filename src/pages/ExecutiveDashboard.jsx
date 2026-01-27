import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const ExecutiveDashboard = () => {
    const [stats, setStats] = useState({
        activeTasks: 0,
        openBugs: 0,
        teamVelocity: 28.4, // Placeholder
        sprintProgress: 68 // Placeholder
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);

                // Fetch real counts
                const { count: taskCount } = await authService.supabase
                    .from('tasks')
                    .select('*', { count: 'exact', head: true })
                    .neq('status', 'completed');

                const { count: bugCount } = await authService.supabase
                    .from('bugs')
                    .select('*', { count: 'exact', head: true })
                    .neq('status', 'Done');

                setStats(prev => ({
                    ...prev,
                    activeTasks: taskCount || 0,
                    openBugs: bugCount || 0
                }));
            } catch (error) {
                console.error("Dashboard data load error", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Sidebar from HTML - simplified version or reused if implementing Layout concept */}
            {/* Ideally this Sidebar should be a shared component, but copying here as per request "pages for code" and standalone nature */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-primary size-8 rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">layers</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">UHDMS</span>
                    </div>
                    <nav className="space-y-1">
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary" to="/executive-dashboard">
                            <span className="material-symbols-outlined">grid_view</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
                            <span className="material-symbols-outlined">folder</span>
                            <span className="text-sm font-medium">Projects</span>
                        </a>
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/my-tasks">
                            <span className="material-symbols-outlined">check_circle</span>
                            <span className="text-sm font-medium">My Tasks</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/inbox">
                            <span className="material-symbols-outlined">mail</span>
                            <span className="text-sm font-medium">Inbox</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/reports">
                            <span className="material-symbols-outlined">bar_chart</span>
                            <span className="text-sm font-medium">Reports</span>
                        </Link>
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center" style={{ backgroundImage: `url('${user?.avatar_url || 'https://via.placeholder.com/150'}')` }}></div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold">{user?.first_name || 'User'}</span>
                            <span className="text-[10px] text-slate-500">{user?.job_title || 'Employee'}</span>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-background-dark shrink-0">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Executive Dashboard</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg">search</span>
                            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search insights..." type="text" />
                        </div>
                        <button className="size-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="size-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">calendar_month</span>
                        </button>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Active Tasks Card */}
                        <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Active Tasks</span>
                                <span className="material-symbols-outlined text-primary">assignment</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">{loading ? '...' : stats.activeTasks}</span>
                                <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center"><span className="material-symbols-outlined !text-xs">arrow_upward</span> 12%</span>
                            </div>
                        </div>
                        {/* Velocity Card */}
                        <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Team Velocity</span>
                                <span className="material-symbols-outlined text-primary">speed</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.teamVelocity}</span>
                                <span className="text-slate-400 text-xs mb-1">pts/sprint</span>
                            </div>
                        </div>
                        {/* Sprint Progress Card */}
                        <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Sprint Progress (%)</span>
                                <span className="material-symbols-outlined text-primary">donut_large</span>
                            </div>
                            <div>
                                <div className="flex items-end justify-between mb-2">
                                    <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.sprintProgress}%</span>
                                    <span className="text-slate-400 text-xs">4 days left</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[68%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        {/* Open Bugs Card */}
                        <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Open Bugs</span>
                                <span className="material-symbols-outlined text-rose-500">bug_report</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">{loading ? '...' : stats.openBugs}</span>
                                <span className="text-rose-500 text-xs font-bold mb-1 flex items-center"><span className="material-symbols-outlined !text-xs">warning</span> High Pri</span>
                            </div>
                        </div>
                    </div>
                    {/* Charts & Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white dark:bg-background-dark p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Task Completion</h3>
                                    <p className="text-slate-500 text-xs">Overview of finished tasks in the last 7 days</p>
                                </div>
                                <select className="bg-slate-50 border-slate-200 text-xs rounded-md py-1 px-3 focus:ring-primary/20">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                </select>
                            </div>
                            <div className="h-64 flex items-end justify-between gap-4 px-2">
                                {/* Static Chart Bars - Visuals only as per HTML */}
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                    <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative h-48 overflow-hidden">
                                            <div className="absolute bottom-0 w-full bg-primary/20 h-full"></div>
                                            <div className="absolute bottom-0 w-full bg-primary rounded-t-sm" style={{ height: `${[45, 65, 35, 85, 70, 20, 15][i]}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Recent Activity */}
                        <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Recent Activity</h3>
                                <button className="text-primary text-xs font-bold hover:underline">View All</button>
                            </div>
                            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <div className="size-8 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf7ihjs25oYbm49hAVDRoS6WdzzsdVb6Jcpl1G8RHjSkuk-G1hY9JLytA7w8ExLLGoHVdnfyN2efuJh3PpvMt4_NB04QEGgTaNgC41oGsHO_7HWLjrn6ylx7-q6dapj4Yjro49vct-9ywDbGs8cbv3cBic0pyknhNKwnx27T2wJ_Hr9kDfvnkKNu0bi40ha-q5s-9Ks_QiXc1ITNURJ3lv_ui-e9YpNKsuzn3ZYxmAHGqsjRT3naErbTWlnYpld9VpaSj2VvIMGfFs')" }}></div>
                                        <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-primary flex items-center justify-center text-white border-2 border-white dark:border-background-dark">
                                            <span className="material-symbols-outlined !text-[10px]">check</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-900 dark:text-white">David Miller</span> completed task <span className="text-primary font-medium">UI Design Audit</span></p>
                                        <span className="text-[10px] text-slate-400">24 mins ago</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <div className="size-8 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGHCqy2z8EzGYfc-vtynS9SWtcKLkK5Oqdu_EX12c7bGwrq3yeyG-1ZPFJzkf0FwLdKXfchWsNjOFX_yNnAWGldRuhem3v9wjwbW9p-LQC6EQ4nlun2iq-0UuQeute7AGYJ8916bTun_jSDe-TLnnwjo9rZDm8RUh9qFNxadvs4Chi2BGouHZ5umJRWPzIAJojlvLAUjhOR_MfkUp68SlUsVRUlbGFLL_Ydf32BADe5TWNB92_vXHhNtOem0H80rJXSwFovBBcy9dR')" }}></div>
                                        <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-rose-500 flex items-center justify-center text-white border-2 border-white dark:border-background-dark">
                                            <span className="material-symbols-outlined !text-[10px]">bug_report</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-900 dark:text-white">Sarah Chen</span> reported a bug <span className="text-rose-500 font-medium">Auth Timeout #302</span></p>
                                        <span className="text-[10px] text-slate-400">2 hours ago</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <div className="size-8 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGwoqItrwluPsyLuBLSWLBDP0sQJLoFNyW6ii_bmm_NlA4oWARQNQ-jfz_C9TdfVje17GdIhRaZ5vh6xwcDOF2hOFg3z_xuJdVelDNybdaxsZkdDlvwstcv2DRTSZBNRy4tIYq-vYE9qIlWWQzcgmLj96V4LihozVcjm3nCvazFXRpG3EpU5gy3HMYep_Ro1DaBOHjDRll1tmQs0MZ9JS9w0rFXZqBDwKP3VLI89Zp1SUpgwBoiiYcYO9x0TkEP-KylkFdIOw8kdLV')" }}></div>
                                        <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-indigo-500 flex items-center justify-center text-white border-2 border-white dark:border-background-dark">
                                            <span className="material-symbols-outlined !text-[10px]">edit</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-900 dark:text-white">Michael Wood</span> updated <span className="text-primary font-medium">AWS Deployment Script</span></p>
                                        <span className="text-[10px] text-slate-400">4 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ExecutiveDashboard;
