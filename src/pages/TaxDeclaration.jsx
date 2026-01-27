import React from 'react';
import { Link } from 'react-router-dom';

const TaxDeclaration = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white min-h-screen font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Top Navigation Bar */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#dcdce5] dark:border-b-[#2a2a3a] bg-white dark:bg-[#1a192a] px-10 py-3 sticky top-0 z-50">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-4 text-primary">
                                <div className="size-6">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                                </div>
                                <h2 className="text-[#121117] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">UHDMS</h2>
                            </div>
                            <label className="flex flex-col min-w-40 !h-10 max-w-64">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                    <div className="text-[#656487] flex border-none bg-[#f1f0f4] dark:bg-[#2a2a3a] items-center justify-center pl-4 rounded-l-lg" data-icon="search">
                                        <span className="material-symbols-outlined text-xl">search</span>
                                    </div>
                                    <input className="form-input flex w-full min-w-0 flex-1 border-none bg-[#f1f0f4] dark:bg-[#2a2a3a] dark:text-white focus:outline-0 focus:ring-0 h-full placeholder:text-[#656487] px-4 rounded-r-lg pl-2 text-sm font-normal" placeholder="Search employee..." />
                                </div>
                            </label>
                        </div>
                        <div className="flex flex-1 justify-end gap-8">
                            <div className="flex items-center gap-9">
                                <Link className="text-[#121117] dark:text-gray-300 text-sm font-medium leading-normal" to="/">Dashboard</Link>
                                <Link className="text-[#121117] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors" to="/employees">Employee Management</Link>
                                <Link className="text-primary dark:text-primary text-sm font-bold leading-normal border-b-2 border-primary" to="/tax-declaration">Tax Management</Link>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white">
                                    <span className="material-symbols-outlined">notifications</span>
                                </button>
                                <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white">
                                    <span className="material-symbols-outlined">settings</span>
                                </button>
                            </div>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" data-alt="User avatar profile picture" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCu9ofOsDQUoBNw9RwqlOstwoa3mX3Dr_stKaeWXy1pwBbbH4IuqAKy70fOibZD22kNfXAiuas9MAC-IiAVx-JKObUvYElOifYulOptDTvLtVdTREs0b0sEkBg14uxlt3RMeRC1CAUABjCGt0IIJXuzwLOn5-6QjkM14i8E2pjOCqI7spwenlwOuIR6I6RaORUFJSvJeRkgVlRN6cdeISlha3dxotgop05upXUZVAGhcMepTMSMIuINWKBGNs9j8_qDPNyaplKrsh7J")' }}></div>
                        </div>
                    </header>
                    <main className="flex-1 flex overflow-hidden">
                        {/* Left Content: List & Controls */}
                        <div className="flex-1 flex flex-col overflow-y-auto px-4 lg:px-20 py-8">
                            {/* Breadcrumbs */}
                            <div className="flex flex-wrap gap-2 px-4 mb-2">
                                <a className="text-[#656487] dark:text-gray-400 text-sm font-medium leading-normal" href="#">HRMS</a>
                                <span className="text-[#656487] dark:text-gray-400 text-sm font-medium leading-normal">/</span>
                                <span className="text-[#121117] dark:text-white text-sm font-medium leading-normal">Tax Management</span>
                            </div>
                            {/* Page Heading */}
                            <div className="flex flex-wrap justify-between items-end gap-3 px-4 py-4">
                                <div className="flex min-w-72 flex-col gap-1">
                                    <p className="text-[#121117] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Tax Declaration Review</p>
                                    <p className="text-[#656487] dark:text-gray-400 text-base font-normal leading-normal">FY 2023-24 • 128 submissions pending review</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white text-sm font-bold gap-2">
                                        <span className="material-symbols-outlined text-lg">filter_alt</span>
                                        <span>Filter</span>
                                    </button>
                                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white text-sm font-bold gap-2">
                                        <span className="material-symbols-outlined text-lg">download</span>
                                        <span>Export Report</span>
                                    </button>
                                </div>
                            </div>
                            {/* Tabs */}
                            <div className="px-4">
                                <div className="flex border-b border-[#dcdce5] dark:border-[#2a2a3a] gap-8 overflow-x-auto scrollbar-hide">
                                    <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#656487] dark:text-gray-400 pb-[13px] pt-4 whitespace-nowrap" href="#">
                                        <p className="text-sm font-bold leading-normal tracking-[0.015em]">All Submissions (450)</p>
                                    </a>
                                    <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-primary pb-[13px] pt-4 whitespace-nowrap" href="#">
                                        <p className="text-sm font-bold leading-normal tracking-[0.015em]">Pending (128)</p>
                                    </a>
                                    <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#656487] dark:text-gray-400 pb-[13px] pt-4 whitespace-nowrap" href="#">
                                        <p className="text-sm font-bold leading-normal tracking-[0.015em]">Verified (280)</p>
                                    </a>
                                    <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#656487] dark:text-gray-400 pb-[13px] pt-4 whitespace-nowrap" href="#">
                                        <p className="text-sm font-bold leading-normal tracking-[0.015em]">Rejected (42)</p>
                                    </a>
                                </div>
                            </div>
                            {/* Table */}
                            <div className="px-4 py-6 @container">
                                <div className="flex flex-col overflow-hidden rounded-xl border border-[#dcdce5] dark:border-[#2a2a3a] bg-white dark:bg-[#1a192a] shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-[#f9fafb] dark:bg-[#212035] border-b border-[#dcdce5] dark:border-[#2a2a3a]">
                                                    <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Employee</th>
                                                    <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Employee ID</th>
                                                    <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Total Declared</th>
                                                    <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Submission Date</th>
                                                    <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider text-center">Status</th>
                                                    <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#dcdce5] dark:divide-[#2a2a3a]">
                                                {/* Selected Row */}
                                                <tr className="bg-primary/5 border-l-4 border-l-primary hover:bg-primary/10 transition-colors cursor-pointer">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs" data-alt="Arjun Mehta avatar">AM</div>
                                                            <span className="text-[#121117] dark:text-white font-semibold text-sm">Arjun Mehta</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">EMP-102</td>
                                                    <td className="px-6 py-4 text-[#121117] dark:text-white font-medium text-sm">₹1,85,000</td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">Oct 12, 2023</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                                            Pending
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-primary font-bold text-sm hover:underline">Reviewing</button>
                                                    </td>
                                                </tr>
                                                {/* Normal Rows */}
                                                <tr className="bg-white dark:bg-[#1a192a] hover:bg-[#f9fafb] dark:hover:bg-[#212035] transition-colors border-l-4 border-l-transparent">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 font-bold text-xs" data-alt="Sanya Iyer avatar">SI</div>
                                                            <span className="text-[#121117] dark:text-white font-medium text-sm">Sanya Iyer</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">EMP-215</td>
                                                    <td className="px-6 py-4 text-[#121117] dark:text-white font-medium text-sm">₹42,000</td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">Oct 11, 2023</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                            Verified
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-[#656487] dark:text-gray-400 font-bold text-sm hover:text-primary transition-colors">View</button>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white dark:bg-[#1a192a] hover:bg-[#f9fafb] dark:hover:bg-[#212035] transition-colors border-l-4 border-l-transparent">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 font-bold text-xs" data-alt="Rahul Verma avatar">RV</div>
                                                            <span className="text-[#121117] dark:text-white font-medium text-sm">Rahul Verma</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">EMP-089</td>
                                                    <td className="px-6 py-4 text-[#121117] dark:text-white font-medium text-sm">₹2,10,000</td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">Oct 10, 2023</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                                            Pending
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-primary font-bold text-sm hover:underline">Review</button>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white dark:bg-[#1a192a] hover:bg-[#f9fafb] dark:hover:bg-[#212035] transition-colors border-l-4 border-l-transparent">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-600 font-bold text-xs" data-alt="Priya Singh avatar">PS</div>
                                                            <span className="text-[#121117] dark:text-white font-medium text-sm">Priya Singh</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">EMP-334</td>
                                                    <td className="px-6 py-4 text-[#121117] dark:text-white font-medium text-sm">₹95,000</td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">Oct 09, 2023</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
                                                            Rejected
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-[#656487] dark:text-gray-400 font-bold text-sm hover:text-primary transition-colors">View</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#1a192a] border-t border-[#dcdce5] dark:border-[#2a2a3a]">
                                        <span className="text-xs text-[#656487] dark:text-gray-400 font-medium uppercase tracking-wider">Page 1 of 12</span>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 text-xs font-bold rounded bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#656487] dark:text-white disabled:opacity-50" disabled="">Prev</button>
                                            <button className="px-3 py-1 text-xs font-bold rounded bg-[#f1f0f4] dark:bg-[#2a2a3a] text-primary">1</button>
                                            <button className="px-3 py-1 text-xs font-bold rounded bg-transparent text-[#656487] dark:text-white">2</button>
                                            <button className="px-3 py-1 text-xs font-bold rounded bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#656487] dark:text-white">Next</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right Side Panel: Review Details */}
                        <aside className="w-[480px] bg-white dark:bg-[#1a192a] border-l border-[#dcdce5] dark:border-[#2a2a3a] flex flex-col shadow-2xl relative z-10">
                            <div className="p-6 border-b border-[#dcdce5] dark:border-[#2a2a3a] flex items-center justify-between sticky top-0 bg-white dark:bg-[#1a192a] z-20">
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-bold text-[#121117] dark:text-white">Declaration Details</h3>
                                    <p className="text-sm text-[#656487] dark:text-gray-400 font-medium">Arjun Mehta • EMP-102</p>
                                </div>
                                <button className="text-[#656487] hover:text-rose-500">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                {/* Section 80C */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Section 80C</h4>
                                        <span className="text-sm font-bold text-[#121117] dark:text-white">₹1,50,000</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex flex-col p-4 bg-background-light dark:bg-[#212035] rounded-lg border border-[#dcdce5] dark:border-[#2a2a3a]">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold text-[#121117] dark:text-white">LIC Premium</span>
                                                <span className="text-xs font-bold text-[#656487] dark:text-gray-400">₹45,000</span>
                                            </div>
                                            <a className="flex items-center gap-2 text-primary text-xs font-bold hover:underline" href="#">
                                                <span className="material-symbols-outlined text-sm">description</span>
                                                lic_receipt_2023.pdf
                                            </a>
                                        </div>
                                        <div className="flex flex-col p-4 bg-background-light dark:bg-[#212035] rounded-lg border border-[#dcdce5] dark:border-[#2a2a3a]">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold text-[#121117] dark:text-white">PPF Investment</span>
                                                <span className="text-xs font-bold text-[#656487] dark:text-gray-400">₹1,05,000</span>
                                            </div>
                                            <a className="flex items-center gap-2 text-primary text-xs font-bold hover:underline" href="#">
                                                <span className="material-symbols-outlined text-sm">description</span>
                                                ppf_statement_dec.pdf
                                            </a>
                                        </div>
                                    </div>
                                </section>
                                {/* Section 80D */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Section 80D</h4>
                                        <span className="text-sm font-bold text-[#121117] dark:text-white">₹25,000</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex flex-col p-4 bg-background-light dark:bg-[#212035] rounded-lg border border-[#dcdce5] dark:border-[#2a2a3a]">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold text-[#121117] dark:text-white">Medical Insurance</span>
                                                <span className="text-xs font-bold text-[#656487] dark:text-gray-400">₹25,000</span>
                                            </div>
                                            <a className="flex items-center gap-2 text-primary text-xs font-bold hover:underline" href="#">
                                                <span className="material-symbols-outlined text-sm">description</span>
                                                star_health_policy.pdf
                                            </a>
                                        </div>
                                    </div>
                                </section>
                                {/* House Rent Allowance */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary">House Rent (HRA)</h4>
                                        <span className="text-sm font-bold text-[#121117] dark:text-white">₹1,20,000 /yr</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex flex-col p-4 bg-background-light dark:bg-[#212035] rounded-lg border border-[#dcdce5] dark:border-[#2a2a3a]">
                                            <div className="flex flex-col gap-1 mb-3">
                                                <span className="text-sm font-semibold text-[#121117] dark:text-white">Rent Receipts</span>
                                                <p className="text-xs text-[#656487] dark:text-gray-400">Oct 2023 - March 2024</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <a className="flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold hover:bg-primary/20 transition-colors" href="#">
                                                    <span className="material-symbols-outlined text-sm">attachment</span>
                                                    Receipt_Q4.pdf
                                                </a>
                                                <a className="flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold hover:bg-primary/20 transition-colors" href="#">
                                                    <span className="material-symbols-outlined text-sm">attachment</span>
                                                    Rent_Agrmt.pdf
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* Admin Remarks */}
                                <section className="pb-24">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#656487] dark:text-gray-400 mb-4">Admin Remarks</h4>
                                    <textarea className="w-full bg-background-light dark:bg-[#212035] border border-[#dcdce5] dark:border-[#2a2a3a] rounded-lg p-3 text-sm focus:ring-primary focus:border-primary text-[#121117] dark:text-white placeholder:text-[#656487]" placeholder="Add notes for the employee or internal verification notes..." rows="3"></textarea>
                                </section>
                            </div>
                            {/* Side Panel Action Footer */}
                            <div className="p-6 border-t border-[#dcdce5] dark:border-[#2a2a3a] bg-white dark:bg-[#1a192a] flex flex-col gap-3 sticky bottom-0 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                        Reject
                                    </button>
                                    <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-lg">check_circle</span>
                                        Verify
                                    </button>
                                </div>
                                <button className="w-full bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white font-bold py-2.5 rounded-lg text-sm transition-colors hover:bg-[#e2e2e8] flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-lg">question_answer</span>
                                    Request Clarification
                                </button>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TaxDeclaration;
