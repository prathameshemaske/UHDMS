import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';

const AddEmployee = () => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('A');
    const [createdEmployeeId, setCreatedEmployeeId] = useState(null); // To track if profile is created

    // Profile Data (Combined from previous Steps 1, 2, 3)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        job_title: '', // Label: Designation
        department: '',
        location: '',
        employment_type: 'Full-Time',
        start_date: new Date().toISOString().split('T')[0], // Label: Joining Date
        skills: '',
        bio: ''
    });

    // Onboarding Data (Assets & Docs)
    const [onboardingData, setOnboardingData] = useState({
        asset_details: {},
        documents: {},
        status: 'Draft'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOnboardingChange = (section, field, value) => {
        setOnboardingData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Tab A: Create Profile
    const handleCreateProfile = async () => {
        setIsLoading(true);
        try {
            const data = await authService.createEmployee(formData);
            if (data && data[0]?.id) {
                setCreatedEmployeeId(data[0].id);
                showSuccess("Profile Created! You can now assign assets.");
                setActiveTab('B'); // Move to Assets tab
            }
        } catch (error) {
            console.error("Failed to add employee", error);
            showError("Failed to add employee: " + (error.message || "Unknown error"));
        } finally {
            setIsLoading(false);
        }
    };

    // Tab B & C: Save Onboarding Details
    const handleSaveOnboarding = async (nextTabOrFinish) => {
        if (!createdEmployeeId) return;
        setIsLoading(true);

        // Prepare data for onboarding_details
        // Ensure personal_details are synced from the profile we just created
        const personalDetails = {
            full_name: `${formData.first_name} ${formData.last_name}`,
            email: formData.email,
            employee_id: createdEmployeeId,
            designation: formData.job_title,
            department: formData.department,
            joining_date: formData.start_date,
            phone: formData.phone
        };

        const { error } = await authService.supabase
            .from('onboarding_details')
            .upsert({
                employee_id: createdEmployeeId,
                personal_details: personalDetails,
                asset_details: onboardingData.asset_details,
                documents: onboardingData.documents,
                status: 'Draft'
            }, { onConflict: 'employee_id' });

        setIsLoading(false);

        if (error) {
            console.error("Failed to save onboarding", error);
            showError("Failed to save details.");
        } else {
            showSuccess("Details Saved!");
            if (nextTabOrFinish === 'FINISH') {
                navigate('/employees'); // Or /onboarding
            } else {
                setActiveTab(nextTabOrFinish);
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

            <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-8">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                    {/* Tabs Sidebar */}
                    <aside className="w-full md:w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                        <div className="p-4 space-y-2">
                            <button onClick={() => setActiveTab('A')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'A' ? 'bg-white shadow-sm text-[#5048e5] border border-gray-200' : 'text-gray-500 hover:bg-gray-100'}`}>
                                A. Personal Details
                            </button>
                            <button
                                onClick={() => createdEmployeeId && setActiveTab('B')}
                                disabled={!createdEmployeeId}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'B' ? 'bg-white shadow-sm text-[#5048e5] border border-gray-200' : 'text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                            >
                                B. IT & Assets
                            </button>
                            <button
                                onClick={() => createdEmployeeId && setActiveTab('C')}
                                disabled={!createdEmployeeId}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'C' ? 'bg-white shadow-sm text-[#5048e5] border border-gray-200' : 'text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                            >
                                C. Documents
                            </button>
                        </div>
                        {createdEmployeeId && (
                            <div className="p-4 mt-auto">
                                <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded border border-emerald-100">
                                    <strong>Profile Created!</strong><br />
                                    ID: {createdEmployeeId.slice(0, 8)}...
                                </div>
                            </div>
                        )}
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 p-8 overflow-y-auto">

                        {/* Tab A: Profile Form (Merged Steps) */}
                        {activeTab === 'A' && (
                            <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
                                <h3 className="text-lg font-bold text-gray-800">Employee Profile</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                                        <input name="first_name" value={formData.first_name} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                                        <input name="last_name" value={formData.last_name} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]" required />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                                        <input name="email" value={formData.email} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]" required type="email" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Designation *</label>
                                        <input name="job_title" value={formData.job_title} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]" placeholder="e.g. Senior Developer" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Department *</label>
                                        <input name="department" value={formData.department} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
                                        <select name="location" value={formData.location} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]" required>
                                            <option value="">Select Location</option>
                                            <option value="New York">New York</option>
                                            <option value="London">London</option>
                                            <option value="San Francisco">San Francisco</option>
                                            <option value="Remote">Remote</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Joining Date *</label>
                                        <input name="start_date" type="date" value={formData.start_date} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
                                        <select name="employment_type" value={formData.employment_type} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]">
                                            <option value="Full-Time">Full-Time</option>
                                            <option value="Part-Time">Part-Time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Skills</label>
                                        <input name="skills" value={formData.skills} onChange={handleChange} className="w-full h-10 px-3 border rounded-lg outline-none focus:border-[#5048e5]" placeholder="Comma separated" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t mt-6 flex justify-end">
                                    <button
                                        onClick={handleCreateProfile}
                                        disabled={isLoading || createdEmployeeId}
                                        className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${createdEmployeeId ? 'bg-green-600 cursor-default' : 'bg-[#5048e5] hover:bg-[#5048e5]/90'}`}
                                    >
                                        {createdEmployeeId ? 'Profile Created ✓' : (isLoading ? 'Creating...' : 'Create & Continue')}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Tab B: Assets (From Onboarding) */}
                        {activeTab === 'B' && (
                            <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
                                <h3 className="text-lg font-bold text-gray-800">IT & Assets Allocation</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="laptopReq" className="w-4 h-4"
                                            checked={onboardingData.asset_details.laptop_required || false}
                                            onChange={(e) => handleOnboardingChange('asset_details', 'laptop_required', e.target.checked)} />
                                        <label htmlFor="laptopReq" className="text-sm font-medium text-slate-700">Laptop Required</label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Asset Serial Number</label>
                                        <input type="text" className="w-full border rounded p-2 max-w-md"
                                            value={onboardingData.asset_details.asset_serial || ''}
                                            onChange={(e) => handleOnboardingChange('asset_details', 'asset_serial', e.target.value)} />
                                    </div>

                                    {/* Physical Access Tag Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Physical Access (Press Enter to add)</label>
                                        <div className="border rounded p-2 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-indigo-200">
                                            {(Array.isArray(onboardingData.asset_details.physical_access) ? onboardingData.asset_details.physical_access : []).map((tag, idx) => (
                                                <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                                                    {tag}
                                                    <button onClick={() => {
                                                        const newTags = (onboardingData.asset_details.physical_access || []).filter((_, i) => i !== idx);
                                                        handleOnboardingChange('asset_details', 'physical_access', newTags);
                                                    }} className="hover:text-red-500">&times;</button>
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                className="flex-1 min-w-[150px] outline-none text-sm p-1"
                                                placeholder="Add access (e.g. ID Card, Parking)"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                                        e.preventDefault();
                                                        const newTag = e.target.value.trim();
                                                        const currentTags = Array.isArray(onboardingData.asset_details.physical_access) ? onboardingData.asset_details.physical_access : [];
                                                        if (!currentTags.includes(newTag)) {
                                                            handleOnboardingChange('asset_details', 'physical_access', [...currentTags, newTag]);
                                                        }
                                                        e.target.value = '';
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Software Access Tag Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Software Access (Press Enter to add)</label>
                                        <div className="border rounded p-2 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-indigo-200">
                                            {(Array.isArray(onboardingData.asset_details.software_access) ? onboardingData.asset_details.software_access : []).map((tag, idx) => (
                                                <span key={idx} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                                                    {tag}
                                                    <button onClick={() => {
                                                        const newTags = (onboardingData.asset_details.software_access || []).filter((_, i) => i !== idx);
                                                        handleOnboardingChange('asset_details', 'software_access', newTags);
                                                    }} className="hover:text-red-500">&times;</button>
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                className="flex-1 min-w-[150px] outline-none text-sm p-1"
                                                placeholder="Add software (e.g. Slack, Jira)"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                                        e.preventDefault();
                                                        const newTag = e.target.value.trim();
                                                        const currentTags = Array.isArray(onboardingData.asset_details.software_access) ? onboardingData.asset_details.software_access : [];
                                                        if (!currentTags.includes(newTag)) {
                                                            handleOnboardingChange('asset_details', 'software_access', [...currentTags, newTag]);
                                                        }
                                                        e.target.value = '';
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t mt-6 flex justify-end">
                                    <button
                                        onClick={() => handleSaveOnboarding('C')}
                                        disabled={isLoading}
                                        className="px-6 py-2 bg-[#5048e5] hover:bg-[#5048e5]/90 rounded-lg font-bold text-white transition-all"
                                    >
                                        Save & Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Tab C: Documents (From Onboarding) */}
                        {activeTab === 'C' && (
                            <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
                                <h3 className="text-lg font-bold text-gray-800">Documents</h3>
                                <div className="space-y-4">
                                    {['Signed Offer Letter', 'Government ID (Aadhar/PAN)', 'Educational Certificates', 'Relieving Letter'].map(doc => (
                                        <div key={doc} className="border p-4 rounded-lg bg-slate-50">
                                            <div className="flex justify-between items-center">
                                                <label className="font-medium text-slate-700">{doc}</label>
                                                <span className="text-xs text-slate-400">PDF, JPG up to 5MB</span>
                                            </div>
                                            <input type="file" className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-6 border-t mt-6 flex justify-end">
                                    <button
                                        onClick={() => handleSaveOnboarding('FINISH')}
                                        disabled={isLoading}
                                        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-white transition-all"
                                    >
                                        Finish & View List
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddEmployee;
