import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        companyName: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }

        try {
            const [firstName, ...lastNameParts] = formData.fullName.split(' ');
            const lastName = lastNameParts.join(' ');

            await authService.signUp(formData.email, formData.password, {
                first_name: firstName || '',
                last_name: lastName || '',
                company: formData.companyName,
                role: 'employee' // Default role
            });

            // Redirect to login or showing a success message
            // Ideally notify user to check email if email confirmation is on, 
            // but for now let's assume auto-login or redirect.
            navigate('/login');
        } catch (err) {
            console.error("Registration failed", err);
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-300">
            {/* Top Navigation Bar */}
            <header className="w-full bg-white dark:bg-background-dark border-b border-[#f0f0f4] dark:border-white/10 px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="text-primary">
                        <svg fill="none" height="32" viewBox="0 0 48 48" width="32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-[#111118] dark:text-white text-xl font-bold leading-tight tracking-tight">UHDMS</h2>
                </div>
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Professional Data Management</span>
                </div>
            </header>
            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-6 md:py-12">
                <div className="w-full max-w-[480px] flex flex-col items-center">
                    {/* Headline and Body Text */}
                    <div className="mb-8 text-center">
                        <h1 className="text-[#111118] dark:text-white text-[32px] font-bold tracking-tight mb-2">Create Account</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-base">Start managing your data platform today.</p>
                    </div>

                    {error && (
                        <div className="w-full mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg font-medium">
                            {error}
                        </div>
                    )}

                    {/* Auth Card */}
                    <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-[#dcdbe6] dark:border-white/10 p-8 shadow-sm">
                        <form className="space-y-5" onSubmit={handleRegister}>
                            {/* Full Name Field */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#111118] dark:text-gray-200 text-sm font-semibold">Full Name</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">person</span>
                                    <input
                                        className="form-input w-full pl-11 pr-4 py-3.5 rounded-lg border border-[#dcdbe6] dark:border-white/20 bg-white dark:bg-gray-800 text-[#111118] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all outline-none"
                                        placeholder="John Doe"
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Work Email Field */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#111118] dark:text-gray-200 text-sm font-semibold">Work Email</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">mail</span>
                                    <input
                                        className="form-input w-full pl-11 pr-4 py-3.5 rounded-lg border border-[#dcdbe6] dark:border-white/20 bg-white dark:bg-gray-800 text-[#111118] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all outline-none"
                                        placeholder="name@company.com"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Company Name Field */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[#111118] dark:text-gray-200 text-sm font-semibold">Company Name</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">corporate_fare</span>
                                    <input
                                        className="form-input w-full pl-11 pr-4 py-3.5 rounded-lg border border-[#dcdbe6] dark:border-white/20 bg-white dark:bg-gray-800 text-[#111118] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all outline-none"
                                        placeholder="Acme Corp"
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Password Field */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-[#111118] dark:text-gray-200 text-sm font-semibold">Create Password</label>
                                    <span className="text-xs text-gray-400">Min. 8 characters</span>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock</span>
                                    <input
                                        className="form-input w-full pl-11 pr-12 py-3.5 rounded-lg border border-[#dcdbe6] dark:border-white/20 bg-white dark:bg-gray-800 text-[#111118] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all outline-none"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors flex items-center"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>
                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-3 py-2">
                                <input className="mt-1 w-5 h-5 rounded border-[#dcdbe6] text-primary focus:ring-primary accent-primary" id="terms" type="checkbox" required />
                                <label className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" htmlFor="terms">
                                    I agree to the <a className="text-primary hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-medium" href="#">Privacy Policy</a>.
                                </label>
                            </div>
                            {/* Primary CTA */}
                            <button
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                                {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
                            </button>
                        </form>
                    </div>
                    {/* Footer Redirect */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Already have an account?
                            <Link className="text-primary font-bold hover:underline ml-1" to="/login">Log In</Link>
                        </p>
                    </div>
                </div>
            </main>
            {/* Footer Meta */}
            <footer className="w-full py-6 flex flex-col items-center gap-4">
                <div className="flex gap-6">
                    <a className="text-xs text-gray-500 hover:text-primary transition-colors" href="#">Privacy</a>
                    <a className="text-xs text-gray-500 hover:text-primary transition-colors" href="#">Terms</a>
                    <a className="text-xs text-gray-500 hover:text-primary transition-colors" href="#">Support</a>
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                    © 2023 UHDMS Platform. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Register;
