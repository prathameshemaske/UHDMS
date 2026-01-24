import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';

const UnifiedAnalytics = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white transition-colors duration-300 font-display">
            <PublicNavbar />
            <main>
                <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary w-fit">
                                <span className="material-symbols-outlined text-sm">insights</span>
                                EXECUTIVE INTELLIGENCE
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                                Connect <span className="text-primary">Human Capital</span> to Code Output
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-[580px]">
                                The first analytics engine that bridges the gap between payroll costs and engineering velocity. Understand the true ROI of your R&D organization.
                            </p>
                            <div className="flex items-center gap-8 pt-4">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">100%</span>
                                    <span className="text-sm text-slate-500">Data Visibility</span>
                                </div>
                                <div className="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">40%</span>
                                    <span className="text-sm text-slate-500">Faster Decisions</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative glass-panel rounded-3xl overflow-hidden shadow-2xl">
                                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        <span className="ml-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Global Executive Overview</span>
                                    </div>
                                </div>
                                <div className="p-6 grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950/50">
                                    <div className="metric-card">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Headcount Cost (Monthly)</span>
                                        <div className="text-2xl font-black mt-1">$1.42M</div>
                                        <div className="flex items-center gap-1 text-green-500 text-xs font-bold mt-2">
                                            <span className="material-symbols-outlined text-xs">trending_up</span> 2.4%
                                        </div>
                                    </div>
                                    <div className="metric-card">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Mean Velocity (PRs)</span>
                                        <div className="text-2xl font-black mt-1">42.8</div>
                                        <div className="flex items-center gap-1 text-red-500 text-xs font-bold mt-2">
                                            <span className="material-symbols-outlined text-xs">trending_down</span> 0.8%
                                        </div>
                                    </div>
                                    <div className="col-span-2 metric-card h-48 flex items-end gap-2 relative">
                                        <div className="absolute top-4 left-6">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Cost Per Feature Shipped</span>
                                        </div>
                                        <div className="flex-1 bg-primary/20 h-24 rounded-t-lg"></div>
                                        <div className="flex-1 bg-primary/40 h-32 rounded-t-lg"></div>
                                        <div className="flex-1 bg-primary h-40 rounded-t-lg"></div>
                                        <div className="flex-1 bg-primary/60 h-28 rounded-t-lg"></div>
                                        <div className="flex-1 bg-primary h-36 rounded-t-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
                    <div className="max-w-[1280px] mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-6">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <span className="material-symbols-outlined">groups</span>
                                </div>
                                <h3 className="text-2xl font-bold">People Insights</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Track global headcount distribution, attrition rates, and total compensation across all regional entities in real-time.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        Real-time Payroll Aggregation
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        Skills Gap Visualization
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <span className="material-symbols-outlined">terminal</span>
                                </div>
                                <h3 className="text-2xl font-bold">Delivery Metrics</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Direct integration with GitHub, GitLab, and Jira provides a clear view of PR velocity, cycle time, and deployment frequency.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        Automated DORA Metrics
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        Technical Debt Heatmaps
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <span className="material-symbols-outlined">hub</span>
                                </div>
                                <h3 className="text-2xl font-bold">Correlation Engine</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    The "Magic Layer" that correlates team size and cost to product shipping speed and system stability.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        Unit Economics per Feature
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        Burn Rate vs. Sprint Output
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-[1280px] mx-auto px-6 py-24">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 order-2 md:order-1">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
                                    <h4 className="text-xl font-bold mb-4 relative z-10">Cross-Functional Reporting</h4>
                                    <p className="text-slate-400 mb-8 relative z-10">Generate reports that CFOs love and CTOs respect. High-level financial summaries backed by granular commit-level data.</p>
                                    <div className="space-y-4 relative z-10">
                                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[75%]"></div>
                                        </div>
                                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[45%]"></div>
                                        </div>
                                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 w-[90%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 order-1 md:order-2 space-y-8">
                            <h2 className="text-4xl font-black tracking-tight">Executive Dashboards for Data-Driven Leadership</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Stop guessing. See exactly where your budget is going and how it's impacting your product roadmap. UHDMS Unified Analytics turns complex data into actionable leadership strategies.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">query_stats</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Project Profitability</h4>
                                        <p className="text-sm text-slate-500">Calculate the total human cost for every major feature release.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">monitoring</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold">Engineering Efficiency</h4>
                                        <p class="text-sm text-slate-500">Track how team changes affect development cycle times.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-20">
                    <div className="max-w-[1280px] mx-auto rounded-3xl bg-primary p-8 md:p-16 relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Master Your Metrics</h2>
                            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
                                Join forward-thinking engineering leaders who use UHDMS to optimize their workforce and their codebase.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/register" className="px-10 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                                    Start Free Trial
                                </Link>
                                <button className="px-10 py-4 bg-primary border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                                    View Sample Reports
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
                            The only platform designed specifically for the intersection of HR management and software engineering.
                        </p>
                        <div className="flex gap-4">
                            <a className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                            </a>
                            <a className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" to="/hr-features">HR Core</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="/dev-features">Developer Stack</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="/unified-analytics">Unified Analytics</Link></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Resources</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Case Studies</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© 2024 UHDMS Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span>Built for Builders.</span>
                        <span>System Status: Operational</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UnifiedAnalytics;
