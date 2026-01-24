import React from 'react';
import { Link } from 'react-router-dom';

const AddEmployee = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-sans">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#4F46E5]">
                        <div className="size-6">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                        </div>
                        <h2 className="text-gray-900 dark:text-white text-xl font-black leading-tight tracking-tight uppercase">UHDMS</h2>
                    </div>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 hidden md:block"></div>
                    <div className="hidden md:flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Onboarding</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Add New Employee</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/employees" className="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">close</span>
                    </Link>
                </div>
            </header>
            <main className="flex-1 flex flex-col md:flex-row max-w-[1200px] w-full mx-auto px-6 py-12 gap-12">
                <aside className="w-full md:w-64 flex-shrink-0">
                    <nav className="space-y-4">
                        <div className="flex items-center gap-4 p-4 border-l-4 border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5] rounded-r-lg transition-all">
                            <div className="flex items-center justify-center size-8 rounded-full bg-[#4F46E5] text-white text-xs font-bold">1</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Step 1</span>
                                <span className="text-sm font-bold">Personal Info</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 border-l-4 border-transparent text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-r-lg transition-all">
                            <div className="flex items-center justify-center size-8 rounded-full border-2 border-gray-200 dark:border-gray-700 text-xs font-bold">2</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Step 2</span>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Job Details</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 border-l-4 border-transparent text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-r-lg transition-all">
                            <div className="flex items-center justify-center size-8 rounded-full border-2 border-gray-200 dark:border-gray-700 text-xs font-bold">3</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Step 3</span>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">System Access</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 border-l-4 border-transparent text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-r-lg transition-all">
                            <div className="flex items-center justify-center size-8 rounded-full border-2 border-gray-200 dark:border-gray-700 text-xs font-bold">4</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Step 4</span>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Review</span>
                            </div>
                        </div>
                    </nav>
                </aside>
                <div className="flex-1 max-w-2xl">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-8">
                            <div className="mb-8">
                                <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Personal Information</h1>
                                <p className="text-gray-500 dark:text-gray-400">Please provide the basic contact details for the new employee. This information will be used for profile creation.</p>
                            </div>
                            <form className="space-y-6">
                                <div className="mb-8">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Profile Picture</label>
                                    <div className="flex items-center gap-6">
                                        <div className="size-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                                            <span className="material-symbols-outlined text-gray-400 text-3xl">add_a_photo</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:border-[#4F46E5]/50 transition-colors cursor-pointer group">
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-[#4F46E5]">
                                                    <span className="font-bold text-[#4F46E5]">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG or GIF (max. 2MB)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                        <input className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all" placeholder="e.g. Alex Rivera" type="text" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Personal Email</label>
                                        <input className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all" placeholder="alex@example.com" type="email" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                        <input className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all" placeholder="+1 (555) 000-0000" type="tel" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                                        <div className="relative">
                                            <input className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all" type="date" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">calendar_today</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <Link to="/employees" className="flex items-center justify-center px-6 h-11 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                Cancel
                            </Link>
                            <button className="flex items-center gap-2 px-6 h-11 rounded-lg bg-[#4F46E5] text-white font-bold text-sm shadow-lg shadow-[#4F46E5]/25 hover:bg-[#4F46E5]/90 transition-all">
                                Next: Job Details
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-xs">lock</span>
                        All information is securely encrypted and stored.
                    </p>
                </div>
            </main>
            <footer className="mt-auto py-6 text-center text-gray-500 dark:text-gray-400 text-xs border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                © 2024 UHDMS Platform. Employee Onboarding Portal.
            </footer>
        </div>
    );
};

export default AddEmployee;
