import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { testRunService } from '../services/testRunService';
import { bugService } from '../services/bugService';
import { authService } from '../services/authService';

const Executions = () => {
    const { id: runId } = useParams();
    const navigate = useNavigate();

    // State for Runner
    const [runData, setRunData] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Bug Reporting Modal State
    const [bugModalOpen, setBugModalOpen] = useState(false);
    const [selectedResultForBug, setSelectedResultForBug] = useState(null);
    const [bugTitle, setBugTitle] = useState('');
    const [bugDescription, setBugDescription] = useState('');
    const [isReportingBug, setIsReportingBug] = useState(false);

    // State for List View
    const [executionHistory, setExecutionHistory] = useState([]);

    useEffect(() => {
        if (runId) {
            loadRunDetails();
        } else {
            loadHistory();
        }
    }, [runId]);

    const loadHistory = async () => {
        try {
            const data = await testRunService.getAll();
            setExecutionHistory(data);
        } catch (error) {
            console.error("Failed to load history", error);
        } finally {
            setLoading(false);
        }
    };

    const loadRunDetails = async () => {
        try {
            const { run, results } = await testRunService.getRunDetails(runId);
            setRunData(run);
            setResults(results);
        } catch (error) {
            console.error("Failed to load run", error);
            alert("Error loading run details");
            navigate('/executions');
        } finally {
            setLoading(false);
        }
    };

    const handleStepStatusChange = async (resultItem, stepId, newStatus) => {
        // 1. Optimistic Update Logic
        const updatedStepResults = [...(resultItem.step_results || [])];
        const stepIndex = updatedStepResults.findIndex(r => r.step_id === stepId);

        if (stepIndex >= 0) {
            updatedStepResults[stepIndex] = { ...updatedStepResults[stepIndex], status: newStatus };
        } else {
            updatedStepResults.push({ step_id: stepId, status: newStatus });
        }

        // 2. Calculate Aggregate Status
        const steps = resultItem.test_case?.test_steps || [];
        let aggregateStatus = 'Not Run';

        let hasFail = false;
        let hasBlocked = false;
        let allPass = true;
        let hasRun = false; // Has at least one step run

        if (steps.length > 0) {
            steps.forEach(step => {
                const res = updatedStepResults.find(r => r.step_id === step.id);
                const sStatus = res?.status || 'Not Run';

                if (sStatus !== 'Not Run') hasRun = true;
                if (sStatus === 'Fail') hasFail = true;
                if (sStatus === 'Blocked') hasBlocked = true;
                if (sStatus !== 'Pass') allPass = false;
            });

            // Check if ALL steps have been run (for full Pass)
            const allStepsRun = steps.every(s => {
                const res = updatedStepResults.find(r => r.step_id === s.id);
                return res && res.status !== 'Not Run';
            });

            if (hasFail) aggregateStatus = 'Fail';
            else if (hasBlocked) aggregateStatus = 'Blocked';
            else if (allPass && allStepsRun) aggregateStatus = 'Pass';
            else if (hasRun) aggregateStatus = 'In Progress'; // Some Pass, Some Not Run
            else aggregateStatus = 'Not Run';
        }

        // 3. Update Local State
        setResults(prev => prev.map(r =>
            r.id === resultItem.id
                ? { ...r, status: aggregateStatus, step_results: updatedStepResults }
                : r
        ));

        // 4. Persist to Backend
        try {
            // Update individual step status
            // Note: We need to pass the FULL array for the update since we store JSONB
            await testRunService.updateStepStatus(resultItem.id, stepId, newStatus, resultItem.step_results);

            // If aggregate status changed, update the Result row
            if (aggregateStatus !== resultItem.status) {
                await testRunService.updateResult(resultItem.id, aggregateStatus, resultItem.comment, resultItem.bug_id);
            }
        } catch (error) {
            console.error("Failed to update status", error);
            // Revert on error could be added here
        }
    };

    const openBugModal = (item) => {
        setSelectedResultForBug(item);
        setBugTitle(`Failed: ${item.test_case?.title || 'Unknown Case'}`);
        setBugDescription(`**Steps to Reproduce:**\n\n(Imported from Test Case #${item.case_id})\n\n**Expected Result:**\n...\n\n**Actual Result:**\nFailed during execution run #${runId}.`);
        setBugModalOpen(true);
    };

    const handleReportBug = async () => {
        if (!selectedResultForBug) return;
        setIsReportingBug(true);
        try {
            const currentUser = await authService.getCurrentUser();

            // 1. Create Bug
            const newBug = await bugService.createBug({
                title: bugTitle,
                description: bugDescription,
                status: 'To Do',
                priority: selectedResultForBug.test_case?.priority || 'Medium',
                severity: 'Major',
                reporter_id: currentUser?.id,
                project: 'UHDMS', // Default for now
                environment: runData.environment || 'QA'
            });

            // 2. Link Bug to Result
            await testRunService.updateResult(selectedResultForBug.id, 'Fail', selectedResultForBug.comment, newBug.id);

            // 3. Update UI
            setResults(prev => prev.map(r =>
                r.id === selectedResultForBug.id
                    ? { ...r, status: 'Fail', bug: newBug, bug_id: newBug.id }
                    : r
            ));

            setBugModalOpen(false);
            alert("Bug Reported Successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to report bug: " + error.message);
        } finally {
            setIsReportingBug(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pass': return 'bg-green-100 text-green-700 border-green-200';
            case 'fail': return 'bg-red-100 text-red-700 border-red-200';
            case 'blocked': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    // --- LIST VIEW ---
    if (!runId) {
        return (
            <div className="bg-[#f6f6f8] dark:bg-[#121121] min-h-screen font-sans text-slate-900 dark:text-slate-100 flex flex-col">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-[#5048e5]">
                            <svg fill="currentColor" viewBox="0 0 48 48"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path></svg>
                        </div>
                        <h2 className="text-lg font-bold">Test Runs</h2>
                    </div>
                    <nav className="flex items-center gap-6">
                        <Link className="text-slate-500 hover:text-[#5048e5]" to="/">Dashboard</Link>
                        <Link className="text-slate-500 hover:text-[#5048e5]" to="/repository">Repository</Link>
                        <Link className="text-[#5048e5] font-semibold" to="/executions">Executions</Link>
                    </nav>
                </header>
                <main className="p-8 max-w-5xl mx-auto w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Execution History</h1>
                        <Link to="/repository" className="px-4 py-2 bg-[#5048e5] text-white rounded-lg font-bold text-sm hover:bg-indigo-700">
                            Start New Run (Repo)
                        </Link>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Run ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Title</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Executed By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {loading ? <tr><td colSpan="5" className="p-6 text-center text-slate-500">Loading...</td></tr> :
                                    executionHistory.map(run => (
                                        <tr key={run.id} onClick={() => navigate(`/executions/${run.id}`)} className="hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                                            <td className="px-6 py-4 text-xs font-mono text-slate-500">#{run.id.slice(0, 6)}</td>
                                            <td className="px-6 py-4 font-medium">{run.title}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold border ${run.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                                                    {run.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{new Date(run.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{run.executed_by_profile?.first_name || 'User'}</td>
                                        </tr>
                                    ))}
                                {!loading && executionHistory.length === 0 && (
                                    <tr><td colSpan="5" className="p-8 text-center text-slate-400 italic">No executions yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        );
    }

    // --- RUNNER VIEW ---
    if (loading) return <div className="p-8 text-center">Loading run details...</div>;
    if (!runData) return <div className="p-8 text-center text-red-500">Run not found.</div>;

    const stats = {
        passed: results.filter(r => r.status === 'Pass').length,
        failed: results.filter(r => r.status === 'Fail').length,
        total: results.length
    };
    const progress = stats.total > 0 ? ((stats.passed + stats.failed) / stats.total) * 100 : 0;

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100 antialiased h-screen overflow-hidden flex flex-col">
            {/* Removed Complete Run button as requested */}
            <header className="flex h-16 items-center justify-between border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121121] px-6 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <Link to="/executions" className="text-slate-500 hover:text-slate-900"><span className="material-symbols-outlined">arrow_back</span></Link>
                    <h2 className="text-lg font-bold">Execution Runner</h2>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-mono rounded">RUN-{runId.slice(0, 6)}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right mr-4">
                        <span className="text-sm font-bold block">{progress.toFixed(0)}% Complete</span>
                        <div className="w-32 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                            <div className="bg-[#5048e5] h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex flex-col min-w-0 bg-[#f6f6f8] dark:bg-[#121121]/50">
                    <div className="bg-white dark:bg-[#121121] px-8 py-6 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold mb-1">{runData.title}</h1>
                                <p className="text-sm text-slate-500">Environment: {runData.environment || 'QA'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                        <div className="space-y-6">
                            {results.map((item, index) => (
                                <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50/50">
                                        <div className="flex gap-3">
                                            <span className="flex items-center justify-center size-6 rounded bg-slate-200 text-slate-600 text-xs font-bold">{index + 1}</span>
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{item.test_case?.title || 'Unknown Case'}</h3>
                                                <div className="flex gap-2 text-sm text-slate-500 items-center">
                                                    <span className={`px-2 py-0.5 rounded textxs font-bold border ${getStatusColor(item.status)}`}>
                                                        {item.status || 'Not Run'}
                                                    </span>
                                                    <span>Priority: {item.test_case?.priority}</span>
                                                    {item.bug_id && (
                                                        <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 ml-2">
                                                            <span className="material-symbols-outlined text-[14px]">bug_report</span>
                                                            Bug #{item.bug ? item.bug.id : item.bug_id}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {item.status === 'Fail' && !item.bug_id && (
                                                <button
                                                    onClick={() => openBugModal(item)}
                                                    className="text-sm font-bold text-red-600 hover:underline flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">bug_report</span> Report Bug
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Test Steps Table */}
                                    <div className="p-0">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                                <tr>
                                                    <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase w-16">#</th>
                                                    <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase">Action</th>
                                                    <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase">Expected Result</th>
                                                    <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase w-40">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                {item.test_case?.test_steps?.length > 0 ? (
                                                    item.test_case.test_steps.map((step, sIndex) => {
                                                        const stepResult = item.step_results?.find(r => r.step_id === step.id);
                                                        const currentStatus = stepResult?.status || 'Not Run';

                                                        return (
                                                            <tr key={step.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                                                <td className="py-4 px-6 text-sm text-slate-500 font-mono">{sIndex + 1}</td>
                                                                <td className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300">{step.action}</td>
                                                                <td className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300">{step.expected_result}</td>
                                                                <td className="py-4 px-6">
                                                                    <select
                                                                        value={currentStatus}
                                                                        onChange={(e) => handleStepStatusChange(item, step.id, e.target.value)}
                                                                        className={`w-full px-2 py-1.5 rounded-md text-xs font-bold border transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500/20 ${currentStatus === 'Pass' ? 'bg-green-50 text-green-700 border-green-200' :
                                                                            currentStatus === 'Fail' ? 'bg-red-50 text-red-700 border-red-200' :
                                                                                currentStatus === 'Blocked' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                                                    'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                                                                            }`}
                                                                    >
                                                                        <option value="Not Run">Not Run</option>
                                                                        <option value="Pass">Pass</option>
                                                                        <option value="Fail">Fail</option>
                                                                        <option value="Blocked">Blocked</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="py-6 text-center text-slate-400 text-sm italic">
                                                            No steps defined for this test case.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Overall Comment */}
                                    <div className="bg-slate-50 dark:bg-slate-800/30 p-4 border-t border-slate-100 dark:border-slate-800">
                                        <input
                                            placeholder="Add specific comments for this case run..."
                                            className="w-full bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none"
                                            value={item.comment || ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setResults(prev => prev.map(r => r.id === item.id ? { ...r, comment: val } : r));
                                            }}
                                            onBlur={(e) => testRunService.updateResult(item.id, item.status, e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Bug Report Modal */}
            {bugModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-500">bug_report</span>
                                Report Defect
                            </h3>
                            <button onClick={() => setBugModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                                <input
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5048e5] outline-none"
                                    value={bugTitle}
                                    onChange={(e) => setBugTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                                <textarea
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm min-h-[150px] focus:ring-2 focus:ring-[#5048e5] outline-none"
                                    value={bugDescription}
                                    onChange={(e) => setBugDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setBugModalOpen(false)}
                                className="px-4 py-2 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReportBug}
                                disabled={isReportingBug}
                                className="px-4 py-2 bg-red-600 text-white font-bold text-sm hover:bg-red-700 rounded-lg flex items-center gap-2"
                            >
                                {isReportingBug ? 'Reporting...' : 'Report Issue'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Executions;
