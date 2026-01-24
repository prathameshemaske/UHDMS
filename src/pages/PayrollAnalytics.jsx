import React from 'react';

const PayrollAnalytics = () => {
    return (
        <div className="bg-[#f9fafb] min-h-screen font-display text-slate-900">
            <div className="flex min-h-[calc(100vh-64px)]">
                <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Analytics Filters</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Fiscal Year</label>
                                <select className="form-select w-full rounded-lg border-slate-200 text-sm focus:ring-indigo-600 focus:border-indigo-600">
                                    <option>FY 2023-24</option>
                                    <option>FY 2022-23</option>
                                    <option>FY 2021-22</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Entity / Location</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input defaultChecked className="rounded text-indigo-600 focus:ring-indigo-600" type="checkbox" />
                                        <span className="text-sm text-slate-600">All Entities</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input className="rounded text-indigo-600 focus:ring-indigo-600" type="checkbox" />
                                        <span className="text-sm text-slate-600">Headquarters (SF)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input className="rounded text-indigo-600 focus:ring-indigo-600" type="checkbox" />
                                        <span className="text-sm text-slate-600">London Office</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input className="rounded text-indigo-600 focus:ring-indigo-600" type="checkbox" />
                                        <span className="text-sm text-slate-600">Bangalore Hub</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Departments</label>
                                <select className="form-select w-full rounded-lg border-slate-200 text-sm focus:ring-indigo-600 focus:border-indigo-600">
                                    <option>All Departments</option>
                                    <option>Engineering</option>
                                    <option>Sales & Marketing</option>
                                    <option>Human Resources</option>
                                    <option>Finance</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">refresh</span>
                            Update Reports
                        </button>
                    </div>
                </aside>
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
                                <span>Payroll</span>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <span className="text-indigo-600">Reports & Analytics</span>
                            </nav>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payroll Cost Analytics</h1>
                            <p className="text-slate-500 mt-1">Real-time analysis of company-wide labor expenditures and budget utilization.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">file_download</span>
                                Export CSV
                            </button>
                            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20">
                                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                                Generate Report
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Payroll (YTD)</p>
                            <h3 className="text-2xl font-black text-slate-900">$4,852,900</h3>
                            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
                                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                                +5.2% vs Last Year
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Average Cost per Head</p>
                            <h3 className="text-2xl font-black text-slate-900">$84,200</h3>
                            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold mt-2">
                                <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
                                Stable
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Budget Utilization</p>
                            <h3 className="text-2xl font-black text-slate-900">92.4%</h3>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-indigo-600 h-full" style={{ width: '92.4%' }}></div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Active Employee Count</p>
                            <h3 className="text-2xl font-black text-slate-900">542</h3>
                            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
                                <span className="material-symbols-outlined text-[16px]">group_add</span>
                                +12 this month
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm col-span-1">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold text-slate-900">Labor Cost Structure</h3>
                                <button className="text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-outlined">info</span>
                                </button>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="relative size-56 flex items-center justify-center">
                                    <svg className="size-full" viewBox="0 0 36 36">
                                        <circle cx="18" cy="18" fill="none" r="15.915" stroke="#e2e8f0" strokeWidth="3"></circle>
                                        <circle cx="18" cy="18" fill="none" r="15.915" stroke="#4f46e5" strokeDasharray="65 35" strokeDashoffset="25" strokeWidth="3"></circle>
                                        <circle cx="18" cy="18" fill="none" r="15.915" stroke="#10b981" strokeDasharray="20 80" strokeDashoffset="60" strokeWidth="3"></circle>
                                        <circle cx="18" cy="18" fill="none" r="15.915" stroke="#94a3b8" strokeDasharray="15 85" strokeDashoffset="40" strokeWidth="3"></circle>
                                    </svg>
                                    <div className="absolute text-center">
                                        <p className="text-3xl font-black text-slate-900">$4.8M</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Spent</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3 w-full mt-8">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-indigo-600"></div>
                                            <span className="text-sm font-medium text-slate-600">Fixed Salary</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-900">65%</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-emerald-500"></div>
                                            <span className="text-sm font-medium text-slate-600">Variable Bonus</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-900">20%</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-slate-400"></div>
                                            <span className="text-sm font-medium text-slate-600">Statutory Benefits</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-900">15%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm col-span-2">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Budget vs. Actual by Department</h3>
                                    <p className="text-xs text-slate-500 font-medium">Comparison of planned vs. realized monthly expenditure</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-3 rounded-sm bg-slate-200"></div>
                                        <span className="text-[11px] font-bold text-slate-500 uppercase">Budget</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-3 rounded-sm bg-indigo-600"></div>
                                        <span className="text-[11px] font-bold text-slate-500 uppercase">Actual</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-bold text-slate-700">Engineering</span>
                                        <span className="text-xs font-bold text-emerald-500">Under Budget</span>
                                    </div>
                                    <div className="relative h-8 w-full bg-slate-50 rounded-md overflow-hidden flex items-center">
                                        <div className="absolute h-4 bg-slate-200 rounded-r-sm" style={{ width: '85%' }}></div>
                                        <div className="absolute h-4 bg-indigo-600 rounded-r-sm" style={{ width: '78%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-bold text-slate-700">Sales & Marketing</span>
                                        <span className="text-xs font-bold text-amber-500">Near Limit</span>
                                    </div>
                                    <div className="relative h-8 w-full bg-slate-50 rounded-md overflow-hidden flex items-center">
                                        <div className="absolute h-4 bg-slate-200 rounded-r-sm" style={{ width: '60%' }}></div>
                                        <div className="absolute h-4 bg-indigo-600 rounded-r-sm" style={{ width: '58%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-bold text-slate-700">Product & Design</span>
                                        <span className="text-xs font-bold text-red-500">Over Budget</span>
                                    </div>
                                    <div className="relative h-8 w-full bg-slate-50 rounded-md overflow-hidden flex items-center">
                                        <div className="absolute h-4 bg-slate-200 rounded-r-sm" style={{ width: '45%' }}></div>
                                        <div className="absolute h-4 bg-indigo-600 rounded-r-sm" style={{ width: '52%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-bold text-slate-700">HR & Admin</span>
                                        <span className="text-xs font-bold text-emerald-500">Healthy</span>
                                    </div>
                                    <div className="relative h-8 w-full bg-slate-50 rounded-md overflow-hidden flex items-center">
                                        <div className="absolute h-4 bg-slate-200 rounded-r-sm" style={{ width: '30%' }}></div>
                                        <div className="absolute h-4 bg-indigo-600 rounded-r-sm" style={{ width: '25%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Budget</p>
                                    <p className="text-lg font-black text-slate-900">$5,250,000</p>
                                </div>
                                <div className="p-4 rounded-xl bg-indigo-50/50">
                                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Total Actual</p>
                                    <p className="text-lg font-black text-indigo-600">$4,852,900</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Recent Payroll Cycles</h3>
                            <button className="text-indigo-600 text-sm font-bold hover:underline">View All Records</button>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/80">
                                <tr>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payroll Month</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Entity</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Employees</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Gross Cost</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">October 2023</div>
                                        <div className="text-[11px] text-slate-400">Paid on Oct 31, 2023</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">UHDMS Ltd. (HQ)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">342</td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900">$1,240,500.00</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full">Completed</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">September 2023</div>
                                        <div className="text-[11px] text-slate-400">Paid on Sep 29, 2023</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">UHDMS Ltd. (HQ)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">338</td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900">$1,225,800.00</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full">Completed</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">October 2023</div>
                                        <div className="text-[11px] text-slate-400">Scheduled for Oct 31</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">London Tech Hub</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">120</td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900">£450,200.00</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded-full">Processing</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PayrollAnalytics;
