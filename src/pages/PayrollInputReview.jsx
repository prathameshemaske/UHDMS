import React from 'react';
import { Link } from 'react-router-dom';

const PayrollInputReview = () => {
    return (
        <div className="flex flex-1 justify-center py-8 font-display bg-background-light dark:bg-background-dark min-h-screen">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 sm:px-10">
                {/* Progress Bar */}
                <div className="flex flex-col gap-3 pb-6">
                    <div className="flex gap-6 justify-between items-end">
                        <div>
                            <h3 className="text-gray-900 dark:text-white text-base font-semibold leading-normal">Step 2 of 4: Variable Pay & Adjustments</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">Next: Review & Confirm Summary</p>
                        </div>
                        <p className="text-primary text-sm font-bold leading-normal">50% Completed</p>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: '50%' }}></div>
                    </div>
                </div>
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-center gap-4 py-4 mb-2">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">Run Payroll - June 2024</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-base">Modify bonuses, overtime, and manual adjustments for this pay period.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-bold hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined mr-2 text-[18px]">upload_file</span>
                            Import CSV
                        </button>
                        <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-opacity-90 transition-all shadow-sm">
                            <span className="material-symbols-outlined mr-2 text-[18px]">save</span>
                            Save Changes
                        </button>
                    </div>
                </div>
                {/* Toolbar */}
                <div className="flex justify-between items-center gap-2 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-800 rounded-t-xl px-4 py-3">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">sort</span>
                            </button>
                            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">download</span>
                            </button>
                        </div>
                        <span className="h-6 w-px bg-gray-200 dark:bg-gray-700"></span>
                        <p className="text-sm text-gray-500 font-medium">Showing <span className="text-gray-900 dark:text-white">124 Employees</span></p>
                    </div>
                    <button className="flex items-center gap-2 text-primary text-sm font-bold hover:underline">
                        <span className="material-symbols-outlined text-[18px]">description</span>
                        Download Template
                    </button>
                </div>
                {/* Table Container */}
                <div className="flex flex-col border border-t-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark rounded-b-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[25%]">Employee</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%]">Base Salary</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[20%]">Sync'd Variables</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[20%]">Manual Adjustments</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[20%]">Total Estimated Payout</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {/* Row 1 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold" data-alt="Employee profile avatar for John Doe">JD</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">John Doe</span>
                                                <span className="text-xs text-gray-500">Senior Engineer</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">$5,000.00</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                OT: $250.00
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative group/input">
                                            <input className="w-full h-9 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg text-sm tabular-nums focus:border-primary focus:ring-primary focus:ring-1" type="text" defaultValue="0.00" />
                                            <span className="absolute right-2 top-2 text-gray-400 group-focus-within/input:hidden">
                                                <span className="material-symbols-outlined text-[16px]">edit</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">$5,250.00</span>
                                            <span className="text-[10px] text-green-600 font-medium">+5% vs last month</span>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 2 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold" data-alt="Employee profile avatar for Jane Smith">JS</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Jane Smith</span>
                                                <span className="text-xs text-gray-500">Sales Lead</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">$6,200.00</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                                Comm: $800.00
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative group/input">
                                            <input className="w-full h-9 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg text-sm tabular-nums focus:border-primary focus:ring-primary focus:ring-1" type="text" defaultValue="+200.00" />
                                            <span className="absolute right-2 top-2 text-gray-400 group-focus-within/input:hidden">
                                                <span className="material-symbols-outlined text-[16px]">edit</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">$7,200.00</span>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold" data-alt="Employee profile avatar for Robert Brown">RB</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Robert Brown</span>
                                                <span className="text-xs text-gray-500">UX Designer</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">$4,800.00</td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-gray-400 italic">No variables</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative group/input">
                                            <input className="w-full h-9 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg text-sm tabular-nums focus:border-primary focus:ring-primary focus:ring-1" type="text" defaultValue="0.00" />
                                            <span className="absolute right-2 top-2 text-gray-400 group-focus-within/input:hidden">
                                                <span className="material-symbols-outlined text-[16px]">edit</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">$4,800.00</span>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 4 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold" data-alt="Employee profile avatar for Emily Davis">ED</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Emily Davis</span>
                                                <span className="text-xs text-gray-500">HR Specialist</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">$5,500.00</td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-gray-400 italic">No variables</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative group/input">
                                            <input className="w-full h-9 bg-gray-50 dark:bg-gray-800 border-red-300 dark:border-red-900 rounded-lg text-sm tabular-nums text-red-600 focus:border-red-500 focus:ring-red-500 focus:ring-1" type="text" defaultValue="-150.00" />
                                            <span className="absolute right-2 top-2 text-red-400 group-focus-within/input:hidden">
                                                <span className="material-symbols-outlined text-[16px]">error</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">$5,350.00</span>
                                            <span className="text-[10px] text-red-600 font-medium">Deduction applied</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Summary Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-6 bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex gap-8">
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Base Payroll</span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">$615,400.00</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Adjustments</span>
                                <span className="text-lg font-bold text-primary tabular-nums">+$42,150.00</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Net Batch Payout</span>
                                <span className="text-lg font-extrabold text-gray-900 dark:text-white tabular-nums">$657,550.00</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/payroll-data-sync" className="flex items-center justify-center px-6 h-10 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                Back
                            </Link>
                            <Link to="/payroll-approval" className="flex items-center justify-center px-8 h-10 rounded-lg bg-primary text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
                                Review & Confirm
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Floating Helper */}
                <div className="fixed bottom-8 right-8 flex flex-col items-end pointer-events-none">
                    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 p-4 max-w-xs pointer-events-auto transform transition hover:scale-105">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary">info</span>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Batch Insight</h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            You have <span className="font-bold text-gray-900 dark:text-white">4 pending adjustments</span> that haven't been saved yet. Ensure all manual bonuses match the approved June budget.
                        </p>
                        <button className="mt-3 w-full py-2 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20">
                            View Budget Comparison
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayrollInputReview;
