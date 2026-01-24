import React from 'react';
import { Link } from 'react-router-dom';

const GlobalSettings = () => {
    return (
        <div className="flex flex-col min-h-screen font-display bg-background-light dark:bg-background-dark text-[#121117] dark:text-white">
            {/* TopNavBar Component */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dcdce5] dark:border-[#2d2d3d] bg-white dark:bg-[#1a1a2e] px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="size-6">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                        </div>
                        <h2 className="text-[#121117] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">UHDMS</h2>
                    </div>
                    <label className="flex flex-col min-w-40 !h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-[#dcdce5] dark:border-[#2d2d3d]">
                            <div className="text-[#656487] dark:text-[#a1a1c2] flex bg-[#f1f0f4] dark:bg-[#252538] items-center justify-center pl-4">
                                <span className="material-symbols-outlined text-xl">search</span>
                            </div>
                            <input className="form-input flex w-full min-w-0 flex-1 border-none bg-[#f1f0f4] dark:bg-[#252538] text-[#121117] dark:text-white focus:ring-0 h-full placeholder:text-[#656487] px-4 pl-2 text-base font-normal" placeholder="Search settings..." defaultValue="" />
                        </div>
                    </label>
                </div>
                <div className="flex flex-1 justify-end gap-6 items-center">
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f1f0f4] dark:bg-[#252538] text-[#121117] dark:text-white">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f1f0f4] dark:bg-[#252538] text-[#121117] dark:text-white">
                            <span className="material-symbols-outlined">help</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold leading-tight">Alex Rivera</p>
                            <p className="text-xs text-[#656487]">Admin Account</p>
                        </div>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#dcdce5]" data-alt="User profile avatar showing a professional portrait" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1rN4zp0I-ZrZVCkVB6WfHjpHsGVIC8ChWpB98OTwzR2WRdtnGF7SgRav1DpUwOMXPe2Aq5NzfActD6cTY_FUdqmMfA2Ys04M_IlkQyYz8x8ANekUFPIkK98YOTq0MN9EqPCL9oCpqobHBBZGt0aduLjo_P3OBfK7ORsWHKBVkpq4d3bYEPgQTrP45GA-oWlUJRj3DtMeukOsqkmfmzdwUgAiatbPbxsOVA0ZJzBRQ5CKD_47_9vAg5o4Z3ZdhM2svXx_t1TGed2HI")' }}></div>
                    </div>
                </div>
            </header>
            {/* Main Content Layout */}
            <div className="flex flex-1 max-w-[1440px] mx-auto w-full">
                {/* SideNavBar Component (Left Pane) */}
                <aside className="w-72 border-r border-[#dcdce5] dark:border-[#2d2d3d] bg-white dark:bg-[#1a1a2e] flex flex-col p-4 shrink-0">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col px-3">
                            <h1 className="text-[#121117] dark:text-white text-base font-bold leading-normal">Settings</h1>
                            <p className="text-[#656487] text-xs font-normal leading-normal">Manage your global preferences</p>
                        </div>
                        <nav className="flex flex-col gap-1">
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#656487] hover:bg-[#f1f0f4] dark:hover:bg-[#252538] transition-colors" href="#">
                                <span className="material-symbols-outlined">person</span>
                                <span className="text-sm font-medium">Account Settings</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20" href="#">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
                                <span className="text-sm font-bold">Notification Preferences</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#656487] hover:bg-[#f1f0f4] dark:hover:bg-[#252538] transition-colors" href="#">
                                <span className="material-symbols-outlined">security</span>
                                <span className="text-sm font-medium">Privacy & Security</span>
                            </a>
                            <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#656487] hover:bg-[#f1f0f4] dark:hover:bg-[#252538] transition-colors" to="/settings/appearance">
                                <span className="material-symbols-outlined">palette</span>
                                <span className="text-sm font-medium">App Appearance</span>
                            </Link>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#656487] hover:bg-[#f1f0f4] dark:hover:bg-[#252538] transition-colors" href="#">
                                <span className="material-symbols-outlined">extension</span>
                                <span className="text-sm font-medium">Integrations</span>
                            </a>
                        </nav>
                        <div className="mt-8 px-3">
                            <p className="text-[#656487] text-[10px] font-bold uppercase tracking-wider mb-2">Support</p>
                            <div className="flex flex-col gap-1">
                                <a className="flex items-center gap-3 px-3 py-2 text-[#656487] text-sm hover:text-primary transition-colors" href="#">
                                    <span className="material-symbols-outlined text-lg">description</span>
                                    Documentation
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2 text-[#656487] text-sm hover:text-primary transition-colors" href="#">
                                    <span className="material-symbols-outlined text-lg">chat</span>
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* Main Content Area (Right Pane) */}
                <main className="flex-1 bg-background-light dark:bg-background-dark min-w-0">
                    <div className="max-w-[960px] mx-auto py-8 px-8">
                        {/* PageHeading Component */}
                        <div className="flex flex-wrap justify-between gap-3 mb-6">
                            <div className="flex min-w-72 flex-col gap-1">
                                <h2 className="text-[#121117] dark:text-white tracking-tight text-3xl font-bold leading-tight">Notification Preferences</h2>
                                <p className="text-[#656487] text-sm font-normal">Choose how you want to be notified across different platforms and modules.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 text-sm font-bold text-[#656487] hover:text-[#121117] transition-colors">Reset to default</button>
                                <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-opacity-90 transition-colors">Save Changes</button>
                            </div>
                        </div>
                        {/* Tabs Component */}
                        <div className="mb-8">
                            <div className="flex border-b border-[#dcdce5] dark:border-[#2d2d3d] px-2 gap-8 bg-white dark:bg-[#1a1a2e] rounded-t-xl">
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-primary pb-[13px] pt-4 px-2" href="#">
                                    <p className="text-sm font-bold tracking-[0.015em]">All Notifications</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#656487] pb-[13px] pt-4 px-2 hover:text-[#121117]" href="#">
                                    <p className="text-sm font-bold tracking-[0.015em]">HR Module</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#656487] pb-[13px] pt-4 px-2 hover:text-[#121117]" href="#">
                                    <p className="text-sm font-bold tracking-[0.015em]">Dev Module</p>
                                </a>
                            </div>
                            {/* Settings Panel */}
                            <div className="bg-white dark:bg-[#1a1a2e] border-x border-b border-[#dcdce5] dark:border-[#2d2d3d] rounded-b-xl overflow-hidden">
                                {/* HR Section Header */}
                                <div className="px-6 pt-8 pb-4 border-b border-gray-50 dark:border-gray-800">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-primary">groups</span>
                                        <h3 className="text-[#121117] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">HR Notifications</h3>
                                    </div>
                                    <p className="text-[#656487] text-xs">Manage leave updates, payroll alerts, and team changes.</p>
                                </div>
                                {/* Notification Rows */}
                                <div className="divide-y divide-[#f1f0f4] dark:divide-[#2d2d3d]">
                                    {/* Row 1: Leave Updates */}
                                    <div className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 dark:hover:bg-[#212133] transition-colors">
                                        <div className="flex flex-col gap-1 pr-4">
                                            <p className="text-sm font-semibold text-[#121117] dark:text-white">Leave Status Updates</p>
                                            <p className="text-xs text-[#656487]">Get notified when your leave requests are approved or rejected.</p>
                                        </div>
                                        <div className="flex items-center gap-12 shrink-0">
                                            <div className="flex items-center gap-8">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-[10px] font-bold text-[#656487] uppercase">Email</span>
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" id="hr_leave_email" name="hr_leave_email" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300" htmlFor="hr_leave_email"></label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-[10px] font-bold text-[#656487] uppercase">Push</span>
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" id="hr_leave_push" name="hr_leave_push" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300" htmlFor="hr_leave_push"></label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-[10px] font-bold text-[#656487] uppercase">Slack</span>
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" id="hr_leave_slack" name="hr_leave_slack" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300" htmlFor="hr_leave_slack"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Row 2: Payroll Alerts */}
                                    <div className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 dark:hover:bg-[#212133] transition-colors">
                                        <div className="flex flex-col gap-1 pr-4">
                                            <p className="text-sm font-semibold text-[#121117] dark:text-white">Payroll Alerts</p>
                                            <p className="text-xs text-[#656487]">Notifications about salary deposits and tax form availability.</p>
                                        </div>
                                        <div className="flex items-center gap-12 shrink-0">
                                            <div className="flex items-center gap-8">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" id="hr_pay_email" name="hr_pay_email" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300" htmlFor="hr_pay_email"></label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" id="hr_pay_push" name="hr_pay_push" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300" htmlFor="hr_pay_push"></label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" id="hr_pay_slack" name="hr_pay_slack" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300" htmlFor="hr_pay_slack"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Dev Section Header */}
                                <div className="px-6 pt-10 pb-4 border-b border-gray-50 dark:border-gray-800">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-primary">terminal</span>
                                        <h3 className="text-[#121117] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Dev Notifications</h3>
                                    </div>
                                    <p className="text-[#656487] text-xs">Stay updated on task assignments, bug reports, and deployments.</p>
                                </div>
                                <div className="divide-y divide-[#f1f0f4] dark:divide-[#2d2d3d]">
                                    {/* Row 3: Task Assignments */}
                                    <div className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 dark:hover:bg-[#212133] transition-colors">
                                        <div className="flex flex-col gap-1 pr-4">
                                            <p className="text-sm font-semibold text-[#121117] dark:text-white">Task Assignments</p>
                                            <p className="text-xs text-[#656487]">Instant alerts when a new task is assigned to you.</p>
                                        </div>
                                        <div className="flex items-center gap-12 shrink-0">
                                            <div className="flex items-center gap-8">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300"></label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300"></label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Row 4: Bug Mentions */}
                                    <div className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 dark:hover:bg-[#212133] transition-colors">
                                        <div className="flex flex-col gap-1 pr-4">
                                            <p className="text-sm font-semibold text-[#121117] dark:text-white">Bug Mentions</p>
                                            <p className="text-xs text-[#656487]">Be notified when you are tagged in a bug ticket comment.</p>
                                        </div>
                                        <div className="flex items-center gap-12 shrink-0">
                                            <div className="flex items-center gap-8">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300"></label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300"></label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                                                        <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#dcdce5] appearance-none cursor-pointer checked:right-0 right-5 transition-all duration-300" type="checkbox" />
                                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#dcdce5] cursor-pointer transition-all duration-300"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50 dark:bg-[#151525]">
                                    <div className="flex items-center justify-end gap-3">
                                        <button className="px-6 py-2.5 text-sm font-bold text-[#656487] hover:text-[#121117] dark:hover:text-white transition-colors rounded-lg">Cancel</button>
                                        <button className="bg-primary text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-md hover:brightness-110 transition-all">Save All Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
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

export default GlobalSettings;
