import React, { useState } from 'react';

const EmployeeDashboard = () => {
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-display text-[#0f0e1b] dark:text-[#f9f8fb] overflow-hidden">
            {/* Modal Overlay */}
            {isLeaveModalOpen && (
                <div className="fixed inset-0 z-[60] bg-[#0f0e1b]/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#1a192d] w-full max-w-[560px] rounded-lg shadow-2xl border border-[#e8e8f3] dark:border-[#2a2945] flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#0f0e1b] dark:text-white">Apply for Leave</h2>
                            <button
                                onClick={() => setIsLeaveModalOpen(false)}
                                className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5] transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Leave Type</label>
                                <select className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] py-2.5">
                                    <option disabled selected value="">Select leave type</option>
                                    <option value="sick">Sick Leave</option>
                                    <option value="casual">Casual Leave</option>
                                    <option value="paid">Paid Leave</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Start Date</label>
                                    <input className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] py-2.5" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">End Date</label>
                                    <input className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] py-2.5" type="date" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Total Days</label>
                                <input className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-[#f8f9fa] dark:bg-[#121121] text-sm text-[#545095] cursor-not-allowed py-2.5" readOnly type="text" value="0" />
                                <p className="text-[11px] text-[#545095] dark:text-gray-500 italic">Total days are calculated automatically excluding weekends.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Reason for Leave</label>
                                <textarea className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] py-2.5" placeholder="Please describe the reason for your application..." rows="3"></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Supporting Documents (Optional)</label>
                                <div className="border-2 border-dashed border-[#e8e8f3] dark:border-[#2a2945] rounded-lg p-6 flex flex-col items-center justify-center bg-[#f6f6f8]/30 dark:bg-[#21203b]/30 hover:bg-[#5048e5]/5 transition-colors cursor-pointer group">
                                    <span className="material-symbols-outlined text-[#5048e5] mb-2">cloud_upload</span>
                                    <p className="text-xs text-[#545095] dark:text-gray-400 font-medium group-hover:text-[#5048e5]">Click to upload or drag and drop</p>
                                    <p className="text-[10px] text-[#545095] dark:text-gray-500 mt-1 uppercase">PDF, JPG or PNG (Max 5MB)</p>
                                    <input className="hidden" type="file" />
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-end gap-3">
                            <button
                                onClick={() => setIsLeaveModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-semibold text-[#545095] dark:text-gray-300 hover:bg-[#f6f6f8] dark:hover:bg-[#21203b] rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-2.5 text-sm font-semibold bg-[#5048e5] text-white rounded-lg shadow-md hover:bg-[#5048e5]/90 transition-all">
                                Submit Application
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content (Blurred when modal open) */}
            <div className={`flex flex-col min-h-screen transition-all duration-300 ${isLeaveModalOpen ? 'blur-[2px] pointer-events-none select-none' : ''}`}>

                {/* Navigation Bar */}
                <header className="sticky top-0 z-50 bg-white dark:bg-[#1a192d] border-b border-solid border-[#e8e8f3] dark:border-[#2a2945] px-4 md:px-10 lg:px-40 py-3">
                    <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-4 text-[#5048e5]">
                                <div className="size-6">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                                </div>
                                <h2 className="text-[#0f0e1b] dark:text-white text-xl font-bold leading-tight tracking-tight">UHDMS</h2>
                            </div>
                            <nav className="hidden md:flex items-center gap-9">
                                <a className="text-[#5048e5] text-sm font-semibold border-b-2 border-[#5048e5] pb-1" href="#">Dashboard</a>
                                <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="#">My Profile</a>
                                <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="#">Directory</a>
                                <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="#">Help</a>
                            </nav>
                        </div>
                        <div className="flex flex-1 justify-end gap-6 items-center">
                            <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                    <div className="text-[#545095] flex border-none bg-[#e8e8f3] dark:bg-[#2a2945] items-center justify-center pl-4 rounded-l-lg border-r-0">
                                        <span className="material-symbols-outlined text-xl">search</span>
                                    </div>
                                    <input className="form-input flex w-full min-w-0 flex-1 rounded-lg text-[#0f0e1b] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8e8f3] dark:bg-[#2a2945] h-full placeholder:text-[#545095] px-4 rounded-l-none pl-2 text-sm" placeholder="Search apps, tasks..." />
                                </div>
                            </label>
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#e8e8f3] dark:bg-[#2a2945] text-[#0f0e1b] dark:text-white">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#5048e5]/20" data-alt="User profile avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB567yJtt72JTuJAVT2sBfrYEM1wCCWErR4yJLfdUvpGcq1DPJ9E6wY-Cj_TCWZwhwEjQgH9dSQ3A1KZQXWOTGGbrH_IylPvQ8aCCfa3y4dpJMzHszhtoo5Y6kqr6pJ-Rri_mJlhXKcBJgfS2p-_GcMBvCclX7uK7JL7io2X7WCU9jUDWRPgTwLtloDI97c8mlEMSX_Hj4h5uiWBr3P1fjbCgFN4CtN66XTxIlRpS2mFS7lsZFwl6xYHEPyNaN3o8StGtYeU5VZVtSk")' }}></div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 px-4 md:px-10 lg:px-40 py-8 max-w-[1280px] mx-auto w-full">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 mb-6 text-sm font-medium">
                        <a className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5]" href="#">Home</a>
                        <span className="text-[#545095] dark:text-gray-600">/</span>
                        <span className="text-[#0f0e1b] dark:text-white">Dashboard</span>
                    </div>
                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* 1. Attendance Card (Left, 2/3 width) */}
                        <div className="col-span-12 lg:col-span-8">
                            <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] overflow-hidden">
                                <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <p className="text-[#545095] dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Attendance Tracker</p>
                                        <h3 className="text-[#0f0e1b] dark:text-white text-3xl font-bold tracking-tight mb-2">06:42:15</h3>
                                        <p className="text-[#545095] dark:text-gray-400 text-base">Hours Worked Today • <span className="text-green-500 font-medium">Status: Logged In</span></p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#5048e5] text-white text-base font-bold transition-all hover:bg-[#5048e5]/90 shadow-md">
                                            <span className="material-symbols-outlined">logout</span>
                                            <span>Clock Out</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-[#f6f6f8] dark:bg-[#21203b] px-6 py-3 border-t border-[#e8e8f3] dark:border-[#2a2945] flex justify-between text-xs font-medium text-[#545095] dark:text-gray-400">
                                    <span>Last sync: 1 minute ago</span>
                                    <span>Shift: General (09:00 - 18:00)</span>
                                </div>
                            </div>
                            {/* 3. My Tasks (Below Attendance) */}
                            <div className="mt-6 bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945]">
                                <div className="p-6 border-b border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-[#0f0e1b] dark:text-white">My Tasks</h2>
                                    <button className="text-[#5048e5] text-sm font-semibold hover:underline">View All Tasks</button>
                                </div>
                                <div className="divide-y divide-[#e8e8f3] dark:divide-[#2a2945]">
                                    {/* Task 1 */}
                                    <div className="p-6 flex items-center justify-between hover:bg-[#f6f6f8]/50 dark:hover:bg-[#21203b] transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg p-2 flex items-center justify-center">
                                                <span className="material-symbols-outlined">priority_high</span>
                                            </div>
                                            <div>
                                                <h4 className="text-[#0f0e1b] dark:text-white font-semibold">Q3 Financial Reporting Revision</h4>
                                                <p className="text-sm text-[#545095] dark:text-gray-400">UHDMS Finance Project</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 text-right">
                                            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Urgent</span>
                                            <span className="text-xs text-[#545095] dark:text-gray-500">Due: Today, 5:00 PM</span>
                                        </div>
                                    </div>
                                    {/* Task 2 */}
                                    <div className="p-6 flex items-center justify-between hover:bg-[#f6f6f8]/50 dark:hover:bg-[#21203b] transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 bg-[#5048e5]/10 text-[#5048e5] rounded-lg p-2 flex items-center justify-center">
                                                <span className="material-symbols-outlined">assignment</span>
                                            </div>
                                            <div>
                                                <h4 className="text-[#0f0e1b] dark:text-white font-semibold">Review Employee Onboarding Flow</h4>
                                                <p className="text-sm text-[#545095] dark:text-gray-400">Product Design</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 text-right">
                                            <span className="px-3 py-1 bg-[#5048e5]/10 text-[#5048e5] text-xs font-bold rounded-full">In Progress</span>
                                            <span className="text-xs text-[#545095] dark:text-gray-500">Due: Tomorrow</span>
                                        </div>
                                    </div>
                                    {/* Task 3 */}
                                    <div className="p-6 flex items-center justify-between hover:bg-[#f6f6f8]/50 dark:hover:bg-[#21203b] transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg p-2 flex items-center justify-center">
                                                <span className="material-symbols-outlined">inventory</span>
                                            </div>
                                            <div>
                                                <h4 className="text-[#0f0e1b] dark:text-white font-semibold">Inventory Audit Documentation</h4>
                                                <p className="text-sm text-[#545095] dark:text-gray-400">Operations</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 text-right">
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-full">Pending</span>
                                            <span className="text-xs text-[#545095] dark:text-gray-500">Due: Oct 28, 2023</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right Column (1/3 width) */}
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                            {/* 2. Leave Balance */}
                            <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] p-6">
                                <h2 className="text-lg font-bold text-[#0f0e1b] dark:text-white mb-6">Leave Balance</h2>
                                <div className="flex flex-col items-center">
                                    <div className="relative flex items-center justify-center mb-6">
                                        <div className="size-40 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#5048e5 0% 75%, #e8e8f3 75% 100%)' }}>
                                            <div className="size-32 bg-white dark:bg-[#1a192d] rounded-full flex flex-col items-center justify-center">
                                                <span className="text-2xl font-bold text-[#5048e5]">15</span>
                                                <span className="text-xs text-[#545095] dark:text-gray-400 font-medium">OF 20 DAYS</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="size-3 rounded-full bg-[#5048e5]"></span>
                                                <span className="text-[#0f0e1b] dark:text-white font-medium">Available</span>
                                            </div>
                                            <span className="text-[#545095] dark:text-gray-400">15 Days</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="size-3 rounded-full bg-[#e8e8f3] dark:bg-[#2a2945]"></span>
                                                <span className="text-[#0f0e1b] dark:text-white font-medium">Taken</span>
                                            </div>
                                            <span className="text-[#545095] dark:text-gray-400">5 Days</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.location.href = '/leave-history'}
                                        className="w-full mt-6 py-2 text-[#5048e5] font-semibold text-sm border border-[#5048e5]/20 rounded-lg hover:bg-[#5048e5]/5 transition-colors"
                                    >
                                        History Details
                                    </button>
                                </div>
                            </div>
                            {/* 4. Quick Links */}
                            <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] p-6">
                                <h2 className="text-lg font-bold text-[#0f0e1b] dark:text-white mb-6">Quick Actions</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        onClick={() => window.location.href = '/employee-payslips'}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f6f6f8] dark:bg-[#21203b] hover:bg-[#5048e5] hover:text-white group transition-all"
                                    >
                                        <div className="size-10 rounded-lg bg-white dark:bg-[#2a2945] text-[#5048e5] flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">receipt_long</span>
                                        </div>
                                        <span className="font-bold text-sm">Download Payslip</span>
                                        <span className="material-symbols-outlined ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                                    </button>
                                    <button
                                        onClick={() => setIsLeaveModalOpen(true)}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f6f6f8] dark:bg-[#21203b] hover:bg-[#5048e5] hover:text-white group transition-all"
                                    >
                                        <div className="size-10 rounded-lg bg-white dark:bg-[#2a2945] text-[#5048e5] flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">event_available</span>
                                        </div>
                                        <span className="font-bold text-sm">Apply for Leave</span>
                                        <span className="material-symbols-outlined ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/it-support'}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f6f6f8] dark:bg-[#21203b] hover:bg-[#5048e5] hover:text-white group transition-all"
                                    >
                                        <div className="size-10 rounded-lg bg-white dark:bg-[#2a2945] text-[#5048e5] flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">support_agent</span>
                                        </div>
                                        <span className="font-bold text-sm">IT Support Ticket</span>
                                        <span className="material-symbols-outlined ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Bottom Footer Info */}
                <footer className="mt-auto px-40 py-6 border-t border-[#e8e8f3] dark:border-[#2a2945] text-center text-xs text-[#545095] dark:text-gray-500">
                    © 2023 UHDMS Platform • Enterprise Human Resource Management System
                </footer>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
