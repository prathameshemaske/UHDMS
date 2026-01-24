import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';

const Solutions = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white transition-colors duration-300 font-display">
            <PublicNavbar />
            <main className="max-w-[1280px] mx-auto">
                <section className="px-6 py-16 md:py-24 text-center flex flex-col items-center">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-6">
                            SOLUTIONS & USE CASES
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-6">
                            Tailored for the teams <br />that <span className="text-primary">build the future</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            Whether you're scaling a startup or optimizing an enterprise engineering org, UHDMS provides the unified infrastructure you need to connect people and product.
                        </p>
                    </div>
                </section>
                <section className="px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                </div>
                                <h2 className="text-3xl font-black mb-4">For Startup Founders</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400">Move fast without the operational debt. UHDMS gives you an "all-in-one" foundation so you don't have to stitch together 15 different SaaS tools in your first year.</p>
                            </div>
                            <div className="grid gap-6">
                                <div className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                    <span className="material-symbols-outlined text-primary">speed</span>
                                    <div>
                                        <h4 className="font-bold mb-1">Accelerate Onboarding</h4>
                                        <p className="text-sm text-slate-500">Get new hires into GitHub, Slack, and Payroll in one click.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                    <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                                    <div>
                                        <h4 className="font-bold mb-1">Burn Rate Clarity</h4>
                                        <p className="text-sm text-slate-500">Real-time visibility into how payroll costs translate to product milestones.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl bg-slate-100 dark:bg-slate-800/50 overflow-hidden border border-slate-200 dark:border-slate-700">
                                <div className="w-full h-full bg-cover bg-center" data-alt="Dashboard showing startup growth metrics and team scaling" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxMccg2BuCw8bV6rPW2SBWaxBGWZVt4aib8VfK_lp6U22nVRf5B0X0xEkKl2DpBBTPm1aVk4yynFGlP8agbXKYHIFFrp3kr6pylJeBDcxx6cwHs9q7acdcHJdCCw5x62myYi7Kx8Iy51ON2QxyxVULKly8SCPY8hlcjlyvcEc6e7E_1aPXN16ZnZP7gvW3QDNwuYqlP0EcEdtmi01JNYCRUkfEC3A44G0_v-4XLOFEie662AMUJBuepZTBwTcLnM5xkFm86XhKM9Ab')" }}></div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJI9GUduWplUrPAS1pq099kCzP_CmADt7ifC8h3bBvQk1Z2X26mLBg5HGNeeB1jP-mkcqoEH-J9L0YHFR_ixo6MPccpeUeT_AEu3tVFybyuhjqGycP2sL8Iechn0afsxeU2fO9rLNeGpc4yAE-Rp_r38xWE4tsNtKcmxZS0zOt6j1mLWlFIGGUD3aIXJKJ6kAOmsK2-qDXRkrH4bKcE5PfPBrI1AQs1JSYsTFVRRErsVZZ4rCrBjybBQ1vkj5WV_4EZoQu0GgkN1qF'); background-size: cover;" }}></div>
                                    <div>
                                        <p className="text-sm font-bold">"We saved $40k/year in tool sprawl."</p>
                                        <p className="text-xs text-slate-500">CEO, NextGen AI</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-20 bg-slate-50 dark:bg-slate-900/30 rounded-[3rem]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="aspect-video rounded-2xl bg-slate-900 border border-slate-700 p-2 shadow-2xl overflow-hidden">
                                <div className="w-full h-full bg-cover bg-center opacity-80" data-alt="Developer velocity dashboard showing commit history and PR stats" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2OFdq6VeSWwSzhnveREHKVPvGfVFjx9s5rH94vnGVmJp5ecYoeMFnnjRC7kYEXoPp1J0bH9ALmdC3-4ED6CrHk5Hgj6htGBxfI70MosVWto9_myD-Lh8gd-ZUYWoEH_NV6MPe943l1cHc4a2enu1wdnHclpXY8Phj8Vyw-xJY-gQxhKSNjRHtY06H912FBFU5Cyo8hsNozJrw9_bEAQ3Hg-8vxpbJojqlk082LF6NnPthnfjjIdEHhjCyMvmCHEiOuiGkrmPY2Jdb')" }}></div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border-2 border-primary/30 rounded-full blur-3xl -z-10"></div>
                        </div>
                        <div className="order-1 lg:order-2 flex flex-col gap-8">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined">terminal</span>
                                </div>
                                <h2 className="text-3xl font-black mb-4">For CTOs & Engineering Leads</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400">Stop managing spreadsheets and start managing code. UHDMS connects your technical stack with your talent management, providing a unified view of engineering health.</p>
                            </div>
                            <div className="grid gap-6">
                                <div className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                                    <span className="material-symbols-outlined text-primary">monitoring</span>
                                    <div>
                                        <h4 className="font-bold mb-1">Developer Velocity Index</h4>
                                        <p className="text-sm text-slate-500">Automatic insights into team blockers based on PR cycle times and Jira activity.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                                    <span className="material-symbols-outlined text-primary">diversity_3</span>
                                    <div>
                                        <h4 className="font-bold mb-1">Resource Allocation</h4>
                                        <p className="text-sm text-slate-500">Map your engineering headcount to specific product verticals and roadmap features.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined">groups</span>
                                </div>
                                <h2 className="text-3xl font-black mb-4">For HR & People Ops</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400">Finally, an HRMS that speaks "Engineering." Understand the unique needs of your technical talent with specialized performance reviews and skill tracking.</p>
                            </div>
                            <div className="grid gap-6">
                                <div className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                    <span className="material-symbols-outlined text-primary">psychology</span>
                                    <div>
                                        <h4 className="font-bold mb-1">Technical Skill Matrix</h4>
                                        <p className="text-sm text-slate-500">Inventory your organization's skills across languages, frameworks, and tools automatically.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                    <span className="material-symbols-outlined text-primary">verified_user</span>
                                    <div>
                                        <h4 className="font-bold mb-1">Automated Compliance</h4>
                                        <p className="text-sm text-slate-500">SOC2 compliance made easy with automated access reviews and security training tracking.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl bg-slate-100 dark:bg-slate-800/50 overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                <div className="w-full h-full bg-cover bg-center" data-alt="HR directory and organizational chart view" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDMvLUI2JcwpPThOQq99Vv3ImOqxdrjnBtvlDhzOX4g7E3vqRiessvPL1IuKL2_GQSwz3NtwHXcaLzJLz2JWFOea1n72zjKOKLRPgp5-XqWfxTPh1txoSu9wwHL9crUG9cxioJZcFlZC-TI0zKwQxyY1BucmgzGmxTBjHQUkHwcPIPZA8uJY0NgSpLqtrsmAxirYzXfTLwBLojdsgFSbnYJ5MwJeJ64JvaqMO-wNpE_LEDORVs_PH8QLx_tgvMOsFWkHiV5Mvloyfj')" }}></div>
                            </div>
                            <div className="absolute top-12 right-12 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-100 dark:border-slate-700 max-w-[200px]">
                                <div className="flex flex-col gap-2">
                                    <div className="h-2 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-2 w-24 bg-primary/20 rounded"></div>
                                    <div className="h-2 w-18 bg-slate-100 dark:bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-24 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">One platform, infinite possibilities</h2>
                        <p className="text-slate-500">How UHDMS solves the common friction between Engineering and Admin</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-xl mb-4">Mergers & Acquisitions</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Instantly audit the technical debt and personnel costs of potential acquisitions with our unified due-diligence dashboard.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-xl mb-4">Global Expansion</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Hire developers anywhere. We handle local payroll, equipment logistics, and GitHub access in one motion.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-xl mb-4">Remote Workforce</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Bridge the physical gap with shared project visibility and automated check-ins linked to dev activity.</p>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-20">
                    <div className="rounded-3xl bg-primary p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to unify your operations?</h2>
                                <p className="text-white/80 text-lg">See how UHDMS fits your specific organization. Book a tailored walkthrough today.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <Link to="/register" className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                                    Start Free Trial
                                </Link>
                                <button className="px-8 py-4 bg-primary border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                                    Book a Demo
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
                        <h4 className="font-bold mb-6">Solutions</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">For Startups</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">For CTOs</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">For HR Directors</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Scale-ups</a></li>
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

export default Solutions;
