import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';

const AddEmployee = () => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        job_title: '',
        department: '',
        location: '',
        employment_type: 'Full-Time',
        start_date: new Date().toISOString().split('T')[0],
        skills: '',
        bio: ''
    });

    // Validation logic (Must be defined before handleKeyDown uses them)
    // Note: React re-renders will update these values.
    const isStep1Valid = Boolean(formData.first_name && formData.last_name && formData.email);
    const isStep2Valid = Boolean(formData.job_title && formData.department && formData.location);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleFinalSubmit = async () => {
        setIsLoading(true);
        try {
            await authService.createEmployee(formData);
            showSuccess("Employee added successfully!");
            navigate('/employees');
        } catch (error) {
            console.error("Failed to add employee", error);
            showError("Failed to add employee: " + (error.message || "Unknown error"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Stop form submission

            // Re-calculate validation ensures we use latest state in event handler context if needed,
            // but relying on the render-scoped consts is usually fine in functional components 
            // as the function is recreated on every render with closed-over access to that render's consts.

            if (currentStep === 1) {
                if (isStep1Valid) nextStep();
            } else if (currentStep === 2) {
                if (isStep2Valid) nextStep();
            } else if (currentStep === 3) {
                // Optional: Allow Enter to submit on last step if valid?
                // For safety, let's keep it manual per user request to avoid issues.
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-sans">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#5048e5]">
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
                {/* Stepper Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <nav className="space-y-4">
                        <div className={`flex items-center gap-4 p-4 border-l-4 rounded-r-lg transition-all ${currentStep === 1 ? 'border-[#5048e5] bg-[#5048e5]/5 text-[#5048e5]' : 'border-transparent text-gray-500'}`}>
                            <div className={`flex items-center justify-center size-8 rounded-full text-xs font-bold ${currentStep === 1 ? 'bg-[#5048e5] text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>1</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Step 1</span>
                                <span className="text-sm font-bold">Personal Info</span>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4 p-4 border-l-4 rounded-r-lg transition-all ${currentStep === 2 ? 'border-[#5048e5] bg-[#5048e5]/5 text-[#5048e5]' : 'border-transparent text-gray-500'}`}>
                            <div className={`flex items-center justify-center size-8 rounded-full text-xs font-bold ${currentStep === 2 ? 'bg-[#5048e5] text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>2</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Step 2</span>
                                <span className="text-sm font-bold">Professional Details</span>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4 p-4 border-l-4 rounded-r-lg transition-all ${currentStep === 3 ? 'border-[#5048e5] bg-[#5048e5]/5 text-[#5048e5]' : 'border-transparent text-gray-500'}`}>
                            <div className={`flex items-center justify-center size-8 rounded-full text-xs font-bold ${currentStep === 3 ? 'bg-[#5048e5] text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>3</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Step 3</span>
                                <span className="text-sm font-bold">Bio & Skills</span>
                            </div>
                        </div>
                    </nav>
                </aside>

                <div className="flex-1 max-w-2xl">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-8">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyDown}>
                                {/* Step 1: Personal Info */}
                                {currentStep === 1 && (
                                    <div className="animate-fade-in">
                                        <div className="mb-8">
                                            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Personal Information</h1>
                                            <p className="text-gray-500 dark:text-gray-400">Basic contact details for the new employee.</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First Name *</label>
                                                <input name="first_name" value={formData.first_name} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none" placeholder="e.g. Alex" required />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Name *</label>
                                                <input name="last_name" value={formData.last_name} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none" placeholder="e.g. Rivera" required />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Personal Email *</label>
                                                <input name="email" value={formData.email} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none" placeholder="alex@example.com" required type="email" />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none" placeholder="+1 (555) 000-0000" type="tel" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Professional Details */}
                                {currentStep === 2 && (
                                    <div className="animate-fade-in">
                                        <div className="mb-8">
                                            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Professional Details</h1>
                                            <p className="text-gray-500 dark:text-gray-400">Role, department, and employment terms.</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Job Title *</label>
                                                <input name="job_title" value={formData.job_title} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none" placeholder="e.g. Senior Developer" required />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Department *</label>
                                                <input name="department" value={formData.department} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none" placeholder="e.g. Engineering" required />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Location *</label>
                                                <select name="location" value={formData.location} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none" required>
                                                    <option value="">Select Location</option>
                                                    <option value="New York">New York</option>
                                                    <option value="London">London</option>
                                                    <option value="San Francisco">San Francisco</option>
                                                    <option value="Remote">Remote</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Employment Type</label>
                                                <select name="employment_type" value={formData.employment_type} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none">
                                                    <option value="Full-Time">Full-Time</option>
                                                    <option value="Part-Time">Part-Time</option>
                                                    <option value="Contract">Contract</option>
                                                    <option value="Internship">Internship</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                                                <input name="start_date" type="date" value={formData.start_date} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Bio & Skills */}
                                {currentStep === 3 && (
                                    <div className="animate-fade-in">
                                        <div className="mb-8">
                                            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Additional Info</h1>
                                            <p className="text-gray-500 dark:text-gray-400">Add a bio and skills to complete the profile.</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Skills (Comma separated)</label>
                                                <input name="skills" value={formData.skills} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none" placeholder="e.g. React, Node.js, Design" />
                                            </div>
                                            <div className="col-span-1">
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                                                <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5048e5]/50 outline-none resize-none" placeholder="Short description about the employee..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center -mx-8 -mb-8 mt-8">
                                    {currentStep === 1 ? (
                                        <Link to="/employees" className="flex items-center justify-center px-6 h-11 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                            Cancel
                                        </Link>
                                    ) : (
                                        <button type="button" onClick={prevStep} className="flex items-center justify-center px-6 h-11 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                            Back
                                        </button>
                                    )}

                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
                                            className="flex items-center gap-2 px-6 h-11 rounded-lg bg-[#5048e5] text-white font-bold text-sm shadow-lg shadow-[#5048e5]/25 hover:bg-[#5048e5]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next Step
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleFinalSubmit}
                                            disabled={isLoading}
                                            className="flex items-center gap-2 px-6 h-11 rounded-lg bg-[#5048e5] text-white font-bold text-sm shadow-lg shadow-[#5048e5]/25 hover:bg-[#5048e5]/90 transition-all disabled:opacity-70"
                                        >
                                            {isLoading ? 'Creating...' : 'Create Employee'}
                                            <span className="material-symbols-outlined text-[18px]">check</span>
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddEmployee;
