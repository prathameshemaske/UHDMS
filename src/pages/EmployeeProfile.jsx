import React from 'react';

const EmployeeProfile = () => {
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
                    <div className="flex-1 max-w-xl">
                        <label className="relative flex items-center">
                            <span className="absolute left-3 text-slate-400 material-symbols-outlined">search</span>
                            <input className="w-full h-10 pl-10 pr-4 rounded-lg border-none bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#4F46E5]/50 text-sm outline-none" placeholder="Search resources..." type="text" />
                        </label>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="hidden xl:flex items-center gap-6">
                        <a className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-[#4F46E5] transition-colors" href="#">Directory</a>
                        <a className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-[#4F46E5] transition-colors" href="#">Teams</a>
                        <a className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-[#4F46E5] transition-colors" href="#">Reports</a>
                    </nav>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
                        </button>
                    </div>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#4F46E5]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDr7UYR5AUFpBknkkUr18w6A40c9kIyHizVxdfCzzpQC8cI6OKwEmxMk_n5o6X51amaNqWcTfskJvpHKyLRVobv8c0p9YmLfG-yvJ9z8_JOfa86XiNFtZU2nBoUov_tjEJKMS_QaAENLX73M_vC0KegbJ6oaMk-a6G4s7M9259SP9iiEcctT1LC7LDPTPsdHBDDEDwYY3EzG_otErQIaqPNZ6AECuDBcVRnoJIFHKmZKIoOChF0kpa6KfS0xLJEsZvmIW4DoCuM8o3U")' }}></div>
                </div>
            </header>
            <main className="flex-1 px-6 lg:px-20 py-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-[30%] space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="size-48 bg-center bg-no-repeat aspect-square bg-cover rounded-2xl border-4 border-slate-50 dark:border-slate-800 shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkNyQDvz5h1-s6L1LvCJc34rRFtUzYwk22IyYu6lTJudDdJV74SKwNI9izr9_1CTVEvmXSl7EQWbgvbLmX_GT99fIa3OhXeDyTXSMKiib4SBMZxdDD7v5ddKjeBJbXmTB8yvKt05kIVhxU8sSCfxiZQxwpSyD2P4gy0_MElS4goaR0ZrahPHy_1UWx3kfk2T3H1J0HLJw0pznV3ol6X_CiQOuRFtZFw3nseB6MKVKkL6nFDhd2ngPLP_NdoyH19F5t-9pv66OYFx6M")' }}></div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-white dark:border-slate-900 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">At Work</div>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Alex Rivera</h1>
                            <p className="text-[#4F46E5] font-semibold">Senior QA Engineer</p>
                            <div className="w-full border-t border-slate-100 dark:border-slate-800 my-6"></div>
                            <div className="w-full space-y-4">
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-xl">mail</span>
                                    <span className="text-sm">alex.rivera@uhdms.io</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-xl">chat</span>
                                    <span className="text-sm">@arivera_qa</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-xl">location_on</span>
                                    <span className="text-sm">Austin, TX (Hybrid)</span>
                                </div>
                            </div>
                            <button className="w-full mt-8 flex items-center justify-center gap-2 bg-[#4F46E5] text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-[#4F46E5]/20">
                                <span className="material-symbols-outlined text-lg">send</span>
                                Send Message
                            </button>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                    <p className="text-2xl font-black text-[#4F46E5]">12</p>
                                    <p className="text-xs text-slate-500">Active Tasks</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                    <p className="text-2xl font-black text-emerald-500">98%</p>
                                    <p className="text-xs text-slate-500">Uptime Score</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                    {/* Main Content */}
                    <div className="w-full lg:w-[70%] space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="flex border-b border-slate-200 dark:border-slate-800 px-6">
                                <button className="px-6 py-4 text-sm font-bold border-b-2 border-[#4F46E5] text-[#4F46E5]">Overview</button>
                                <button className="px-6 py-4 text-sm font-bold text-slate-500 hover:text-[#4F46E5] transition-colors">Projects & Tasks</button>
                                <button className="px-6 py-4 text-sm font-bold text-slate-500 hover:text-[#4F46E5] transition-colors">Performance</button>
                                <button className="px-6 py-4 text-sm font-bold text-slate-500 hover:text-[#4F46E5] transition-colors">Documents</button>
                            </div>
                            <div className="p-8">
                                <div className="space-y-10">
                                    <section>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Professional Bio</h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Senior Quality Assurance Engineer with over 8 years of experience in automated testing and continuous integration. Alex specializes in building robust testing frameworks for hybrid cloud environments and has been a core member of the UHDMS engineering team since 2021.
                                        </p>
                                    </section>
                                    <section>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Skills & Expertise</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Selenium', 'Python', 'Jenkins', 'Load Testing', 'API Automation', 'Cybersecurity', 'JIRA'].map(skill => (
                                                <span key={skill} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-[#4F46E5] text-xs font-bold rounded-full border border-indigo-100 dark:border-indigo-800">{skill}</span>
                                            ))}
                                        </div>
                                    </section>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Department</h3>
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-[#4F46E5]">engineering</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">Engineering</p>
                                                    <p className="text-xs text-slate-500">Quality Assurance Division</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Reporting Manager</h3>
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 bg-center bg-cover rounded-full" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDEpiQqc_N8BStHF-G2pjQab3V8IMKo7OXNdZ5PdVU4iiKY--p-qPymtG1RHttHXsOkFoqsSAJCHoZ8wAtGAID2AA5AGXZhRiP5QT3E2BassE52-8gLt7HK2DQ67r3vLh8WKUeIDTvA5RUGsmWCyMydgZSRic0F0jM27bbQAmnHT6qvcmSzx3dlT5YDn_0sAw6VqDQeUC6I9ZnN24Yd97t6lHXEgZWZs4j2Kla-1JRs-vU4PFjS5RuXka7BDaxepk6DYdRhHCqPci06")' }}></div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">James Wilson</p>
                                                    <p className="text-xs text-slate-500">VP of Engineering</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#4F46E5]">assignment</span>
                                    Active Projects & Tasks
                                </h3>
                                <span className="text-xs font-bold text-slate-400">DEV MODULE V2.4</span>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="p-6 flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="font-bold text-slate-900 dark:text-white">Regression Suite Automation - Phase 3</p>
                                        <p className="text-xs text-slate-500">Project: Core Infrastructure • Due in 2 days</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase rounded">High Priority</span>
                                            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase rounded">In Progress</span>
                                        </div>
                                    </div>
                                    <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
                                        <div className="h-full bg-[#4F46E5] w-3/4"></div>
                                    </div>
                                </div>
                                <div className="p-6 flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="font-bold text-slate-900 dark:text-white">Security Vulnerability Audit (UAT)</p>
                                        <p className="text-xs text-slate-500">Project: Security Compliance • Due next week</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase rounded">Maintenance</span>
                                            <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-[#4F46E5] text-[10px] font-black uppercase rounded">Planning</span>
                                        </div>
                                    </div>
                                    <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
                                        <div className="h-full bg-[#4F46E5] w-1/5"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 text-center">
                                <button className="text-sm font-bold text-[#4F46E5] hover:underline">View All Tasks in Dev Module</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="mt-auto py-6 text-center text-slate-500 dark:text-slate-400 text-xs border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                © 2024 UHDMS Platform • Hybrid HR & Development Ecosystem • All rights reserved.
            </footer>
        </div>
    );
};

export default EmployeeProfile;
