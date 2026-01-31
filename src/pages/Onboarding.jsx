
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { supabase } from "../supabaseClient";
import { authService } from '../services/authService';

const Onboarding = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [activeTab, setActiveTab] = useState('A');
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        personal_details: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            designation: '',
            department: '',
            joining_date: '',
            employee_id: ''
        },
        asset_details: {},
        documents: {},
        status: 'Draft'
    });

    // Check for Create Mode
    const isCreateMode = selectedEmployee?.isNew === true;

    useEffect(() => {
        fetchNewHires();
    }, []);

    // Handle Query Param ?create=true
    useEffect(() => {
        if (searchParams.get('create') === 'true') {
            handleCreateNew();
        }
    }, [searchParams]);

    // Fetch Details when an EXISTING employee is selected
    useEffect(() => {
        if (selectedEmployee && !selectedEmployee.isNew) {
            fetchOnboardingDetails(selectedEmployee.id);
        }
    }, [selectedEmployee]);

    const fetchNewHires = async () => {
        setLoading(true);
        setFetchError(null);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('start_date', { ascending: false })
            .limit(20);

        if (error) {
            console.error("Error fetching employees:", error);
            setFetchError(error.message);
        } else if (data) {
            setEmployees(data);
        }
        setLoading(false);
    };

    const fetchOnboardingDetails = async (employeeId) => {
        setLoading(true);
        // Try fetching existing onboarding details first
        const { data, error } = await supabase
            .from('onboarding_details')
            .select('*')
            .eq('employee_id', employeeId)
            .single();

        if (data) {
            // Merge valid data
            setFormData({
                ...data,
                personal_details: {
                    ...data.personal_details,
                    // Ensure first/last name are populated if missing in JSON but present in profile
                    first_name: data.personal_details.first_name || selectedEmployee.first_name,
                    last_name: data.personal_details.last_name || selectedEmployee.last_name,
                }
            });
        } else {
            // Pre-fill from Profile if no onboarding record exists
            setFormData({
                personal_details: {
                    first_name: selectedEmployee.first_name,
                    last_name: selectedEmployee.last_name,
                    full_name: `${selectedEmployee.first_name} ${selectedEmployee.last_name}`,
                    email: selectedEmployee.email,
                    employee_id: selectedEmployee.id,
                    designation: selectedEmployee.job_title,
                    department: selectedEmployee.department,
                    joining_date: selectedEmployee.start_date,
                    phone: selectedEmployee.phone
                },
                asset_details: {},
                documents: {},
                status: 'Draft'
            });
        }
        setLoading(false);
    };

    const handleCreateNew = () => {
        setSelectedEmployee({ isNew: true });
        setActiveTab('A');
        setFormData({
            personal_details: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                designation: '',
                department: '',
                joining_date: new Date().toISOString().split('T')[0],
                employee_id: ''
            },
            asset_details: {},
            documents: {},
            status: 'Draft'
        });
    };

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        setLoading(true);

        try {
            let employeeId = selectedEmployee.id;

            // 1. If Create Mode: Create Profile First
            if (isCreateMode) {
                const profileData = {
                    first_name: formData.personal_details.first_name,
                    last_name: formData.personal_details.last_name,
                    email: formData.personal_details.email,
                    phone: formData.personal_details.phone,
                    department: formData.personal_details.department,
                    job_title: formData.personal_details.designation,
                    start_date: formData.personal_details.joining_date,
                    location: 'Remote', // Default, or add field
                    employment_type: 'Full-Time'
                };

                const newProfile = await authService.createEmployee(profileData);
                if (newProfile && newProfile[0]?.id) {
                    employeeId = newProfile[0].id;
                    // Update state to reflect we are no longer "New" but working on this ID
                    setSelectedEmployee({ ...newProfile[0], isNew: false });
                    // Remove ?create=true param
                    setSearchParams({});
                    // Refresh Sidebar List
                    await fetchNewHires();
                } else {
                    throw new Error("Failed to create profile.");
                }
            }

            if (!employeeId) throw new Error("No Employee ID found.");

            // 2. Save/Update Onboarding Details
            const { error } = await supabase
                .from('onboarding_details')
                .upsert({
                    employee_id: employeeId,
                    personal_details: {
                        ...formData.personal_details,
                        // Ensure Full Name is synced for display compatibility
                        full_name: `${formData.personal_details.first_name} ${formData.personal_details.last_name}`
                    },
                    asset_details: formData.asset_details,
                    documents: formData.documents,
                    status: formData.status
                }, { onConflict: 'employee_id' });

            if (error) throw error;

            alert(isCreateMode ? "Profile Created & Saved!" : "Details Saved!");

            // If just created, maybe move to next tab
            if (isCreateMode) setActiveTab('B');

        } catch (error) {
            console.error("Save failed:", error);
            alert("Failed to save: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Employee Onboarding</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar List */}
                <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm border border-slate-200 h-[calc(100vh-150px)] overflow-y-auto flex flex-col">
                    <button
                        onClick={handleCreateNew}
                        className="mb-4 w-full py-2 bg-[#5048e5] text-white font-bold rounded-lg shadow-sm hover:bg-[#5048e5]/90 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">add</span>
                        New Candidate
                    </button>

                    <h3 className="font-semibold text-sm uppercase text-slate-400 mb-3 tracking-wider">Recent Hires</h3>

                    {loading && employees.length === 0 && <p className="text-sm text-slate-500">Loading...</p>}

                    <div className="space-y-2 flex-1 overflow-y-auto">
                        {employees.map(emp => (
                            <div
                                key={emp.id}
                                onClick={() => setSelectedEmployee(emp)}
                                className={`p-3 rounded-md cursor-pointer transition-colors flex items-center gap-3 ${selectedEmployee?.id === emp.id ? 'bg-indigo-50 border-indigo-200 border' : 'hover:bg-slate-50 border border-transparent'}`}
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs flex-shrink-0">
                                    {(emp.first_name?.[0] || emp.email[0] || '?').toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-medium text-slate-900 truncate text-sm">{emp.first_name} {emp.last_name}</p>
                                    <p className="text-xs text-slate-500 truncate">{emp.job_title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Area */}
                <div className="md:col-span-3 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-150px)]">
                    {selectedEmployee ? (
                        <>
                            {/* Header / Tabs */}
                            <div className="border-b border-slate-200">
                                {isCreateMode && (
                                    <div className="px-6 py-4 bg-yellow-50 border-b border-yellow-100 text-yellow-800 text-sm flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">info</span>
                                        You are adding a new candidate. Fill in details and click Save to create the profile.
                                    </div>
                                )}
                                <div className="flex">
                                    <button onClick={() => setActiveTab('A')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'A' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'}`}>A. Personal Details</button>
                                    <button onClick={() => !isCreateMode && setActiveTab('B')} disabled={isCreateMode} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'B' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed'}`}>B. IT & Assets</button>
                                    <button onClick={() => !isCreateMode && setActiveTab('C')} disabled={isCreateMode} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'C' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed'}`}>C. Documents</button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 overflow-y-auto">
                                {activeTab === 'A' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                                            <input type="text" className="w-full border rounded p-2 focus:border-[#5048e5] outline-none"
                                                value={formData.personal_details.first_name || ''}
                                                onChange={(e) => handleInputChange('personal_details', 'first_name', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                                            <input type="text" className="w-full border rounded p-2 focus:border-[#5048e5] outline-none"
                                                value={formData.personal_details.last_name || ''}
                                                onChange={(e) => handleInputChange('personal_details', 'last_name', e.target.value)} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Official Email *</label>
                                            <input type="email" className="w-full border rounded p-2 focus:border-[#5048e5] outline-none"
                                                value={formData.personal_details.email || ''}
                                                onChange={(e) => handleInputChange('personal_details', 'email', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                            <input type="tel" className="w-full border rounded p-2 focus:border-[#5048e5] outline-none"
                                                value={formData.personal_details.phone || ''}
                                                onChange={(e) => handleInputChange('personal_details', 'phone', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                                            <select className="w-full border rounded p-2 focus:border-[#5048e5] outline-none"
                                                value={formData.personal_details.department || ''}
                                                onChange={(e) => handleInputChange('personal_details', 'department', e.target.value)}>
                                                <option value="">Select Dept</option>
                                                <option>Engineering</option><option>HR</option><option>Sales</option><option>Marketing</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                                            <input type="text" className="w-full border rounded p-2 focus:border-[#5048e5] outline-none"
                                                value={formData.personal_details.designation || ''}
                                                onChange={(e) => handleInputChange('personal_details', 'designation', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Joining Date</label>
                                            <input type="date" className="w-full border rounded p-2 focus:border-[#5048e5] outline-none"
                                                value={formData.personal_details.joining_date || ''}
                                                onChange={(e) => handleInputChange('personal_details', 'joining_date', e.target.value)} />
                                        </div>
                                        {/* Employee ID is auto-generated usually, but editable here if needed? Keeping readonly for ID might be better but user might want to set it. Leaving as existing logic. */}
                                    </div>
                                )}

                                {activeTab === 'B' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" id="laptopReq" className="w-4 h-4"
                                                checked={formData.asset_details.laptop_required || false}
                                                onChange={(e) => handleInputChange('asset_details', 'laptop_required', e.target.checked)} />
                                            <label htmlFor="laptopReq" className="text-sm font-medium text-slate-700">Laptop Required</label>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Asset Serial Number</label>
                                            <input type="text" className="w-full border rounded p-2 max-w-md"
                                                value={formData.asset_details.asset_serial || ''}
                                                onChange={(e) => handleInputChange('asset_details', 'asset_serial', e.target.value)} />
                                        </div>

                                        {/* Physical Access Tag Input */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Physical Access (Press Enter to add)</label>
                                            <div className="border rounded p-2 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-indigo-200">
                                                {(Array.isArray(formData.asset_details.physical_access) ? formData.asset_details.physical_access : []).map((tag, idx) => (
                                                    <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                                                        {tag}
                                                        <button onClick={() => {
                                                            const newTags = (formData.asset_details.physical_access || []).filter((_, i) => i !== idx);
                                                            handleInputChange('asset_details', 'physical_access', newTags);
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
                                                            const currentTags = Array.isArray(formData.asset_details.physical_access) ? formData.asset_details.physical_access : [];
                                                            if (!currentTags.includes(newTag)) {
                                                                handleInputChange('asset_details', 'physical_access', [...currentTags, newTag]);
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
                                                {(Array.isArray(formData.asset_details.software_access) ? formData.asset_details.software_access : []).map((tag, idx) => (
                                                    <span key={idx} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                                                        {tag}
                                                        <button onClick={() => {
                                                            const newTags = (formData.asset_details.software_access || []).filter((_, i) => i !== idx);
                                                            handleInputChange('asset_details', 'software_access', newTags);
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
                                                            const currentTags = Array.isArray(formData.asset_details.software_access) ? formData.asset_details.software_access : [];
                                                            if (!currentTags.includes(newTag)) {
                                                                handleInputChange('asset_details', 'software_access', [...currentTags, newTag]);
                                                            }
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'C' && (
                                    <div className="space-y-6 max-w-2xl animate-fade-in">
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
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50 rounded-b-lg">
                                {isCreateMode && (
                                    <button
                                        onClick={() => setSelectedEmployee(null)}
                                        className="px-6 py-2 text-slate-500 font-bold hover:bg-slate-200 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : (isCreateMode ? 'Create & Continue' : 'Save Details')}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <div className="bg-slate-100 p-6 rounded-full mb-4">
                                <span className="material-symbols-outlined text-4xl text-slate-300">person_add</span>
                            </div>
                            <p className="font-medium">Select a candidate to start onboarding</p>
                            <p className="text-sm mt-2">or click "New Candidate" to add one</p>
                            <button
                                onClick={handleCreateNew}
                                className="mt-6 px-6 py-2 border-2 border-dashed border-indigo-200 text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition-colors"
                            >
                                + Add New Candidate
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
