import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';

const Resources = () => {
    return (
        <div className="bg-white dark:bg-background-dark text-[#121117] dark:text-white transition-colors duration-300 min-h-screen font-display">
            <PublicNavbar />
            <main className="max-w-[1280px] mx-auto px-6">
                <section className="py-16 md:py-24 text-center">
                    <div className="max-w-3xl mx-auto flex flex-col gap-6">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                            Resources for <span className="text-primary">High-Growth</span> Teams
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Unlock insights on scaling engineering culture, mastering hybrid HR, and optimizing developer velocity.
                        </p>
                        <div className="relative max-w-xl mx-auto w-full mt-4">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input className="w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary shadow-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" placeholder="Search for guides, case studies, or webinars..." type="text" />
                        </div>
                    </div>
                </section>
                <section className="mb-20">
                    <div className="rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row shadow-sm">
                        <div className="lg:w-1/2 h-64 lg:h-auto bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxMccg2BuCw8bV6rPW2SBWaxBGWZVt4aib8VfK_lp6U22nVRf5B0X0xEkKl2DpBBTPm1aVk4yynFGlP8agbXKYHIFFrp3kr6pylJeBDcxx6cwHs9q7acdcHJdCCw5x62myYi7Kx8Iy51ON2QxyxVULKly8SCPY8hlcjlyvcEc6e7E_1aPXN16ZnZP7gvW3QDNwuYqlP0EcEdtmi01JNYCRUkfEC3A44G0_v-4XLOFEie662AMUJBuepZTBwTcLnM5xkFm86XhKM9Ab')" }}></div>
                        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4">Featured Playbook</span>
                            <h2 className="text-3xl font-black mb-4 leading-tight text-slate-900 dark:text-white">The Hybrid Team Management Playbook</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                                A comprehensive guide for technical leaders on bridging the gap between talent acquisition and code delivery in a remote-first world.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                    Download Now
                                </button>
                                <button className="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-900 dark:text-white">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">E-books &amp; Guides</h3>
                        <a className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="#">View all <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group resource-card rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all">
                            <div className="aspect-[16/10] overflow-hidden">
                                <div className="resource-image w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJI9GUduWplUrPAS1pq099kCzP_CmADt7ifC8h3bBvQk1Z2X26mLBg5HGNeeB1jP-mkcqoEH-J9L0YHFR_ixo6MPccpeUeT_AEu3tVFybyuhjqGycP2sL8Iechn0afsxeU2fO9rLNeGpc4yAE-Rp_r38xWE4tsNtKcmxZS0zOt6j1mLWlFIGGUD3aIXJKJ6kAOmsK2-qDXRkrH4bKcE5PfPBrI1AQs1JSYsTFVRRErsVZZ4rCrBjybBQ1vkj5WV_4EZoQu0GgkN1qF')" }}></div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">Scaling Engineering Culture</h4>
                                <p className="text-slate-500 text-sm mb-6 line-clamp-2">How to maintain technical excellence while doubling your engineering headcount every quarter.</p>
                                <a className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:opacity-80 transition-opacity" href="#">
                                    Download <span className="material-symbols-outlined text-sm">download</span>
                                </a>
                            </div>
                        </div>
                        <div className="group resource-card rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all">
                            <div className="aspect-[16/10] overflow-hidden">
                                <div className="resource-image w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDMvLUI2JcwpPThOQq99Vv3ImOqxdrjnBtvlDhzOX4g7E3vqRiessvPL1IuKL2_GQSwz3NtwHXcaLzJLz2JWFOea1n72zjKOKLRPgp5-XqWfxTPh1txoSu9wwHL9crUG9cxioJZcFlZC-TI0zKwQxyY1BucmgzGmxTBjHQUkHwcPIPZA8uJY0NgSpLqtrsmAxirYzXfTLwBLojdsgFSbnYJ5MwJeJ64JvaqMO-wNpE_LEDORVs_PH8QLx_tgvMOsFWkHiV5Mvloyfj')" }}></div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">The Developer Payroll 101</h4>
                                <p className="text-slate-500 text-sm mb-6 line-clamp-2">Navigating international tax compliance and equity structures for technical talent.</p>
                                <a className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:opacity-80 transition-opacity" href="#">
                                    Download <span className="material-symbols-outlined text-sm">download</span>
                                </a>
                            </div>
                        </div>
                        <div className="group resource-card rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all">
                            <div className="aspect-[16/10] overflow-hidden">
                                <div className="resource-image w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2OFdq6VeSWwSzhnveREHKVPvGfVFjx9s5rH94vnGVmJp5ecYoeMFnnjRC7kYEXoPp1J0bH9ALmdC3-4ED6CrHk5Hgj6htGBxfI70MosVWto9_myD-Lh8gd-ZUYWoEH_NV6MPe943l1cHc4a2enu1wdnHclpXY8Phj8Vyw-xJY-gQxhKSNjRHtY06H912FBFU5Cyo8hsNozJrw9_bEAQ3Hg-8vxpbJojqlk082LF6NnPthnfjjIdEHhjCyMvmCHEiOuiGkrmPY2Jdb')" }}></div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">Git-Integrated Performance</h4>
                                <p className="text-slate-500 text-sm mb-6 line-clamp-2">Using data from your dev stack to drive meaningful performance reviews for builders.</p>
                                <a className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:opacity-80 transition-opacity" href="#">
                                    Download <span className="material-symbols-outlined text-sm">download</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Case Studies</h3>
                        <a className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="#">View all <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col md:flex-row rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="md:w-1/3 bg-cover bg-center h-48 md:h-auto" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBj_3iu45tedk5nw_Zd2X4I8_E2mWEX3TEkzlgJDfkZ9Un4h0AssoeyvlyVF--Y7leD0Mtld-l9EkQjhXP2CHXisbiKxGFecMUjVvKCF_bntmkoO3F_9VpALy3kJvmHvXc2czBmgF_mICHCQFXZacLCTntiEptKgikns9oJjajSyoZdcu7WMqF356eXUnOvjFRQaZlhou3X14TWfKbyvH7sPvJ56EbkqzCq20HeQbxg64Dm54kUuLkHDyQHN-vsUNCeR0edSDAbrrvo')" }}></div>
                            <div className="md:w-2/3 p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">LOGISTICS TECH</span>
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">How Transfix Unified 12 Tools into UHDMS</h4>
                                <p className="text-slate-500 text-sm mb-6">Reducing operational overhead by 40% while increasing developer happiness scores by 2.5x.</p>
                                <a className="text-primary font-bold text-sm flex items-center gap-1 group" href="#">
                                    Read full story <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="md:w-1/3 bg-cover bg-center h-48 md:h-auto" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-jlysShL90mFHil1C2AiacVXIhR7lSAgJDDLqJmWBouFMjLz5d0OfvVZi3IATscncDyTLbl74vLnGCUwiLVLR0Z_ZdgNh0QpsGLUFFHx9_HnBaUpAQGPCNRnOiSt0YTVom47OmiDdBFMdM-ZmMpMfIDomkvYDRItXEymEWWqsE8B4K15SEKutouoXB-RGvrek-UmQZqYacnUfSp79nI4h4DSSFSxCrhyiqNqEFCgNXaZxYA-uSD8PjGN9BpUNalGwDKb-Uxn7cqLv')" }}></div>
                            <div className="md:w-2/3 p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">FINTECH</span>
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Scaling a Global Team from 50 to 500</h4>
                                <p className="text-slate-500 text-sm mb-6">Velocity increased by 30% through automated onboarding and git-synced payroll cycles.</p>
                                <a className="text-primary font-bold text-sm flex items-center gap-1 group" href="#">
                                    Read full story <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Upcoming &amp; On-Demand Webinars</h3>
                        <a className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="#">Browse all sessions <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                            <div className="relative rounded-lg overflow-hidden aspect-video mb-4">
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-5xl opacity-80 group-hover:opacity-100 transition-opacity">play_circle</span>
                                </div>
                                <img alt="Webinar thumbnail" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdAnp36mc25S86-Hs7z5cnx_aPd81-IC__UU2Oj3DPZ1S8vYFUQ5Xa4aDJkrGlkEx3zz93Ck3voK0I82kJ6mHi0Kxez28k5-HSiofyNq-T4J91V8UykpV6ao6AA-g5qoR3Ky3qzXxn6AqzEGk9m_zxqEMso390ZTepNd_dHp_Rzkv-UBrjT-qMdkZDh98y0D_3MeLM2BE1K5nYIQNHgGqvxR0JrV3Y1udb1ZIyLcMrwvPphxi3Fme7NGFd-RuBvNc-WzIv7pCklpaJ" />
                            </div>
                            <div className="flex gap-2 mb-3">
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Live Oct 24</span>
                            </div>
                            <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">The Future of AI in Resource Allocation</h4>
                            <a className="text-primary font-bold text-sm flex items-center gap-1 hover:opacity-80" href="#">Register Now <span className="material-symbols-outlined text-xs">arrow_forward</span></a>
                        </div>
                        <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                            <div className="relative rounded-lg overflow-hidden aspect-video mb-4">
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-5xl opacity-80 group-hover:opacity-100 transition-opacity">play_circle</span>
                                </div>
                                <img alt="Webinar thumbnail" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDArp0FWYVoHdopa8fAu3N3ajGRUiP_hUqCBz-wK3t8vU00jiAa2QgGzeWT5LhFB31NcY34PxK-Dn-6kamCv9z2QgKwvCQrxlafcxoUmGI3xdavpGN_TbmSbGhP9slw-eyGw6DiAHiWRnucqnlTC4GKDRDbY_95dnBCpH-Wr5jJylKmnYNT75tn3i4kW2kpU4_K0wHPsDBLoTe1YcT3hJDGmV9A2bLs50kVG-4DQGQyrecRzcQVX6uBdtUthYubBxwPlTsTYWHA-IN5" />
                            </div>
                            <div className="flex gap-2 mb-3">
                                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold rounded uppercase">On-Demand</span>
                            </div>
                            <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Mastering Global Compliance for Dev Teams</h4>
                            <a className="text-primary font-bold text-sm flex items-center gap-1 hover:opacity-80" href="#">Watch Recorded <span className="material-symbols-outlined text-xs">arrow_forward</span></a>
                        </div>
                        <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                            <div className="relative rounded-lg overflow-hidden aspect-video mb-4">
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-5xl opacity-80 group-hover:opacity-100 transition-opacity">play_circle</span>
                                </div>
                                <img alt="Webinar thumbnail" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXjZknGveoOEPfe-mM51TtqBYneaSOvbmEqYtpb5BH3hjkitoNVBJPHf6qqWHSz_yCOchjZi6y80rITVM-a_YC069_JsBmODfx7JSEtktm8Zz3yVfXcVuYWlhUez0y7hrs4ep20bSgthMqmT0_Zrx8HCIwPPF4zwyEdByNJ4XaxcsUlbcLUVg6dOpuvB5gro1IPwz9VpEnQbpwGEmkk-sFXdPrBMIlijV4NAHW9_fH3vcpwPk7RJFKR8FDB-_H2MedoWdnTfAFXlst" />
                            </div>
                            <div className="flex gap-2 mb-3">
                                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold rounded uppercase">On-Demand</span>
                            </div>
                            <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Reducing Tech Debt with Better People Ops</h4>
                            <a className="text-primary font-bold text-sm flex items-center gap-1 hover:opacity-80" href="#">Watch Recorded <span className="material-symbols-outlined text-xs">arrow_forward</span></a>
                        </div>
                    </div>
                </section>
                <section className="mb-24">
                    <div className="rounded-3xl bg-slate-900 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 text-white">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary">terminal</span>
                                <span className="text-primary font-bold text-sm uppercase tracking-widest">Developer Hub</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black mb-6">UHDMS API Documentation</h3>
                            <p className="text-slate-400 text-lg mb-8 max-w-lg">
                                Build custom integrations, sync your proprietary tools, and automate your workflows with our robust API and developer resources.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                                    Read Docs
                                </button>
                                <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                                    API Reference
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="bg-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 border border-slate-700 shadow-2xl">
                                <div className="flex gap-2 mb-4 border-b border-slate-700 pb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="text-purple-400">curl</span> -X GET <span className="text-green-400">"https://api.uhdms.com/v1/teams"</span> \</p>
                                    <p className="pl-4">-H <span className="text-green-400">"Authorization: Bearer YOUR_TOKEN"</span></p>
                                    <p className="pt-4 text-slate-500">// Response</p>
                                    <p>{'{'}</p>
                                    <p className="pl-4"><span className="text-blue-400">"team_id"</span>: <span className="text-orange-400">"eng_alpha_01"</span>,</p>
                                    <p className="pl-4"><span className="text-blue-400">"velocity"</span>: <span className="text-orange-400">88.5</span>,</p>
                                    <p className="pl-4"><span className="text-blue-400">"status"</span>: <span className="text-green-400">"synced"</span></p>
                                    <p>{'}'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-24">
                    <div className="rounded-3xl bg-primary p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to unify your operations?</h2>
                                <p className="text-white/80 text-lg">Join 2,000+ scaling tech companies building the future on UHDMS.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <button className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                                    Get Started Free
                                </button>
                                <button className="px-8 py-4 bg-primary border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                                    Contact Sales
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
                            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">UHDMS</h2>
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
                        <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Product</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">HR Core</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Developer Stack</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Company</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Legal</h4>
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

export default Resources;
