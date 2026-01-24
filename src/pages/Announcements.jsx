import React from 'react';

const Announcements = () => {
    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">
            <style>{`
                :root {
                    --primary-indigo: #4F46E5;
                    --bg-gray: #F8F9FA;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #CBD5E1;
                }
            `}</style>

            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="text-2xl font-bold text-indigo-600 tracking-tight">UHDMS</div>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-slate-500 hover:text-indigo-600 font-medium transition-colors" href="#">Dashboard</a>
                            <a className="text-indigo-600 border-b-2 border-indigo-600 h-16 flex items-center font-medium" href="#">Announcements</a>
                            <a className="text-slate-500 hover:text-indigo-600 font-medium transition-colors" href="#">Development</a>
                            <a className="text-slate-500 hover:text-indigo-600 font-medium transition-colors" href="#">Directory</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                            <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy6SeIU9JOZ80UG5s-e0sEx95wUo8MIp73Nk4igBb79J5oswzx1D9weRShDtkaGRA5BD4bFRt6MPr1EAYaNkQjzdl4QToxFAzB6YfUKOCFMJXUAbHCnA625Vp_ZOmHr1b2ELmNMz6iEC44iWZigm640aS6QH-ew2RykQJQmF1rCnCrLkGhoFd6-3DkrDjE-oVzYYqehv24Inw2MWif3hSI-X0rPZKhd4Fu6_6VgAgJ46If9vux4WxmSL6tesyhBP7AdTNHrrze0daA" />
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-[65%] space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl font-bold text-slate-900">Company Announcements</h1>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600">Latest</span>
                                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600">Pinned</span>
                            </div>
                        </div>
                        <div className="space-y-6 custom-scrollbar">
                            <div className="bg-white rounded-[8px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <img alt="London Office" className="w-full h-56 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbNmHzij_zWErPoqibkoGdcFeh4bVr7Vh_V2ydNDxHyo1wBqFYUXeRZ45BJZmQWQA2M1DwMaTtOVUOi6ymvJWBjJPHo_e58RVt0n3gcoMzM-HzDETUJeMFJD4kbGkN6xP5AgJoF_A_NJRzZJzo0u9MQD1hNLOoadIEDfmcHe4zqHRgkWmUGeuHP15zttstM42o8LfvtmKDKeK0mYDgmGG0WI8yCaAdn5gGRJkXVb5zGoAcZwpIXa3iGToA1C4_qQP0eogHLU-L-XDE" />
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded uppercase tracking-wider">Corporate</span>
                                        <span className="text-slate-400 text-sm">2 hours ago</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-3">New Office Opening in London</h2>
                                    <p className="text-slate-600 mb-4 leading-relaxed">
                                        We are thrilled to announce the expansion of our global footprint with a brand new workspace in the heart of London's tech district. This move represents our commitment to growing our international team and supporting our European clients.
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-[8px] font-medium transition-colors text-sm">Read More</button>
                                        <div className="flex gap-3">
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors group">
                                                <span className="text-lg group-hover:scale-110 transition-transform">👍</span>
                                                <span className="text-sm font-medium text-slate-600">24</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors group">
                                                <span className="text-lg group-hover:scale-110 transition-transform">❤️</span>
                                                <span className="text-sm font-medium text-slate-600">18</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors group">
                                                <span className="text-lg group-hover:scale-110 transition-transform">🎉</span>
                                                <span className="text-sm font-medium text-slate-600">12</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[8px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <img alt="Team Summit" className="w-full h-56 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX0abu-P1HnjoGim2gHeUfbEK09Z6GlgOh4F_BQshG-hg7PpvxSjn3jODkQ9ikX8rN4You8Lywjt42vBCx4D7fDWiSQROpgQwT87sKuKOxXgCz7zLdxalUYNs9AS3z-vYov9Z8IqKUWUqCG4jWPF1Etp4569vKpJOwvVXV2v_Ld0SLDSBAVGMIl9VcD18pNIihP_xIuhPWGNeNd0RYgXHRAhPJdnH-zdWWVPrvo8L93gjOdMp0Tohe9VIADaxCEd_bx-2n7MC2valQ" />
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded uppercase tracking-wider">Internal</span>
                                        <span className="text-slate-400 text-sm">Yesterday</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-3">Annual Q3 Engineering Summit</h2>
                                    <p className="text-slate-600 mb-4 leading-relaxed">
                                        Get ready for three days of intensive workshops, collaborative coding sessions, and lightning talks. We'll be diving deep into the UHDMS roadmap and our transition to micro-frontends.
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-[8px] font-medium transition-colors text-sm">Read More</button>
                                        <div className="flex gap-3">
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors group">
                                                <span className="text-lg group-hover:scale-110 transition-transform">👍</span>
                                                <span className="text-sm font-medium text-slate-600">56</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors group">
                                                <span className="text-lg group-hover:scale-110 transition-transform">🚀</span>
                                                <span className="text-sm font-medium text-slate-600">32</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[35%]">
                        <div className="bg-white rounded-[8px] border border-slate-200 shadow-sm sticky top-24">
                            <div className="p-5 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">celebration</span>
                                    Celebrations
                                </h3>
                            </div>
                            <div className="flex border-b border-slate-100">
                                <button className="flex-1 py-3 text-sm font-semibold text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30">Birthdays</button>
                                <button className="flex-1 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">Anniversaries</button>
                            </div>
                            <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-[8px] hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img alt="Sarah" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzq5ZMDJTGJNE_MEyi06YlDH_DWG1suOl5EaRKeDArN8bRqzbWXNB83h5MCny90oYa_uqklv2Iekm7d7_E7dLlS3ySeZvXxhTc3cKI6sW5gDK9sg0dj1iWEZliJ7Ql85oyhvz9SDNTi2dniR0d3IgtYSJknPM3h3a3gV-P_DCdJYuK7F2ysdGbJJ-b7H7hCFv8CRsDQgc4rGOG8I2yd_mUg2U32nVun1qAybBwfQhYk59n5vVXseh2M5xeCT-5PBfZIrFwIAhdeCqe" />
                                                <span className="absolute -bottom-1 -right-1 text-sm">🎉</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">Sarah Jenkins</p>
                                                <p className="text-xs text-slate-500">3rd Anniversary!</p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">send</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-[8px] hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img alt="Michael" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlyl2_1VF5yy6u3lKtaOdhw89lahZTqLqwVHV03f7AJi-Rhmjt6g2tpWcZn815avn7Tuw4NP8zWbB4ek5moplVxb7M037jCjERnTUwe3Q-TRyi-p2tuq35sNnU01KtVX-V1c28IFu8h-c4Or5DeGZhuwam9OXF7gTUVY49poSpXNwXl9bP7dZ0tuSrp-erC-YZMl1ade4qYt08zlIdNOZOuxZljwYyI4buLDm6-VnE9KT7qd91m3LwLmuPq_XV1US3WSN7w8ba84f4" />
                                                <span className="absolute -bottom-1 -right-1 text-sm">🎂</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">Michael Chen</p>
                                                <p className="text-xs text-slate-500">Birthday Today</p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">send</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-[8px] hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img alt="Elena" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOxFSpJOZ1W9sewbvK5gPz__oBvuCmDN5VHpBcHXyP56eP80PrJRPARkL23mQvrBC-yzeSodYMpUKPd3kugj_3Oh7gAHuuB4ejccG5q3ygIib3Ls41R4PQ_IZY48VbtQyPrg3glpThgW6RWktGVyVRNbP6Bi-ypr2XZ-VO7gbrU5OFC-3fAcDvUWMqVRsv_T4_8t-pd_HON9l7l7wAOWayIfaLutY8eKA8HkfKc0-qkiRSP-_dCXGmbp3ZcGOlR4V1pWqD2h0iZYGk" />
                                                <span className="absolute -bottom-1 -right-1 text-sm">⭐</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">Elena Rodriguez</p>
                                                <p className="text-xs text-slate-500">1st Year Anniversary</p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">send</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-[8px] hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img alt="David" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJpEXyxU3zqUKnaDONn46Y77f0su7oXz-Uh_MkOmiSuKhH2q7goWbIKqWRDtwZ7RnYpcNdhwHSyRJfpM0XKGx57S478hDH665y1TJg-3F2EVubcGy46pRKpkWR0z5N-s-dYxahMiYEctvFKoOSSarkdPgC1FmpWD55_K2q5mRGU-dNgOcxo9OJSyePAGEZt-KzwQ7fodD-f3jXNsiT_oOqZuQ7Kp9bxH_Vdrwtcno5YW-T7wZwl3QUO6qJziQ-xUMnIT4bE0R9_sa_" />
                                                <span className="absolute -bottom-1 -right-1 text-sm">🎈</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">David Wilson</p>
                                                <p className="text-xs text-slate-500">Birthday Tomorrow</p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">send</span>
                                        </button>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-2 border border-slate-200 rounded-[8px] text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                    View All Celebrations
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 bg-indigo-600 rounded-[8px] p-5 text-white shadow-sm">
                            <h4 className="text-sm font-semibold opacity-80 mb-4 uppercase tracking-wider">Company Health</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-2xl font-bold">98%</p>
                                    <p className="text-xs opacity-70">Engagement</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">12</p>
                                    <p className="text-xs opacity-70">New Hires</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Announcements;
