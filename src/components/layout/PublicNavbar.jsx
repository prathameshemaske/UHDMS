import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PublicNavbar = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-solid border-[#e5e7eb] dark:border-[#2d2c3d] bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <Link className="flex items-center gap-2" to="/">
                        <div className="text-primary">
                            <svg fill="none" height="32" viewBox="0 0 48 48" width="32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-black tracking-tight text-[#121117] dark:text-white">UHDMS</h2>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {/* Product Dropdown */}
                    <div className="relative group">
                        <button className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 ${['/hr-features', '/dev-features', '/unified-analytics'].includes(location.pathname)
                            ? 'text-primary'
                            : 'text-[#121117] dark:text-white hover:text-primary'
                            }`}>
                            Product
                            <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
                        </button>

                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top w-64">
                            <div className="bg-white dark:bg-[#1e1c2e] border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl p-2 flex flex-col gap-1">
                                <Link
                                    to="/hr-features"
                                    className={`px-4 py-3 rounded-lg flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item ${isActive('/hr-features') ? 'bg-slate-50 dark:bg-white/5' : ''}`}
                                >
                                    <span className="material-symbols-outlined text-primary mt-0.5">groups</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">HR Features</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Complete HRIS & Payroll</p>
                                    </div>
                                </Link>
                                <Link
                                    to="/dev-features"
                                    className={`px-4 py-3 rounded-lg flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item ${isActive('/dev-features') ? 'bg-slate-50 dark:bg-white/5' : ''}`}
                                >
                                    <span className="material-symbols-outlined text-primary mt-0.5">terminal</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">Dev Features</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Git-synced workflows</p>
                                    </div>
                                </Link>
                                <Link
                                    to="/unified-analytics"
                                    className={`px-4 py-3 rounded-lg flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item ${isActive('/unified-analytics') ? 'bg-slate-50 dark:bg-white/5' : ''}`}
                                >
                                    <span className="material-symbols-outlined text-primary mt-0.5">insights</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">Unified Analytics</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">ROI & Velocity metrics</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link to="/solutions" className={`text-sm font-semibold hover:text-primary transition-colors ${isActive('/solutions') ? 'text-primary' : 'text-[#121117] dark:text-white'}`}>Solutions</Link>
                    <Link to="/pricing" className={`text-sm font-semibold hover:text-primary transition-colors ${isActive('/pricing') ? 'text-primary' : 'text-[#121117] dark:text-white'}`}>Pricing</Link>
                    <Link to="/resources" className={`text-sm font-semibold hover:text-primary transition-colors ${isActive('/resources') ? 'text-primary' : 'text-[#121117] dark:text-white'}`}>Resources</Link>

                    {/* Company Dropdown */}
                    <div className="relative group">
                        <button className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 ${['/about'].includes(location.pathname)
                            ? 'text-primary'
                            : 'text-[#121117] dark:text-white hover:text-primary'
                            }`}>
                            Company
                            <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
                        </button>

                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top w-48">
                            <div className="bg-white dark:bg-[#1e1c2e] border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl p-2 flex flex-col gap-1">
                                <Link
                                    to="/about"
                                    className={`px-4 py-3 rounded-lg flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item ${isActive('/about') ? 'bg-slate-50 dark:bg-white/5' : ''}`}
                                >
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">About Us</p>
                                    </div>
                                </Link>
                                <a
                                    href="#"
                                    className="px-4 py-3 rounded-lg flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                                >
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">Contact</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/login" className="hidden sm:flex px-4 py-2 text-sm font-bold bg-[#f1f0f4] dark:bg-[#2d2c3d] text-[#121117] dark:text-white rounded-lg hover:bg-[#e5e7eb] dark:hover:bg-[#3d3c4d] transition-colors">
                        Login
                    </Link>
                    <Link to="/register" className="flex px-5 py-2 text-sm font-bold bg-primary text-white rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                        Start Free Trial
                    </Link>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Simple implementation) */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Product</p>
                        <Link to="/hr-features" className="px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-medium">HR Features</Link>
                        <Link to="/dev-features" className="px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-medium">Dev Features</Link>
                        <Link to="/unified-analytics" className="px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-medium">Analytics</Link>
                    </div>
                    <div className="h-px bg-slate-100 dark:bg-slate-800"></div>
                    <Link to="/solutions" className="px-4 text-sm font-semibold">Solutions</Link>
                    <Link to="/pricing" className="px-4 text-sm font-semibold">Pricing</Link>
                    <Link to="/resources" className="px-4 text-sm font-semibold">Resources</Link>
                    <div className="h-px bg-slate-100 dark:bg-slate-800"></div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Company</p>
                        <Link to="/about" className="px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-medium">About Us</Link>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <Link to="/login" className="w-full text-center px-4 py-3 text-sm font-bold bg-[#f1f0f4] dark:bg-[#2d2c3d] rounded-lg">Login</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default PublicNavbar;
