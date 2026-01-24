import React from 'react';

const ITSupport = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-display text-[#0f0e1b] dark:text-[#f9f8fb]">
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a192d] border-b border-solid border-[#e8e8f3] dark:border-[#2a2945] px-4 md:px-10 lg:px-40 py-3">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-[#5048e5]">
                            <div className="size-6">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                            </div>
                            <h2 className="text-[#0f0e1b] dark:text-white text-xl font-bold leading-tight tracking-tight">UHDMS</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-9">
                            <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="/employee-dashboard">Dashboard</a>
                            <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="#">My Profile</a>
                            <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="#">Directory</a>
                            <a className="text-[#5048e5] text-sm font-semibold border-b-2 border-[#5048e5] pb-1" href="#">Help</a>
                        </nav>
                    </div>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#e8e8f3] dark:bg-[#2a2945] text-[#0f0e1b] dark:text-white">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#5048e5]/20" data-alt="User profile avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB567yJtt72JTuJAVT2sBfrYEM1wCCWErR4yJLfdUvpGcq1DPJ9E6wY-Cj_TCWZwhwEjQgH9dSQ3A1KZQXWOTGGbrH_IylPvQ8aCCfa3y4dpJMzHszhtoo5Y6kqr6pJ-Rri_mJlhXKcBJgfS2p-_GcMBvCclX7uK7JL7io2X7WCU9jUDWRPgTwLtloDI97c8mlEMSX_Hj4h5uiWBr3P1fjbCgFN4CtN66XTxIlRpS2mFS7lsZFwl6xYHEPyNaN3o8StGtYeU5VZVtSk")' }}></div>
                    </div>
                </div>
            </header>
            <main className="flex-1 px-4 md:px-10 lg:px-40 py-8 max-w-[1280px] mx-auto w-full">
                <div className="flex items-center gap-2 mb-6 text-sm font-medium">
                    <a className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5]" href="/employee-dashboard">Home</a>
                    <span className="text-[#545095] dark:text-gray-600">/</span>
                    <a className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5]" href="#">Help</a>
                    <span className="text-[#545095] dark:text-gray-600">/</span>
                    <span className="text-[#0f0e1b] dark:text-white">IT Support Ticket</span>
                </div>
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-8">
                        <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] overflow-hidden">
                            <div className="p-6 border-b border-[#e8e8f3] dark:border-[#2a2945]">
                                <h1 className="text-xl font-bold text-[#0f0e1b] dark:text-white">Create IT Support Ticket</h1>
                                <p className="text-sm text-[#545095] dark:text-gray-400 mt-1">Submit a request for hardware, software, or access-related assistance.</p>
                            </div>
                            <form className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#0f0e1b] dark:text-white">Category</label>
                                        <select className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] dark:text-white">
                                            <option disabled selected value="">Select Category</option>
                                            <option value="hardware">Hardware</option>
                                            <option value="software">Software</option>
                                            <option value="access">Access Request</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#0f0e1b] dark:text-white">Priority</label>
                                        <select className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] dark:text-white">
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                            <option value="critical">Critical</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#0f0e1b] dark:text-white">Subject</label>
                                    <input className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] dark:text-white placeholder:text-[#545095]/50" placeholder="e.g., Cannot access VPN, Monitor flickering" type="text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#0f0e1b] dark:text-white">Detailed Description</label>
                                    <textarea className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] dark:text-white placeholder:text-[#545095]/50" placeholder="Please provide as much detail as possible..." rows="6"></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#0f0e1b] dark:text-white">Attachments (Screenshots)</label>
                                    <div className="border-2 border-dashed border-[#e8e8f3] dark:border-[#2a2945] rounded-xl p-8 flex flex-col items-center justify-center bg-[#f6f6f8]/30 dark:bg-[#21203b]/30 hover:bg-[#f6f6f8]/50 dark:hover:bg-[#21203b]/50 transition-colors cursor-pointer group">
                                        <span className="material-symbols-outlined text-3xl text-[#545095] dark:text-gray-400 group-hover:text-[#5048e5] transition-colors">cloud_upload</span>
                                        <p className="mt-2 text-sm text-[#545095] dark:text-gray-400 font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-[#545095]/60 dark:text-gray-500 mt-1">PNG, JPG or PDF (max. 10MB)</p>
                                        <input className="hidden" type="file" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#e8e8f3] dark:border-[#2a2945]">
                                    <button className="px-6 py-2.5 text-sm font-semibold text-[#545095] dark:text-gray-400 hover:text-[#0f0e1b] dark:hover:text-white transition-colors" type="button">Discard</button>
                                    <button className="bg-[#5048e5] hover:bg-[#5048e5]/90 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2" type="submit">
                                        <span className="material-symbols-outlined text-lg">send</span>
                                        Create Ticket
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945]">
                            <div className="p-6 border-b border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-between">
                                <h2 className="text-lg font-bold text-[#0f0e1b] dark:text-white">Active Tickets</h2>
                                <span className="bg-[#5048e5]/10 text-[#5048e5] text-xs font-bold px-2 py-0.5 rounded-full">3 Open</span>
                            </div>
                            <div className="divide-y divide-[#e8e8f3] dark:divide-[#2a2945]">
                                <div className="p-5 hover:bg-[#f6f6f8]/50 dark:hover:bg-[#21203b] transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">#INC-4829</span>
                                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-[10px] font-bold rounded uppercase">In Progress</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#0f0e1b] dark:text-white group-hover:text-[#5048e5] transition-colors">VPN Connection Timeout</h4>
                                    <p className="text-xs text-[#545095] dark:text-gray-400 mt-1 line-clamp-1">Happening since last security update...</p>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-1 text-[10px] text-[#545095] dark:text-gray-500">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            2h ago
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-[#545095] dark:text-gray-500 border-l border-[#e8e8f3] dark:border-[#2a2945] pl-3">
                                            <span className="material-symbols-outlined text-sm">chat_bubble</span>
                                            2 updates
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 hover:bg-[#f6f6f8]/50 dark:hover:bg-[#21203b] transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">#REQ-1022</span>
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold rounded uppercase">Open</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#0f0e1b] dark:text-white group-hover:text-[#5048e5] transition-colors">New MacBook Pro Request</h4>
                                    <p className="text-xs text-[#545095] dark:text-gray-400 mt-1 line-clamp-1">For new senior dev onboarding...</p>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-1 text-[10px] text-[#545095] dark:text-gray-500">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            Yesterday
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 hover:bg-[#f6f6f8]/50 dark:hover:bg-[#21203b] transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">#INC-4710</span>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold rounded uppercase">Resolved</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#0f0e1b] dark:text-white group-hover:text-[#5048e5] transition-colors">Adobe Suite Access</h4>
                                    <p className="text-xs text-[#545095] dark:text-gray-400 mt-1 line-clamp-1">License renewed successfully.</p>
                                    <div className="flex items-center gap-3 mt-3 text-[10px] text-[#545095] dark:text-gray-500">
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                        Closed Oct 24
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t border-[#e8e8f3] dark:border-[#2a2945]">
                                <button className="w-full py-2 text-[#5048e5] font-semibold text-xs border border-[#5048e5]/20 rounded-lg hover:bg-[#5048e5]/5 transition-colors">
                                    View All Support History
                                </button>
                            </div>
                        </div>
                        <div className="bg-[#5048e5] rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-3xl mb-3 opacity-90">help_center</span>
                                <h3 className="text-lg font-bold mb-2">Need immediate help?</h3>
                                <p className="text-xs text-white/80 leading-relaxed mb-4">Check our internal knowledge base for instant troubleshooting steps.</p>
                                <a className="inline-flex items-center gap-2 bg-white text-[#5048e5] text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors" href="#">
                                    Browse FAQ
                                    <span className="material-symbols-outlined text-sm">arrow_outward</span>
                                </a>
                            </div>
                            <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="mt-auto px-40 py-6 border-t border-[#e8e8f3] dark:border-[#2a2945] text-center text-xs text-[#545095] dark:text-gray-500">
                © 2023 UHDMS Platform • Enterprise IT Support Center
            </footer>
        </div>
    );
};

export default ITSupport;
