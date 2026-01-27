import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { user } = await authService.signIn(email, password);

            // AUTO-ASSIGN ROLE based on Email (Hardcoded override)
            const emailRoles = {
                'prathameshmaske007@gmail.com': 'admin',
                'maske.prathamesh@gmail.com': 'hr',
                'pratu.mamata08@gmail.com': 'employee'
            };

            const assignedRole = emailRoles[user.email] || 'employee';

            // Update profile immediately to ensure persistence
            await authService.updateProfile(user.id, { role: assignedRole });

            // Notify listeners (Sidebar)
            window.dispatchEvent(new Event('role-updated'));

            navigate('/dashboard');
        } catch (err) {
            console.error("Login failed", err);
            setError(err.message || "Failed to sign in. Please checking your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#121117] dark:text-white">
            <div className="flex min-h-screen w-full flex-col lg:flex-row bg-white dark:bg-background-dark overflow-hidden">
                {/* Left Section: Visual/Quote */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path>
                                </pattern>
                            </defs>
                            <rect fill="url(#grid)" height="100%" width="100%"></rect>
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-lg text-white">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="size-8 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                                </div>
                                <span className="text-2xl font-bold tracking-tight">UHDMS</span>
                            </div>
                            <h1 className="text-4xl font-extrabold leading-tight mb-6">Optimize your digital healthcare management workflow.</h1>
                            <p className="text-lg text-white/80 leading-relaxed mb-10">
                                Join over 5,000 healthcare professionals using UHDMS to streamline patient care and data management.
                            </p>
                        </div>
                        {/* Testimonial Card */}
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                            <p className="text-white font-medium mb-4 italic text-lg leading-relaxed">
                                "The UHDMS platform has completely transformed how our clinic handles records. The speed and security are unmatched."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cover" data-alt="Headshot of a female doctor smiling" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDF2Vcu8r9ysyaAvoEXsbOwznClUSGpcE1WrfYbqJNLQyaTK3GEinzc4J45oZarEcIXWWm---qPKvbxEvAWj1kamj3h6AokG0Ayq_Gj4O1RmWPJmHeDej_CRRT9DhC-tpSlp2Tvs5UaIAbn4uLxBjngnNCORp_UuJBcJCgHAEGOFQscpgI8u-xFRbUMIfFHRlZ1AhbBwSFAJ7uGGPzK0cqpklCSF5WjcEK5pHuI0oNr2FpbZIpw0WqXLEelp1ApWFxEz06pq36IxuN_')" }}></div>
                                <div>
                                    <p className="font-bold text-sm">Dr. Sarah Jenkins</p>
                                    <p className="text-xs text-white/70">Chief Medical Officer, Metro Health</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Abstract background shape */}
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                {/* Right Section: Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-white dark:bg-background-dark">
                    <div className="w-full max-w-[440px] flex flex-col">
                        {/* Logo & Header (Mobile focus) */}
                        <div className="mb-10">
                            <div className="flex lg:hidden items-center gap-2 mb-8">
                                <svg className="size-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                                <span className="text-xl font-bold text-[#121117] dark:text-white">UHDMS</span>
                            </div>
                            <h2 className="text-[#121117] dark:text-white text-3xl font-extrabold leading-tight tracking-tight mb-2">Welcome Back</h2>
                            <p className="text-[#656487] dark:text-gray-400 text-base">Enter your details to access your account.</p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg font-medium">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#121117] dark:text-gray-200 text-sm font-semibold leading-normal">Email Address</label>
                                <input
                                    className="block w-full rounded-lg text-[#121117] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dcdce5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 px-4 text-base font-normal placeholder:text-[#656487] outline-none transition-all"
                                    placeholder="name@company.com"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[#121117] dark:text-gray-200 text-sm font-semibold leading-normal">Password</label>
                                    <Link to="/forgot-password" className="text-primary text-xs font-semibold hover:underline cursor-pointer">Forgot Password?</Link>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        className="block w-full rounded-lg text-[#121117] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dcdce5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 px-4 pr-12 text-base font-normal placeholder:text-[#656487] outline-none transition-all"
                                        placeholder="••••••••"
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className="absolute right-4 text-[#656487] dark:text-gray-400 hover:text-primary transition-colors flex items-center justify-center p-1"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>
                            {/* Remember Me */}
                            <div className="flex items-center gap-2 mb-2">
                                <input className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary accent-primary" id="remember" type="checkbox" />
                                <label className="text-sm text-[#656487] dark:text-gray-400" htmlFor="remember">Stay signed in for 30 days</label>
                            </div>
                            {/* Sign In Button */}
                            <button
                                className="flex w-full items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white h-12 px-5 text-base font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : "Sign In"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-[#dcdce5] dark:border-gray-700"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-background-dark px-4 text-[#656487] dark:text-gray-400 font-medium tracking-wider">Or continue with</span>
                            </div>
                        </div>

                        {/* SSO Buttons */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <button className="flex items-center justify-center gap-3 px-4 h-12 bg-white dark:bg-gray-800 border border-[#dcdce5] dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <svg className="size-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                                <span className="text-sm font-semibold text-[#121117] dark:text-white">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 px-4 h-12 bg-white dark:bg-gray-800 border border-[#dcdce5] dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <svg className="size-5" viewBox="0 0 24 24">
                                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" fill="#f25022"></path>
                                </svg>
                                <span className="text-sm font-semibold text-[#121117] dark:text-white">Microsoft</span>
                            </button>
                        </div>

                        {/* Footer Links */}
                        <div className="mt-auto text-center">
                            <p className="text-sm text-[#656487] dark:text-gray-400">
                                Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline cursor-pointer">Get started</Link>
                            </p>
                            <div className="flex justify-center gap-6 mt-12">
                                <a className="text-xs text-[#656487] dark:text-gray-500 hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
                                <a className="text-xs text-[#656487] dark:text-gray-500 hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
                                <a className="text-xs text-[#656487] dark:text-gray-500 hover:text-primary transition-colors cursor-pointer">Contact Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
