import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { notificationService } from '../../services/notificationService';

const Header = ({ onMenuClick }) => {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const fetchUserAndNotifications = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);

                // Fetch Notifications
                const data = await notificationService.getNotifications();
                setNotifications(data || []);

                // Unread Count
                const count = data.filter(n => !n.is_read).length;
                setUnreadCount(count);

                // Real-time Subscription with Polling Fallback
                if (userData) {
                    console.log("Initializing Realtime for user:", userData.id);

                    // 1. Setup Realtime
                    const subscriptionPromise = import('../../supabaseClient').then(({ supabase }) => {
                        const channel = supabase
                            .channel('public:notifications')
                            .on('postgres_changes', {
                                event: 'INSERT',
                                schema: 'public',
                                table: 'notifications',
                                filter: `user_id=eq.${userData.id}`
                            }, (payload) => {
                                console.log("🔥 REALTIME EVENT:", payload);
                                setNotifications(prev => [payload.new, ...prev]);
                                setUnreadCount(prev => prev + 1);
                            })
                            .subscribe((status) => {
                                console.log("🔥 SUBSCRIPTION STATUS:", status);
                            });
                        return channel;
                    });

                    // 2. Setup Polling (Safety Net)
                    // Checks every 3 seconds (Aggressive Debugging)
                    const intervalId = setInterval(async () => {
                        try {
                            console.log("Debug: Polling for notifications...");
                            const latest = await notificationService.getNotifications();
                            setNotifications(prev => {
                                if (latest && latest.length !== prev.length) return latest;
                                return prev;
                            });
                            if (latest) {
                                const count = latest.filter(n => !n.is_read).length;
                                setUnreadCount(count);
                            }
                        } catch (e) {
                            console.error("Polling failed", e);
                        }
                    }, 3000); // 3 seconds

                    return () => {
                        subscriptionPromise.then(sub => sub.unsubscribe());
                        clearInterval(intervalId);
                    };
                }

            } catch (error) {
                console.error("Error fetching header data:", error);
            }
        };

        let cleanup;
        fetchUserAndNotifications().then(c => cleanup = c);

        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    // Old handler removed
    const sendTestNotification = async () => {
        if (!user) return;
        console.log("Sending test notification to self:", user.id);
        await notificationService.createNotification({
            userId: user.id,
            title: "Test Notification",
            message: "If you see this, real-time is working!",
            type: "system",
            related_id: "test"
        });
    };

    const navigate = useNavigate();

    const toggleNotifications = async () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications && unreadCount > 0) {
            // Optional: refresh on open
            try {
                const data = await notificationService.getNotifications();
                setNotifications(data || []);
            } catch (e) { console.error(e); }
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            // Mark as read first
            if (!notification.is_read) {
                await notificationService.markAsRead(notification.id);
                setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, is_read: true } : n));
                setUnreadCount(prev => Math.max(0, prev - 1));
            }

            // Redirect based on type
            setShowNotifications(false);
            switch (notification.type) {
                case 'chat':
                    // Navigate to Communication page
                    navigate('/communication', { state: { conversationId: notification.related_id } });
                    break;
                case 'task':
                    // Navigate to My Tasks
                    navigate('/my-tasks');
                    break;
                case 'bug':
                    // Navigate to specific bug detail
                    navigate(`/bugs/${notification.related_id}`);
                    break;
                case 'meeting':
                    navigate('/calendar');
                    break;
                default:
                    console.log("No specific route for type:", notification.type);
            }
        } catch (error) {
            console.error("Error handling notification click:", error);
        }
    };

    // ... (rest of component render)

    const notificationRef = React.useRef(null);
    const buttonRef = React.useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (showNotifications &&
                notificationRef.current &&
                !notificationRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNotifications]);

    // ... (rest of component render)

    const displayName = user ? `${user.first_name || ''} ${user.last_name || ''} `.trim() || user.email : 'Loading...';
    const role = user?.job_title || 'Team Member';
    const avatarUrl = user?.avatar_url;
    const initials = user?.first_name ? user.first_name[0] + (user.last_name ? user.last_name[0] : '') : 'U';

    return (
        <header className="h-16 w-full bg-white dark:bg-[#1a192d] border-b border-[#e8e8f3] dark:border-[#2d2c44] flex items-center justify-between px-4 md:px-8 z-50 shrink-0 relative">
            {/* ... (Search and Menu) ... */}
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
                <div className="relative">
                    <button
                        ref={buttonRef}
                        onClick={toggleNotifications}
                        className={`relative p-2 rounded-lg transition-colors ${showNotifications ? 'bg-primary/10 text-primary' : 'text-[#545095] dark:text-gray-300 hover:bg-[#f6f6f8] dark:hover:bg-[#2d2c44]'}`}
                    >
                        <span className="material-symbols-outlined text-2xl">notifications</span>
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a192d]"></span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <div ref={notificationRef} className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1a192d] rounded-2xl shadow-3xl border border-gray-100 dark:border-[#2d2c44] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-4 border-b border-border-light dark:border-[#2d2c44] flex items-center justify-between bg-white dark:bg-[#1a192d]">
                                <h3 className="text-sm font-bold text-[#0f0e1b] dark:text-white">Notifications</h3>
                                <button onClick={() => {
                                    notificationService.markAllAsRead();
                                    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
                                    setUnreadCount(0);
                                }} className="text-[10px] uppercase font-bold text-primary hover:text-primary-dark transition-colors">Mark all read</button>
                                <button onClick={sendTestNotification} className="text-[10px] uppercase font-bold text-green-600 hover:text-green-700 ml-3">Test</button>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                {notifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                                        <div className="h-12 w-12 bg-gray-50 dark:bg-[#24233a] rounded-full flex items-center justify-center mb-3">
                                            <span className="material-symbols-outlined text-xl opacity-50">notifications_off</span>
                                        </div>
                                        <p className="text-sm font-medium">No notifications yet</p>
                                    </div>
                                ) : (
                                    notifications.map(n => (
                                        <div
                                            key={n.id}
                                            onClick={() => handleNotificationClick(n)}
                                            className={`p-4 border-b border-border-light dark:border-[#2d2c44] hover:bg-gray-50 dark:hover:bg-[#24233a] cursor-pointer transition-colors group ${!n.is_read ? 'bg-primary/[0.03]' : ''}`}
                                        >
                                            <div className="flex gap-4">
                                                <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 transition-all ${!n.is_read ? 'bg-primary ring-4 ring-primary/10' : 'bg-transparent'}`}></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm ${!n.is_read ? 'font-bold text-[#0f0e1b] dark:text-white' : 'font-medium text-gray-600 dark:text-gray-400'}`}>
                                                        {n.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">{n.message}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-[#24233a] px-1.5 py-0.5 rounded">{n.type || 'System'}</span>
                                                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

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
