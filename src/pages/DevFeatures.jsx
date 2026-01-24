import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';

const DevFeatures = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white transition-colors duration-300 font-display">
            <PublicNavbar />
            <main>
                <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] text-xs font-bold mb-6">
                                <span className="material-symbols-outlined text-sm">terminal</span>
                                BUILT FOR DEVELOPERS
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-8">
                                Shipping code is <br /><span className="text-primary">Human-Centric.</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
                                The only engineering suite that bridges the gap between your Git workflow and organizational health. Manage tasks, track bugs, and run tests with native Git-sync.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/30 hover:translate-y-[-2px] transition-all">
                                    Connect GitHub
                                </button>
                                <button className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors">
                                    Explore CLI
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl bg-slate-200 dark:bg-slate-800 p-2 overflow-hidden shadow-2xl">
                                <div className="w-full h-full bg-cover bg-center rounded-2xl" data-alt="IDE-style dashboard showing code velocity and team health" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxMccg2BuCw8bV6rPW2SBWaxBGWZVt4aib8VfK_lp6U22nVRf5B0X0xEkKl2DpBBTPm1aVk4yynFGlP8agbXKYHIFFrp3kr6pylJeBDcxx6cwHs9q7acdcHJdCCw5x62myYi7Kx8Iy51ON2QxyxVULKly8SCPY8hlcjlyvcEc6e7E_1aPXN16ZnZP7gvW3QDNwuYqlP0EcEdtmi01JNYCRUkfEC3A44G0_v-4XLOFEie662AMUJBuepZTBwTcLnM5xkFm86XhKM9Ab')" }}></div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 p-6 rounded-2xl shadow-2xl max-w-[280px]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Git Sync Status</span>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[#0ea5e9] text-lg">commit</span>
                                        <div className="text-xs">
                                            <p className="font-bold">Commit synchronized</p>
                                            <p className="text-slate-500">Linked to Issue #442</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg">account_tree</span>
                                        <div className="text-xs">
                                            <p className="font-bold">PR Deployed</p>
                                            <p className="text-slate-500">Staging-01 active</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white dark:bg-slate-900/50 py-24 border-y border-slate-100 dark:border-slate-800">
                    <div className="max-w-[1280px] mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-black mb-6">Unified Developer Experience</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Native integrations that make your tools feel like they were born together. No more context switching.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="flex flex-col">
                                <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">bug_report</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Integrated Bug Tracker</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                    Every bug report automatically creates a shadow ticket in HR for capacity planning. Squash bugs while keeping the team load balanced.
                                </p>
                                <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-slate-400 mt-auto">
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Auto-repro environment links</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Crash report stack-trace sync</li>
                                </ul>
                            </div>
                            <div className="flex flex-col">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">view_kanban</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Sprint Intelligence</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                    Kanban boards that update based on your Git activity. When a PR is merged, the card moves. No manual updates required.
                                </p>
                                <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-slate-400 mt-auto">
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Branch-to-task mapping</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Velocity prediction engine</li>
                                </ul>
                            </div>
                            <div className="flex flex-col">
                                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">biotech</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Test Suite Repository</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                    Manage all your CI/CD test cases in a unified repository. Link test failures to specific employee skill sets for training.
                                </p>
                                <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-slate-400 mt-auto">
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Flaky test detection</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Parallel execution dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-[1280px] mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="rounded-2xl bg-slate-900 p-8 font-mono text-sm text-slate-300 shadow-2xl border border-slate-800">
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-slate-500"># Sycing UHDMS with local environment</p>
                                    <p><span className="text-[#0ea5e9]">$</span> uhdms login --git-sync</p>
                                    <p className="text-green-400">✓ Authenticated as @dev_jane</p>
                                    <p><span className="text-[#0ea5e9]">$</span> uhdms link-issue "CORE-892"</p>
                                    <p className="text-green-400">✓ Linked PR #122 to HR Performance Milestone</p>
                                    <p><span className="text-[#0ea5e9]">$</span> git commit -m "feat: core auth logic"</p>
                                    <p className="text-slate-400">Pushing to remote...</p>
                                    <p className="text-primary font-bold">UHDMS: Dashboard updated. Milestone 80% complete.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl font-black mb-8 leading-tight">Bi-directional <br />Git Synchronization</h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-xl">sync_alt</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Native CLI Tools</h4>
                                        <p className="text-slate-600 dark:text-slate-400">Link your commits, PRs, and reviews directly to company milestones from your terminal.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-xl">analytics</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Impact Analytics</h4>
                                        <p className="text-slate-600 dark:text-slate-400">See the real-world impact of your code. Every merge is measured against project health and payroll budgets.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-[1280px] mx-auto px-6 py-20">
                    <div className="rounded-3xl bg-slate-900 p-12 md:p-20 relative overflow-hidden text-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-[#0ea5e9]/10 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Build more, manage less.</h2>
                            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">Join 15,000+ developers who have reclaimed their focus time by unifying their stack.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/register" className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
                                    Start Your Dev Account
                                </Link>
                                <button className="px-10 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                    View Documentation
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 px-6 py-16">
                <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="text-primary">
                                <svg fill="none" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-lg font-black tracking-tight">UHDMS</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[280px] mb-8">
                            The developer-first operating system for modern engineering teams. HR and Dev, perfectly synced.
                        </p>
                        <div className="flex gap-4">
                            <a className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Dev Stack</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Bug Tracker</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Task Boards</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">CLI Documentation</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">API Reference</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Platform</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Global Payroll</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Compliance</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Integrations</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors cursor-pointer">About</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Changelog</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Status</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© 2024 UHDMS Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> API: 99.99% Uptime</span>
                        <span>GDPR Compliant</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DevFeatures;
