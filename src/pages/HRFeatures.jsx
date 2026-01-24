import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';

const HRFeatures = () => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['payroll', 'benefits', 'compliance', 'onboarding'];
            const scrollPosition = window.scrollY + 200; // Offset for header + sticky nav

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            // 72px (header) + 54px (subnav) + padding
            const y = element.getBoundingClientRect().top + window.scrollY - 130;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white transition-colors duration-300 font-display">
            <PublicNavbar />
            <main>
                <div className="sticky top-[73px] z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 hidden md:block transition-all shadow-sm">
                    <div className="max-w-[1280px] mx-auto px-6 py-3 flex gap-8">
                        {['payroll', 'benefits', 'compliance', 'onboarding'].map((item) => (
                            <a
                                key={item}
                                className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 border-b-2 py-1 ${activeSection === item
                                    ? 'text-primary border-primary'
                                    : 'text-slate-500 hover:text-primary border-transparent hover:border-primary/30'
                                    }`}
                                href={`#${item}`}
                                onClick={(e) => scrollToSection(e, item)}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1).replace('payroll', 'Payroll Engine')}
                            </a>
                        ))}
                    </div>
                </div>
                <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20">
                    <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
                        <span className="inline-flex self-center items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            HR MODULE V2.0
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                            HR operations built for <span className="text-primary">high-velocity</span> teams
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Automate the administrative burden of scaling a technical workforce. From global payroll to complex benefit packages, UHDMS handles the back-office so you can focus on building.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform">
                                Get HR Platform Demo
                            </button>
                            <button className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors">
                                Explore Full OS
                            </button>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-20 bg-white dark:bg-slate-950/50" id="payroll">
                    <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight">The Automated Global Payroll Engine</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                Never worry about month-end reconciliation again. Our payroll engine syncs directly with your team’s project activity and engineering milestones.
                            </p>
                            <ul className="flex flex-col gap-4">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                                    <div>
                                        <p className="font-bold">Multi-Currency Payouts</p>
                                        <p className="text-sm text-slate-500">Pay employees and contractors in 120+ currencies with local compliance.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                                    <div>
                                        <p className="font-bold">Auto-Tax Filing</p>
                                        <p className="text-sm text-slate-500">We handle the federal, state, and local tax filings automatically in every jurisdiction.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                                    <div>
                                        <p className="font-bold">Git-Linked Performance Bonuses</p>
                                        <p className="text-sm text-slate-500">Trigger bonuses based on product releases or closed tickets directly from Jira/GitHub.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-white dark:bg-slate-900">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="mx-auto text-xs font-semibold text-slate-400">Payroll Dashboard</div>
                                </div>
                                <div className="aspect-[4/3] bg-cover bg-center grayscale-[20%] hover:grayscale-0 transition-all duration-700" data-alt="Screenshot of the payroll management interface showing salary distribution and upcoming payments" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxMccg2BuCw8bV6rPW2SBWaxBGWZVt4aib8VfK_lp6U22nVRf5B0X0xEkKl2DpBBTPm1aVk4yynFGlP8agbXKYHIFFrp3kr6pylJeBDcxx6cwHs9q7acdcHJdCCw5x62myYi7Kx8Iy51ON2QxyxVULKly8SCPY8hlcjlyvcEc6e7E_1aPXN16ZnZP7gvW3QDNwuYqlP0EcEdtmi01JNYCRUkfEC3A44G0_v-4XLOFEie662AMUJBuepZTBwTcLnM5xkFm86XhKM9Ab')" }}></div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Current Run Status</p>
                                    <p className="text-sm font-bold">100% Compliant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-20 bg-background-light dark:bg-background-dark" id="benefits">
                    <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-white dark:bg-slate-900">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                    </div>
                                    <div className="mx-auto text-xs font-semibold text-slate-400">Employee Benefits Portal</div>
                                </div>
                                <div className="aspect-[4/3] bg-cover bg-center" data-alt="Employee view of their medical, dental, and stock option benefits" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDMvLUI2JcwpPThOQq99Vv3ImOqxdrjnBtvlDhzOX4g7E3vqRiessvPL1IuKL2_GQSwz3NtwHXcaLzJLz2JWFOea1n72zjKOKLRPgp5-XqWfxTPh1txoSu9wwHL9crUG9cxioJZcFlZC-TI0zKwQxyY1BucmgzGmxTBjHQUkHwcPIPZA8uJY0NgSpLqtrsmAxirYzXfTLwBLojdsgFSbnYJ5MwJeJ64JvaqMO-wNpE_LEDORVs_PH8QLx_tgvMOsFWkHiV5Mvloyfj')" }}></div>
                            </div>
                            <div className="absolute top-1/2 -right-10 -translate-y-1/2 p-6 bg-primary text-white rounded-2xl shadow-2xl max-w-[200px] hidden md:block">
                                <span className="material-symbols-outlined mb-2">volunteer_activism</span>
                                <p className="text-lg font-bold leading-tight">98% Enrollment Rate</p>
                                <p class="text-xs text-white/70 mt-2">Avg. employee satisfaction with benefit onboarding.</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 flex flex-col gap-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">health_and_safety</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight">World-Class Benefits, Without the Headache</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                Attract the best engineering talent with competitive medical, dental, and 401k plans. UHDMS provides access to premier insurance carriers and handles all the paperwork.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <span className="material-symbols-outlined text-primary mb-3">account_balance_wallet</span>
                                    <h4 className="font-bold mb-2 text-sm">Equity Tracking</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Sync stock option grants with Carta or track internal cap tables effortlessly.</p>
                                </div>
                                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <span className="material-symbols-outlined text-primary mb-3">workspace_premium</span>
                                    <h4 className="font-bold mb-2 text-sm">Perk Allowances</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Set monthly budgets for home-office, learning, or wellness stipends.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-20 bg-white dark:bg-slate-950/50" id="compliance">
                    <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">gavel</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Zero-Error Compliance</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                Stay on the right side of labor laws across every border. From SOC2-ready HR logs to global tax compliance, we've got you covered.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                        <span className="text-sm font-bold">01</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Automated Contractor Classification</h4>
                                        <p className="text-sm text-slate-500">Intelligent system to ensure proper classification of 1099 vs W2 workers.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                        <span className="text-sm font-bold">02</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">GDPR & CCPA Native</h4>
                                        <p className="text-sm text-slate-500">Built-in privacy tools to manage employee data requests and protection standards.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                        <span className="text-sm font-bold">03</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Instant Audit Reports</h4>
                                        <p className="text-sm text-slate-500">Generate compliance reports for board meetings or financial audits in seconds.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-white dark:bg-slate-900 p-8">
                                <div className="flex flex-col gap-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold">Compliance Checklist</h3>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded uppercase">Active</span>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full w-[94%]"></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex flex-col items-center justify-center gap-1">
                                                <span className="text-xl font-bold">W2</span>
                                                <span className="text-[10px] text-slate-400 uppercase font-bold">Ready</span>
                                            </div>
                                            <div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex flex-col items-center justify-center gap-1">
                                                <span className="text-xl font-bold">SOC2</span>
                                                <span className="text-[10px] text-slate-400 uppercase font-bold">In-Sync</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/20">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-amber-500">priority_high</span>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">Upcoming tax deadline for California (Q3) in 4 days.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-slate-900 text-white">
                    <div className="max-w-[1280px] mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl md:text-5xl font-black text-primary">$2B+</p>
                                <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">Payroll Processed</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl md:text-5xl font-black text-primary">45k+</p>
                                <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">Employees Managed</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl md:text-5xl font-black text-primary">0</p>
                                <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">Compliance Fines</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl md:text-5xl font-black text-primary">150+</p>
                                <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">Countries Supported</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-20" id="onboarding">
                    <div className="max-w-[1280px] mx-auto rounded-3xl bg-primary p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Start streamlining your HR today</h2>
                                <p className="text-white/80 text-lg">Join 2,000+ tech companies that use UHDMS to manage their global workforce and engineering output in one place.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <button className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                                    Schedule a Demo
                                </button>
                                <button className="px-8 py-4 bg-primary border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                                    View Pricing
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
                            <li><a className="hover:text-primary transition-colors" href="#">HR Core</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Developer Stack</a></li>
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

export default HRFeatures;
