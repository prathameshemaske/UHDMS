import React from 'react';

const EmployeePayslips = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-[#121121] font-display text-[#0f0e1b] dark:text-[#f9f8fb]">
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
                            <a className="text-[#5048e5] text-sm font-semibold border-b-2 border-[#5048e5] pb-1" href="#">Payroll</a>
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
                <div className="flex items-center gap-2 mb-6 text-sm font-medium">
                    <a className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5]" href="/employee-dashboard">Home</a>
                    <span className="text-[#545095] dark:text-gray-600">/</span>
                    <a className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5]" href="#">Payroll</a>
                    <span className="text-[#545095] dark:text-gray-600">/</span>
                    <span className="text-[#0f0e1b] dark:text-white">Payslip History</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0f0e1b] dark:text-white tracking-tight">Employee Payslip History</h1>
                        <p className="text-[#545095] dark:text-gray-400 mt-1">View and download your monthly salary statements.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#e8e8f3] dark:border-[#2a2945] rounded-lg bg-white dark:bg-[#1a192d] text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-lg">filter_list</span>
                            <span>Year: 2023</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#5048e5] text-white rounded-lg text-sm font-semibold hover:bg-[#5048e5]/90 transition-all shadow-sm cursor-pointer">
                            <span className="material-symbols-outlined text-lg">download_for_offline</span>
                            <span>Download All (YTD)</span>
                        </button>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl border border-[#e8e8f3] dark:border-[#2a2945] shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[#545095] dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Total Earnings YTD (2023)</p>
                            <h3 className="text-[#0f0e1b] dark:text-white text-3xl font-bold tracking-tight">$82,450.00</h3>
                        </div>
                        <div className="bg-[#5048e5]/10 p-3 rounded-full text-[#5048e5]">
                            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-[#21203b] border-b border-[#e8e8f3] dark:border-[#2a2945]">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Month</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Gross Salary</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Deductions</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Net Payout</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8e8f3] dark:divide-[#2a2945]">
                                <tr className="hover:bg-[#f8f9fa]/50 dark:hover:bg-[#21203b] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-[#0f0e1b] dark:text-white">October 2023</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#0f0e1b] dark:text-white">$8,500.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-red-500">-$1,250.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-[#5048e5]">$7,250.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 text-[#5048e5] hover:bg-[#5048e5]/10 rounded-lg transition-colors" title="Download PDF">
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#f8f9fa]/50 dark:hover:bg-[#21203b] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-[#0f0e1b] dark:text-white">September 2023</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#0f0e1b] dark:text-white">$8,500.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-red-500">-$1,250.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-[#5048e5]">$7,250.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 text-[#5048e5] hover:bg-[#5048e5]/10 rounded-lg transition-colors" title="Download PDF">
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#f8f9fa]/50 dark:hover:bg-[#21203b] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-[#0f0e1b] dark:text-white">August 2023</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#0f0e1b] dark:text-white">$8,500.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-red-500">-$1,250.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-[#5048e5]">$7,250.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 text-[#5048e5] hover:bg-[#5048e5]/10 rounded-lg transition-colors" title="Download PDF">
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#f8f9fa]/50 dark:hover:bg-[#21203b] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-[#0f0e1b] dark:text-white">July 2023</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#0f0e1b] dark:text-white">$8,500.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-red-500">-$1,250.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-[#5048e5]">$7,250.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 text-[#5048e5] hover:bg-[#5048e5]/10 rounded-lg transition-colors" title="Download PDF">
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#f8f9fa]/50 dark:hover:bg-[#21203b] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-[#0f0e1b] dark:text-white">June 2023</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#0f0e1b] dark:text-white">$8,200.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-red-500">-$1,180.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-[#5048e5]">$7,020.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 text-[#5048e5] hover:bg-[#5048e5]/10 rounded-lg transition-colors" title="Download PDF">
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-between">
                        <span className="text-xs text-[#545095] dark:text-gray-400">Showing 5 of 10 results</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs border border-[#e8e8f3] dark:border-[#2a2945] rounded-lg disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 text-xs border border-[#5048e5] text-[#5048e5] bg-[#5048e5]/5 rounded-lg">1</button>
                            <button className="px-3 py-1 text-xs border border-[#e8e8f3] dark:border-[#2a2945] rounded-lg hover:bg-gray-50">2</button>
                            <button className="px-3 py-1 text-xs border border-[#e8e8f3] dark:border-[#2a2945] rounded-lg hover:bg-gray-50">Next</button>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="mt-auto px-4 md:px-10 lg:px-40 py-6 border-t border-[#e8e8f3] dark:border-[#2a2945] text-center text-xs text-[#545095] dark:text-gray-500">
                © 2023 UHDMS Platform • Enterprise Human Resource Management System
            </footer>
        </div>
    );
};

export default EmployeePayslips;
