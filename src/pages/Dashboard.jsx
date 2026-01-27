import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../services/dashboardService';
import { authService } from '../services/authService';

const Dashboard = () => {
    // Real Data State
    const [metrics, setMetrics] = useState({ activeTasks: 0, openBugs: 0, teamSize: 0, velocity: 0 });
    const [activities, setActivities] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [announcement, setAnnouncement] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);

                if (currentUser) {
                    const [metricsData, activityData, interviewData, announcementData] = await Promise.all([
                        dashboardService.getMetrics(),
                        dashboardService.getRecentActivities(),
                        dashboardService.getUpcomingInterviews(),
                        dashboardService.getAnnouncements()
                    ]);

                    setMetrics(metricsData);
                    setActivities(activityData || []);
                    setInterviews(interviewData || []);
                    setAnnouncement(announcementData);
                }
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        let interval = Math.floor(seconds / 3600);
        if (interval >= 1) return interval + " hours ago";
        interval = Math.floor(seconds / 60);
        if (interval >= 1) return interval + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    const getActionIcon = (action) => {
        if (action.includes('commit')) return { icon: 'commit', color: 'text-primary' };
        if (action.includes('completed')) return { icon: 'assignment_turned_in', color: 'text-amber-500' };
        if (action.includes('bug') || action.includes('report')) return { icon: 'warning', color: 'text-red-500' };
        return { icon: 'circle', color: 'text-slate-400' };
    };

    return (
        <div className="p-4 md:p-8 space-y-8 fade-in-up">
            <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <h2 className="text-3xl font-black text-[#0f0e1b] dark:text-white tracking-tight">Dashboard Overview</h2>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white dark:bg-[#1a192d] border border-[#e8e8f3] dark:border-[#2d2c44] text-[#545095] dark:text-gray-300 text-sm font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-[#2d2c44] transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">calendar_today</span>
                            {new Date().toLocaleDateString()}
                        </button>
                        <button className="px-4 py-2 bg-[#5048e5] text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-[#5048e5]/25 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">add</span>
                            Create New
                        </button>
                    </div>
                </div>
                <p className="text-[#545095] dark:text-gray-400 text-base">Welcome back, {user?.first_name || 'User'}. Here's what's happening today.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* activeTasks */}
                <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#5048e5]/10 rounded-lg">
                            <span className="material-symbols-outlined text-[#5048e5]">task</span>
                        </div>
                        <span className="text-green-500 text-xs font-bold bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded">Update</span>
                    </div>
                    <p className="text-[#545095] dark:text-gray-400 text-sm font-medium">Active Tasks</p>
                    <h3 className="text-2xl font-black text-[#0f0e1b] dark:text-white mt-1">{loading ? '...' : metrics.activeTasks}</h3>
                </div>
                {/* openBugs */}
                <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg">
                            <span className="material-symbols-outlined text-red-500">bug_report</span>
                        </div>
                    </div>
                    <p className="text-[#545095] dark:text-gray-400 text-sm font-medium">Open Bugs</p>
                    <h3 className="text-2xl font-black text-[#0f0e1b] dark:text-white mt-1">{loading ? '...' : metrics.openBugs}</h3>
                </div>
                {/* teamSize */}
                <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
                            <span className="material-symbols-outlined text-blue-500">groups</span>
                        </div>
                    </div>
                    <p className="text-[#545095] dark:text-gray-400 text-sm font-medium">Team Size</p>
                    <h3 className="text-2xl font-black text-[#0f0e1b] dark:text-white mt-1">{loading ? '...' : metrics.teamSize}</h3>
                </div>
                <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-amber-100 dark:bg-amber-500/10 rounded-lg">
                            <span className="material-symbols-outlined text-amber-500">bolt</span>
                        </div>
                    </div>
                    <p className="text-[#545095] dark:text-gray-400 text-sm font-medium">Dev Velocity</p>
                    <h3 className="text-2xl font-black text-[#0f0e1b] dark:text-white mt-1">{metrics.velocity}%</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-[#1a192d] rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-lg font-bold text-[#0f0e1b] dark:text-white">Recent Activity</h4>
                            <button className="text-[#5048e5] text-sm font-bold hover:underline">View all</button>
                        </div>
                        <div className="space-y-6">
                            {activities.length === 0 ? (
                                <p className="text-sm text-slate-500">No recent activity.</p>
                            ) : (
                                activities.map(activity => {
                                    const { icon, color } = getActionIcon(activity.action);
                                    return (
                                        <div key={activity.id} className="flex gap-4">
                                            <div className={`h-10 w-10 rounded-lg bg-[#f6f6f8] dark:bg-[#2d2c44] flex items-center justify-center flex-shrink-0`}>
                                                <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-[#0f0e1b] dark:text-white font-medium">
                                                    {activity.action} <span className="text-[#5048e5]">{activity.target}</span>
                                                </p>
                                                <p className="text-xs text-[#545095] dark:text-gray-400 mt-1">
                                                    {formatTimeAgo(activity.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1a192d] rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm p-6 h-64 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-[#5048e5]/5 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-3xl text-[#5048e5]/40">auto_graph</span>
                        </div>
                        <h4 className="text-[#0f0e1b] dark:text-white font-bold mb-2">Development Burndown</h4>
                        <p className="text-[#545095] dark:text-gray-400 text-sm max-w-xs">Analytics for current sprint are still calculating. Check back in a few minutes.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Upcoming Interviews */}
                    <div className="bg-white dark:bg-[#1a192d] rounded-xl border border-[#e8e8f3] dark:border-[#2d2c44] shadow-sm p-6">
                        <h4 className="text-lg font-bold text-[#0f0e1b] dark:text-white mb-6">Upcoming Interviews</h4>
                        <div className="space-y-4">
                            {interviews.length === 0 ? (
                                <p className="text-sm text-slate-500">No upcoming interviews.</p>
                            ) : (
                                interviews.map(interview => (
                                    <div key={interview.id} className="p-4 rounded-lg bg-[#f6f6f8] dark:bg-[#2d2c44] border border-transparent hover:border-[#5048e5]/20 transition-all cursor-pointer">
                                        <p className="text-sm font-bold text-[#0f0e1b] dark:text-white">{interview.candidate_name}</p>
                                        <p className="text-xs text-[#545095] dark:text-gray-400 mt-1">{interview.role}</p>
                                        <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-[#5048e5] uppercase">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            {new Date(interview.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <button className="w-full mt-6 py-2.5 text-sm font-bold text-[#5048e5] border border-[#5048e5]/20 rounded-lg hover:bg-[#5048e5]/5 transition-colors">
                            View HR Calendar
                        </button>
                    </div>

                    {/* Announcement Card */}
                    {announcement && (
                        <div className="bg-[#5048e5] rounded-xl p-6 text-white shadow-xl shadow-[#5048e5]/20 relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-lg font-bold mb-2">{announcement.title}</h4>
                                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                                    {announcement.content}
                                </p>
                                <button className="px-4 py-2 bg-white text-[#5048e5] text-xs font-bold rounded-lg shadow-sm">Explore Pro</button>
                            </div>
                            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10">science</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
