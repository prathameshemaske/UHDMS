import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testService } from '../services/testService';
import { bugService } from '../services/bugService'; // Import bugService
import { useToast } from '../context/ToastContext';

const TestRunner = () => {
    const { runId } = useParams();
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();

    const [loading, setLoading] = useState(true);
    const [run, setRun] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timer, setTimer] = useState(0); // Seconds for current case
    const [isActive, setIsActive] = useState(true); // Timer active

    // Failure Modal State
    const [showFailModal, setShowFailModal] = useState(false);
    const [failComment, setFailComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Bug Reporting State
    const [createBugChecked, setCreateBugChecked] = useState(false);
    const [users, setUsers] = useState([]);
    const [bugData, setBugData] = useState({
        priority: 'High',
        severity: 'Major',
        assignee: ''
    });

    // Initial Load
    useEffect(() => {
        loadRunData();
        loadUsers();
    }, [runId]);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isActive && !loading && run) {
            interval = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, loading, run]);

    const loadUsers = async () => {
        try {
            const data = await bugService.getAllProfiles();
            setUsers(data || []);
        } catch (err) {
            console.error("Failed to load users for bug assignee", err);
        }
    };

    const loadRunData = async () => {
        setLoading(true);
        try {
            if (runId === 'demo') {
                // MOCK DATA for Demo
                setRun({
                    name: 'Demo Regression Run',
                    test_executions: [
                        {
                            id: 'mock-1',
                            status: 'Untested',
                            test_cases: {
                                id: 'TC-101',
                                title: 'Verify Login with Valid Credentials',
                                priority: 'Critical',
                                type: 'Functional',
                                test_steps: [
                                    { step_number: 1, action: 'Navigate to /login', expected_result: 'Login page loads' },
                                    { step_number: 2, action: 'Enter user/pass', expected_result: 'Inputs accepted' },
                                    { step_number: 3, action: 'Click Submit', expected_result: 'Dashboard loads' }
                                ]
                            }
                        },
                        {
                            id: 'mock-2',
                            status: 'Untested',
                            test_cases: {
                                id: 'TC-102',
                                title: 'Verify Logout',
                                priority: 'Medium',
                                type: 'Functional',
                                test_steps: [
                                    { step_number: 1, action: 'Click Profile Icon', expected_result: 'Dropdown appears' },
                                    { step_number: 2, action: 'Click Logout', expected_result: 'Redirected to Login' }
                                ]
                            }
                        }
                    ]
                });
            } else {
                // REAL FETCH
                const data = await testService.getRunDetails(runId);
                setRun(data);

                // Find first untested index? Or just start at 0?
                // For now start at 0 or first 'Untested'
                const firstUntested = data.test_executions?.findIndex(e => e.status === 'Untested');
                if (firstUntested !== -1) setCurrentIndex(firstUntested);
            }
        } catch (e) {
            console.error(e);
            showError("Failed to load run data");
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const currentExecution = run?.test_executions?.[currentIndex];
    const currentCase = currentExecution?.test_cases;

    const handleResult = async (status) => {
        if (status === 'Failed') {
            setIsActive(false); // Pause timer
            setCreateBugChecked(false); // Reset checkbox
            setBugData({ priority: 'High', severity: 'Major', assignee: '' }); // Reset form
            setShowFailModal(true);
            return;
        }

        await submitResult(status);
        moveToNext();
    };

    const submitResult = async (status, comment = '') => {
        if (runId === 'demo') {
            showSuccess(`Marked as ${status} (Demo)`);
            return;
        }

        try {
            await testService.updateExecution(
                currentExecution.id,
                status,
                status === 'Passed' ? 'As Expected' : 'Failed',
                comment,
                timer
            );

            // Update local state to reflect change immediately
            const updatedExecutions = [...run.test_executions];
            updatedExecutions[currentIndex] = { ...updatedExecutions[currentIndex], status };
            setRun({ ...run, test_executions: updatedExecutions });

            showSuccess(`Saved: ${status}`);
        } catch (e) {
            console.error(e);
            showError("Failed to save result");
        }
    };

    const logFailure = async () => {
        setIsSubmitting(true);

        // 1. Create Bug if checked
        if (createBugChecked && runId !== 'demo') {
            try {
                // Find assignee ID/Name logic similar to BugTracker
                const assigneeUser = users.find(u => `${u.first_name} ${u.last_name}` === bugData.assignee);

                await bugService.createBug({
                    title: `Failed: ${currentCase?.title}`,
                    description: `Test Case Reference: TC-${currentCase?.id}\n\nFailure Notes:\n${failComment}\n\nEnvironment: ${run.environment || 'N/A'}`,
                    priority: bugData.priority,
                    status: 'To Do',
                    severity: bugData.severity,
                    project: 'HRMS Software', // Default Project
                    issue_type: 'Bug',
                    assignee: bugData.assignee, // Name logic
                    assignee_id: assigneeUser?.id, // ID logic
                    environment: run.environment || ''
                });
                showSuccess("Bug Ticket Created!");
            } catch (err) {
                console.error("Failed to create bug", err);
                showError("Failed to create Bug Ticket");
            }
        }

        await submitResult('Failed', failComment);
        setIsSubmitting(false);
        setShowFailModal(false);
        setFailComment('');
        setIsActive(true); // Resume timer for next? No, reset.
        moveToNext();
    };

    const moveToNext = () => {
        setTimer(0);
        setIsActive(true);
        if (currentIndex < (run?.test_executions?.length || 0) - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            showSuccess("Run Completed!");
            navigate(`/test-runs/${runId}`); // Go back to summary
        }
    };

    if (loading) return <div className="h-screen bg-gray-900 flex items-center justify-center text-white">Loading Test Run...</div>;
    if (!run || !currentExecution) return (
        <div className="h-screen bg-gray-900 flex flex-col items-center justify-center text-white gap-4">
            <h2 className="text-xl font-bold">No Active Tests Found</h2>
            <button onClick={() => navigate('/test-plans')} className="text-indigo-400 hover:underline">Return to Plans</button>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white font-sans overflow-hidden">
            {/* Immersive Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700 shrink-0">
                <div>
                    <h1 className="text-lg font-bold text-gray-200">{run.name}</h1>
                    <div className="text-xs text-gray-500 font-mono">Test {currentIndex + 1} of {run.test_executions.length} • Execution ID: {currentExecution.id.substring(0, 8)}</div>
                </div>
                <div className="font-mono text-3xl font-black text-yellow-500 tracking-wider">
                    {formatTime(timer)}
                </div>
                <button onClick={() => navigate(runId === 'demo' ? '/test-suites' : `/test-runs/${runId}`)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-700">
                    <span className="material-symbols-outlined text-[18px]">close</span> Exit
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Case View */}
                <main className="flex-1 p-8 lg:p-12 max-w-5xl mx-auto flex flex-col h-full">

                    <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 mb-8 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{currentCase?.type}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider border ${currentCase?.priority === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                    currentCase?.priority === 'High' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                        'bg-green-500/10 text-green-500 border-green-500/20'
                                    }`}>{currentCase?.priority}</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-black mb-4 leading-tight">{currentCase?.title}</h2>
                            {currentCase?.description && <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-3xl">{currentCase.description}</p>}

                            {/* Steps */}
                            <div className="space-y-4">
                                {currentCase?.test_steps?.map((step) => (
                                    <div key={step.id || step.step_number} className="flex gap-6 p-4 rounded-xl hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700">
                                        <div className="font-mono font-bold text-gray-500 text-sm mt-1">#{step.step_number}</div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Action</div>
                                                <p className="font-medium text-gray-200 text-lg">{step.action}</p>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Expected</div>
                                                <p className="text-gray-400 text-lg">{step.expected_result}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!currentCase?.test_steps || currentCase?.test_steps.length === 0) && (
                                    <div className="text-gray-500 italic p-4">No specific steps defined.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="grid grid-cols-3 gap-6 pt-6 shrink-0 h-24">
                        <button onClick={() => handleResult('Failed')} className="group flex flex-col items-center justify-center bg-red-500/10 hover:bg-red-500 border-2 border-red-500/50 hover:border-red-500 rounded-2xl transition-all duration-200">
                            <span className="text-red-500 group-hover:text-white font-black text-xl tracking-widest">FAIL</span>
                            <span className="text-red-500/50 group-hover:text-white/80 text-xs font-bold uppercase mt-1">Log Defect</span>
                        </button>

                        <div className="flex gap-4">
                            <button onClick={() => handleResult('Blocked')} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-2xl font-bold text-sm border border-gray-700 transition-all">
                                BLOCK
                            </button>
                            <button onClick={() => handleResult('Skipped')} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-2xl font-bold text-sm border border-gray-700 transition-all">
                                SKIP
                            </button>
                        </div>

                        <button onClick={() => handleResult('Passed')} className="group flex flex-col items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 transform hover:-translate-y-1">
                            <span className="font-black text-2xl tracking-widest">PASS</span>
                            <span className="text-black/60 text-xs font-bold uppercase mt-1">Next Case</span>
                        </button>
                    </div>

                </main>
            </div>

            {/* Failure Modal */}
            {showFailModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-gray-800 p-8 rounded-2xl max-w-xl w-full border border-gray-700 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center gap-3 mb-6 text-red-500">
                            <span className="material-symbols-outlined text-3xl">warning</span>
                            <h3 className="text-2xl font-black">Log Failure</h3>
                        </div>

                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Failure Details</label>
                        <textarea
                            value={failComment}
                            onChange={e => setFailComment(e.target.value)}
                            className="w-full bg-gray-900 border-2 border-gray-700 rounded-xl p-4 text-white h-32 mb-6 focus:border-red-500 focus:outline-none resize-none text-lg transition-colors placeholder-gray-600"
                            placeholder="Describe what happened... (e.g. Error 500 on submit)"
                            autoFocus
                        ></textarea>

                        {/* Automated Bug Creation Toggle */}
                        {runId !== 'demo' && (
                            <div className="mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCreateBugChecked(!createBugChecked)}>
                                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${createBugChecked ? 'bg-red-500 border-red-500' : 'border-gray-500'}`}>
                                        {createBugChecked && <span className="material-symbols-outlined text-white text-sm font-bold">check</span>}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-200">Create Bug Report</div>
                                        <div className="text-xs text-gray-500">Enable this to create a defect ticket in Bug Tracker</div>
                                    </div>
                                </div>

                                {/* Expanded Form */}
                                {createBugChecked && (
                                    <div className="mt-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Priority</label>
                                            <select
                                                value={bugData.priority}
                                                onChange={e => setBugData({ ...bugData, priority: e.target.value })}
                                                className="bg-gray-800 border-gray-700 text-gray-200 text-sm rounded-lg p-2.5 outline-none focus:border-red-500"
                                            >
                                                <option>Low</option>
                                                <option>Medium</option>
                                                <option>High</option>
                                                <option>Highest</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Severity</label>
                                            <select
                                                value={bugData.severity}
                                                onChange={e => setBugData({ ...bugData, severity: e.target.value })}
                                                className="bg-gray-800 border-gray-700 text-gray-200 text-sm rounded-lg p-2.5 outline-none focus:border-red-500"
                                            >
                                                <option>Trivial</option>
                                                <option>Minor</option>
                                                <option>Major</option>
                                                <option>Critical</option>
                                                <option>Blocker</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Assignee</label>
                                            <select
                                                value={bugData.assignee}
                                                onChange={e => setBugData({ ...bugData, assignee: e.target.value })}
                                                className="bg-gray-800 border-gray-700 text-gray-200 text-sm rounded-lg p-2.5 outline-none focus:border-red-500"
                                            >
                                                <option value="">Unassigned</option>
                                                {users.map(user => (
                                                    <option key={user.id} value={`${user.first_name} ${user.last_name}`}>
                                                        {user.first_name} {user.last_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end gap-4">
                            <button onClick={() => { setShowFailModal(false); setIsActive(true); }} className="px-6 py-3 text-gray-400 font-bold hover:text-white transition-colors">Cancel</button>
                            <button disabled={isSubmitting} onClick={logFailure} className="bg-red-500 hover:bg-red-400 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all transform hover:scale-105">
                                {isSubmitting ? 'Logging...' : 'Confirm Failure'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestRunner;
