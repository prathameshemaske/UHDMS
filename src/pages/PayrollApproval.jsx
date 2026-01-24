import React from 'react';

const PayrollApproval = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#121117] dark:text-[#f6f6f8] min-h-screen">
            <main className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col gap-8">
                <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-xl border border-[#f1f0f4] dark:border-[#2a2a3a] shadow-sm">
                    <div className="flex justify-between items-center relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-10 transform -translate-y-1/2"></div>
                        <div className="flex flex-col items-center gap-2 bg-white dark:bg-[#1a1a2e] px-4">
                            <div className="size-8 rounded-full bg-success text-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                            <span className="text-xs font-bold text-success uppercase tracking-wider">Data Sync</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 bg-white dark:bg-[#1a1a2e] px-4">
                            <div className="size-8 rounded-full bg-success text-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                            <span className="text-xs font-bold text-success uppercase tracking-wider">Review</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 bg-white dark:bg-[#1a1a2e] px-4">
                            <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-primary/20">
                                <span className="material-symbols-outlined">rule</span>
                            </div>
                            <span className="text-sm font-black text-primary uppercase tracking-wider">Approval</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 bg-white dark:bg-[#1a1a2e] px-4">
                            <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-400 flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Disbursement</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[#121117] dark:text-white text-3xl font-black tracking-tight">Payroll Approval & Disbursement</h1>
                        <p className="text-[#656487] dark:text-[#a0a0b8] text-sm font-normal">October 2023 • 1,240 Employees across 8 Departments</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center rounded-lg h-11 px-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a2e] text-[#121117] dark:text-white text-sm font-bold hover:bg-gray-50 transition-all">
                            <span className="material-symbols-outlined mr-2 text-[20px]">visibility</span>
                            View Detailed Report
                        </button>
                        <button className="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all">
                            <span className="material-symbols-outlined mr-2 text-[20px]">account_balance</span>
                            Approve & Release Funds
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-[#f1f0f4] dark:border-[#2a2a3a] overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-[#f1f0f4] dark:border-[#2a2a3a] flex justify-between items-center">
                                <h3 className="font-bold text-[#121117] dark:text-white">Departmental Variance Summary</h3>
                                <span className="text-xs font-medium text-[#656487] dark:text-[#a0a0b8]">Oct 2023 vs Sep 2023</span>
                            </div>
                            <div className="divide-y divide-[#f1f0f4] dark:divide-[#2a2a3a]">
                                <div className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            <span className="material-symbols-outlined">developer_board</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#121117] dark:text-white">Engineering</p>
                                            <p className="text-xs text-[#656487] dark:text-[#a0a0b8]">420 Employees</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#121117] dark:text-white">$452,000.00</p>
                                        <div className="flex items-center justify-end text-danger text-xs font-bold gap-1">
                                            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                                            +$2,400 (1 new hire)
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                            <span className="material-symbols-outlined">trending_up</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#121117] dark:text-white">Sales & Marketing</p>
                                            <p className="text-xs text-[#656487] dark:text-[#a0a0b8]">215 Employees</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#121117] dark:text-white">$285,400.00</p>
                                        <div className="flex items-center justify-end text-success text-xs font-bold gap-1">
                                            <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                                            -$850 (Adjustment)
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                            <span className="material-symbols-outlined">palette</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#121117] dark:text-white">Product Design</p>
                                            <p className="text-xs text-[#656487] dark:text-[#a0a0b8]">84 Employees</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#121117] dark:text-white">$156,200.00</p>
                                        <div className="flex items-center justify-end text-[#656487] dark:text-[#a0a0b8] text-xs font-bold gap-1">
                                            <span className="material-symbols-outlined text-[14px]">remove</span>
                                            No Variance
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <span className="material-symbols-outlined">groups</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#121117] dark:text-white">HR & Administration</p>
                                            <p className="text-xs text-[#656487] dark:text-[#a0a0b8]">112 Employees</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#121117] dark:text-white">$92,150.00</p>
                                        <div className="flex items-center justify-end text-danger text-xs font-bold gap-1">
                                            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                                            +$5,200 (Bonuses)
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-white/5 border-t border-[#f1f0f4] dark:border-[#2a2a3a] flex justify-between items-center">
                                <p className="text-sm font-black text-[#121117] dark:text-white">Total Payroll Amount</p>
                                <p className="text-xl font-black text-primary">$1,045,750.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-xl border border-[#f1f0f4] dark:border-[#2a2a3a] shadow-sm flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">security</span>
                                <h3 className="font-bold text-[#121117] dark:text-white text-base">Security Verification</h3>
                            </div>
                            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                                <p className="text-xs text-[#656487] dark:text-[#a0a0b8] mb-2 font-medium">Finalizing this action will trigger bank transfers for all verified employees. This action is irreversible.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-[#656487] dark:text-[#a0a0b8] uppercase tracking-wider" htmlFor="comment">Approver Comment</label>
                                <textarea className="form-textarea w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f8f9fa] dark:bg-background-dark text-sm focus:ring-primary focus:border-primary" id="comment" placeholder="Add a note or justification for this month's payroll approval..." rows="4"></textarea>
                            </div>
                            <div className="space-y-3 pt-2">
                                <button className="w-full flex items-center justify-center rounded-lg h-12 bg-primary text-white font-bold hover:bg-opacity-90 shadow-xl shadow-primary/30 transition-all">
                                    <span className="material-symbols-outlined mr-2">verified</span>
                                    Approve & Release Funds
                                </button>
                                <button className="w-full flex items-center justify-center rounded-lg h-12 border border-danger/20 text-danger font-bold hover:bg-danger/5 transition-all text-sm">
                                    <span className="material-symbols-outlined mr-2">block</span>
                                    Reject & Flag Issues
                                </button>
                            </div>
                        </div>
                        <div className="bg-[#121117] p-6 rounded-xl border border-gray-800 shadow-sm">
                            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-success text-sm">check_circle</span>
                                System Integrity Checks
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between text-[11px]">
                                    <span className="text-gray-400">Tax compliance check</span>
                                    <span className="text-success font-bold">Passed</span>
                                </li>
                                <li className="flex items-center justify-between text-[11px]">
                                    <span className="text-gray-400">Duplicate payment scan</span>
                                    <span className="text-success font-bold">Passed</span>
                                </li>
                                <li className="flex items-center justify-between text-[11px]">
                                    <span className="text-gray-400">Fund availability</span>
                                    <span className="text-success font-bold">Verified</span>
                                </li>
                                <li className="flex items-center justify-between text-[11px]">
                                    <span className="text-gray-400">Employee records sync</span>
                                    <span className="text-success font-bold">Synced</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-6 py-8 border-t border-[#f1f0f4] dark:border-[#2a2a3a] mt-8">
                    <button className="flex items-center text-[#656487] hover:text-primary transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined mr-2 text-[18px]">history</span> View Approval History
                    </button>
                    <span className="text-[#dcdce5]">|</span>
                    <button className="flex items-center text-[#656487] hover:text-primary transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined mr-2 text-[18px]">support_agent</span> Contact Finance Support
                    </button>
                    <span className="text-[#dcdce5]">|</span>
                    <button className="flex items-center text-[#656487] hover:text-primary transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined mr-2 text-[18px]">print</span> Export Current Summary
                    </button>
                </div>
            </main>
        </div >
    );
};

export default PayrollApproval;
