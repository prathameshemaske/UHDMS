import React from 'react';

const PayoutStatus = () => {
    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
            <div className="max-w-[1200px] mx-auto py-8 px-6 flex flex-col gap-6">
                {/* PageHeading */}
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-[#121117] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Salary Disbursement Tracking</p>
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <p className="text-[#656487] dark:text-gray-400 text-sm font-normal">Real-time update active. Last Synced: 2 minutes ago</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a192b] border border-[#dcdce5] dark:border-[#2d2c3d] text-[#121117] dark:text-white text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-lg">filter_alt</span>
                            <span>Filter</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">description</span>
                            <span>Download Bank Reconciliation</span>
                        </button>
                    </div>
                </div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-[#1a192b] flex flex-col gap-2 rounded-xl p-6 border border-[#dcdce5] dark:border-[#2d2c3d] shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-[#656487] dark:text-gray-400 text-sm font-medium">Total Batches Today</p>
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">reorder</span>
                        </div>
                        <p className="text-[#121117] dark:text-white tracking-tight text-3xl font-bold">12</p>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-[#078841] text-sm">trending_up</span>
                            <p className="text-[#078841] text-xs font-bold">+20% vs yesterday</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1a192b] flex flex-col gap-2 rounded-xl p-6 border border-[#dcdce5] dark:border-[#2d2c3d] shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-[#656487] dark:text-gray-400 text-sm font-medium">Total Disbursed</p>
                            <span className="material-symbols-outlined text-emerald-500 bg-emerald-500/10 p-1.5 rounded-lg">account_balance_wallet</span>
                        </div>
                        <p className="text-[#121117] dark:text-white tracking-tight text-3xl font-bold">₹4,500,000</p>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-[#078841] text-sm">trending_up</span>
                            <p className="text-[#078841] text-xs font-bold">+5.2% monthly avg</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1a192b] flex flex-col gap-2 rounded-xl p-6 border border-[#dcdce5] dark:border-[#2d2c3d] shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-[#656487] dark:text-gray-400 text-sm font-medium">Pending Acknowledgment</p>
                            <span className="material-symbols-outlined text-amber-500 bg-amber-500/10 p-1.5 rounded-lg">pending_actions</span>
                        </div>
                        <p className="text-[#121117] dark:text-white tracking-tight text-3xl font-bold">3</p>
                        <p className="text-[#656487] dark:text-gray-400 text-xs font-medium mt-1">Expected sync in ~5 mins</p>
                    </div>
                </div>
                {/* Table Section */}
                <div className="bg-white dark:bg-[#1a192b] rounded-xl border border-[#dcdce5] dark:border-[#2d2c3d] overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-[#dcdce5] dark:border-[#2d2c3d] flex justify-between items-center bg-gray-50/50 dark:bg-[#1a192b]">
                        <h3 className="text-sm font-bold text-[#121117] dark:text-white uppercase tracking-wider">Active Disbursement Batches</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                <span className="text-xs text-[#656487] dark:text-gray-400">Past 24 Hours</span>
                            </div>
                            <span className="material-symbols-outlined text-[#656487] cursor-pointer hover:text-primary">refresh</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#656487] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4 border-b border-[#dcdce5] dark:border-[#2d2c3d]">Batch ID</th>
                                    <th className="px-6 py-4 border-b border-[#dcdce5] dark:border-[#2d2c3d]">Time Generated</th>
                                    <th className="px-6 py-4 border-b border-[#dcdce5] dark:border-[#2d2c3d]">Employees</th>
                                    <th className="px-6 py-4 border-b border-[#dcdce5] dark:border-[#2d2c3d]">Net Amount</th>
                                    <th className="px-6 py-4 border-b border-[#dcdce5] dark:border-[#2d2c3d]">Bank Status</th>
                                    <th className="px-6 py-4 border-b border-[#dcdce5] dark:border-[#2d2c3d] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#dcdce5] dark:divide-[#2d2c3d]">
                                <tr className="hover:bg-gray-50 dark:hover:bg-[#232238] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-[#121117] dark:text-white font-bold text-sm">#8842-PAY</span>
                                            <span className="text-[10px] text-primary font-medium">HDFC-PRIMARY-01</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[#656487] dark:text-gray-300 text-sm">10:30 AM</td>
                                    <td className="px-6 py-5 text-[#121117] dark:text-white text-sm font-medium">145</td>
                                    <td className="px-6 py-5 text-[#121117] dark:text-white text-sm font-bold">₹450,000.00</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 w-fit text-[11px] font-bold uppercase border border-blue-100 dark:border-blue-800">
                                            <span className="material-symbols-outlined text-xs">verified</span>
                                            Acknowledged
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center items-center gap-3">
                                            <button className="text-primary hover:text-primary/80 font-bold text-xs uppercase tracking-tight">Details</button>
                                            <span className="w-px h-3 bg-gray-200 dark:bg-gray-700"></span>
                                            <button className="text-[#656487] hover:text-red-500 font-bold text-xs uppercase tracking-tight">Stop</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-[#232238] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-[#121117] dark:text-white font-bold text-sm">#8841-PAY</span>
                                            <span className="text-[10px] text-primary font-medium">ICICI-CORP-04</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[#656487] dark:text-gray-300 text-sm">10:15 AM</td>
                                    <td className="px-6 py-5 text-[#121117] dark:text-white text-sm font-medium">82</td>
                                    <td className="px-6 py-5 text-[#121117] dark:text-white text-sm font-bold">₹210,000.00</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 w-fit text-[11px] font-bold uppercase border border-emerald-100 dark:border-emerald-800">
                                            <span className="material-symbols-outlined text-xs">check_circle</span>
                                            Paid
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center items-center gap-3">
                                            <button className="text-primary hover:text-primary/80 font-bold text-xs uppercase tracking-tight">Details</button>
                                            <span className="w-px h-3 bg-gray-200 dark:bg-gray-700"></span>
                                            <button className="text-[#656487] hover:text-primary font-bold text-xs uppercase tracking-tight">Report</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-[#232238] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-[#121117] dark:text-white font-bold text-sm">#8840-PAY</span>
                                            <span className="text-[10px] text-primary font-medium">SBI-RETAIL-02</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[#656487] dark:text-gray-300 text-sm">09:45 AM</td>
                                    <td className="px-6 py-5 text-[#121117] dark:text-white text-sm font-medium">210</td>
                                    <td className="px-6 py-5 text-[#121117] dark:text-white text-sm font-bold">₹890,000.00</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 w-fit text-[11px] font-bold uppercase border border-indigo-100 dark:border-indigo-800">
                                            <span className="material-symbols-outlined text-xs">account_balance</span>
                                            Sent to Bank
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center items-center gap-3">
                                            <button className="text-primary hover:text-primary/80 font-bold text-xs uppercase tracking-tight">Details</button>
                                            <span className="w-px h-3 bg-gray-200 dark:bg-gray-700"></span>
                                            <button className="text-[#656487] hover:text-red-500 font-bold text-xs uppercase tracking-tight">Stop</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-[#232238] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-[#121117] dark:text-white font-bold text-sm">#8839-PAY</span>
                                            <span className="text-[10px] text-primary font-medium">AXIS-OFFSHORE-01</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[#656487] dark:text-gray-300 text-sm">09:00 AM</td>
                                    <td className="px-6 py-5 text-[#121117] dark:text-white text-sm font-medium">56</td>
                                    <td className="px-6 py-5 text-[#121117] dark:text-white text-sm font-bold">₹125,000.00</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-[#656487] dark:text-gray-400 w-fit text-[11px] font-bold uppercase border border-gray-200 dark:border-gray-700">
                                            <span className="material-symbols-outlined text-xs">hourglass_empty</span>
                                            Pending
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center items-center gap-3">
                                            <button className="text-primary hover:text-primary/80 font-bold text-xs uppercase tracking-tight">Details</button>
                                            <span className="w-px h-3 bg-gray-200 dark:bg-gray-700"></span>
                                            <button className="text-[#656487] hover:text-red-500 font-bold text-xs uppercase tracking-tight">Stop</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-[#dcdce5] dark:border-[#2d2c3d] flex justify-between items-center bg-gray-50/30 dark:bg-[#1a192b]">
                        <p className="text-xs text-[#656487] dark:text-gray-400">Showing <span className="font-bold">4</span> of <span className="font-bold">12</span> batches generated today.</p>
                        <div className="flex gap-2">
                            <button className="p-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d2c3d] text-gray-500 hover:bg-gray-50">
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <button className="p-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d2c3d] text-gray-500 hover:bg-gray-50">
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Additional Context Info */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6 flex items-start gap-4">
                        <div className="bg-primary text-white p-2 rounded-lg">
                            <span className="material-symbols-outlined">info</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-bold text-[#121117] dark:text-white uppercase tracking-wide">Bank Response Timeline</h4>
                            <p className="text-xs text-[#656487] dark:text-gray-400 leading-relaxed">Typical processing time for HDFC and ICICI batches is within 15-30 minutes of transmission. Manual reconciliation is recommended for batches pending over 4 hours.</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-6 flex items-start gap-4">
                        <div className="bg-emerald-500 text-white p-2 rounded-lg">
                            <span className="material-symbols-outlined">shield</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-bold text-[#121117] dark:text-white uppercase tracking-wide">Secure Disbursement Protocol</h4>
                            <p className="text-xs text-[#656487] dark:text-gray-400 leading-relaxed">All batches are encrypted using AES-256 standards before bank transmission. 2FA is required for any "Stop Disbursement" action.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayoutStatus;
