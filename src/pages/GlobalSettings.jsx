import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { settingsService } from '../services/settingsService';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-[#5d55e7] border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const GlobalSettings = () => {
    const { showSuccess, showError } = useToast();
    const [activeTab, setActiveTab] = useState('account');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form States
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        job_title: '',
        phone: '',
        bio: ''
    });

    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const [systemSettings, setSystemSettings] = useState({
        company_name: '',
        theme: { primary_color: '#5d55e7' },
        operational_hours: {}
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            if (currentUser) {
                setProfileData({
                    first_name: currentUser.first_name || '',
                    last_name: currentUser.last_name || '',
                    job_title: currentUser.job_title || '',
                    phone: currentUser.phone || '',
                    bio: currentUser.bio || ''
                });
            }

            // Only load system settings if admin
            if (currentUser?.role === 'admin') {
                const sysSettings = await settingsService.getSettings();
                if (sysSettings) {
                    setSystemSettings(prev => ({ ...prev, ...sysSettings }));
                }
            }

        } catch (error) {
            console.error("Error loading settings:", error);
            showError("Failed to load settings.");
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await authService.updateProfile(user.id, profileData);
            showSuccess("Profile updated successfully!");
            // Update local user state to reflect changes immediately in UI if needed
            setUser(prev => ({ ...prev, ...profileData }));
        } catch (error) {
            showError("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            showError("New passwords do not match.");
            return;
        }
        setSaving(true);
        try {
            await authService.updatePassword(passwordData.new);
            showSuccess("Password updated successfully!");
            setPasswordData({ current: '', new: '', confirm: '' });
        } catch (error) {
            showError("Failed to update password. " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSystemUpdate = async () => {
        setSaving(true);
        try {
            await settingsService.updateSettings(systemSettings);
            showSuccess("System settings saved!");
        } catch (error) {
            showError("Failed to save system settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="h-screen bg-[#f6f6f8] dark:bg-[#121121]"><LoadingSpinner /></div>;

    const isAdmin = user?.role === 'admin';

    const tabs = [
        { id: 'account', label: 'Account', icon: 'person' },
        { id: 'security', label: 'Security', icon: 'lock' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        // Admin Only Tabs
        ...(isAdmin ? [{ id: 'appearance', label: 'App Appearance', icon: 'palette' }] : []),
        ...(isAdmin ? [{ id: 'system', label: 'System Config', icon: 'settings_applications' }] : []),
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-sans">
            <div className="flex flex-1 max-w-[1600px] mx-auto w-full px-4 md:px-8 py-8 gap-8">

                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                    <div className="mb-6 px-2">
                        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Settings</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your preferences</p>
                    </div>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${activeTab === tab.id
                                    ? 'bg-[#5048e5] text-white shadow-lg shadow-[#5048e5]/20'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-[#1a192d] hover:text-[#5048e5]'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 bg-white dark:bg-[#1a192d] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2d2c44] p-8 min-h-[600px]">

                    {/* ACCOUNT SETTINGS */}
                    {activeTab === 'account' && (
                        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-xl font-bold mb-1">Personal Information</h2>
                            <p className="text-gray-500 text-sm mb-8">Update your personal details and public profile.</p>

                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#5048e5]"
                                            value={profileData.first_name}
                                            onChange={e => setProfileData({ ...profileData, first_name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#5048e5]"
                                            value={profileData.last_name}
                                            onChange={e => setProfileData({ ...profileData, last_name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Job Title</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#5048e5]"
                                        value={profileData.job_title}
                                        onChange={e => setProfileData({ ...profileData, job_title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Bio / About</label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#5048e5] h-32 resize-none"
                                        value={profileData.bio}
                                        onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                                        placeholder="Tell us a little about yourself..."
                                    />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-[#5048e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-[#5048e5]/20 transition-all disabled:opacity-50"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* SECURITY SETTINGS */}
                    {activeTab === 'security' && (
                        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-xl font-bold mb-1">Security</h2>
                            <p className="text-gray-500 text-sm mb-8">Manage your password and security preferences.</p>

                            <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#5048e5]"
                                        value={passwordData.new}
                                        onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#5048e5]"
                                        value={passwordData.confirm}
                                        onChange={e => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-[#5048e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-[#5048e5]/20 transition-all disabled:opacity-50"
                                    >
                                        {saving ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* NOTIFICATIONS */}
                    {activeTab === 'notifications' && (
                        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-xl font-bold mb-1">Notifications</h2>
                            <p className="text-gray-500 text-sm mb-8">Manage how you receive alerts and updates.</p>

                            <div className="space-y-6">
                                {['Email Notifications', 'Push Notifications', 'Weekly Digest', 'Marketing Emails'].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#212133] rounded-xl border border-gray-100 dark:border-[#2d2c44]">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{item}</h3>
                                            <p className="text-xs text-gray-500">Receive updates via {item.toLowerCase().split(' ')[0]}.</p>
                                        </div>
                                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                                            <input type="checkbox" className="peer absolute w-full h-full opacity-0 z-10 cursor-pointer" defaultChecked={idx < 2} />
                                            <div className="block bg-gray-200 dark:bg-gray-600 w-full h-full rounded-full peer-checked:bg-[#5048e5] transition-colors"></div>
                                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* APPEARANCE (ADMIN) */}
                    {activeTab === 'appearance' && (
                        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-xl font-bold mb-1">App Appearance</h2>
                            <p className="text-gray-500 text-sm mb-8">Customize the look and feel of the platform.</p>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4">Primary Brand Color</label>
                                    <div className="flex flex-wrap gap-4">
                                        {['#5d55e7', '#0ea5e9', '#10b981', '#f43f5e', '#f59e0b', '#0f172a'].map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSystemSettings(prev => ({ ...prev, theme: { ...prev.theme, primary_color: color } }))}
                                                className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 ${systemSettings.theme.primary_color === color ? 'border-gray-900 dark:border-white ring-2 ring-offset-2 ring-[#5048e5]' : 'border-transparent'
                                                    }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4">Company Name</label>
                                    <input
                                        type="text"
                                        className="w-full max-w-md rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#5048e5]"
                                        value={systemSettings.company_name}
                                        onChange={e => setSystemSettings({ ...systemSettings, company_name: e.target.value })}
                                        placeholder="e.g. Acme Corp"
                                    />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        onClick={handleSystemUpdate}
                                        disabled={saving}
                                        className="bg-[#5048e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-[#5048e5]/20 transition-all disabled:opacity-50"
                                    >
                                        {saving ? 'Saving...' : 'Save Appearance'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SYSTEM CONFIG (ADMIN) */}
                    {activeTab === 'system' && (
                        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-xl font-bold mb-1">System Configuration</h2>
                            <p className="text-gray-500 text-sm mb-8">Advanced operational settings.</p>

                            <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl mb-6">
                                <div className="flex gap-3">
                                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-500">warning</span>
                                    <div>
                                        <h3 className="font-bold text-amber-800 dark:text-amber-500">Caution</h3>
                                        <p className="text-sm text-amber-700 dark:text-amber-400">Changes here affect the entire organization. Please proceed with care.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Placeholder for complex system configs */}
                            <div className="space-y-4 opacity-50 pointer-events-none grayscale">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Maintenance Mode</label>
                                    <div className="flex items-center gap-4">
                                        <div className="h-6 w-12 bg-gray-200 rounded-full relative">
                                            <div className="h-6 w-6 bg-white rounded-full shadow-sm absolute left-0 border border-gray-300"></div>
                                        </div>
                                        <span className="text-sm font-medium">Disabled</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-gray-400 italic">Advanced configurations are currently managed by the DevOps team.</p>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default GlobalSettings;
