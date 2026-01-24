import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white transition-colors duration-300 font-display">
            <PublicNavbar />
            <main className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-6">
                        Pricing that scales with <span className="text-primary">your velocity</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[700px] mx-auto mb-10">
                        Simple, transparent plans for high-growth engineering teams. No hidden fees, no complex seat mapping. Choose the plan that fits your current stage.
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Monthly</span>
                        <div className="relative inline-block w-14 align-middle select-none transition duration-200 ease-in">
                            <input
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-200 appearance-none cursor-pointer outline-none transition-all duration-300 translate-x-0 checked:translate-x-full checked:border-primary"
                                type="checkbox"
                                name="toggle"
                                id="toggle"
                                checked={isYearly}
                                onChange={(e) => setIsYearly(e.target.checked)}
                            />
                            <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-200 dark:bg-slate-800 cursor-pointer" htmlFor="toggle"></label>
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Yearly</span>
                        <span className="bg-green-100 text-green-700 text-xs font-black px-2 py-1 rounded-full">SAVE 20%</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {/* Starter Plan */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col hover:border-primary/50 transition-all shadow-sm">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Starter</h3>
                            <p className="text-slate-500 text-sm">For small teams building their first product.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">₹{isYearly ? 49 : 59}</span>
                            <span className="text-slate-500">/mo</span>
                        </div>
                        <ul className="flex flex-col gap-4 mb-10 flex-grow">
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Up to 10 employees
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Core HRIS features
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Basic Bug Tracking
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Slack Integration
                            </li>
                        </ul>
                        <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            Start for Free
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative bg-white dark:bg-slate-900 border-2 border-primary rounded-3xl p-8 flex flex-col shadow-2xl shadow-primary/10 transform scale-105 z-10">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
                            Most Popular
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pro</h3>
                            <p className="text-slate-500 text-sm">For scaling companies with hybrid teams.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">₹{isYearly ? 199 : 249}</span>
                            <span className="text-slate-500">/mo</span>
                        </div>
                        <ul className="flex flex-col gap-4 mb-10 flex-grow">
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Up to 50 employees
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Global Payroll integration
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                GitHub/GitLab Sync
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Advanced performance reviews
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Priority Support
                            </li>
                        </ul>
                        <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                            Get Started
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col hover:border-primary/50 transition-all shadow-sm">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Enterprise</h3>
                            <p className="text-slate-500 text-sm">For large-scale engineering organizations.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">Custom</span>
                        </div>
                        <ul className="flex flex-col gap-4 mb-10 flex-grow">
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Unlimited employees
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                SSO & Advanced Security
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Custom API Access
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Dedicated Success Manager
                            </li>
                        </ul>
                        <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
                <div className="hidden md:block">
                    <h2 className="text-3xl font-black text-center mb-12">Detailed Feature Comparison</h2>
                    <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50">
                                    <th className="p-6 text-sm font-bold border-b border-slate-200 dark:border-slate-800">Feature</th>
                                    <th className="p-6 text-sm font-bold border-b border-slate-200 dark:border-slate-800">Starter</th>
                                    <th className="p-6 text-sm font-bold border-b border-slate-200 dark:border-slate-800">Pro</th>
                                    <th className="p-6 text-sm font-bold border-b border-slate-200 dark:border-slate-800">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                <tr className="bg-slate-100/30 dark:bg-slate-800/20">
                                    <td className="px-6 py-3 text-xs font-black uppercase tracking-widest text-primary" colSpan="4">HR Management</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm">Employee Directory</td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                    <td className="p-6"><span class="material-symbols-outlined text-green-500">check</span></td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm">Automated Payroll</td>
                                    <td className="p-6 text-slate-400 text-sm">Manual only</td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm">Time Off Tracking</td>
                                    <td className="p-6 text-slate-400 text-sm">Basic</td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                </tr>
                                <tr className="bg-slate-100/30 dark:bg-slate-800/20">
                                    <td className="px-6 py-3 text-xs font-black uppercase tracking-widest text-primary" colSpan="4">Engineering Stack</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm">Bug Tracking</td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm">Git Integration</td>
                                    <td className="p-6">—</td>
                                    <td className="p-6 text-sm font-medium">Standard</td>
                                    <td className="p-6 text-sm font-medium">Advanced</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-sm">Performance Velocity</td>
                                    <td className="p-6">—</td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                    <td className="p-6"><span className="material-symbols-outlined text-green-500">check</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 px-6 py-16 mt-20">
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
                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Cookie Policy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">GDPR</a></li>
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

export default Pricing;
