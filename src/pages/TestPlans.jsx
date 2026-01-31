import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { testService } from '../services/testService';
import { useToast } from '../context/ToastContext';

const TestPlans = () => {
    const { showSuccess, showError } = useToast();
    const navigate = useNavigate();
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(false);

    // Create Mode
    const [showCreate, setShowCreate] = useState(false);
    const [newRunName, setNewRunName] = useState('');
    const [environment, setEnvironment] = useState('QA');

    useEffect(() => {
        loadRuns();
    }, []);

    const loadRuns = async () => {
        setLoading(true);
        try {
            // Need to implement getRuns in service or use supabase directly
            const data = await testService.getRuns();
            setRuns(data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateRun = async () => {
        if (!newRunName) return;
        try {
            // For now, simple run creation. Ideally select cases.
            // We'll create a blank run or select all cases.
            // Let's assume we pass empty cases list for now or fetch all active cases.
            // Just for demo, let's pick top 10 cases.
            const allCases = await testService.getAllCasesFlat(); // Need this helper
            const caseIds = allCases.map(c => c.id);

            await testService.createRun(newRunName, environment, caseIds);
            setShowCreate(false);
            showSuccess("Test Run Created");
            loadRuns();
        } catch (e) {
            showError("Failed to create run: " + e.message);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-sans overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/test-suites" className="text-gray-500 hover:text-indigo-600"><span className="material-symbols-outlined">arrow_back</span></Link>
                    <h2 className="text-xl font-black uppercase tracking-tight">Test Plans & Runs</h2>
                </div>
                <button onClick={() => setShowCreate(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-indigo-700">+ New Regresion Run</button>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
                {loading ? <p className="text-center text-gray-400">Loading...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {runs.map(run => (
                            <div key={run.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg">{run.name}</h3>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">{run.environment}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${run.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{run.status}</span>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <div className="text-xs text-gray-400">
                                        Created {new Date(run.created_at).toLocaleDateString()}
                                    </div>
                                    <Link to={`/test-runs/${run.id}`} className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline">
                                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                                        View Run
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {runs.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-400">
                                <span className="material-symbols-outlined text-6xl opacity-20 mb-4">playlist_play</span>
                                <p>No test runs found. Start a new one!</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Create Modal */}
            {showCreate && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Start New Run</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Run Name</label>
                                <input className="w-full border rounded p-2" value={newRunName} onChange={e => setNewRunName(e.target.value)} placeholder="e.g. v2.1 Regression" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Environment</label>
                                <select className="w-full border rounded p-2" value={environment} onChange={e => setEnvironment(e.target.value)}>
                                    <option>QA</option><option>Staging</option><option>Production</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-gray-500 font-bold">Cancel</button>
                            <button onClick={handleCreateRun} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestPlans;
