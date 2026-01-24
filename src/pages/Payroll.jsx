import React, { useState, useEffect } from 'react';
import { payrollDataService } from '../services/payrollDataService';

const Payroll = () => {
    const [years, setYears] = useState('');
    const [salary, setSalary] = useState('');
    const [gratuity, setGratuity] = useState(0);
    const [payrollRuns, setPayrollRuns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayroll = async () => {
            try {
                const data = await payrollDataService.getAllRuns();
                setPayrollRuns(data || []);
            } catch (error) {
                console.error("Failed to fetch payroll runs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayroll();
    }, []);

    const calculateGratuity = () => {
        if (years && salary) {
            // Formula: (15 * Basic Salary * Years) / 26
            const result = (15 * parseFloat(salary) * parseFloat(years)) / 26;
            setGratuity(result);
        } else {
            setGratuity(0);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid': return 'bg-emerald-100 text-emerald-800';
            case 'approved': return 'bg-indigo-100 text-indigo-800';
            default: return 'bg-amber-100 text-amber-800';
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] text-slate-900 font-sans">
            <style>{`
                :root {
                    --primary: #4f46e5;
                    --primary-hover: #4338ca;
                    --bg-gray: #f9fafb;
                }
                .card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
                }
            `}</style>

            <header className="bg-white border-b border-slate-200">
                <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="text-indigo-600 font-bold text-xl flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                            UHDMS Payroll
                        </div>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                            <a className="text-indigo-600 border-b-2 border-indigo-600 pb-5 -mb-5" href="#">Dashboard</a>
                            <a className="hover:text-indigo-600" href="#">Employees</a>
                            <a className="hover:text-indigo-600" href="#">Reports</a>
                            <a class="hover:text-indigo-600" href="#">Settings</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                            AD
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Payroll Summary Dashboard</h1>
                    <p className="text-slate-500 text-sm">Welcome back, HR Admin. Monitor your organization's financial health.</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card p-6 border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                <span className="material-symbols-outlined text-xs mr-1">trending_up</span> 12%
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Total Payroll Cost</p>
                        <h2 className="text-3xl font-bold text-slate-900">₹42,85,400</h2>
                        <p className="text-slate-400 text-xs mt-2 italic">Current Month Projection</p>
                    </div>

                    <div className="card p-6 border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                <span className="material-symbols-outlined">account_balance</span>
                            </div>
                            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                <span className="material-symbols-outlined text-xs mr-1">trending_up</span> 4.3%
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-1">TDS (Tax) Collected</p>
                        <h2 className="text-3xl font-bold text-slate-900">₹6,12,000</h2>
                        <p className="text-slate-400 text-xs mt-2 italic">For Q3 FY 2023-24</p>
                    </div>

                    <div className="card p-6 border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <span className="flex items-center text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                <span className="material-symbols-outlined text-xs mr-1">horizontal_rule</span> 0%
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-1">PF/ESI Contributions</p>
                        <h2 className="text-3xl font-bold text-slate-900">₹2,45,200</h2>
                        <p class="text-slate-400 text-xs mt-2 italic">Due by 15th of next month</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Monthly Payroll Runs Table */}
                    <div className="lg:w-[70%]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Monthly Payroll Runs</h3>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-lg">file_download</span>
                                Generate All Payslips
                            </button>
                        </div>
                        <div className="card overflow-hidden border border-slate-100">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Month</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Employees</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Payout</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr><td colSpan="5" className="p-6 text-center text-slate-500">Loading payroll history...</td></tr>
                                    ) : payrollRuns.length === 0 ? (
                                        <tr><td colSpan="5" className="p-6 text-center text-slate-500">No payroll runs found.</td></tr>
                                    ) : (
                                        payrollRuns.map(run => (
                                            <tr key={run.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-slate-700">{run.month}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{run.total_employees}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600 font-medium">₹{run.total_payout?.toLocaleString('en-IN')}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(run.status)}`}>
                                                        {run.status || 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <div className="bg-white px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                                <span>Showing {payrollRuns.length} of {payrollRuns.length} months</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Prev</button>
                                    <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Gratuity Calculator */}
                    <div className="lg:w-[30%]">
                        <div className="mb-6 h-[40px] flex items-center">
                            <h3 className="text-lg font-bold text-slate-800">Gratuity Calculator</h3>
                        </div>
                        <div className="card p-6 border border-slate-100 bg-indigo-50/30">
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="years">Years of Service</label>
                                    <input
                                        className="w-full border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2 bg-white"
                                        id="years"
                                        placeholder="e.g. 5"
                                        type="number"
                                        value={years}
                                        onChange={(e) => setYears(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="salary">Last Drawn Basic Salary</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-slate-400 text-sm">₹</span>
                                        <input
                                            className="w-full pl-7 border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2 bg-white"
                                            id="salary"
                                            placeholder="0.00"
                                            type="number"
                                            value={salary}
                                            onChange={(e) => setSalary(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={calculateGratuity}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-sm cursor-pointer"
                                >
                                    Estimate Gratuity
                                </button>
                            </div>
                            <div className="bg-white p-5 rounded-lg border border-indigo-100 text-center">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Estimated Amount</p>
                                <div className="text-3xl font-bold text-indigo-700">
                                    {gratuity > 0 ? `₹${gratuity.toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : '₹0.00'}
                                </div>
                                <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
                                    Calculation: (15 * Basic Salary * Years) / 26 <br />
                                    <span className="italic">*Final amount subject to taxation rules.</span>
                                </p>
                            </div>
                        </div>

                        {/* Quick Resources */}
                        <div className="mt-6 card p-4 border border-slate-100">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Resources</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a className="flex items-center gap-3 text-sm text-slate-600 hover:text-indigo-600 group" href="#">
                                        <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 text-lg">help_outline</span>
                                        Compliance Checklist
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center gap-3 text-sm text-slate-600 hover:text-indigo-600 group" href="#">
                                        <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 text-lg">calendar_month</span>
                                        Statutory Calendar
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Payroll;
