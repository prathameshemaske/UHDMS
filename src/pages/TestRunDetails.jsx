import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { testService } from '../services/testService';
import { useToast } from '../context/ToastContext';

const TestRunDetails = () => {
    const { runId } = useParams();
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    const [run, setRun] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRunDetails();
    }, [runId]);

    const loadRunDetails = async () => {
        try {
            const data = await testService.getRunDetails(runId);
            setRun(data);
        } catch (e) {
            console.error(e);
            showError("Failed to load run details");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Run Details...</div>;
    if (!run) return <div className="p-8 text-center text-red-500">Run not found</div>;

    // Calculate Stats
    const total = run.test_executions?.length || 0;
    const passed = run.test_executions?.filter(e => e.status === 'Passed').length || 0;
    const failed = run.test_executions?.filter(e => e.status === 'Failed').length || 0;
    const blocked = run.test_executions?.filter(e => e.status === 'Blocked').length || 0;
    const untested = total - passed - failed - blocked;

    const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

    return (
        <div className="flex flex-col h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-sans overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/test-plans" className="text-gray-500 hover:text-indigo-600"><span className="material-symbols-outlined">arrow_back</span></Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Run R-{run.id.substring(0, 4)}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${run.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{run.status}</span>
                        </div>
                        <h2 className="text-xl font-black tracking-tight">{run.name}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                    </button>
                    <Link to={`/test-runner/${runId}`} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-indigo-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">play_arrow</span> Execute Tests
                    </Link>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Stats Card */}
                    <div className="lg:col-span-2 grid grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                            <div className="text-3xl font-black text-indigo-600">{passRate}%</div>
                            <div className="text-xs font-bold text-gray-400 uppercase mt-1">Passed</div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                            <div className="text-3xl font-black text-gray-700 dark:text-gray-300">{untested}</div>
                            <div className="text-xs font-bold text-gray-400 uppercase mt-1">Untested</div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                            <div className="text-3xl font-black text-green-600">{passed}</div>
                            <div className="text-xs font-bold text-gray-400 uppercase mt-1">Passed</div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                            <div className="text-3xl font-black text-red-600">{failed}</div>
                            <div className="text-xs font-bold text-gray-400 uppercase mt-1">Failed</div>
                        </div>
                    </div>

                    {/* Chart Placeholder (Simulated visual) */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-center items-center">
                        <div className="flex h-4 w-full rounded-full overflow-hidden bg-gray-100">
                            <div style={{ width: `${(passed / total) * 100}%` }} className="bg-green-500 h-full"></div>
                            <div style={{ width: `${(failed / total) * 100}%` }} className="bg-red-500 h-full"></div>
                            <div style={{ width: `${(blocked / total) * 100}%` }} className="bg-orange-500 h-full"></div>
                        </div>
                        <div className="flex justify-between w-full mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Pass</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Fail</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Block</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-200"></div> Untested</span>
                        </div>
                    </div>
                </div>

                {/* Test List */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4 w-24">ID</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4 w-32">Type</th>
                                <th className="px-6 py-4 w-32">Priority</th>
                                <th className="px-6 py-4 w-32">Status</th>
                                <th className="px-6 py-4 w-24 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {run.test_executions?.map((exec) => (
                                <tr key={exec.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-400">T-{exec.test_cases?.id.substring(0, 4)}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {exec.test_cases?.title}
                                        {exec.comment && <div className="text-xs text-gray-400 mt-1 italic line-clamp-1">{exec.comment}</div>}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-500">{exec.test_cases?.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${exec.test_cases?.priority === 'Critical' ? 'bg-red-50 text-red-600 border-red-100' :
                                                exec.test_cases?.priority === 'High' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    'bg-gray-50 text-gray-500 border-gray-200'
                                            }`}>{exec.test_cases?.priority}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1 ${exec.status === 'Passed' ? 'bg-green-100 text-green-700' :
                                                exec.status === 'Failed' ? 'bg-red-100 text-red-700' :
                                                    exec.status === 'Blocked' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-slate-100 text-slate-500'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${exec.status === 'Passed' ? 'bg-green-600' :
                                                    exec.status === 'Failed' ? 'bg-red-600' :
                                                        exec.status === 'Blocked' ? 'bg-orange-600' :
                                                            'bg-slate-500'
                                                }`}></span>
                                            {exec.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/test-runner/${run.id}?case=${exec.case_id}`} className="text-indigo-600 font-bold text-xs hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                                            Run This
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {(!run.test_executions || run.test_executions.length === 0) && (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-400 italic">No tests in this run.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default TestRunDetails;
