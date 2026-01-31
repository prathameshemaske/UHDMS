import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const EmployeeProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [onboardingData, setOnboardingData] = useState(null);
    const [offboardingData, setOffboardingData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await authService.getProfileById(id);
                setProfile(data);

                // Fetch lifecycle details
                const { data: obData } = await authService.supabase
                    .from('onboarding_details')
                    .select('*')
                    .eq('employee_id', id)
                    .single();
                setOnboardingData(obData);

                const { data: offData } = await authService.supabase
                    .from('offboarding_details')
                    .select('*')
                    .eq('employee_id', id)
                    .single();
                setOffboardingData(offData);

            } catch (err) {
                console.error("Error fetching profile:", err);
                setError(`Failed to load employee profile: ${err.message || JSON.stringify(err)}`);
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
                                <div className="size-48 bg-center bg-no-repeat aspect-square bg-cover rounded-2xl border-4 border-slate-50 dark:border-slate-800 shadow-lg" style={{ backgroundImage: `url("${profile.avatar_url || 'https://ui-avatars.com/api/?name=' + profile.first_name + '&background=random'}")` }}></div>
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
                                <button onClick={() => setActiveTab('overview')} className={`px-6 py-4 text-sm font-bold border-b-2 ${activeTab === 'overview' ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                                <button onClick={() => setActiveTab('onboarding')} className={`px-6 py-4 text-sm font-bold border-b-2 ${activeTab === 'onboarding' ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Onboarding</button>
                                <button onClick={() => setActiveTab('offboarding')} className={`px-6 py-4 text-sm font-bold border-b-2 ${activeTab === 'offboarding' ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Offboarding</button>
                            </div>
                            <div className="p-8">
                                {activeTab === 'overview' && (
                                    <div className="space-y-10">
                                        <section>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Professional Details</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Designation</h3>
                                                    <p className="font-bold text-slate-900 dark:text-white">{profile.job_title || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Joining Date</h3>
                                                    <p className="font-bold text-slate-900 dark:text-white">{profile.start_date || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Department</h3>
                                                    <p className="font-bold text-slate-900 dark:text-white">{profile.department || 'Engineering'}</p>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )}

                                {activeTab === 'onboarding' && (
                                    <div className="space-y-6">
                                        {onboardingData ? (
                                            <>
                                                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-4">
                                                    <p className="font-bold text-indigo-800">Status: {onboardingData.status}</p>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="font-bold text-slate-700 mb-2">Assets Allocated</h4>
                                                        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                                                            {onboardingData.asset_details?.laptop_required && <li>Laptop (Serial: {onboardingData.asset_details.asset_serial})</li>}
                                                        </ul>

                                                        {onboardingData.asset_details?.physical_access && (
                                                            <div className="mt-3">
                                                                <h5 className="text-xs font-bold text-slate-500 uppercase mb-1">Physical Access</h5>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {Array.isArray(onboardingData.asset_details.physical_access) ?
                                                                        onboardingData.asset_details.physical_access.map((tag, i) => (
                                                                            <span key={i} className="px-2 py-1 bg-slate-100 rounded text-xs border border-slate-200">{tag}</span>
                                                                        ))
                                                                        : <span className="text-sm text-slate-600">{onboardingData.asset_details.physical_access}</span>}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-700 mb-2">Software Access</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {Array.isArray(onboardingData.asset_details?.software_access) && onboardingData.asset_details.software_access.length > 0 ? (
                                                                onboardingData.asset_details.software_access.map(sw => (
                                                                    <span key={sw} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs border border-indigo-100 font-medium">{sw}</span>
                                                                ))
                                                            ) : <p className="text-sm text-slate-400 italic">None assigned</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-slate-500 italic">No onboarding details found.</p>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'offboarding' && (
                                    <div className="space-y-6">
                                        {offboardingData ? (
                                            <>
                                                <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 mb-4">
                                                    <p className="font-bold text-rose-800">Status: {offboardingData.status}</p>
                                                    <p className="text-sm text-rose-600">Last Working Day: {offboardingData.termination_details?.last_working_day}</p>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="font-bold text-slate-700 mb-2">Exit Details</h4>
                                                        <p className="text-sm text-slate-600">Reason: {offboardingData.termination_details?.reason}</p>
                                                        <p className="text-sm text-slate-600">Notice Served: {offboardingData.termination_details?.notice_period_served ? 'Yes' : 'No'}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-700 mb-2">Financial Settlement</h4>
                                                        <p className="text-sm text-slate-600">Final Dues: ₹{offboardingData.final_settlement?.final_dues}</p>
                                                        <p className="text-sm text-slate-600">Gratuity Eligible: {offboardingData.final_settlement?.gratuity_eligible ? 'Yes' : 'No'}</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-slate-500 italic">No offboarding details found.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployeeProfile;
