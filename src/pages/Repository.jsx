import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Repository = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#f9fafb] dark:bg-[#111827] font-sans text-slate-900 dark:text-slate-100 antialiased h-screen overflow-hidden flex flex-col">
            <header className="flex h-16 items-center justify-between border-b border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 px-6 shrink-0 z-20">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-[#5048e5]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">UHDMS</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/">Dashboard</Link>
                        <Link className="text-[#5048e5] text-sm font-semibold border-b-2 border-[#5048e5] py-[22px]" to="/repository">Repository</Link>
                        <Link className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/test-suites">Test Cases</Link>
                        <Link className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/executions">Test Runs</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-[#5048e5]/10 border border-[#5048e5]/20 flex items-center justify-center text-[#5048e5] font-bold text-xs">
                        JD
                    </div>
                </div>
            </header>
            <main className="flex flex-1 overflow-hidden">
                <aside className="w-1/4 min-w-[300px] border-r border-[#E5E7EB] dark:border-slate-800 bg-[#F3F4F6] dark:bg-slate-900/50 flex flex-col hidden md:flex">
                    <div className="p-5">
                        <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-[#E5E7EB] dark:border-slate-700 px-4 py-2.5 rounded-lg font-semibold text-sm hover:shadow-sm transition-all">
                            <span className="material-symbols-outlined text-[20px] text-[#5048e5]">create_new_folder</span>
                            Add Folder
                        </button>
                    </div>
                    <div className="px-5 mb-4">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                            <input className="w-full bg-white/50 dark:bg-slate-800/50 border-[#E5E7EB] dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-[#5048e5] focus:border-[#5048e5] transition-all placeholder-slate-400 outline-none" placeholder="Filter folders..." type="text" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1">
                        <div className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
                            <span className="material-symbols-outlined text-[20px] text-slate-400">folder</span>
                            <span className="text-sm font-medium flex-1">Smoke Tests</span>
                            <span className="text-xs text-slate-400 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-[#E5E7EB] dark:border-slate-700">12</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 bg-[#5048e5]/10 text-[#5048e5] rounded-lg cursor-pointer">
                            <span className="material-symbols-outlined text-[20px]">folder_open</span>
                            <span className="text-sm font-semibold flex-1">Regression</span>
                            <span className="text-xs font-bold bg-[#5048e5] text-white px-1.5 py-0.5 rounded">42</span>
                        </div>
                        <div className="space-y-1 ml-4 border-l border-[#E5E7EB] dark:border-slate-800">
                            <div className="flex items-center gap-3 px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg cursor-pointer ml-3">
                                <span className="material-symbols-outlined text-[18px] text-slate-400">folder</span>
                                <span className="text-sm">Module A</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg cursor-pointer ml-3">
                                <span className="material-symbols-outlined text-[18px] text-slate-400">folder</span>
                                <span className="text-sm">Module B</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
                            <span className="material-symbols-outlined text-[20px] text-slate-400">folder</span>
                            <span className="text-sm font-medium flex-1">Integration</span>
                            <span className="text-xs text-slate-400 hidden group-hover:block">8</span>
                        </div>
                    </div>
                </aside>
                <section className="flex-1 bg-white dark:bg-slate-900 flex flex-col min-w-0">
                    <div className="px-8 py-6 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">
                                <span>Repository</span>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <span className="text-slate-500">Suite</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Regression</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative inline-block text-left">
                                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">file_download</span>
                                    Export
                                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                                </button>
                            </div>
                            <Link to="/test-cases/create" className="flex items-center justify-center gap-2 bg-[#5048e5] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-[#5048e5]/20">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Create Test Case
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10 border-b border-[#E5E7EB] dark:border-slate-800">
                                <tr>
                                    <th className="py-4 px-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-24">ID</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Title</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-32">Priority</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-48">Created By</th>
                                    <th className="py-4 px-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-40 text-center">Last Run Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E7EB] dark:divide-slate-800">
                                <tr onClick={() => navigate('/test-cases/TC-001')} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
                                    <td className="py-4 px-8 text-sm font-mono text-slate-400">TC-001</td>
                                    <td className="py-4 px-4">
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white">User Login with Valid Credentials</div>
                                        <div className="text-xs text-slate-400 mt-0.5">Authenticates user through main gateway</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold rounded border border-red-100 dark:border-red-900/30">P1</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400">SM</div>
                                            <span className="text-sm text-slate-600 dark:text-slate-300">Sarah Miller</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-8">
                                        <div className="flex justify-center">
                                            <span className="material-symbols-outlined text-green-500 bg-green-50 dark:bg-green-900/20 rounded-full p-0.5 text-[20px]">check_circle</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
                                    <td className="py-4 px-8 text-sm font-mono text-slate-400">TC-002</td>
                                    <td className="py-4 px-4">
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white">Password Complexity Validation</div>
                                        <div className="text-xs text-slate-400 mt-0.5">Checks for min 8 chars, uppercase, and symbols</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded border border-amber-100 dark:border-amber-900/30">P2</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-[#5048e5]">JD</div>
                                            <span className="text-sm text-slate-600 dark:text-slate-300">John Doe</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-8">
                                        <div className="flex justify-center">
                                            <span className="material-symbols-outlined text-red-500 bg-red-50 dark:bg-red-900/20 rounded-full p-0.5 text-[20px]">cancel</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
                                    <td className="py-4 px-8 text-sm font-mono text-slate-400">TC-003</td>
                                    <td className="py-4 px-4">
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white">Forgot Password Email Trigger</div>
                                        <div className="text-xs text-slate-400 mt-0.5">Verifies that recovery email is dispatched</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded border border-slate-200 dark:border-slate-700">P3</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">AM</div>
                                            <span className="text-sm text-slate-600 dark:text-slate-300">Alex Moore</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-8">
                                        <div className="flex justify-center">
                                            <span className="material-symbols-outlined text-green-500 bg-green-50 dark:bg-green-900/20 rounded-full p-0.5 text-[20px]">check_circle</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
                                    <td className="py-4 px-8 text-sm font-mono text-slate-400">TC-004</td>
                                    <td className="py-4 px-4">
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white">Multi-factor Authentication Flow</div>
                                        <div className="text-xs text-slate-400 mt-0.5">TOTP verification after password success</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold rounded border border-red-100 dark:border-red-900/30">P1</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">SM</div>
                                            <span className="text-sm text-slate-600 dark:text-slate-300">Sarah Miller</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-8">
                                        <div className="flex justify-center">
                                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[20px]">remove_circle_outline</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
                                    <td className="py-4 px-8 text-sm font-mono text-slate-400">TC-005</td>
                                    <td className="py-4 px-4">
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white">OAuth2 Google Integration</div>
                                        <div className="text-xs text-slate-400 mt-0.5">Third-party authentication bridge</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded border border-amber-100 dark:border-amber-900/30">P2</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-[#5048e5]">JD</div>
                                            <span className="text-sm text-slate-600 dark:text-slate-300">John Doe</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-8">
                                        <div className="flex justify-center">
                                            <span className="material-symbols-outlined text-green-500 bg-green-50 dark:bg-green-900/20 rounded-full p-0.5 text-[20px]">check_circle</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="h-10 border-t border-[#E5E7EB] dark:border-slate-800 px-8 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
                        <div className="flex items-center gap-4">
                            <span className="text-[11px] text-slate-400 font-medium">SHOWING 5 OF 42 TEST CASES</span>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-green-500"></div>
                                <span>32 Passed</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-red-500"></div>
                                <span>4 Failed</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-slate-300"></div>
                                <span>6 Not Run</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Repository;
