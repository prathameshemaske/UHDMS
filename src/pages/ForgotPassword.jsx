import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { error } = await authService.resetPasswordForEmail(email);
            if (error) throw error;
            setMessage('Password reset link has been sent to your email.');
        } catch (err) {
            console.error("Password reset failed", err);
            setError(err.message || "Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center font-display text-[#121117] dark:text-white">
            <div className="flex min-h-screen w-full flex-col lg:flex-row bg-white dark:bg-background-dark overflow-hidden">
                <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
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
                            <div className="flex items-center gap-3 mb-10">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="size-8 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                                </div>
                                <span className="text-2xl font-bold tracking-tight">UHDMS</span>
                            </div>
                            <div className="mb-8">
                                <span className="material-symbols-outlined text-5xl mb-6 opacity-80">lock_reset</span>
                                <h1 className="text-4xl font-extrabold leading-tight mb-6">Your data security is our top priority.</h1>
                                <p className="text-lg text-white/80 leading-relaxed mb-10">
                                    We use industry-standard encryption and security protocols to ensure your healthcare data remains private and protected during the password recovery process.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-full">
                                <span className="material-symbols-outlined text-white">shield_locked</span>
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">HIPAA Compliant Platform</p>
                                <p className="text-xs text-white/70">Secure, end-to-end encrypted password recovery</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-white dark:bg-background-dark">
                    <div className="w-full max-w-[440px] flex flex-col h-full justify-center">
                        <div className="mb-10">
                            <div className="flex lg:hidden items-center gap-2 mb-8">
                                <svg className="size-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                                <span className="text-xl font-bold text-[#121117] dark:text-white">UHDMS</span>
                            </div>
                            <h2 className="text-[#121117] dark:text-white text-3xl font-extrabold leading-tight tracking-tight mb-4">Reset Password</h2>
                            <p className="text-[#656487] dark:text-gray-400 text-base">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
                        </div>

                        {message && (
                            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-lg font-medium">
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg font-medium">
                                {error}
                            </div>
                        )}

                        <form className="flex flex-col gap-6" onSubmit={handleResetPassword}>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#121117] dark:text-gray-200 text-sm font-semibold leading-normal">Email Address</label>
                                <input
                                    className="form-input block w-full rounded-lg text-[#121117] dark:text-white focus:ring-2 focus:ring-primary/20 border-[#dcdce5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 px-4 text-base font-normal placeholder:text-[#656487]"
                                    placeholder="name@company.com"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                className="flex w-full items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white h-12 px-5 text-base font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : "Send Reset Link"}
                            </button>
                        </form>
                        <div className="mt-8 text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all">
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Return to Login
                            </Link>
                        </div>
                        <div className="mt-auto pt-12 text-center">
                            <div className="flex justify-center gap-6">
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

export default ForgotPassword;
