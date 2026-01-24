import React from 'react';
import { Link } from 'react-router-dom';

const PayrollOverview = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#1e293b] dark:text-[#f8fafc] min-h-screen">
            <main className="max-w-[1280px] mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <nav className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            <a className="hover:text-primary" href="#">Dashboard</a>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-slate-900 dark:text-white">Payroll Overview</span>
                        </nav>
                        <h1 className="text-3xl font-extrabold text-[#0f172a] dark:text-white">Company Payroll Overview</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all">
                            <span className="material-symbols-outlined text-[18px]">file_download</span>
                            Export CSV
                        </button>
                        <Link to="/payroll-data-sync" className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                            <span className="material-symbols-outlined text-lg">play_arrow</span>
                            <span>Run New Payroll</span>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-[#161b26] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">calendar_today</span>
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">On Track</span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Next Payday</p>
                        <p className="text-2xl font-bold mt-1">Oct 31, 2023</p>
                    </div>
                    <div className="bg-white dark:bg-[#161b26] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                <span className="material-symbols-outlined text-primary">payments</span>
                            </div>
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">+4.2%</span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Net Payout</p>
                        <p className="text-2xl font-bold mt-1">$1,240,500</p>
                    </div>
                    <div className="bg-white dark:bg-[#161b26] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400">group</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">+3 New</span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Employees</p>
                        <p className="text-2xl font-bold mt-1">124</p>
                    </div>
                    <div className="bg-white dark:bg-[#161b26] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">pending_actions</span>
                            </div>
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">Attention</span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Approvals</p>
                        <p className="text-2xl font-bold mt-1">8</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#161b26] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Payroll History</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Company-wide monthly cost trends (Last 6 Months)</p>
                        </div>
                        <div className="flex gap-2">
                            <select className="text-sm border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg">
                                <option>Current Year</option>
                                <option>2022</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="relative h-[240px] w-full mt-4">
                            <div className="absolute inset-0 flex items-end justify-between px-4">
                                <div className="w-[2px] h-full bg-slate-50 dark:bg-slate-800/50"></div>
                                <div className="w-[2px] h-full bg-slate-50 dark:bg-slate-800/50"></div>
                                <div className="w-[2px] h-full bg-slate-50 dark:bg-slate-800/50"></div>
                                <div className="w-[2px] h-full bg-slate-50 dark:bg-slate-800/50"></div>
                                <div className="w-[2px] h-full bg-slate-50 dark:bg-slate-800/50"></div>
                                <div className="w-[2px] h-full bg-slate-50 dark:bg-slate-800/50"></div>
                            </div>
                            <svg className="absolute inset-0 w-full h-full drop-shadow-lg" preserveAspectRatio="none" viewBox="0 0 600 200">
                                <path className="fill-primary/5" d="M0,160 Q100,140 200,150 T400,80 T600,100 L600,200 L0,200 Z"></path>
                                <path d="M0,160 Q100,140 200,150 T400,80 T600,100" fill="none" stroke="var(--primary-color)" strokeWidth="3"></path>
                                <circle className="fill-primary" cx="0" cy="160" r="4"></circle>
                                <circle className="fill-primary" cx="200" cy="150" r="4"></circle>
                                <circle className="fill-primary" cx="400" cy="80" r="4"></circle>
                                <circle className="fill-primary" cx="600" cy="100" r="4"></circle>
                            </svg>
                            <div className="absolute bottom-[-30px] w-full flex justify-between px-0 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                                <span>May</span>
                                <span>Jun</span>
                                <span>Jul</span>
                                <span>Aug</span>
                                <span>Sep</span>
                                <span>Oct</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#161b26] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-lg font-bold">Recent Payroll Cycles</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Month</th>
                                    <th className="px-6 py-4">Processed Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Gross Payout</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold">October 2023</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Oct 31, 2023</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                            <span className="size-1.5 bg-blue-600 rounded-full"></span>
                                            Processing
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">$1,240,500.00</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-primary text-sm font-bold hover:underline">View Details</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold">September 2023</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Sep 28, 2023</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            <span className="size-1.5 bg-green-600 rounded-full"></span>
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">$1,195,420.00</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-primary text-sm font-bold hover:underline">View Details</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold">August 2023</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Aug 30, 2023</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            <span className="size-1.5 bg-green-600 rounded-full"></span>
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">$1,182,000.00</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-primary text-sm font-bold hover:underline">View Details</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold">November 2023</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Nov 30, 2023</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">
                                            <span className="size-1.5 bg-slate-400 rounded-full"></span>
                                            Scheduled
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">Pending</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-primary text-sm font-bold hover:underline">View Details</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-center">
                        <button className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">View All Payroll History</button>
                    </div>
                </div>
            </main>
            <footer className="mt-12 py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b26]">
                <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-6 text-primary">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold tracking-tight">UHDMS Payroll</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">Enterprise-grade payroll management for modern high-performance teams. Automated, secure, and compliant.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Support Center</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Audit Logs</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Compliance Status</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Security</h4>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-green-500">verified_user</span>
                                256-bit Encrypted
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1280px] mx-auto px-6 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400 font-medium">
                    <p>© 2023 UHDMS Ltd. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <span>Version 2.4.0-Stable</span>
                        <span>Server Status: Normal</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PayrollOverview;
