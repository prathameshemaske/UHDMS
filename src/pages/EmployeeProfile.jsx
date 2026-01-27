import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const EmployeeProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await authService.getProfileById(id);
                setProfile(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load employee profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading profile...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
    if (!profile) return <div className="p-10 text-center">Profile not found.</div>;

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8 w-full max-w-4xl">
                    <div className="flex items-center gap-4 text-[#4F46E5]">
                        <div className="size-6">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-xl font-black leading-tight tracking-tight">UHDMS</h2>
                    </div>
                </div>
            </header>
            <main className="flex-1 px-6 lg:px-20 py-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-[30%] space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="size-48 bg-center bg-no-repeat aspect-square bg-cover rounded-2xl border-4 border-slate-50 dark:border-slate-800 shadow-lg" style={{ backgroundImage: `url("${profile.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-white dark:border-slate-900 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">Active</div>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{profile.first_name} {profile.last_name}</h1>
                            <p className="text-[#4F46E5] font-semibold">{profile.job_title || 'Employee'}</p>
                            <div className="w-full border-t border-slate-100 dark:border-slate-800 my-6"></div>
                            <div className="w-full space-y-4">
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-xl">mail</span>
                                    <span className="text-sm">{profile.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-xl">phone</span>
                                    <span className="text-sm">{profile.phone || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-xl">calendar_today</span>
                                    <span className="text-sm">Joined {profile.start_date || 'N/A'}</span>
                                </div>
                            </div>
                            <Link to="/communication" className="w-full mt-8 flex items-center justify-center gap-2 bg-[#4F46E5] text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-[#4F46E5]/20">
                                <span className="material-symbols-outlined text-lg">send</span>
                                Send Message
                            </Link>
                        </div>
                    </aside>
                    {/* Main Content */}
                    <div className="w-full lg:w-[70%] space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="flex border-b border-slate-200 dark:border-slate-800 px-6">
                                <button className="px-6 py-4 text-sm font-bold border-b-2 border-[#4F46E5] text-[#4F46E5]">Overview</button>
                            </div>
                            <div className="p-8">
                                <div className="space-y-10">
                                    <section>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Professional Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Job Title</h3>
                                                <p className="font-bold text-slate-900 dark:text-white">{profile.job_title || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Start Date</h3>
                                                <p className="font-bold text-slate-900 dark:text-white">{profile.start_date || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Department</h3>
                                                <p className="font-bold text-slate-900 dark:text-white">Engineering (Default)</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployeeProfile;
