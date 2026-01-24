import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';

const LandingPage = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white transition-colors duration-300 font-display">
            {/* Navigation */}
            {/* Navigation */}
            <PublicNavbar />
            <main className="max-w-[1280px] mx-auto">
                {/* Hero Section */}
                <section className="px-6 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                    NEW: AI-POWERED RESOURCE ALLOCATION
                                </span>
                                <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                                    The Unified Operating System for <span className="text-primary">HR and Engineering</span> Teams
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[540px]">
                                    Bridge the gap between people management and product delivery with the first hybrid HRMS and Dev-stack. Synchronize payroll with git commits.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/register" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform">
                                    Start Free Trial
                                </Link>
                                <button className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined">play_circle</span>
                                    Watch Demo
                                </button>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 bg-cover bg-center" data-alt="User avatar 1 portrait" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJI9GUduWplUrPAS1pq099kCzP_CmADt7ifC8h3bBvQk1Z2X26mLBg5HGNeeB1jP-mkcqoEH-J9L0YHFR_ixo6MPccpeUeT_AEu3tVFybyuhjqGycP2sL8Iechn0afsxeU2fO9rLNeGpc4yAE-Rp_r38xWE4tsNtKcmxZS0zOt6j1mLWlFIGGUD3aIXJKJ6kAOmsK2-qDXRkrH4bKcE5PfPBrI1AQs1JSYsTFVRRErsVZZ4rCrBjybBQ1vkj5WV_4EZoQu0GgkN1qF')" }}></div>
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400 bg-cover bg-center" data-alt="User avatar 2 portrait" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDMvLUI2JcwpPThOQq99Vv3ImOqxdrjnBtvlDhzOX4g7E3vqRiessvPL1IuKL2_GQSwz3NtwHXcaLzJLz2JWFOea1n72zjKOKLRPgp5-XqWfxTPh1txoSu9wwHL9crUG9cxioJZcFlZC-TI0zKwQxyY1BucmgzGmxTBjHQUkHwcPIPZA8uJY0NgSpLqtrsmAxirYzXfTLwBLojdsgFSbnYJ5MwJeJ64JvaqMO-wNpE_LEDORVs_PH8QLx_tgvMOsFWkHiV5Mvloyfj')" }}></div>
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-500 bg-cover bg-center" data-alt="User avatar 3 portrait" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2OFdq6VeSWwSzhnveREHKVPvGfVFjx9s5rH94vnGVmJp5ecYoeMFnnjRC7kYEXoPp1J0bH9ALmdC3-4ED6CrHk5Hgj6htGBxfI70MosVWto9_myD-Lh8gd-ZUYWoEH_NV6MPe943l1cHc4a2enu1wdnHclpXY8Phj8Vyw-xJY-gQxhKSNjRHtY06H912FBFU5Cyo8hsNozJrw9_bEAQ3Hg-8vxpbJojqlk082LF6NnPthnfjjIdEHhjCyMvmCHEiOuiGkrmPY2Jdb')" }}></div>
                                </div>
                                <p>Joined by 2,000+ scaling tech companies</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-video w-full rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/5 border border-primary/20 p-4 shadow-2xl relative overflow-hidden">
                                <div className="w-full h-full rounded-lg bg-white dark:bg-slate-900 shadow-inner flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-cover bg-center opacity-90" data-alt="Dashboard showing engineering velocity and HR payroll overlap" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxMccg2BuCw8bV6rPW2SBWaxBGWZVt4aib8VfK_lp6U22nVRf5B0X0xEkKl2DpBBTPm1aVk4yynFGlP8agbXKYHIFFrp3kr6pylJeBDcxx6cwHs9q7acdcHJdCCw5x62myYi7Kx8Iy51ON2QxyxVULKly8SCPY8hlcjlyvcEc6e7E_1aPXN16ZnZP7gvW3QDNwuYqlP0EcEdtmi01JNYCRUkfEC3A44G0_v-4XLOFEie662AMUJBuepZTBwTcLnM5xkFm86XhKM9Ab')" }}></div>
                                </div>
                                {/* Floating UI elements */}
                                <div className="absolute top-8 left-8 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                        <span className="text-xs font-bold">Payroll Synced</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Social Proof */}
                <section className="py-12 border-y border-slate-100 dark:border-slate-800">
                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] text-center mb-8">Trusted by industry leaders worldwide</h4>
                    <div className="flex flex-wrap justify-center items-center gap-12 px-6 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <div className="h-8 w-24 bg-contain bg-no-repeat bg-center" data-alt="Tech company logo placeholder" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBj_3iu45tedk5nw_Zd2X4I8_E2mWEX3TEkzlgJDfkZ9Un4h0AssoeyvlyVF--Y7leD0Mtld-l9EkQjhXP2CHXisbiKxGFecMUjVvKCF_bntmkoO3F_9VpALy3kJvmHvXc2czBmgF_mICHCQFXZacLCTntiEptKgikns9oJjajSyoZdcu7WMqF356eXUnOvjFRQaZlhou3X14TWfKbyvH7sPvJ56EbkqzCq20HeQbxg64Dm54kUuLkHDyQHN-vsUNCeR0edSDAbrrvo')" }}></div>
                        <div className="h-8 w-24 bg-contain bg-no-repeat bg-center" data-alt="SaaS brand logo placeholder" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-jlysShL90mFHil1C2AiacVXIhR7lSAgJDDLqJmWBouFMjLz5d0OfvVZi3IATscncDyTLbl74vLnGCUwiLVLR0Z_ZdgNh0QpsGLUFFHx9_HnBaUpAQGPCNRnOiSt0YTVom47OmiDdBFMdM-ZmMpMfIDomkvYDRItXEymEWWqsE8B4K15SEKutouoXB-RGvrek-UmQZqYacnUfSp79nI4h4DSSFSxCrhyiqNqEFCgNXaZxYA-uSD8PjGN9BpUNalGwDKb-Uxn7cqLv')" }}></div>
                        <div className="h-8 w-24 bg-contain bg-no-repeat bg-center" data-alt="Enterprise partner logo placeholder" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdAnp36mc25S86-Hs7z5cnx_aPd81-IC__UU2Oj3DPZ1S8vYFUQ5Xa4aDJkrGlkEx3zz93Ck3voK0I82kJ6mHi0Kxez28k5-HSiofyNq-T4J91V8UykpV6ao6AA-g5qoR3Ky3qzXxn6AqzEGk9m_zxqEMso390ZTepNd_dHp_Rzkv-UBrjT-qMdkZDh98y0D_3MeLM2BE1K5nYIQNHgGqvxR0JrV3Y1udb1ZIyLcMrwvPphxi3Fme7NGFd-RuBvNc-WzIv7pCklpaJ')" }}></div>
                        <div className="h-8 w-24 bg-contain bg-no-repeat bg-center" data-alt="Startup accelerator logo placeholder" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDArp0FWYVoHdopa8fAu3N3ajGRUiP_hUqCBz-wK3t8vU00jiAa2QgGzeWT5LhFB31NcY34PxK-Dn-6kamCv9z2QgKwvCQrxlafcxoUmGI3xdavpGN_TbmSbGhP9slw-eyGw6DiAHiWRnucqnlTC4GKDRDbY_95dnBCpH-Wr5jJylKmnYNT75tn3i4kW2kpU4_K0wHPsDBLoTe1YcT3hJDGmV9A2bLs50kVG-4DQGQyrecRzcQVX6uBdtUthYubBxwPlTsTYWHA-IN5')" }}></div>
                        <div className="h-8 w-24 bg-contain bg-no-repeat bg-center" data-alt="Venture capital logo placeholder" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXjZknGveoOEPfe-mM51TtqBYneaSOvbmEqYtpb5BH3hjkitoNVBJPHf6qqWHSz_yCOchjZi6y80rITVM-a_YC069_JsBmODfx7JSEtktm8Zz3yVfXcVuYWlhUez0y7hrs4ep20bSgthMqmT0_Zrx8HCIwPPF4zwyEdByNJ4XaxcsUlbcLUVg6dOpuvB5gro1IPwz9VpEnQbpwGEmkk-sFXdPrBMIlijV4NAHW9_fH3vcpwPk7RJFKR8FDB-_H2MedoWdnTfAFXlst')" }}></div>
                    </div>
                </section>
                {/* Core Features */}
                <section className="px-6 py-20">
                    <div className="flex flex-col gap-4 mb-16 text-center items-center">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-[800px]">Everything you need to manage your workforce and your code</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-[600px]">The only platform that understands developers are humans and code is an asset.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Global Payroll</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Automated global payments and tax compliance integrated with your engineering headcount and project milestones.
                            </p>
                            <Link to="/hr-features" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                                Learn more <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </Link>
                        </div>
                        {/* Card 2 */}
                        <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">bug_report</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Bug Tracking</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Track issues and link developer performance reviews directly to code contributions, PR velocity, and resolution times.
                            </p>
                            <Link to="/dev-features" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                                Learn more <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </Link>
                        </div>
                        {/* Card 3 */}
                        <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">badge</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Unified Directory</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Single source of truth for developer skills, manager hierarchies, and administrative data in one beautiful directory.
                            </p>
                            <a className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                                Learn more <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </section>
                {/* CTA Section */}
                <section className="px-6 py-20">
                    <div className="rounded-3xl bg-primary p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to unify your operations?</h2>
                                <p className="text-white/80 text-lg">Stop juggling 10 different tools. Join the companies building the future on UHDMS.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <Link to="/register" className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
                                    Get Started Free
                                </Link>
                                <button className="px-8 py-4 bg-primary border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* Footer */}
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
                            <a className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                            </a>
                            <a className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors cursor-pointer">HR Core</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Developer Stack</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Integrations</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors cursor-pointer">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Careers</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Press</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</a></li>
                            <li><a className="hover:text-primary transition-colors cursor-pointer">GDPR</a></li>
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

export default LandingPage;
