import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { testCaseService } from '../services/testCaseService';
import { authService } from '../services/authService';
import { bugService } from '../services/bugService';
import moment from 'moment'; // Ensure moment is installed or use native date
import { useToast } from '../context/ToastContext';

const CreateTestCase = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const suiteIdParam = searchParams.get('suite');
    const { success, error: showError, info } = useToast();

    // Form State
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState(''); // Comma separated string for input
    const [status, setStatus] = useState('Not Run');
    const [executionStatus, setExecutionStatus] = useState('Not Run');
    const [priority, setPriority] = useState('Medium');
    const [preConditions, setPreConditions] = useState('');
    const [steps, setSteps] = useState([
        { id: Date.now(), action: '', expected_result: '', status: 'Not Run' }
    ]);
    const [isSaving, setIsSaving] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [suiteId, setSuiteId] = useState(suiteIdParam || '');
    const [lastSaved, setLastSaved] = useState(null);

    // Comments State
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [sendingComment, setSendingComment] = useState(false);
    const [expandedStepId, setExpandedStepId] = useState(null);

    // Bug State
    const [bugId, setBugId] = useState(null);
    const [bugModalOpen, setBugModalOpen] = useState(false);
    const [bugTitle, setBugTitle] = useState('');
    const [bugDescription, setBugDescription] = useState('');
    const [bugEnvironment, setBugEnvironment] = useState('');
    const [bugPriority, setBugPriority] = useState('Medium');
    const [bugSeverity, setBugSeverity] = useState('Major');
    const [bugAssignee, setBugAssignee] = useState('');
    const [isReportingBug, setIsReportingBug] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        authService.getCurrentUser().then(setCurrentUser);
        authService.getAllProfiles().then(setUsers).catch(err => console.error("Failed to load users", err));

        if (id) {
            loadTestCase(id);
            loadComments(id);
        } else {
            setTitle('New Test Case');
        }
    }, [id]);

    const loadTestCase = async (caseId) => {
        try {
            const data = await testCaseService.getById(caseId);
            setTitle(data.title);
            setStatus(data.status);
            setTags(data.tags ? data.tags.join(', ') : '');
            setExecutionStatus(data.execution_status || 'Not Run');
            setPriority(data.priority);
            setPreConditions(data.pre_conditions || '');
            setSuiteId(data.suite_id);
            setBugId(data.bug_id);
            if (data.updated_at) setLastSaved(new Date(data.updated_at));

            if (data.steps && data.steps.length > 0) {
                setSteps(data.steps.map(s => ({
                    id: s.id,
                    action: s.action,
                    expected_result: s.expected_result,
                    status: s.status || 'Not Run'
                })));
            } else {
                setSteps([{ id: Date.now(), action: '', expected_result: '', status: 'Not Run' }]);
            }
        } catch (error) {
            console.error("Failed to load test case", error);
            showError("Failed to load test case details.");
            navigate('/repository');
        }
    };

    const loadComments = async (caseId) => {
        try {
            const data = await testCaseService.getComments(caseId);
            setComments(data);
        } catch (error) {
            console.error("Failed to load comments:", error);
        }
    };

    const handleAddComment = async (stepId) => {
        if (!newComment.trim() || !id) return;
        setSendingComment(true);
        try {
            const comment = {
                case_id: id,
                user_id: currentUser?.id,
                content: newComment,
                step_id: stepId,
                created_at: new Date()
            };
            await testCaseService.addComment(comment);
            setNewComment('');
            loadComments(id);
        } catch (error) {
            showError("Failed to add comment.");
        } finally {
            setSendingComment(false);
        }
    };

    const toggleStepComments = (stepId) => {
        if (expandedStepId === stepId) {
            setExpandedStepId(null);
        } else {
            setExpandedStepId(stepId);
            setNewComment('');
        }
    };

    const addStep = () => {
        setSteps([...steps, { id: Date.now(), action: '', expected_result: '', status: 'Not Run' }]);
    };

    const removeStep = (stepId) => {
        if (steps.length === 1) return;
        setSteps(steps.filter(s => s.id !== stepId));
        info("Step removed");
    };

    const updateStep = (stepId, field, value) => {
        setSteps(prevSteps => {
            const newSteps = prevSteps.map(s => s.id === stepId ? { ...s, [field]: value } : s);
            if (field === 'status') {
                calculateExecutionStatus(newSteps);
            }
            return newSteps;
        });
    };

    const calculateExecutionStatus = (currentSteps) => {
        let hasFail = false;
        let hasBlocked = false;
        let allPass = true;
        let hasRun = false;

        currentSteps.forEach(s => {
            if (s.status !== 'Not Run') hasRun = true;
            if (s.status === 'Fail') hasFail = true;
            if (s.status === 'Blocked') hasBlocked = true;
            if (s.status !== 'Pass') allPass = false;
        });

        let newStatus = 'Not Run';
        if (hasFail) newStatus = 'Fail';
        else if (hasBlocked) newStatus = 'Blocked';
        else if (allPass && hasRun && currentSteps.length > 0) newStatus = 'Pass';
        else if (hasRun) newStatus = 'In Progress';

        setExecutionStatus(newStatus);
    };

    const handleSave = async () => {
        if (!title.trim()) {
            showError("Please enter a test case title.");
            return;
        }
        // Fix: Ensure we know which suite we are in
        if (!suiteId && !id && !suiteIdParam) {
            showError("No Suite selected. Please return to Repository and select a folder.");
            return;
        }

        setIsSaving(true);
        try {
            // Process tags
            const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);

            // Fix: Handle 'unassigned' string explicitly
            let finalSuiteId = null;
            if (suiteId && suiteId !== 'unassigned') {
                finalSuiteId = parseInt(suiteId);
            }

            const caseData = {
                title,
                status,
                tags: tagsArray,
                execution_status: executionStatus,
                bug_id: bugId,
                priority,
                pre_conditions: preConditions,
                // suite_id: suiteId ? parseInt(suiteId) : null, // REMOVED: Handle separately
                updated_at: new Date()
            };

            // Fix: Only update suite_id for NEW cases, effectively locking folder on Edit to prevent accidental "Unassigned" moves.
            // If we later add a "Move Folder" dropdown, we would include it here.
            // (finalSuiteId is already calculated above)

            let savedCaseId = id;
            if (id) {
                // Update existing: DO NOT touch suite_id to preserve folder location
                await testCaseService.update(id, caseData);
                success(`Test Case updated: ${executionStatus}`);
            } else {
                // Create new: MUST include suite_id
                const newCase = await testCaseService.create({
                    ...caseData,
                    suite_id: finalSuiteId,
                    created_at: new Date()
                });
                savedCaseId = newCase.id;
                success(`Test Case created: ${executionStatus}`);
            }

            setLastSaved(new Date());

            const validSteps = steps.map((s, index) => ({
                case_id: savedCaseId,
                step_number: index + 1,
                action: s.action,
                expected_result: s.expected_result,
                status: s.status
            }));

            if (validSteps.length > 0) {
                await testCaseService.updateSteps(savedCaseId, validSteps);
            }

            // Navigate back to Repo with Suite ID to persist selection (try to infer current suite if possible)
            // If we are editing, we might be navigating back to 'unassigned' if state was lost, but that's just a view issue, data is safe.
            // Better: Use saved/loaded suiteId if available.
            const targetSuiteParams = finalSuiteId || (id ? suiteId : 'unassigned');
            navigate(`/repository?suite=${targetSuiteParams || 'unassigned'}`);
        } catch (err) {
            console.error(err);
            showError("Failed to save test case: " + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const openBugModal = () => {
        setBugTitle(`Failed: ${title}`);
        const stepsText = steps.map((s, i) => `${i + 1}. ${s.action} -> ${s.expected_result} [${s.status}]`).join('\n');

        // Add Link back to test case
        const caseLink = window.location.href;

        setBugDescription(`**Test Case Failed**\n\n**Executional Steps:**\n${stepsText}\n\n**Actual Result:**\nTest Case marked as Failed.\n\n**Related Test Case:**\n${caseLink}`);
        setBugModalOpen(true);
    };

    const handleReportBug = async () => {
        setIsReportingBug(true);
        try {
            const currentUser = await authService.getCurrentUser();
            const newBug = await bugService.createBug({
                title: bugTitle,
                description: bugDescription,
                status: 'To Do',
                priority: bugPriority,
                severity: bugSeverity,
                reporter_id: currentUser?.id,
                project: 'UHDMS',
                environment: bugEnvironment,
                assignee: bugAssignee || null,
            });

            setBugId(newBug.id);
            // Also update the test case with the bug ID immediately
            if (id) { // Ensure id exists before attempting to update
                await testCaseService.update(id, { bug_id: newBug.id });
            }

            // Add System Comment
            if (id) { // Ensure id exists before adding comment
                await testCaseService.addComment({
                    case_id: id,
                    user_id: currentUser?.id,
                    content: `🪲 **Bug Reported:** [Bug #${newBug.id}](/bugs/${newBug.id})`,
                    created_at: new Date()
                });
                loadComments(id);
            }

            success(`Bug Reported: #${newBug.id}`);
            setBugModalOpen(false);
        } catch (err) {
            console.error(err);
            showError("Failed to report bug.");
        } finally {
            setIsReportingBug(false);
        }
    };

    const handleFileChange = (e) => {
        setAttachments(Array.from(e.target.files));
    };

    const getStatusColor = (s) => {
        switch (s) {
            case 'Pass': return 'bg-green-100 text-green-700 border-green-200';
            case 'Fail': return 'bg-red-100 text-red-700 border-red-200';
            case 'Blocked': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-white text-slate-600 border-slate-200';
        }
    };

    // Helper for formatting date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="bg-white dark:bg-[#0f172a] font-sans text-slate-900 dark:text-slate-100 antialiased min-h-screen pb-12">
            <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Link className="hover:text-[#4F46E5] transition-colors" to={`/repository?suite=${suiteId || 'unassigned'}`}>Repository</Link>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="font-mono font-medium text-slate-900 dark:text-slate-300">{id ? 'Edit Case' : 'New Case'}</span>
                    </nav>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 group">
                            <input
                                className="w-full text-3xl font-bold border-none p-0 focus:ring-0 bg-transparent text-slate-900 dark:text-white cursor-text hover:bg-slate-50 dark:hover:bg-slate-800 rounded px-2 -ml-2 transition-all placeholder-slate-300"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter Test Case Title"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${executionStatus === 'Pass' ? 'bg-green-100 text-green-700 border-green-200' :
                                executionStatus === 'Fail' ? 'bg-red-100 text-red-700 border-red-200' :
                                    executionStatus === 'Blocked' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                        'bg-slate-100 text-slate-500 border-slate-200'
                                }`}>
                                {executionStatus}
                            </div>

                            {executionStatus === 'Fail' && !bugId && (
                                <button onClick={openBugModal} className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold border border-red-200 hover:bg-red-200">
                                    <span className="material-symbols-outlined text-[16px]">bug_report</span> Report Bug
                                </button>
                            )}

                            {bugId && (
                                <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 text-xs font-bold">
                                    <span className="material-symbols-outlined text-[16px]">bug_report</span> Bug #{bugId}
                                </span>
                            )}

                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-semibold hover:bg-[#4F46E5]/90 transition-all shadow-sm disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[20px]">save</span>
                                {isSaving ? 'Saving...' : 'Save Case'}
                            </button>
                        </div>
                    </div>
                </div>
                {lastSaved && (
                    <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-1 px-6 text-[10px] text-slate-400 text-right">
                        Last saved: {lastSaved.toLocaleString()}
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
                        <div className="relative">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-[#4F46E5] focus:border-[#4F46E5] appearance-none py-2 px-3 pr-10 outline-none"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Active">Active</option>
                                <option value="Deprecated">Deprecated</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Priority</label>
                        <div className="flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                            {['Low', 'Medium', 'High', 'Critical'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPriority(p)}
                                    className={`flex-1 py-1 text-xs font-bold rounded transition-colors ${priority === p ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    {p.charAt(0)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tags</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. Regression, Smoke, API"
                            className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-[#4F46E5] focus:border-[#4F46E5] outline-none py-2 px-3"
                        />
                    </div>
                </section>

                <div className="space-y-10">
                    <section className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Preconditions</h3>
                        </div>
                        <textarea
                            className="w-full min-h-[100px] border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-sm p-4 focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all resize-none leading-relaxed outline-none"
                            placeholder="e.g. User must be logged in..."
                            value={preConditions}
                            onChange={(e) => setPreConditions(e.target.value)}
                        />
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Test Steps</h3>
                            <button onClick={addStep} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-[#4F46E5] text-sm font-semibold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">add</span> Add Step
                            </button>
                        </div>
                        <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                        <th className="w-16 px-4 py-3 text-[11px] font-bold text-slate-400 uppercase text-center">Step</th>
                                        <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase">Action</th>
                                        <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase">Expected Result</th>
                                        <th className="w-40 px-4 py-3 text-[11px] font-bold text-slate-400 uppercase">Status</th>
                                        <th className="w-12 px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {steps.map((step, index) => (
                                        <React.Fragment key={step.id}>
                                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                <td className="px-4 py-4 text-sm font-medium text-slate-500 text-center align-top pt-5">{index + 1}</td>
                                                <td className="px-4 py-3 align-top">
                                                    <textarea
                                                        className="w-full min-h-[60px] p-2 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#4F46E5] focus:bg-white rounded text-sm outline-none resize-none"
                                                        placeholder="Describe action..."
                                                        value={step.action}
                                                        onChange={(e) => updateStep(step.id, 'action', e.target.value)}
                                                    />
                                                    <button onClick={() => toggleStepComments(step.id)} className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#4F46E5] mt-1 transition-colors">
                                                        <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                                                        {comments.filter(c => c.step_id === step.id).length > 0 ? `${comments.filter(c => c.step_id === step.id).length} Comments` : 'Add Comment'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3 align-top">
                                                    <textarea
                                                        className="w-full min-h-[60px] p-2 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#4F46E5] focus:bg-white rounded text-sm outline-none resize-none"
                                                        placeholder="Describe expected result..."
                                                        value={step.expected_result}
                                                        onChange={(e) => updateStep(step.id, 'expected_result', e.target.value)}
                                                    />
                                                </td>
                                                <td className="px-4 py-4 align-top">
                                                    <div className="relative">
                                                        <select
                                                            value={step.status || 'Not Run'}
                                                            onChange={(e) => updateStep(step.id, 'status', e.target.value)}
                                                            className={`w-full px-2 py-1.5 rounded-md text-xs font-bold border transition-colors cursor-pointer outline-none appearance-none ${getStatusColor(step.status)}`}
                                                        >
                                                            <option value="Not Run">Not Run</option>
                                                            <option value="Pass">Pass</option>
                                                            <option value="Fail">Fail</option>
                                                            <option value="Blocked">Blocked</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity align-top pt-5">
                                                    <button onClick={() => removeStep(step.id)} className="text-slate-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                                                </td>
                                            </tr>
                                            {expandedStepId === step.id && (
                                                <tr className="bg-slate-50 dark:bg-slate-800/50">
                                                    <td colSpan="5" className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                                                        <div className="ml-10 space-y-3">
                                                            {comments.filter(c => c.step_id === step.id).length === 0 && (
                                                                <div className="text-xs text-slate-400 italic">No comments yet on this step.</div>
                                                            )}
                                                            {comments.filter(c => c.step_id === step.id).map(comment => (
                                                                <div key={comment.id} className="flex gap-3 text-sm bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                                                    <div className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap text-xs">{comment.user?.email}</div>
                                                                    <div className="text-slate-600 dark:text-slate-400 flex-1">{comment.content}</div>
                                                                    <div className="text-[10px] text-slate-400 whitespace-nowrap">{formatDate(comment.created_at)}</div>
                                                                </div>
                                                            ))}
                                                            <div className="flex gap-2 mt-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Write a comment..."
                                                                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#4F46E5] transition-shadow"
                                                                    value={newComment}
                                                                    onChange={(e) => setNewComment(e.target.value)}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') handleAddComment(step.id);
                                                                    }}
                                                                />
                                                                <button onClick={() => handleAddComment(step.id)} className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">Post</button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>

            {bugModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl p-6 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-600">bug_report</span>
                                Report Bug
                            </h3>
                            <button onClick={() => setBugModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Summary <span className="text-red-500">*</span></label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:ring-[#4F46E5] focus:border-[#4F46E5] outline-none font-medium"
                                        value={bugTitle}
                                        onChange={(e) => setBugTitle(e.target.value)}
                                        placeholder="Summary..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Environment</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:ring-[#4F46E5] focus:border-[#4F46E5] outline-none"
                                        value={bugEnvironment}
                                        onChange={(e) => setBugEnvironment(e.target.value)}
                                        placeholder="e.g. Chrome, Production"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Priority</label>
                                    <div className="relative">
                                        <select
                                            value={bugPriority}
                                            onChange={(e) => setBugPriority(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm appearance-none outline-none focus:border-[#4F46E5]"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                            <option>Highest</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">expand_more</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Severity</label>
                                    <div className="relative">
                                        <select
                                            value={bugSeverity}
                                            onChange={(e) => setBugSeverity(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm appearance-none outline-none focus:border-[#4F46E5]"
                                        >
                                            <option>Minor</option>
                                            <option>Major</option>
                                            <option>Critical</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">expand_more</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Assignee</label>
                                    <div className="relative">
                                        <select
                                            value={bugAssignee}
                                            onChange={(e) => setBugAssignee(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm appearance-none outline-none focus:border-[#4F46E5]"
                                        >
                                            <option value="">Unassigned</option>
                                            {users && users.length > 0 && users.map(u => (
                                                <option key={u.id} value={`${u.first_name} ${u.last_name}`}>
                                                    {u.first_name} {u.last_name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">expand_more</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#4F46E5] focus-within:border-[#4F46E5]">
                                    <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-3 py-2 flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const textarea = document.getElementById('bug-description');
                                                if (!textarea) return;
                                                const start = textarea.selectionStart;
                                                const end = textarea.selectionEnd;
                                                const text = bugDescription;
                                                const before = text.substring(0, start);
                                                const selection = text.substring(start, end);
                                                const after = text.substring(end);
                                                const newText = `${before}**${selection || 'bold text'}**${after}`;
                                                setBugDescription(newText);
                                                setTimeout(() => {
                                                    textarea.focus();
                                                    textarea.setSelectionRange(start + 2, end + 2 + (selection ? 0 : 9));
                                                }, 0);
                                            }}
                                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-600 dark:text-slate-400"
                                            title="Bold"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">format_bold</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const textarea = document.getElementById('bug-description');
                                                if (!textarea) return;
                                                const start = textarea.selectionStart;
                                                const end = textarea.selectionEnd;
                                                const text = bugDescription;
                                                const before = text.substring(0, start);
                                                const selection = text.substring(start, end);
                                                const after = text.substring(end);
                                                const newText = `${before}*${selection || 'italic text'}*${after}`;
                                                setBugDescription(newText);
                                                setTimeout(() => {
                                                    textarea.focus();
                                                    textarea.setSelectionRange(start + 1, end + 1 + (selection ? 0 : 11));
                                                }, 0);
                                            }}
                                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-600 dark:text-slate-400"
                                            title="Italic"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">format_italic</span>
                                        </button>
                                        <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const textarea = document.getElementById('bug-description');
                                                if (!textarea) return;
                                                const start = textarea.selectionStart;
                                                const text = bugDescription;
                                                const before = text.substring(0, start);
                                                const after = text.substring(start);
                                                const newText = `${before}\n- List item\n${after}`;
                                                setBugDescription(newText);
                                                setTimeout(() => {
                                                    textarea.focus();
                                                    const newCursor = start + 13;
                                                    textarea.setSelectionRange(newCursor, newCursor);
                                                }, 0);
                                            }}
                                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-600 dark:text-slate-400"
                                            title="Bullet List"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                                        </button>
                                    </div>
                                    <textarea
                                        id="bug-description"
                                        className="w-full min-h-[150px] bg-white dark:bg-slate-900 border-none p-3 text-sm focus:ring-0 outline-none font-mono resize-y"
                                        value={bugDescription}
                                        onChange={(e) => setBugDescription(e.target.value)}
                                        placeholder="Steps to reproduce..."
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => setBugModalOpen(false)}
                                className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReportBug}
                                disabled={isReportingBug}
                                className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 shadow-md shadow-red-600/20 disabled:opacity-50 transition-all"
                            >
                                {isReportingBug ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Reporting...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[18px]">bug_report</span>
                                        Create Bug
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTestCase;
