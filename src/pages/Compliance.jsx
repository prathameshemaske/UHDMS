import React from 'react';
import { Link } from 'react-router-dom';

const Compliance = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#121117] dark:text-white min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* Side Navigation */}
                <aside className="w-64 border-r border-[#f1f0f4] dark:border-white/10 bg-white dark:bg-[#1a192a] hidden lg:flex flex-col">
                    <div className="p-6 flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-8">
                            {/* Logo / Brand */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined">shield_person</span>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-[#121117] dark:text-white text-base font-bold leading-tight">UHDMS Admin</h1>
                                    <p className="text-[#656487] dark:text-white/60 text-xs font-normal">HRMS Portal</p>
                                </div>
                            </div>
                            {/* Nav Links */}
                            <nav className="flex flex-col gap-2">
                                <Link className="flex items-center gap-3 px-3 py-2 text-[#656487] dark:text-white/60 hover:bg-background-light dark:hover:bg-white/5 rounded-lg transition-colors" to="/">
                                    <span className="material-symbols-outlined">dashboard</span>
                                    <span className="text-sm font-medium">Dashboard</span>
                                </Link>
                                <a className="flex items-center gap-3 px-3 py-2 text-[#656487] dark:text-white/60 hover:bg-background-light dark:hover:bg-white/5 rounded-lg transition-colors" href="#">
                                    <span className="material-symbols-outlined">account_balance</span>
                                    <span className="text-sm font-medium">Payroll</span>
                                </a>
                                <a className="flex items-center gap-3 px-3 py-2 text-[#656487] dark:text-white/60 hover:bg-background-light dark:hover:bg-white/5 rounded-lg transition-colors" href="#">
                                    <span className="material-symbols-outlined">group</span>
                                    <span className="text-sm font-medium">Employees</span>
                                </a>
                                <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white" to="/compliance">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                                    <span className="text-sm font-medium">Compliance</span>
                                </Link>
                                <a className="flex items-center gap-3 px-3 py-2 text-[#656487] dark:text-white/60 hover:bg-background-light dark:hover:bg-white/5 rounded-lg transition-colors" href="#">
                                    <span className="material-symbols-outlined">settings</span>
                                    <span className="text-sm font-medium">Settings</span>
                                </a>
                            </nav>
                        </div>
                        <div className="pt-6 border-t border-[#f1f0f4] dark:border-white/10">
                            <div className="flex items-center gap-3 px-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-sm">support_agent</span>
                                </div>
                                <span className="text-sm font-medium">Support Center</span>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* Main Content Area */}
                <main className="flex-1 flex flex-col overflow-y-auto">
                    {/* Top Navbar */}
                    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#f1f0f4] dark:border-white/10 bg-white/80 dark:bg-[#1a192a]/80 backdrop-blur px-8 py-3">
                        <div className="flex items-center gap-8">
                            <div className="lg:hidden flex items-center gap-4 text-[#121117] dark:text-white">
                                <span className="material-symbols-outlined">menu</span>
                                <h2 className="text-lg font-bold">UHDMS</h2>
                            </div>
                            <div className="hidden md:flex items-center gap-6">
                                <Link className="text-[#121117] dark:text-white text-sm font-medium hover:text-primary transition-colors" to="/">Home</Link>
                                <a className="text-[#656487] dark:text-white/60 text-sm font-medium hover:text-primary transition-colors" href="#">Reports</a>
                                <a className="text-[#656487] dark:text-white/60 text-sm font-medium hover:text-primary transition-colors" href="#">Help</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden sm:block">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#656487] text-xl">search</span>
                                <input className="w-64 pl-10 pr-4 py-2 rounded-lg border-none bg-background-light dark:bg-white/5 text-sm focus:ring-2 focus:ring-primary transition-all" placeholder="Search filings, reports..." type="text" />
                            </div>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-background-light dark:bg-white/5 text-[#121117] dark:text-white hover:bg-[#f1f0f4] dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined">notifications</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-background-light dark:bg-white/5 text-[#121117] dark:text-white hover:bg-[#f1f0f4] dark:hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined">account_circle</span>
                                </button>
                            </div>
                        </div>
                    </header>
                    <div className="px-8 py-6 max-w-7xl w-full mx-auto">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 mb-4 text-sm font-medium">
                            <a className="text-[#656487] dark:text-white/60 hover:text-primary" href="#">Dashboard</a>
                            <span className="material-symbols-outlined text-sm text-[#656487]">chevron_right</span>
                            <a className="text-[#656487] dark:text-white/60 hover:text-primary" href="#">Payroll</a>
                            <span className="material-symbols-outlined text-sm text-[#656487]">chevron_right</span>
                            <span className="text-primary">Compliance & Reports</span>
                        </nav>
                        {/* Page Heading */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div className="max-w-2xl">
                                <h1 className="text-[#121117] dark:text-white text-3xl font-black tracking-tight mb-2">Statutory Compliance & Reports</h1>
                                <p className="text-[#656487] dark:text-white/60 text-base">Generate, manage, and download PF, ESI, and TDS reports for your organization's legal compliance needs.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 border border-[#f1f0f4] dark:border-white/10 rounded-lg bg-white dark:bg-[#1a192a] text-sm font-semibold hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                    <span className="material-symbols-outlined text-lg">calendar_month</span>
                                    <span>FY 2023-24</span>
                                </button>
                            </div>
                        </div>
                        {/* Action Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {/* PF Electronic Challan */}
                            <div className="bg-white dark:bg-[#1a192a] border border-[#f1f0f4] dark:border-white/10 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <div className="h-40 w-full bg-cover bg-center" data-alt="Financial spreadsheet and document calculation pattern" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCebidwAjwtD6Vpxr_h3GkERt339NqP9hLN7U8R7VZVlFOsoXmXu9u3Dn3_qHfaIHD4DJI8MN78c-sji7Opc_i_RHevIAFtSRjr1YeT9HeEJ-3LSYpVwIr7-1XqW0E7GvqsveV9B54oS07OsCqur_uKrbB_FLRSselot5vEgtcW31_kIWaY7lp2QvL395ppDWFyxFOdlpqeYhyZYwduPVkkrkl3dbHdHdukdTvEdJft7CyY40eKUm6A_mVHBA0vCYE4GkFuPXxBcsV9')" }}></div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold mb-1">PF Electronic Challan</h3>
                                    <p className="text-sm text-[#656487] dark:text-white/60 mb-6">Process Form 5, 10, & 12A. Monthly provident fund contributions for all active employees.</p>
                                    <div className="mt-auto flex flex-col gap-2">
                                        <button className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                                            <span className="material-symbols-outlined text-lg">autorenew</span>
                                            Generate Report
                                        </button>
                                        <button className="w-full py-2.5 border border-primary/20 text-primary dark:text-primary dark:border-primary/40 rounded-lg text-sm font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-lg">download</span>
                                            Download CSV
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ESI Contribution Report */}
                            <div className="bg-white dark:bg-[#1a192a] border border-[#f1f0f4] dark:border-white/10 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <div className="h-40 w-full bg-cover bg-center" data-alt="Insurance and healthcare compliance document theme" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzFsGutiia2pBZiWZbY7-XFF0a44rA1wjw_h7LKFxpAhOe3pCoSL1IxI_4DCpKpOoQPfTHzTUtPlLD6_yOMULy3vM_raeyBts8C9KAUHXplfFmIr-fXp9xhxZjhVGR0BrlphYl_9HP5WV30ytsoqD5w0wMSTSl1riO-NwNFwv2Z7a0qtnotFyNTcMf9szNfnwKagegmzUBRfSut5RhH-fyST68_f4pT-BkRqeqqknJ-6krE_sHBanLk4YjVoflJAwqTTNJe4lQWJ_r')" }}></div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold mb-1">ESI Contribution Report</h3>
                                    <p className="text-sm text-[#656487] dark:text-white/60 mb-6">Monthly Employee State Insurance contribution summary and individual deductions for filing.</p>
                                    <div className="mt-auto flex flex-col gap-2">
                                        <button className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                                            <span className="material-symbols-outlined text-lg">autorenew</span>
                                            Generate Report
                                        </button>
                                        <button className="w-full py-2.5 border border-primary/20 text-primary dark:text-primary dark:border-primary/40 rounded-lg text-sm font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-lg">download</span>
                                            Download CSV
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* TDS Quarterly Return */}
                            <div className="bg-white dark:bg-[#1a192a] border border-[#f1f0f4] dark:border-white/10 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <div className="h-40 w-full bg-cover bg-center" data-alt="Legal scales and tax return document pattern" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAz-19iijut-39QLkmR3IJpJFuwEJzYla4rRA9keqkx9ImGua50z_37QfLucP26F1JiazrPIxWihBVfNOVpKhgw7oAN7ZtXlJOXdvsU2QYZlmgfUYidLyw60lBnxBRKh8g4gDd_fyH2iBk0Enx8FfujXq5ZxEQaRZXe_nUR5qHNTsB2YaZHC5LYcFB4bN-qyPNSzHahVnBwsH-vMxuqEF-AdkX24QJnRrhVRAFXaiUMuInkKLgYZGc2rtnhEGL1v_i325a3R8xOtMr0')" }}></div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold mb-1">TDS Quarterly Return</h3>
                                    <p className="text-sm text-[#656487] dark:text-white/60 mb-6">Quarterly income tax returns and 24Q filing reports for employee salary deductions.</p>
                                    <div className="mt-auto flex flex-col gap-2">
                                        <button className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                                            <span className="material-symbols-outlined text-lg">autorenew</span>
                                            Generate Report
                                        </button>
                                        <button className="w-full py-2.5 border border-primary/20 text-primary dark:text-primary dark:border-primary/40 rounded-lg text-sm font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-lg">download</span>
                                            Download CSV
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Filing History Table Section */}
                        <div className="bg-white dark:bg-[#1a192a] border border-[#f1f0f4] dark:border-white/10 rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-[#f1f0f4] dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                                <h3 className="text-lg font-bold">Compliance Filing History</h3>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#656487] text-lg">filter_list</span>
                                        <select className="pl-10 pr-8 py-1.5 rounded-lg border border-[#f1f0f4] dark:border-white/10 bg-white dark:bg-white/5 text-sm appearance-none focus:ring-primary">
                                            <option>All Types</option>
                                            <option>PF Challan</option>
                                            <option>ESI Contribution</option>
                                            <option>TDS Returns</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-background-light/50 dark:bg-white/5">
                                            <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Report Type</th>
                                            <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Filing Period</th>
                                            <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Submission Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Acknowledgment #</th>
                                            <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f1f0f4] dark:divide-white/5">
                                        <tr className="hover:bg-background-light/30 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">description</span>
                                                    <span className="text-sm font-semibold">PF Electronic Challan</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">October 2023</td>
                                            <td className="px-6 py-4 text-sm">Nov 14, 2023</td>
                                            <td className="px-6 py-4 text-sm font-mono text-primary">ACK-PF-2310-98442</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 flex items-center w-fit gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Filed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-[#656487] dark:text-white/60 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">download</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-background-light/30 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">medical_services</span>
                                                    <span className="text-sm font-semibold">ESI Contribution</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">October 2023</td>
                                            <td className="px-6 py-4 text-sm">Nov 12, 2023</td>
                                            <td className="px-6 py-4 text-sm font-mono text-primary">ACK-ESI-2310-77123</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 flex items-center w-fit gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Filed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-[#656487] dark:text-white/60 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">download</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-background-light/30 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">receipt_long</span>
                                                    <span className="text-sm font-semibold">TDS Quarterly Return</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">Q2 (Jul - Sep)</td>
                                            <td className="px-6 py-4 text-sm">Oct 28, 2023</td>
                                            <td className="px-6 py-4 text-sm font-mono text-primary">ACK-TDS-Q2-2324</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 flex items-center w-fit gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">history</span> Pending
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-[#656487] dark:text-white/60 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">download</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-background-light/30 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">description</span>
                                                    <span className="text-sm font-semibold">PF Electronic Challan</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">September 2023</td>
                                            <td className="px-6 py-4 text-sm">Oct 14, 2023</td>
                                            <td className="px-6 py-4 text-sm font-mono text-primary">ACK-PF-2309-11234</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 flex items-center w-fit gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Filed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-[#656487] dark:text-white/60 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">download</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination Placeholder */}
                            <div className="p-6 border-t border-[#f1f0f4] dark:border-white/10 flex items-center justify-between">
                                <p className="text-sm text-[#656487] dark:text-white/60">Showing 1 to 4 of 24 entries</p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 rounded border border-[#f1f0f4] dark:border-white/10 text-sm disabled:opacity-50">Previous</button>
                                    <button className="px-3 py-1.5 rounded bg-primary text-white text-sm">1</button>
                                    <button className="px-3 py-1.5 rounded border border-[#f1f0f4] dark:border-white/10 text-sm">2</button>
                                    <button className="px-3 py-1.5 rounded border border-[#f1f0f4] dark:border-white/10 text-sm">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Compliance;
