
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Offboarding = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [activeTab, setActiveTab] = useState('A');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        termination_details: {},
        asset_recovery: {},
        it_deprovisioning: {},
        final_settlement: {},
        status: 'Draft'
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (selectedEmployee) {
            fetchOffboardingDetails(selectedEmployee.id);
        }
    }, [selectedEmployee]);

    const fetchEmployees = async () => {
        const { data, error } = await supabase.from('profiles').select('*').order('first_name');
        if (error) {
            console.error("Error fetching employees:", error);
            return;
        }
        if (data) setEmployees(data);
    };

    const fetchOffboardingDetails = async (employeeId) => {
        setLoading(true);
        const { data } = await supabase
            .from('offboarding_details')
            .select('*')
            .eq('employee_id', employeeId)
            .single();

        if (data) {
            setFormData(data);
        } else {
            setFormData({
                termination_details: {},
                asset_recovery: {},
                it_deprovisioning: {},
                final_settlement: {},
                status: 'Draft'
            });
        }
        setLoading(false);
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
        if (!selectedEmployee) return;
        setLoading(true);
        const { error } = await supabase
            .from('offboarding_details')
            .upsert({
                employee_id: selectedEmployee.id,
                termination_details: formData.termination_details,
                asset_recovery: formData.asset_recovery,
                it_deprovisioning: formData.it_deprovisioning,
                final_settlement: formData.final_settlement,
                status: formData.status
            }, { onConflict: 'employee_id' });

        if (error) {
            console.error(error);
            alert("Failed to save.");
        } else {
            alert("Offboarding details saved!");
        }
        setLoading(false);
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Offboarding & Exit Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar List */}
                <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm border border-slate-200 h-[calc(100vh-150px)] overflow-y-auto">
                    <h3 className="font-semibold text-lg mb-4 text-slate-700">Select Employee</h3>
                    <div className="space-y-2">
                        {employees.map(emp => (
                            <div
                                key={emp.id}
                                onClick={() => setSelectedEmployee(emp)}
                                className={`p-3 rounded-md cursor-pointer transition-colors flex items-center gap-3 ${selectedEmployee?.id === emp.id ? 'bg-rose-50 border-rose-200 border' : 'hover:bg-slate-50 border border-transparent'}`}
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                                    {(emp.first_name?.[0] || emp.email[0]).toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-medium text-slate-900 truncate">{emp.first_name} {emp.last_name}</p>
                                    <p className="text-xs text-slate-500 truncate">{emp.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Area */}
                <div className="md:col-span-3 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-150px)]">
                    {selectedEmployee ? (
                        <>
                            {/* Tabs */}
                            <div className="flex border-b border-slate-200 overflow-x-auto">
                                <button onClick={() => setActiveTab('A')} className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'A' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500'}`}>A. Termination</button>
                                <button onClick={() => setActiveTab('B')} className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'B' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500'}`}>B. Asset Recovery</button>
                                <button onClick={() => setActiveTab('C')} className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'C' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500'}`}>C. IT De-prov</button>
                                <button onClick={() => setActiveTab('D')} className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'D' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500'}`}>D. Settlement</button>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 overflow-y-auto">
                                {activeTab === 'A' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Working Day</label>
                                            <input type="date" className="w-full border rounded p-2"
                                                value={formData.termination_details.last_working_day || ''}
                                                onChange={(e) => handleInputChange('termination_details', 'last_working_day', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Leaving</label>
                                            <select className="w-full border rounded p-2"
                                                value={formData.termination_details.reason || ''}
                                                onChange={(e) => handleInputChange('termination_details', 'reason', e.target.value)}>
                                                <option value="">Select Reason</option>
                                                <option>Resignation</option><option>Termination</option><option>Retirement</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" className="w-4 h-4"
                                                checked={formData.termination_details.notice_period_served || false}
                                                onChange={(e) => handleInputChange('termination_details', 'notice_period_served', e.target.checked)} />
                                            <label className="text-sm font-medium text-slate-700">Notice Period Served</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" className="w-4 h-4"
                                                checked={formData.termination_details.exit_interview_conducted || false}
                                                onChange={(e) => handleInputChange('termination_details', 'exit_interview_conducted', e.target.checked)} />
                                            <label className="text-sm font-medium text-slate-700">Exit Interview Conducted</label>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'B' && (
                                    <div className="space-y-4">
                                        {['Laptop Returned', 'ID Card/Keys Returned', 'Corporate Credit Card Cancelled', 'Library/Other Items Returned'].map(item => (
                                            <label key={item} className="flex items-center gap-3 p-3 border rounded bg-slate-50 hover:bg-slate-100 cursor-pointer">
                                                <input type="checkbox" className="w-5 h-5 text-rose-600 rounded"
                                                    checked={formData.asset_recovery[item] || false}
                                                    onChange={(e) => handleInputChange('asset_recovery', item, e.target.checked)} />
                                                <span className="font-medium text-slate-700">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'C' && (
                                    <div className="space-y-4">
                                        {['Email Account Deactivated', 'Slack/Jira Access Removed', 'GitHub/Database Access Revoked'].map(item => (
                                            <label key={item} className="flex items-center gap-3 p-3 border rounded bg-slate-50 hover:bg-slate-100 cursor-pointer">
                                                <input type="checkbox" className="w-5 h-5 text-rose-600 rounded"
                                                    checked={formData.it_deprovisioning[item] || false}
                                                    onChange={(e) => handleInputChange('it_deprovisioning', item, e.target.checked)} />
                                                <span className="font-medium text-slate-700">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'D' && (
                                    <div className="space-y-6 max-w-md">
                                        <div className="flex items-center gap-2 mb-4">
                                            <input type="checkbox" className="w-5 h-5 text-emerald-600"
                                                checked={formData.final_settlement.gratuity_eligible || false}
                                                onChange={(e) => handleInputChange('final_settlement', 'gratuity_eligible', e.target.checked)} />
                                            <label className="text-sm font-bold text-slate-800">Gratuity Eligible (Tenure &gt; 5 Years)</label>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Unused Leave Encashment (Days)</label>
                                            <input type="number" className="w-full border rounded p-2"
                                                value={formData.final_settlement.leave_encashment || ''}
                                                onChange={(e) => handleInputChange('final_settlement', 'leave_encashment', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Final Dues Calculated (₹)</label>
                                            <input type="number" className="w-full border rounded p-2 font-bold text-slate-900"
                                                value={formData.final_settlement.final_dues || ''}
                                                onChange={(e) => handleInputChange('final_settlement', 'final_dues', e.target.value)} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50 rounded-b-lg">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="px-6 py-2 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Offboarding Status'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <p>Select an employee to start offboarding</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Offboarding;
