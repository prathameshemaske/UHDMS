import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PayrollSettings = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 h-16">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-1.5 rounded-lg text-white">
                            <svg className="size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">UHDMS</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" to="/">Dashboard</Link>
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Employee Directory</a>
                        <Link className="text-primary text-sm font-semibold border-b-2 border-primary py-5 -mb-5" to="/payroll-settings">Payroll</Link>
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Projects</a>
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Reports</a>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <label className="relative hidden sm:block min-w-[240px]">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input className="block w-full rounded-lg border-0 bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-3 text-sm placeholder-slate-500 focus:ring-2 focus:ring-primary dark:text-white" placeholder="Search employee or record..." type="text" />
                    </label>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <img alt="User avatar" className="rounded-full" data-alt="Corporate professional user avatar icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzEFaGFlwOsEF50ypMUP_53mKQ-oCNAVpFlBVlcKvxZZHfXXwgIhQxFtO_N9mHiqR5NI8ORv4JeICevfHx6A5Nao8kqdJKpINjN0yio1qWH6PEb3Dgj7vYTHJKkr9Svf0QQ2WOMnjliFJpc6n8xanQWFVU386qTyEgicxcZPIWx1OGWW_epvYYw74RFtruWb7fHGMksFKeb52xF9BY4rjLoUrFSumc0ZXBqI0IzwoW-zhyC96JoRrbFZEvM_qoeOwja6ewGlk6RW8k" />
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex h-[calc(100vh-4rem)]">
                {/* Sidebar Navigation */}
                <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-8 overflow-y-auto">
                    <div>
                        <h1 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Payroll Settings</h1>
                        <div className="flex flex-col gap-1">
                            <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white shadow-lg shadow-primary/20" href="#">
                                <span className="material-symbols-outlined">payments</span>
                                <span className="text-sm font-semibold">Salary Components</span>
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" href="#">
                                <span className="material-symbols-outlined">gavel</span>
                                <span className="text-sm font-medium">Statutory Rules</span>
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" href="#">
                                <span className="material-symbols-outlined">percent</span>
                                <span className="text-sm font-medium">Tax Slabs</span>
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" href="#">
                                <span className="material-symbols-outlined">calendar_today</span>
                                <span className="text-sm font-medium">Pay Cycles</span>
                            </a>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs font-semibold text-slate-500 mb-2">Next Payday</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">Oct 31, 2023</p>
                            <div className="mt-3 flex items-center gap-2 text-[10px] text-primary bg-primary/10 px-2 py-1 rounded w-fit uppercase font-bold">
                                <span className="material-symbols-outlined text-[12px] fill-1">info</span> 2 days remaining
                            </div>
                        </div>
                    </div>
                </aside>
                {/* Main Content Area */}
                <section className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-8">
                    <div className="max-w-6xl mx-auto space-y-6">
                        {/* Page Heading */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="space-y-1">
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Salary Components</h2>
                                <p className="text-slate-500 dark:text-slate-400 max-w-xl">Configure custom formulas for earnings, deductions, and statutory payouts that form the employee CTC structure.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">tune</span>
                                    Edit Rules
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                    Add Component
                                </button>
                            </div>
                        </div>
                        {/* Tabs Section */}
                        <div className="border-b border-slate-200 dark:border-slate-800">
                            <nav className="flex gap-10">
                                <button className="border-b-2 border-primary pb-4 px-1 text-sm font-bold text-primary">Earnings</button>
                                <button className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-all">Deductions</button>
                                <button className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-all">Reimbursements</button>
                            </nav>
                        </div>
                        {/* Data Table Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Component Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Calculation Logic</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {/* Row 1 */}
                                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Basic Salary</span>
                                                    <span className="text-[11px] text-slate-500">Fixed Earning Component</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                    Fixed
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <code className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-primary dark:text-primary text-xs font-mono font-bold border border-slate-200 dark:border-slate-700">
                                                    (50 / 100) * CTC
                                                </code>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Active</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">Edit</button>
                                            </td>
                                        </tr>
                                        {/* Row 2 */}
                                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">HRA</span>
                                                    <span className="text-[11px] text-slate-500">House Rent Allowance</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
                                                    Percentage
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-1">
                                                    <code className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-primary dark:text-primary text-xs font-mono font-bold border border-slate-200 dark:border-slate-700 w-fit">
                                                        (40 / 100) * Basic
                                                    </code>
                                                    <span className="text-[10px] text-slate-400 italic">50% for Metro Cities</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Active</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">Edit</button>
                                            </td>
                                        </tr>
                                        {/* Row 3 */}
                                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Conveyance Allowance</span>
                                                    <span className="text-[11px] text-slate-500">Travel reimbursement component</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                                                    Flat Rate
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <code className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-primary dark:text-primary text-xs font-mono font-bold border border-slate-200 dark:border-slate-700">
                                                    ₹1,600
                                                </code>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Active</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">Edit</button>
                                            </td>
                                        </tr>
                                        {/* Row 4 */}
                                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Special Allowance</span>
                                                    <span className="text-[11px] text-slate-500">Flexible component</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                                    Variable
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <code className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-primary dark:text-primary text-xs font-mono font-bold border border-slate-200 dark:border-slate-700">
                                                    CTC - (Basic + HRA + Conveyance)
                                                </code>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Active</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">Edit</button>
                                            </td>
                                        </tr>
                                        {/* Row 5 */}
                                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors opacity-60">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Bonus (Annual)</span>
                                                    <span className="text-[11px] text-slate-500">One-time yearly payout</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                    Fixed
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <code className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 text-xs font-mono font-bold border border-slate-200 dark:border-slate-700">
                                                    ₹50,000 (Flat)
                                                </code>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                                    <span className="text-sm font-medium text-slate-500">Inactive</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">Enable</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Footer Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Total CTC Logic</p>
                                        <p className="text-xl font-black text-slate-900 dark:text-white">100% Balanced</p>
                                    </div>
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                </div>
                                <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                                    <div className="w-1/2 bg-primary"></div>
                                    <div className="w-[30%] bg-indigo-400"></div>
                                    <div className="w-[20%] bg-blue-300"></div>
                                </div>
                                <p className="mt-3 text-[10px] text-slate-500">Earnings distribution is valid across all components.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Statutory Impact</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white">PF & ESI Included</p>
                                <p className="mt-3 text-sm text-slate-500 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px] text-green-500">check_circle</span>
                                    Standard compliance active
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Last Update</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white">Oct 12, 2023</p>
                                <p className="mt-3 text-sm text-slate-500 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">history</span>
                                    By Admin (Sarah Wilson)
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* Floating Help Button */}
            <button className="fixed bottom-8 right-8 h-14 w-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-50">
                <span className="material-symbols-outlined">question_mark</span>
            </button>
        </div>
    );
};

export default PayrollSettings;
