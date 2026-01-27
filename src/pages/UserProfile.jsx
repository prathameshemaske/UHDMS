import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('general'); // general | security | billing

    // Form States
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        job_title: ''
    });
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    // UI States
    const [isSaving, setIsSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await authService.getCurrentUser();
            if (data) {
                setProfile(data);
                setFormData({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    phone: data.phone || '',
                    job_title: data.job_title || ''
                });
            }
        } catch (error) {
            console.error("Failed to load profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const updated = await authService.updateProfile(profile.id, formData);
            setProfile(updated);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile: " + (error.message || error.error_description || JSON.stringify(error)));
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (passwordData.newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            await authService.updatePassword(passwordData.newPassword);
            alert("Password updated successfully!");
            setPasswordData({ newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error("Failed to update password", error);
            alert("Failed to update password: " + error.message);
        }
    };

    const handleDeleteAccount = async () => {
        if (!deleteConfirm) {
            setDeleteConfirm(true);
            return;
        }
        try {
            await authService.deleteAccount();
            window.location.href = '/login'; // Force redirect
        } catch (error) {
            console.error("Delete failed", error);
            alert("Failed to delete account: " + error.message);
        }
    };

    const handleLogout = async () => {
        await authService.signOut();
        window.location.href = '/login';
    };

    if (loading) return <div className="flex justify-center items-center h-screen bg-background-light dark:bg-background-dark text-primary">Loading Profile...</div>;

    return (
        <div className="flex flex-col min-h-screen font-display bg-background-light dark:bg-background-dark text-[#121117] dark:text-white">
            <div className="relative flex flex-col w-full min-h-screen group/design-root overflow-x-hidden">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f1f0f4] dark:border-white/10 bg-white dark:bg-background-dark px-10 py-3 sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-[#121117] dark:text-white">
                            <div className="size-6 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">hub</span>
                            </div>
                            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">UHDMS</h2>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <button onClick={handleLogout} className="text-sm font-medium hover:text-red-500 transition-colors">Log Out</button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" style={{ backgroundImage: `url("${profile?.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                    </div>
                </header>

                <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-10 py-8">
                    {/* Header Section */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
                        <p className="text-gray-500">Manage your profile, security, and billing preferences.</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'general' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            Security
                        </button>
                        <button
                            onClick={() => setActiveTab('billing')}
                            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'billing' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            Subscription & Billing
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* GENERAL TAB */}
                        {activeTab === 'general' && (
                            <>
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="bg-white dark:bg-background-dark/50 rounded-xl p-6 shadow-sm border border-[#f1f0f4] dark:border-white/5">
                                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">person</span>
                                            Personal Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase">First Name</label>
                                                <input
                                                    name="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleChange}
                                                    className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase">Last Name</label>
                                                <input
                                                    name="last_name"
                                                    value={formData.last_name}
                                                    onChange={handleChange}
                                                    className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase">Job Title</label>
                                                <input
                                                    name="job_title"
                                                    value={formData.job_title}
                                                    onChange={handleChange}
                                                    className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase">Phone</label>
                                                <input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase">Email (Read Only)</label>
                                                <input
                                                    value={profile?.email || ''}
                                                    disabled
                                                    className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-gray-50 dark:bg-white/5 opacity-70 w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-end">
                                            <button
                                                onClick={handleSaveProfile}
                                                disabled={isSaving}
                                                className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md flex items-center gap-2"
                                            >
                                                {isSaving ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    {/* Profile Avatar Card */}
                                    <div className="bg-white dark:bg-background-dark/50 rounded-xl p-6 shadow-sm border border-[#f1f0f4] dark:border-white/5 flex flex-col items-center">
                                        <div className="relative mb-4">
                                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 shadow-lg" style={{ backgroundImage: `url("${profile?.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                                        </div>
                                        <h2 className="text-xl font-bold">{formData.first_name} {formData.last_name}</h2>
                                        <p className="text-gray-500 mb-6">{formData.job_title || 'Team Member'}</p>
                                        <button className="w-full border-2 border-primary text-primary font-bold py-2 rounded-lg hover:bg-primary/5 transition-colors">
                                            Change Avatar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* SECURITY TAB */}
                        {activeTab === 'security' && (
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white dark:bg-background-dark/50 rounded-xl p-6 shadow-sm border border-[#f1f0f4] dark:border-white/5">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">lock</span>
                                        Change Password
                                    </h3>
                                    <div className="space-y-4 max-w-md">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-bold text-gray-500 uppercase">New Password</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="••••••••"
                                                className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary w-full"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-bold text-gray-500 uppercase">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="••••••••"
                                                className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary w-full"
                                            />
                                        </div>
                                        <button
                                            onClick={handleUpdatePassword}
                                            className="bg-primary text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-600 transition-colors"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-100 dark:border-red-900/30">
                                    <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined">warning</span>
                                        Danger Zone
                                    </h3>
                                    <p className="text-sm text-red-700/80 mb-6">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors"
                                        >
                                            {deleteConfirm ? 'Are you sure? Click to Confirm' : 'Delete Account'}
                                        </button>
                                        {deleteConfirm && (
                                            <button onClick={() => setDeleteConfirm(false)} className="text-gray-500 hover:underline text-sm font-bold">Cancel</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BILLING TAB */}
                        {activeTab === 'billing' && (
                            <div className="lg:col-span-3 space-y-8">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div>
                                            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3 border border-white/20">CURRENT PLAN</span>
                                            <h2 className="text-3xl font-bold mb-2">{profile?.subscription_tier || 'Free'} Plan</h2>
                                            <p className="opacity-90">Your subscription is {profile?.subscription_status || 'Active'}</p>
                                        </div>
                                        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg">
                                            Manage Subscription
                                        </button>
                                    </div>
                                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Free Plan */}
                                    <div className={`rounded-xl p-6 border-2 transition-all ${profile?.subscription_tier === 'Free' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'}`}>
                                        <h3 className="text-lg font-bold">Free</h3>
                                        <div className="text-3xl font-bold my-4">$0 <span className="text-sm font-normal text-gray-500">/mo</span></div>
                                        <ul className="space-y-3 mb-8 text-sm text-gray-600 dark:text-gray-400">
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> 5 Team Members</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Basic Reporting</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> 1GB Storage</li>
                                        </ul>
                                        <button disabled={profile?.subscription_tier === 'Free'} className="w-full py-2 rounded-lg font-bold border-2 border-gray-200 disabled:opacity-50 disabled:bg-gray-100">
                                            {profile?.subscription_tier === 'Free' ? 'Current Plan' : 'Downgrade'}
                                        </button>
                                    </div>

                                    {/* Pro Plan */}
                                    <div className={`rounded-xl p-6 border-2 transition-all ${profile?.subscription_tier === 'Pro' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'}`}>
                                        <h3 className="text-lg font-bold text-primary">Pro</h3>
                                        <div className="text-3xl font-bold my-4">$29 <span className="text-sm font-normal text-gray-500">/mo</span></div>
                                        <ul className="space-y-3 mb-8 text-sm text-gray-600 dark:text-gray-400">
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Unlimited Members</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Advanced Analytics</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> 50GB Storage</li>
                                        </ul>
                                        <button className="w-full py-2 rounded-lg font-bold bg-primary text-white hover:bg-primary/90 shadow-md">
                                            Upgrade to Pro
                                        </button>
                                    </div>

                                    {/* Enterprise */}
                                    <div className="rounded-xl p-6 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                                        <h3 className="text-lg font-bold">Enterprise</h3>
                                        <div className="text-3xl font-bold my-4">Custom</div>
                                        <ul className="space-y-3 mb-8 text-sm text-gray-600 dark:text-gray-400">
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> SSO & Audit Logs</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> 24/7 Priority Support</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Custom Integrations</li>
                                        </ul>
                                        <button className="w-full py-2 rounded-lg font-bold border-2 border-gray-200 hover:border-gray-400">
                                            Contact Sales
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserProfile;
