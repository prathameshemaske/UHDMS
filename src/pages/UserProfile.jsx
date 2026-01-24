import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        job_title: ''
    });

    useEffect(() => {
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
        loadProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!profile) return;
        try {
            const updated = await authService.updateProfile(profile.id, formData);
            setProfile(updated);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile.");
        }
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
                        <label className="flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#f1f0f4] dark:bg-white/5">
                                <div className="text-[#656487] dark:text-white/60 flex items-center justify-center pl-4">
                                    <span className="material-symbols-outlined text-xl">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-0 focus:ring-0 h-full placeholder:text-[#656487] dark:placeholder:text-white/40 px-2 text-base font-normal leading-normal" placeholder="Search settings..." defaultValue="" />
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <nav className="flex items-center gap-8">
                            <a className="text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Dashboard</a>
                            <a className="text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Analytics</a>
                            <a className="text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Assets</a>
                            <a className="text-primary text-sm font-bold leading-normal border-b-2 border-primary pb-1" href="#">Profile</a>
                        </nav>
                        <div className="flex gap-2">
                            <button className="flex size-10 items-center justify-center rounded-lg bg-[#f1f0f4] dark:bg-white/5 text-[#121117] dark:text-white hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className="flex size-10 items-center justify-center rounded-lg bg-[#f1f0f4] dark:bg-white/5 text-[#121117] dark:text-white hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                        </div>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" data-alt="User circular profile avatar photo" style={{ backgroundImage: `url("${profile?.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                    </div>
                </header>
                <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-10 py-8">
                    {/* Header Image Section */}
                    <div className="relative w-full rounded-xl overflow-hidden mb-20">
                        <div className="w-full bg-center bg-no-repeat bg-cover h-64 shadow-inner" data-alt="Modern abstract gradient landscape cover photo" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA70U-6xtOlkmEoscSpxa1dxvX0NKpyEpcTbjF4YIWPDjXslKXWBmS7nqYX5WLm4b46m0cIrrxa5pbG-2W_hXkmJr3ks3sOHwIBtFKPF4-DydRw74Tk8Od0mAjIyX_kBpzmCThp35WHrZW-ZlL24E7HbskjPUb98b3NAGVWVzHFIOPl-b3eP-k5RYUw63uG98HsqOKrFxWV1scG_vFutKQXFLAwV39y51tsiM-eSS3SrZe9zsBRTOgtaB1rqDRFr5LhO8tg2v2Y0Q0d")' }}>
                        </div>
                        {/* Profile Header Overlap */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="relative">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 border-4 border-white dark:border-background-dark shadow-lg" data-alt="User profile photo" style={{ backgroundImage: `url("${profile?.avatar_url || 'https://via.placeholder.com/150'}")` }}>
                                </div>
                                <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-background-dark hover:scale-105 transition-transform flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                                </button>
                            </div>
                            <div className="mt-4 text-center">
                                <h1 className="text-2xl font-bold text-[#121117] dark:text-white">{formData.first_name} {formData.last_name}</h1>
                                <p className="text-[#656487] dark:text-white/60 font-medium">{formData.job_title || 'No Job Title'}</p>
                            </div>
                        </div>
                    </div>
                    {/* Main Two-Column Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                        {/* Left Column: Personal Information */}
                        <div className="bg-white dark:bg-background-dark/50 rounded-xl p-6 shadow-sm border border-[#f1f0f4] dark:border-white/5 flex flex-col gap-6">
                            <div className="flex items-center justify-between border-b border-[#f1f0f4] dark:border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    <h3 className="text-lg font-bold">Personal Information</h3>
                                </div>
                                <button className="text-primary text-sm font-semibold hover:underline">Edit All</button>
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#656487] dark:text-white/60">First Name</label>
                                    <input
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#656487] dark:text-white/60">Last Name</label>
                                    <input
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#656487] dark:text-white/60">Email Address</label>
                                    <div className="relative">
                                        <input
                                            disabled
                                            value={profile?.email || ''}
                                            className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full pr-10 opacity-70 cursor-not-allowed"
                                            type="email"
                                        />
                                        <span className="material-symbols-outlined absolute right-3 top-2 text-green-500 text-xl">verified</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-[#656487] dark:text-white/60">Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full"
                                            type="tel"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-[#656487] dark:text-white/60">Job Title</label>
                                        <input
                                            name="job_title"
                                            value={formData.job_title}
                                            onChange={handleChange}
                                            className="form-input rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                        {/* Right Column: Personalization */}
                        <div className="flex flex-col gap-8">
                            {/* Personalization Card */}
                            <div className="bg-white dark:bg-background-dark/50 rounded-xl p-6 shadow-sm border border-[#f1f0f4] dark:border-white/5 flex flex-col gap-6">
                                <div className="flex items-center gap-3 border-b border-[#f1f0f4] dark:border-white/5 pb-4">
                                    <span className="material-symbols-outlined text-primary">palette</span>
                                    <h3 className="text-lg font-bold">Personalization</h3>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label className="text-sm font-semibold text-[#656487] dark:text-white/60">Theme Selection</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 border-primary bg-primary/5">
                                            <span className="material-symbols-outlined text-primary">light_mode</span>
                                            <span className="text-xs font-bold">Light</span>
                                        </button>
                                        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 border-transparent bg-[#f1f0f4] dark:bg-white/5">
                                            <span className="material-symbols-outlined">dark_mode</span>
                                            <span className="text-xs font-bold">Dark</span>
                                        </button>
                                        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 border-transparent bg-[#f1f0f4] dark:bg-white/5">
                                            <span className="material-symbols-outlined">desktop_windows</span>
                                            <span className="text-xs font-bold">System</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-[#656487] dark:text-white/60">Language</label>
                                        <select className="form-select rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full">
                                            <option>English (US)</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                            <option>German</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-[#656487] dark:text-white/60">Timezone</label>
                                        <select className="form-select rounded-lg border-[#e0e0e0] dark:border-white/10 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary w-full">
                                            <option>(GMT-08:00) Pacific Time</option>
                                            <option>(GMT+00:00) UTC</option>
                                            <option>(GMT+01:00) Central Europe</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* Security Section Card */}
                            <div className="bg-white dark:bg-background-dark/50 rounded-xl p-6 shadow-sm border border-[#f1f0f4] dark:border-white/5 flex flex-col gap-6">
                                <div className="flex items-center gap-3 border-b border-[#f1f0f4] dark:border-white/5 pb-4">
                                    <span className="material-symbols-outlined text-primary">shield</span>
                                    <h3 className="text-lg font-bold">Security</h3>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-[#e0e0e0] dark:border-white/10 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <span className="material-symbols-outlined text-xl">key</span>
                                        Change Password
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-md">
                                        <span className="material-symbols-outlined text-xl">verified_user</span>
                                        Enable 2FA
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">info</span>
                                    <p className="text-xs text-[#656487] dark:text-white/80 leading-relaxed">
                                        Two-factor authentication (2FA) adds an extra layer of security to your account. We recommend enabling it for all users.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Bottom Action/Status */}
                    <footer className="mt-12 py-8 border-t border-[#f1f0f4] dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-[#656487] dark:text-white/40">Last login: Today at 09:42 AM from San Francisco, CA</p>
                        <div className="flex items-center gap-4">
                            <button className="text-red-500 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors">
                                Delete Account
                            </button>
                            <button className="text-[#656487] dark:text-white/60 text-sm font-bold hover:underline">
                                Download My Data
                            </button>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default UserProfile;
