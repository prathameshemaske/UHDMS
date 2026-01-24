import React from 'react';

const CompanySystemSettings = () => {
    return (
        <div className="flex flex-col min-h-screen font-display bg-background-light dark:bg-background-dark text-[#121117] dark:text-white">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#2d2c3d] bg-white dark:bg-background-dark px-10 py-3 sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-primary">
                            <div className="size-6">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                            </div>
                            <h2 className="text-[#121117] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">UHDMS</h2>
                        </div>
                        <nav className="flex items-center gap-9">
                            <a className="text-[#656487] dark:text-gray-400 hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Dashboard</a>
                            <a className="text-[#121117] dark:text-white text-sm font-bold border-b-2 border-primary leading-normal" href="#">System Settings</a>
                            <a className="text-[#656487] dark:text-gray-400 hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Reports</a>
                            <a className="text-[#656487] dark:text-gray-400 hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">User Management</a>
                        </nav>
                    </div>
                    <div className="flex flex-1 justify-end gap-4">
                        <label className="flex flex-col min-w-40 !h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-[#656487] flex border-none bg-background-light dark:bg-[#2d2c3d] items-center justify-center pl-4 rounded-l-lg">
                                    <span className="material-symbols-outlined text-xl">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 border-none bg-background-light dark:bg-[#2d2c3d] text-[#121117] dark:text-white focus:ring-0 h-full placeholder:text-[#656487] px-4 rounded-r-lg pl-2 text-base font-normal" placeholder="Search settings..." defaultValue="" />
                            </div>
                        </label>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-background-light dark:bg-[#2d2c3d] text-[#121117] dark:text-white">
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-background-light dark:bg-[#2d2c3d] text-[#121117] dark:text-white">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                        </div>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200" data-alt="User profile avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKp-OBRkiMgJszL1FZh9laKyvi68mEAGD4ch3erEQW6EpumQANEEfTsQl2NB0LEo_9RtoWaMcikuhx2GCiMlNFx3_IbYZclsxjjDHebRuun6aDoYQrjM8y30gUl2pmRb-9383BCxNkGnfDa_cSWtnmo6BMAEptqye_vvxy3JuuAsDMhKJDGTIb6xzq4Lspc8-yHUWIEncOBaAeQnUAk3hVjef-wqRUn5crhqDTindWTIShggEWG3uQ3iCGgVEEmw9A1AWl5RqtRhSw")' }}></div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col md:flex-row max-w-[1400px] mx-auto w-full">
                    {/* Side Navigation */}
                    <aside className="w-full md:w-64 flex flex-col border-r border-[#e5e7eb] dark:border-[#2d2c3d] bg-white dark:bg-background-dark p-4 gap-6">
                        <div className="flex gap-3 items-center">
                            <div className="bg-primary/10 text-primary rounded-lg p-2">
                                <span className="material-symbols-outlined">admin_panel_settings</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-[#121117] dark:text-white text-base font-bold">System Admin</h1>
                                <p className="text-[#656487] dark:text-gray-400 text-xs">Global Configuration</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <a className="flex items-center gap-3 px-3 py-2 text-[#656487] dark:text-gray-400 hover:bg-background-light dark:hover:bg-[#2d2c3d] rounded-lg" href="#">
                                <span className="material-symbols-outlined">dashboard</span>
                                <span className="text-sm font-medium">Overview</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2 text-[#656487] dark:text-gray-400 hover:bg-background-light dark:hover:bg-[#2d2c3d] rounded-lg" href="#">
                                <span className="material-symbols-outlined">corporate_fare</span>
                                <span className="text-sm font-medium">Company Profile</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg font-bold" href="#">
                                <span className="material-symbols-outlined fill-1">palette</span>
                                <span className="text-sm">Branding</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2 text-[#656487] dark:text-gray-400 hover:bg-background-light dark:hover:bg-[#2d2c3d] rounded-lg" href="#">
                                <span className="material-symbols-outlined">calendar_today</span>
                                <span className="text-sm font-medium">Scheduling</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2 text-[#656487] dark:text-gray-400 hover:bg-background-light dark:hover:bg-[#2d2c3d] rounded-lg" href="#">
                                <span className="material-symbols-outlined">security</span>
                                <span className="text-sm font-medium">Access Control</span>
                            </a>
                        </div>
                    </aside>
                    {/* Main Content Area */}
                    <main className="flex-1 flex flex-col p-8 gap-8 overflow-y-auto max-w-4xl mx-auto">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm">
                            <a className="text-[#656487] dark:text-gray-400" href="#">Settings</a>
                            <span className="text-[#656487]">/</span>
                            <span className="text-[#121117] dark:text-white font-medium">System Customization</span>
                        </nav>
                        {/* Page Heading */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[#121117] dark:text-white text-4xl font-black tracking-tight">Company & System Settings</h1>
                            <p className="text-[#656487] dark:text-gray-400 text-lg">Manage your organization's visual identity and global operational rules.</p>
                        </div>
                        {/* Branding Section */}
                        <section className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e5e7eb] dark:border-[#2d2c3d] shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary">brush</span>
                                <h2 className="text-xl font-bold">Visual Branding</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Logo Upload */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-[#656487]">Company Logo</label>
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-background-light dark:bg-[#2d2c3d] group hover:border-primary transition-colors cursor-pointer">
                                        <div className="bg-white dark:bg-background-dark rounded-full p-4 mb-3 shadow-sm border border-gray-100 dark:border-gray-800">
                                            <div className="size-16 bg-contain bg-no-repeat bg-center" data-alt="Current UHDMS Logo preview" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnj2tk-oktawj30lrxcgwbQkt905h7F6oUIAMBDgFxGaBSjUOdBrO8WOt4NHNM1snLbvb8EM0d2IVEpL8LCZXvfBB1QkI02ftKiL14m_8xbX6ptUZnMSkP-cmX66EtoNdqoNkT2DJwodFgkNm_EHIYpb9dV81l5xhknw1U4ZCEpopbUncPy0y8WpXwRP2FBJsLN1Q94VyCWdra64CvHQOFsFzeawcwAXG9MCZGBM0MTj-Xs5DJfoGXvARV0LBs_IPvDbuY-94q8-o0')" }}></div>
                                        </div>
                                        <button className="text-primary text-sm font-bold flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">upload</span> Change Logo
                                        </button>
                                        <p className="text-xs text-gray-500 mt-2 text-center">SVG, PNG, or JPG (max. 2MB).<br />Recommended: 512x512px.</p>
                                    </div>
                                </div>
                                {/* Brand Colors */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-[#656487]">Primary Brand Color</label>
                                    <div className="p-4 bg-background-light dark:bg-[#2d2c3d] rounded-xl space-y-4">
                                        <div className="flex flex-wrap gap-3">
                                            <button className="size-10 rounded-full bg-[#5d55e7] ring-4 ring-primary/30 border-2 border-white"></button>
                                            <button className="size-10 rounded-full bg-[#0ea5e9] border-2 border-transparent"></button>
                                            <button className="size-10 rounded-full bg-[#10b981] border-2 border-transparent"></button>
                                            <button className="size-10 rounded-full bg-[#f43f5e] border-2 border-transparent"></button>
                                            <button className="size-10 rounded-full bg-[#f59e0b] border-2 border-transparent"></button>
                                            <button className="size-10 rounded-full bg-white dark:bg-background-dark border-2 border-gray-300 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-gray-400 text-xl">add</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded border border-gray-300 dark:border-gray-600 bg-primary"></div>
                                            <input className="form-input text-sm font-mono border-gray-300 dark:border-gray-600 dark:bg-[#1a192d] rounded-lg w-full focus:border-primary focus:ring-primary" type="text" defaultValue="#5d55e7" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Operational Settings Section */}
                        <section className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e5e7eb] dark:border-[#2d2c3d] shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary">schedule</span>
                                <h2 className="text-xl font-bold">Operational Hours</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                        <span className="text-sm font-medium">Monday - Friday</span>
                                        <div className="md:col-span-3 flex items-center gap-4">
                                            <input className="form-input rounded-lg border-gray-300 dark:border-gray-600 dark:bg-[#2d2c3d] focus:ring-primary focus:border-primary" type="time" defaultValue="09:00" />
                                            <span className="text-gray-400">to</span>
                                            <input className="form-input rounded-lg border-gray-300 dark:border-gray-600 dark:bg-[#2d2c3d] focus:ring-primary focus:border-primary" type="time" defaultValue="17:00" />
                                            <span className="ml-auto flex items-center gap-2 text-xs text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                                                <span className="size-2 rounded-full bg-green-500"></span> Active
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                        <span className="text-sm font-medium">Saturday - Sunday</span>
                                        <div className="md:col-span-3 flex items-center gap-4">
                                            <p className="text-sm text-[#656487]">Closed</p>
                                            <button className="ml-auto text-primary text-sm font-bold">Define Hours</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-[#656487] block mb-4">Upcoming Holidays</label>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-background-light dark:bg-[#2d2c3d] rounded-full border border-gray-200 dark:border-gray-700">
                                            <span className="text-xs font-bold">Independence Day</span>
                                            <span className="text-xs text-[#656487]">July 4</span>
                                            <button className="material-symbols-outlined text-xs text-gray-400 hover:text-red-500">close</button>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-background-light dark:bg-[#2d2c3d] rounded-full border border-gray-200 dark:border-gray-700">
                                            <span className="text-xs font-bold">Labor Day</span>
                                            <span className="text-xs text-[#656487]">Sept 2</span>
                                            <button className="material-symbols-outlined text-xs text-gray-400 hover:text-red-500">close</button>
                                        </div>
                                        <button className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors">
                                            <span className="material-symbols-outlined text-sm">add</span>
                                            <span className="text-xs font-bold">Add Holiday</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Access Control Section */}
                        <section className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e5e7eb] dark:border-[#2d2c3d] shadow-sm mb-20">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">key</span>
                                    <h2 className="text-xl font-bold">Platform Roles</h2>
                                </div>
                            </div>
                            <div className="overflow-hidden border border-gray-100 dark:border-gray-800 rounded-lg">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-background-light dark:bg-[#2d2c3d]">
                                            <th className="px-4 py-3 text-xs font-bold uppercase text-[#656487] tracking-wider">Role Name</th>
                                            <th className="px-4 py-3 text-xs font-bold uppercase text-[#656487] tracking-wider">Description</th>
                                            <th className="px-4 py-3 text-xs font-bold uppercase text-[#656487] tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        <tr className="hover:bg-background-light/50 dark:hover:bg-[#2d2c3d]/50 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-xl">shield_person</span>
                                                    <span className="font-bold">Admin</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-[#656487]">Full access to all system settings, billing, and user management.</td>
                                            <td className="px-4 py-4 text-right">
                                                <a className="text-primary text-sm font-bold hover:underline" href="#">Manage Permissions</a>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-background-light/50 dark:hover:bg-[#2d2c3d]/50 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-xl">supervisor_account</span>
                                                    <span className="font-bold">Manager</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-[#656487]">Can manage department teams, schedules, and view specific reports.</td>
                                            <td className="px-4 py-4 text-right">
                                                <a className="text-primary text-sm font-bold hover:underline" href="#">Manage Permissions</a>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-background-light/50 dark:hover:bg-[#2d2c3d]/50 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-xl">person</span>
                                                    <span className="font-bold">Employee</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-[#656487]">Restricted access. Can view their own profile and task assignments.</td>
                                            <td className="px-4 py-4 text-right">
                                                <a className="text-primary text-sm font-bold hover:underline" href="#">Manage Permissions</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </main>
                </div>
                {/* Sticky Footer Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a192d] border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                    <div className="max-w-[1400px] mx-auto flex justify-between items-center md:px-64 px-4">
                        <p className="text-sm text-[#656487] hidden md:block">Unsaved changes will be lost if you leave this page.</p>
                        <div className="flex gap-4 ml-auto">
                            <button className="px-6 py-2 rounded-lg bg-background-light dark:bg-[#2d2c3d] text-[#121117] dark:text-white font-bold text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Discard
                            </button>
                            <button className="px-8 py-2 rounded-lg bg-primary text-white font-bold text-sm shadow-md hover:brightness-110 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">save</span>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #5d55e7;
                }
                .toggle-checkbox:checked + .toggle-label::after {
                    transform: translateX(100%);
                }
            `}</style>
        </div>
    );
};

export default CompanySystemSettings;
