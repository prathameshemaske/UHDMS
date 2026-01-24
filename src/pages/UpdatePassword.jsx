import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { supabase } from '../supabaseClient';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Retrieve session to ensure user is authenticated via the magic link
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                // If no session, they might have clicked a link but something went wrong, or navigated here directly
                // For now, we will let them stay, but the update will fail if not authenticated
                // In a real app, you might redirect to login if no hash is present
            }
        };
        checkSession();
    }, []);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await authService.updateUser({ password: password });
            setMessage('Password updated successfully. Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            console.error("Password update failed", err);
            setError(err.message || "Failed to update password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center font-display text-[#121117] dark:text-white">
            <div className="flex min-h-screen w-full flex-col lg:flex-row bg-white dark:bg-background-dark overflow-hidden">
                <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
                    {/* Same visual style as Login/Forgot Password */}
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
                            <h1 className="text-4xl font-extrabold leading-tight mb-6">Secure your account.</h1>
                            <p className="text-lg text-white/80 leading-relaxed mb-10">
                                Set a new, strong password to protect your account and data.
                            </p>
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
                            <h2 className="text-[#121117] dark:text-white text-3xl font-extrabold leading-tight tracking-tight mb-4">Set New Password</h2>
                            <p className="text-[#656487] dark:text-gray-400 text-base">Please enter your new password below.</p>
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

                        <form className="flex flex-col gap-6" onSubmit={handleUpdatePassword}>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#121117] dark:text-gray-200 text-sm font-semibold leading-normal">New Password</label>
                                <input
                                    className="form-input block w-full rounded-lg text-[#121117] dark:text-white focus:ring-2 focus:ring-primary/20 border-[#dcdce5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 px-4 text-base font-normal placeholder:text-[#656487]"
                                    placeholder="••••••••"
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#121117] dark:text-gray-200 text-sm font-semibold leading-normal">Confirm Password</label>
                                <input
                                    className="form-input block w-full rounded-lg text-[#121117] dark:text-white focus:ring-2 focus:ring-primary/20 border-[#dcdce5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 px-4 text-base font-normal placeholder:text-[#656487]"
                                    placeholder="••••••••"
                                    required
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button
                                className="flex w-full items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white h-12 px-5 text-base font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
