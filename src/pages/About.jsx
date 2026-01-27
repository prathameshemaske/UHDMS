import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';

const About = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white transition-colors duration-300 font-display">
            <PublicNavbar />
            <main>
                <section className="relative bg-white dark:bg-slate-900 overflow-hidden">
                    <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="z-10">
                                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6">
                                    Bridging the <span className="text-primary">Human</span> and <span className="text-indigo-400">Code</span> Divide
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-lg">
                                    We're building the first unified platform where people management meets engineering velocity. Discover how UHDMS is redefining the modern tech workforce.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJI9GUduWplUrPAS1pq099kCzP_CmADt7ifC8h3bBvQk1Z2X26mLBg5HGNeeB1jP-mkcqoEH-J9L0YHFR_ixo6MPccpeUeT_AEu3tVFybyuhjqGycP2sL8Iechn0afsxeU2fO9rLNeGpc4yAE-Rp_r38xWE4tsNtKcmxZS0zOt6j1mLWlFIGGUD3aIXJKJ6kAOmsK2-qDXRkrH4bKcE5PfPBrI1AQs1JSYsTFVRRErsVZZ4rCrBjybBQ1vkj5WV_4EZoQu0GgkN1qF')", backgroundSize: "cover" }}></div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDMvLUI2JcwpPThOQq99Vv3ImOqxdrjnBtvlDhzOX4g7E3vqRiessvPL1IuKL2_GQSwz3NtwHXcaLzJLz2JWFOea1n72zjKOKLRPgp5-XqWfxTPh1txoSu9wwHL9crUG9cxioJZcFlZC-TI0zKwQxyY1BucmgzGmxTBjHQUkHwcPIPZA8uJY0NgSpLqtrsmAxirYzXfTLwBLojdsgFSbnYJ5MwJeJ64JvaqMO-wNpE_LEDORVs_PH8QLx_tgvMOsFWkHiV5Mvloyfj')", backgroundSize: "cover" }}></div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-400" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2OFdq6VeSWwSzhnveREHKVPvGfVFjx9s5rH94vnGVmJp5ecYoeMFnnjRC7kYEXoPp1J0bH9ALmdC3-4ED6CrHk5Hgj6htGBxfI70MosVWto9_myD-Lh8gd-ZUYWoEH_NV6MPe943l1cHc4a2enu1wdnHclpXY8Phj8Vyw-xJY-gQxhKSNjRHtY06H912FBFU5Cyo8hsNozJrw9_bEAQ3Hg-8vxpbJojqlk082LF6NnPthnfjjIdEHhjCyMvmCHEiOuiGkrmPY2Jdb')", backgroundSize: "cover" }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-slate-500">Founded by industry veterans</span>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="aspect-video w-full rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxMccg2BuCw8bV6rPW2SBWaxBGWZVt4aib8VfK_lp6U22nVRf5B0X0xEkKl2DpBBTPm1aVk4yynFGlP8agbXKYHIFFrp3kr6pylJeBDcxx6cwHs9q7acdcHJdCCw5x62myYi7Kx8Iy51ON2QxyxVULKly8SCPY8hlcjlyvcEc6e7E_1aPXN16ZnZP7gvW3QDNwuYqlP0EcEdtmi01JNYCRUkfEC3A44G0_v-4XLOFEie662AMUJBuepZTBwTcLnM5xkFm86XhKM9Ab')" }}></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <button className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-4xl leading-none">play_arrow</span>
                                        </button>
                                        <span className="mt-4 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Watch Vision Video</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-2">
                                        <div className="h-1 bg-primary/30 rounded-full flex-1 overflow-hidden">
                                            <div className="h-full bg-primary w-2/3"></div>
                                        </div>
                                        <div className="h-1 bg-primary/30 rounded-full flex-1 overflow-hidden">
                                            <div className="h-full bg-primary w-1/2"></div>
                                        </div>
                                        <div className="h-1 bg-primary/30 rounded-full flex-1 overflow-hidden">
                                            <div className="h-full bg-primary w-4/5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-background-light dark:bg-slate-950 py-24 px-6 border-y border-slate-200 dark:border-slate-800">
                    <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="flex flex-col gap-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-4xl">rocket_launch</span>
                            </div>
                            <h2 className="text-4xl font-black">Our Mission</h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                To empower scaling technology companies by unifying human capital management with technical delivery metrics, creating a world where every developer's impact is visible and valued.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-4xl">visibility</span>
                            </div>
                            <h2 className="text-4xl font-black">Our Vision</h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                To become the global operating system for technical organizations, fostering an era of transparent, data-driven, and human-centric software development operations.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="bg-white dark:bg-background-dark py-24 px-6">
                    <div className="max-w-[800px] mx-auto">
                        <div className="flex flex-col gap-8">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm">The UHDMS Story</span>
                            <h2 className="text-4xl md:text-5xl font-black leading-tight">Born from the friction between management and code.</h2>
                            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                <p>
                                    UHDMS started in 2021 when our founders realized that engineering managers were spending 40% of their time manually syncing project data with HR spreadsheets. The "people" side of tech was completely siloed from the "product" side.
                                </p>
                                <p>
                                    Engineers were being evaluated on arbitrary metrics because HR tools didn't understand Git, and payroll systems couldn't handle the complexities of global, project-based developer contracts.
                                </p>
                                <p>
                                    We built UHDMS to solve this. By integrating high-fidelity HRMS features with a deep technical stack, we've created a single source of truth that respects the developer workflow while providing leadership with the insights they need to scale effectively.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-12">
                    <div className="max-w-[1280px] mx-auto bg-primary rounded-xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">System Status</span>
                                </div>
                                <div className="text-4xl md:text-5xl font-black">99.9%</div>
                                <p className="text-white/70 font-medium">Platform Uptime Guaranteed</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <span className="material-symbols-outlined text-sm opacity-80">groups</span>
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">Global Reach</span>
                                </div>
                                <div className="text-4xl md:text-5xl font-black">2,000+</div>
                                <p className="text-white/70 font-medium">Active Scaling Tech Companies</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <span className="material-symbols-outlined text-sm opacity-80">verified_user</span>
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">Enterprise Ready</span>
                                </div>
                                <div className="text-4xl md:text-5xl font-black">Global</div>
                                <p className="text-white/70 font-medium">Full Compliance Coverage</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    </div>
                </section>
                <section className="bg-background-light dark:bg-slate-900 py-24 px-6">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black mb-4">Meet the Visionaries</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Our team combines decades of experience from top-tier engineering orgs and human resource leaders.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                                <div className="aspect-square bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJI9GUduWplUrPAS1pq099kCzP_CmADt7ifC8h3bBvQk1Z2X26mLBg5HGNeeB1jP-mkcqoEH-J9L0YHFR_ixo6MPccpeUeT_AEu3tVFybyuhjqGycP2sL8Iechn0afsxeU2fO9rLNeGpc4yAE-Rp_r38xWE4tsNtKcmxZS0zOt6j1mLWlFIGGUD3aIXJKJ6kAOmsK2-qDXRkrH4bKcE5PfPBrI1AQs1JSYsTFVRRErsVZZ4rCrBjybBQ1vkj5WV_4EZoQu0GgkN1qF')" }}></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold">Marcus Chen</h3>
                                    <p className="text-sm text-primary font-semibold mb-4">CEO & Co-Founder</p>
                                    <a className="inline-flex items-center text-slate-400 hover:text-primary" href="#">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                                <div className="aspect-square bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDMvLUI2JcwpPThOQq99Vv3ImOqxdrjnBtvlDhzOX4g7E3vqRiessvPL1IuKL2_GQSwz3NtwHXcaLzJLz2JWFOea1n72zjKOKLRPgp5-XqWfxTPh1txoSu9wwHL9crUG9cxioJZcFlZC-TI0zKwQxyY1BucmgzGmxTBjHQUkHwcPIPZA8uJY0NgSpLqtrsmAxirYzXfTLwBLojdsgFSbnYJ5MwJeJ64JvaqMO-wNpE_LEDORVs_PH8QLx_tgvMOsFWkHiV5Mvloyfj')" }}></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold">Sarah Jenkins</h3>
                                    <p className="text-sm text-primary font-semibold mb-4">CTO & Co-Founder</p>
                                    <a className="inline-flex items-center text-slate-400 hover:text-primary" href="#">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                                <div className="aspect-square bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2OFdq6VeSWwSzhnveREHKVPvGfVFjx9s5rH94vnGVmJp5ecYoeMFnnjRC7kYEXoPp1J0bH9ALmdC3-4ED6CrHk5Hgj6htGBxfI70MosVWto9_myD-Lh8gd-ZUYWoEH_NV6MPe943l1cHc4a2enu1wdnHclpXY8Phj8Vyw-xJY-gQxhKSNjRHtY06H912FBFU5Cyo8hsNozJrw9_bEAQ3Hg-8vxpbJojqlk082LF6NnPthnfjjIdEHhjCyMvmCHEiOuiGkrmPY2Jdb')" }}></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold">Elena Rodriguez</h3>
                                    <p className="text-sm text-primary font-semibold mb-4">Head of People</p>
                                    <a className="inline-flex items-center text-slate-400 hover:text-primary" href="#">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                                <div className="aspect-square bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-jlysShL90mFHil1C2AiacVXIhR7lSAgJDDLqJmWBouFMjLz5d0OfvVZi3IATscncDyTLbl74vLnGCUwiLVLR0Z_ZdgNh0QpsGLUFFHx9_HnBaUpAQGPCNRnOiSt0YTVom47OmiDdBFMdM-ZmMpMfIDomkvYDRItXEymEWWqsE8B4K15SEKutouoXB-RGvrek-UmQZqYacnUfSp79nI4h4DSSFSxCrhyiqNqEFCgNXaZxYA-uSD8PjGN9BpUNalGwDKb-Uxn7cqLv')" }}></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold">David Park</h3>
                                    <p className="text-sm text-primary font-semibold mb-4">VP of Engineering</p>
                                    <a className="inline-flex items-center text-slate-400 hover:text-primary" href="#">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-20">
                    <div className="max-w-[1280px] mx-auto rounded-xl bg-slate-900 p-8 md:p-16 relative overflow-hidden border border-slate-800">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Join our mission to build better teams.</h2>
                                <p className="text-white/60 text-lg">We're always looking for talented people to help us build the future of technical operations.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <button className="px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                                    See Open Roles
                                </button>
                                <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-colors">
                                    Contact Us
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
                            <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" to="/about">About Us</Link></li>
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

export default About;
