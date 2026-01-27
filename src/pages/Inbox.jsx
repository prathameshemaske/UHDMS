import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Inbox = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);

            const { data, error } = await authService.supabase
                .from('notifications')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setNotifications(data);
                if (data.length > 0) setSelectedNotification(data[0]);
            }
        } catch (error) {
            console.error("Failed to load inbox", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-primary size-8 rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">layers</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">UHDMS</span>
                    </div>
                    <nav className="space-y-1">
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/executive-dashboard">
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
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary" to="/inbox">
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
                            <span className="text-[10px] text-slate-500">Workspace Admin</span>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900/50">
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-background-dark shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Unified Notification Inbox</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg">search</span>
                            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search messages..." type="text" />
                        </div>
                        <button className="size-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </header>
                <div className="px-8 pt-4 pb-0 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 shrink-0">
                    <div className="flex items-center gap-8">
                        <button className="pb-3 border-b-2 border-primary text-primary text-sm font-bold flex items-center gap-2">
                            Unread
                            <span className="bg-primary/10 px-1.5 py-0.5 rounded text-[10px]">12</span>
                        </button>
                        <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 text-sm font-medium flex items-center gap-2">
                            Mentions
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">3</span>
                        </button>
                        <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 text-sm font-medium flex items-center gap-2">
                            System Alerts
                        </button>
                        <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 text-sm font-medium">
                            Archive
                        </button>
                    </div>
                </div>
                <div className="flex-1 flex overflow-hidden">
                    <div className="w-1/3 min-w-[350px] border-r border-slate-200 dark:border-slate-800 overflow-y-auto bg-slate-50/50 dark:bg-transparent">
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {/* Static placeholders if no real data, else map notifications */}
                            {notifications.length === 0 && (
                                <>
                                    <div className="p-4 bg-indigo-50/50 dark:bg-primary/5 border-l-4 border-primary cursor-pointer transition-colors" onClick={() => setSelectedNotification({ id: 1, title: 'Mentioned you in "Project Alpha"', content: 'Hey @Alex, I\'ve just finished the initial draft...', sender: 'David Chen', type: 'mention' })}>
                                        <div className="flex gap-3">
                                            <div className="size-10 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf7ihjs25oYbm49hAVDRoS6WdzzsdVb6Jcpl1G8RHjSkuk-G1hY9JLytA7w8ExLLGoHVdnfyN2efuJh3PpvMt4_NB04QEGgTaNgC41oGsHO_7HWLjrn6ylx7-q6dapj4Yjro49vct-9ywDbGs8cbv3cBic0pyknhNKwnx27T2wJ_Hr9kDfvnkKNu0bi40ha-q5s-9Ks_QiXc1ITNURJ3lv_ui-e9YpNKsuzn3ZYxmAHGqsjRT3naErbTWlnYpld9VpaSj2VvIMGfFs')" }}></div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-0.5">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">David Chen</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">14:20</span>
                                                </div>
                                                <div className="text-xs font-semibold text-primary mb-1">Mentioned you in "Project Alpha"</div>
                                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">@Alex we need to review the final design system components before the sprint ends...</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Additional static items */}
                                </>
                            )}
                            {notifications.map(note => (
                                <div key={note.id} className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer transition-colors" onClick={() => setSelectedNotification(note)}>
                                    <div className="flex gap-3">
                                        <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined !text-xl">warning</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-0.5">
                                                <span className="text-sm font-bold text-slate-900 dark:text-white truncate">System Alert</span>
                                                <span className="text-[10px] text-slate-400 font-medium">12:05</span>
                                            </div>
                                            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{note.title}</div>
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{note.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 bg-white dark:bg-background-dark overflow-y-auto">
                        {selectedNotification ? (
                            <div className="max-w-3xl mx-auto p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf7ihjs25oYbm49hAVDRoS6WdzzsdVb6Jcpl1G8RHjSkuk-G1hY9JLytA7w8ExLLGoHVdnfyN2efuJh3PpvMt4_NB04QEGgTaNgC41oGsHO_7HWLjrn6ylx7-q6dapj4Yjro49vct-9ywDbGs8cbv3cBic0pyknhNKwnx27T2wJ_Hr9kDfvnkKNu0bi40ha-q5s-9Ks_QiXc1ITNURJ3lv_ui-e9YpNKsuzn3ZYxmAHGqsjRT3naErbTWlnYpld9VpaSj2VvIMGfFs')" }}></div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">David Chen</h2>
                                            <p className="text-sm text-slate-500">d.chen@uhdms.internal</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                                            <span className="material-symbols-outlined">reply</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                                            @Mention
                                        </span>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{selectedNotification.title}</h3>
                                        <div className="text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
                                            <p>{selectedNotification.message || selectedNotification.content}</p>
                                        </div>
                                    </div>
                                    {/* Mock attachment */}
                                    <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between hover:border-primary transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 bg-indigo-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary">
                                                <span className="material-symbols-outlined">description</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Project_Alpha_Components_v2.fig</div>
                                                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">12.4 MB • FIGMA DESIGN</div>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-slate-400">download</span>
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                                        <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4">
                                            <textarea className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none" placeholder="Write a reply..." rows="3"></textarea>
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex gap-2 text-slate-400">
                                                    <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined !text-lg">attachment</span></button>
                                                    <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined !text-lg">sentiment_satisfied</span></button>
                                                </div>
                                                <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">
                                                    Send Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">Select a message to view</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Inbox;
