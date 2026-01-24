import React from 'react';

const LeaveHistory = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-display text-[#0f0e1b] dark:text-[#f9f8fb]">
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
                            <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="/employee-dashboard">Dashboard</a>
                            <a className="text-[#5048e5] text-sm font-semibold border-b-2 border-[#5048e5] pb-1" href="#">Leave History</a>
                            <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="#">My Profile</a>
                            <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="#">Directory</a>
                        </nav>
                    </div>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#e8e8f3] dark:bg-[#2a2945] text-[#0f0e1b] dark:text-white">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#5048e5]/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB567yJtt72JTuJAVT2sBfrYEM1wCCWErR4yJLfdUvpGcq1DPJ9E6wY-Cj_TCWZwhwEjQgH9dSQ3A1KZQXWOTGGbrH_IylPvQ8aCCfa3y4dpJMzHszhtoo5Y6kqr6pJ-Rri_mJlhXKcBJgfS2p-_GcMBvCclX7uK7JL7io2X7WCU9jUDWRPgTwLtloDI97c8mlEMSX_Hj4h5uiWBr3P1fjbCgFN4CtN66XTxIlRpS2mFS7lsZFwl6xYHEPyNaN3o8StGtYeU5VZVtSk")' }}></div>
                    </div>
                </div>
            </header>
            <main className="flex-1 px-4 md:px-10 lg:px-40 py-8 max-w-[1280px] mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                            <a className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5]" href="/employee-dashboard">Home</a>
                            <span className="text-[#545095] dark:text-gray-600">/</span>
                            <span className="text-[#0f0e1b] dark:text-white">Leave History</span>
                        </div>
                        <h1 className="text-2xl font-bold text-[#0f0e1b] dark:text-white">Leave Application History</h1>
                        <p className="text-sm text-[#545095] dark:text-gray-400 mt-1">View and manage your past leave requests and their statuses.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-6 h-11 bg-[#5048e5] text-white rounded-lg font-semibold hover:bg-[#5048e5]/90 transition-all shadow-sm">
                        <span className="material-symbols-outlined">add</span>
                        <span>Apply for Leave</span>
                    </button>
                </div>
                <div className="bg-white dark:bg-[#1a192d] p-4 rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] mb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-full sm:w-48">
                            <label className="block text-xs font-semibold text-[#545095] dark:text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Year</label>
                            <select className="form-select w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-[#f8f9fa] dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5]">
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-48">
                            <label className="block text-xs font-semibold text-[#545095] dark:text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Status</label>
                            <select className="form-select w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-[#f8f9fa] dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5]">
                                <option>All Statuses</option>
                                <option>Approved</option>
                                <option>Pending</option>
                                <option>Rejected</option>
                            </select>
                        </div>
                        <div className="ml-auto flex items-center gap-2 self-end">
                            <button className="p-2 text-[#545095] dark:text-gray-400 hover:bg-[#f6f6f8] dark:hover:bg-[#2a2945] rounded-lg">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                            <button className="p-2 text-[#545095] dark:text-gray-400 hover:bg-[#f6f6f8] dark:hover:bg-[#2a2945] rounded-lg">
                                <span className="material-symbols-outlined">download</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f6f6f8] dark:bg-[#21203b] border-b border-[#e8e8f3] dark:border-[#2a2945]">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Leave Type</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Dates</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400 text-center">Total Days</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Approved By</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8e8f3] dark:divide-[#2a2945]">
                                <tr className="hover:bg-[#f6f6f8]/30 dark:hover:bg-[#21203b]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-[#5048e5]/10 text-[#5048e5] flex items-center justify-center">
                                                <span className="material-symbols-outlined text-lg">medical_services</span>
                                            </div>
                                            <span className="font-semibold text-[#0f0e1b] dark:text-white">Sick Leave</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#545095] dark:text-gray-300">
                                        Oct 12 - Oct 14, 2023
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center font-medium">3</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Approved</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-slate-200"></div>
                                            <span className="text-sm font-medium">Jonathan Sterling</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#545095] hover:text-[#5048e5] transition-colors">
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#f6f6f8]/30 dark:hover:bg-[#21203b]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-lg">beach_access</span>
                                            </div>
                                            <span className="font-semibold text-[#0f0e1b] dark:text-white">Annual Leave</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#545095] dark:text-gray-300">
                                        Nov 01 - Nov 05, 2023
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center font-medium">5</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Pending</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-[#545095] italic">Awaiting Review</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#545095] hover:text-[#5048e5] transition-colors">
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#f6f6f8]/30 dark:hover:bg-[#21203b]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-slate-100 text-slate-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-lg">event_busy</span>
                                            </div>
                                            <span className="font-semibold text-[#0f0e1b] dark:text-white">Unpaid Leave</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#545095] dark:text-gray-300">
                                        Sep 20 - Sep 21, 2023
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center font-medium">2</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">Rejected</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-slate-200"></div>
                                            <span className="text-sm font-medium">Sarah Jenkins</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#545095] hover:text-[#5048e5] transition-colors">
                                            <span className="material-symbols-outlined">info</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#f6f6f8]/30 dark:hover:bg-[#21203b]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-[#5048e5]/10 text-[#5048e5] flex items-center justify-center">
                                                <span className="material-symbols-outlined text-lg">family_restroom</span>
                                            </div>
                                            <span className="font-semibold text-[#0f0e1b] dark:text-white">Casual Leave</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#545095] dark:text-gray-300">
                                        Aug 15, 2023
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center font-medium">1</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Approved</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-slate-200"></div>
                                            <span className="text-sm font-medium">Jonathan Sterling</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#545095] hover:text-[#5048e5] transition-colors">
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-between">
                        <span className="text-sm text-[#545095] dark:text-gray-400">Showing 4 of 24 applications</span>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1 border border-[#e8e8f3] dark:border-[#2a2945] rounded hover:bg-[#f6f6f8] dark:hover:bg-[#2a2945] disabled:opacity-50 text-sm font-medium transition-colors" disabled>Previous</button>
                            <button className="px-3 py-1 bg-[#5048e5] text-white rounded text-sm font-medium">1</button>
                            <button className="px-3 py-1 border border-[#e8e8f3] dark:border-[#2a2945] rounded hover:bg-[#f6f6f8] dark:hover:bg-[#2a2945] text-sm font-medium transition-colors">2</button>
                            <button className="px-3 py-1 border border-[#e8e8f3] dark:border-[#2a2945] rounded hover:bg-[#f6f6f8] dark:hover:bg-[#2a2945] text-sm font-medium transition-colors">Next</button>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="mt-auto px-40 py-6 border-t border-[#e8e8f3] dark:border-[#2a2945] text-center text-xs text-[#545095] dark:text-gray-500">
                © 2023 UHDMS Platform • Enterprise Human Resource Management System
            </footer>
        </div>
    );
};

export default LeaveHistory;
