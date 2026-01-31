import React, { useState, useEffect } from 'react';
import { settlementService } from '../services/settlementService';

const FullFinalSettlement = () => {
    const [settlements, setSettlements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettlements();
    }, []);

    const loadSettlements = async () => {
        try {
            const data = await settlementService.getAllSettlements();
            setSettlements(data || []);
        } catch (error) {
            console.error("Failed to load settlements:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProcess = async (id) => {
        if (window.confirm("Are you sure you want to mark this FnF as Processed/Approved?")) {
            try {
                await settlementService.updateStatus(id, 'approved');
                loadSettlements();
            } catch (error) {
                console.error("Failed to update status:", error);
            }
        }
    };

    return (
        <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-slate-100">
            <h1 className="text-2xl font-bold mb-6">Full & Final Settlement (FnF)</h1>

            {/* Warning / Summary Banner */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 mb-8">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <span className="material-symbols-outlined text-amber-500">warning</span>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                            There are {settlements.filter(s => s.status === 'pending').length} pending resignations awaiting clearance.
                        </p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">Pending Settlements</div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {loading ? (
                        <div className="p-8 text-center text-slate-500">Loading settlements...</div>
                    ) : settlements.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">No pending settlements found.</div>
                    ) : (
                        settlements.map(item => (
                            <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors gap-4">
                                <div>
                                    <h3 className="font-bold text-lg">{item.employee_name || 'Unknown User'}</h3>
                                    <p className="text-sm text-slate-500 mb-2">
                                        Resigned on: {new Date(item.resignation_date).toLocaleDateString()} • Last Working Day: {new Date(item.last_working_day).toLocaleDateString()}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {/* Status Badge */}
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                                            item.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                            Status: {item.status}
                                        </span>

                                        {/* Clearance Status Chips */}
                                        <span className={`px-2 py-1 rounded text-xs border ${item.clearance_details?.it ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                            IT: {item.clearance_details?.it ? 'Cleared' : 'Pending'}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs border ${item.clearance_details?.finance ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                            Finance: {item.clearance_details?.finance ? 'Cleared' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3 shrink-0">
                                    <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                        View Checklist
                                    </button>
                                    {item.status !== 'approved' && item.status !== 'paid' && (
                                        <button
                                            onClick={() => handleProcess(item.id)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
                                        >
                                            Process FnF
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FullFinalSettlement;

