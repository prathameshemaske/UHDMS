import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { testService } from '../services/testService';
import { bugService } from '../services/bugService';
import { useToast } from '../context/ToastContext';

const TestRepository = () => {
    const { showSuccess, showError } = useToast();
    const navigate = useNavigate();

    // Data States
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState('ALL'); // 'ALL' or folder object
    const [testCases, setTestCases] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Selection & Bulk Actions
    const [selectedIds, setSelectedIds] = useState([]);

    // Modals
    const [showFolderModal, setShowFolderModal] = useState(false);
    const [showCaseModal, setShowCaseModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false); // For "Open" case (Execution)
    const [showFailModal, setShowFailModal] = useState(false); // For Bug Reporting in View Modal

    // Form Data
    const [folderForm, setFolderForm] = useState({ name: '', priority: '', type: '' });
    const [caseForm, setCaseForm] = useState({ title: '', function_name: '', priority: 'Medium', type: 'Functional', steps: [{ action: '', expected_result: '' }] });
    const [viewCase, setViewCase] = useState(null); // The case currently being viewed/executed
    const [assignUserId, setAssignUserId] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Edit Folder State
    const [editingFolder, setEditingFolder] = useState(null); // If set, we are editing this folder

    // Bug Reporting Data
    const [bugData, setBugData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'To Do',
        assignee: '',
        severity: 'Major',
        project: 'HRMS Software',
        issueType: 'Bug',
        environment: ''
    });
    const [bugAttachment, setBugAttachment] = useState(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        loadCases();
    }, [selectedFolder]);

    const loadInitialData = async () => {
        try {
            const [folderData, userData] = await Promise.all([
                testService.getFolders(),
                bugService.getAllProfiles()
            ]);
            setFolders(folderData || []);
            setUsers(userData || []);
        } catch (err) {
            console.error("Init failed", err);
        }
    };

    const loadCases = async () => {
        setLoading(true);
        try {
            let data;
            if (selectedFolder === 'ALL') {
                data = await testService.getAllCasesFlat();
            } else {
                data = await testService.getCasesByFolder(selectedFolder.id);
            }
            setTestCases(data || []);
            setSelectedIds([]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Group Cases for Render
    const groupedCases = useMemo(() => {
        if (!testCases || testCases.length === 0) return [];
        try {
            const groups = testCases.reduce((groups, c) => {
                const f = c.function_name || 'General Cases';
                if (!groups[f]) groups[f] = [];
                groups[f].push(c);
                return groups;
            }, {});
            return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
        } catch (e) {
            console.error("Grouping failed", e);
            return [];
        }
    }, [testCases]);

    // --- FOLDER ACTIONS ---

    const openCreateFolder = () => {
        setEditingFolder(null);
        setFolderForm({ name: '', priority: '', type: '' });
        setShowFolderModal(true);
    };

    const openEditFolder = (e, folder) => {
        e.stopPropagation();
        setEditingFolder(folder);
        setFolderForm({ name: folder.name, priority: '', type: '' }); // Only name is editable for now
        setShowFolderModal(true);
    };

    const handleFolderSubmit = async () => {
        if (!folderForm.name) return showError("Name is required");
        try {
            if (editingFolder) {
                await testService.updateFolder(editingFolder.id, folderForm.name);

                // If criteria provided during edit, Run Import
                if (folderForm.priority || folderForm.type) {
                    await testService.importSmartCases(editingFolder.id, folderForm.priority, folderForm.type);
                    showSuccess("Folder updated & Cases imported!");
                } else {
                    showSuccess("Folder updated");
                }
            } else {
                if (folderForm.priority || folderForm.type) {
                    await testService.createSmartFolder(folderForm.name, folderForm.priority, folderForm.type);
                    showSuccess(`Folder created with auto-imported cases!`);
                } else {
                    await testService.createFolder(folderForm.name);
                    showSuccess("Folder created");
                }
            }
            setShowFolderModal(false);
            setEditingFolder(null);
            setFolderForm({ name: '', priority: '', type: '' });
            loadInitialData(); // Refresh folders
        } catch (e) {
            showError("Operation failed");
        }
    };

    // --- CASE ACTIONS ---

    const handleSaveCase = async () => {
        try {
            const folderId = selectedFolder !== 'ALL' ? selectedFolder.id : null;
            if (isEditing) {
                await testService.updateCase(viewCase.id, {
                    title: caseForm.title,
                    function_name: caseForm.function_name,
                    priority: caseForm.priority,
                    type: caseForm.type,
                }, caseForm.steps);
                showSuccess("Updated successfully");
            } else {
                await testService.createCase({
                    title: caseForm.title,
                    function_name: caseForm.function_name,
                    priority: caseForm.priority,
                    type: caseForm.type,
                    folder_id: folderId
                }, caseForm.steps);
                showSuccess("Created successfully");
            }
            setShowCaseModal(false);
            loadCases(); // Refresh list to show new case
        } catch (e) {
            console.error(e);
            showError("Operation failed");
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Delete ${selectedIds.length} test cases?`)) return;
        try {
            await testService.deleteCases(selectedIds);
            showSuccess("Deleted successfully");
            loadCases();
        } catch (e) {
            showError("Delete failed");
        }
    };

    const handleBulkAssign = async () => {
        if (!assignUserId) return showError("Select a user");
        try {
            await testService.assignCases(selectedIds, assignUserId);
            showSuccess("Assigned successfully");
            setShowAssignModal(false);
            loadCases();
        } catch (e) {
            showError("Assign failed");
        }
    };

    const handleStepStatusChange = async (stepId, newStatus) => {
        // Optimistic UI update for the viewCase state
        const updatedSteps = viewCase.test_steps.map(s =>
            s.id === stepId ? { ...s, status: newStatus } : s
        );
        setViewCase({ ...viewCase, test_steps: updatedSteps });

        try {
            await testService.updateStepStatus(stepId, newStatus);
        } catch (e) {
            console.error("Failed to update step status", e);
        }
    };

    // --- BUG REPORTING ---

    const openBugReport = (failedStepId = null) => {
        // Generate richer description: capture Actual Results
        const stepDetails = viewCase.test_steps.map(s => {
            const status = s.status || 'Untested';
            let line = `${s.step_number}. ${s.action}`;

            if (s.id === failedStepId || status === 'Failed') {
                const actualRes = s.actual_result ? s.actual_result : '[Please describe what actually happened]';
                return `${line} [FAILED]
   - Expected Result: ${s.expected_result}
   - Actual Result: ${actualRes}`;
            }
            return `${line} -> ${s.expected_result} [${status}]`;
        }).join('\n\n');

        setBugData({
            title: `Failed: ${viewCase.title}`,
            description: `Test Case Reference: TC-${viewCase.id?.substring(0, 8)}\n\nSteps Execution:\n${stepDetails}\n\nAdditional Failure Notes:\n`,
            priority: viewCase.priority === 'Critical' ? 'Highest' : viewCase.priority === 'High' ? 'High' : 'Medium',
            status: 'To Do',
            severity: 'Major',
            project: 'HRMS Software',
            issueType: 'Bug',
            assignee: '',
            environment: ''
        });
        setBugAttachment(null);
        setShowFailModal(true);
    };

    const handleReportBug = async (e) => {
        e.preventDefault();
        try {
            const assigneeUser = users.find(u => `${u.first_name} ${u.last_name}` === bugData.assignee);

            // 1. Create Bug (Explicit Mapping for DB Schema)
            const payload = {
                title: bugData.title,
                description: bugData.description,
                priority: bugData.priority,
                status: bugData.status,
                severity: bugData.severity,
                project: bugData.project,
                assignee: bugData.assignee, // Legacy Name Column
                assignee_id: assigneeUser?.id, // ID
                issue_type: bugData.issueType, // Map camelCase to snake_case
                environment: bugData.environment
            };

            const newBug = await bugService.createBug(payload);

            // 2. Upload Attachment if exists
            if (bugAttachment) {
                await bugService.uploadAttachment(newBug.id, bugAttachment);
            }

            showSuccess("Bug Ticket Created!");
            setShowFailModal(false);
        } catch (err) {
            console.error("Bug creation failed:", err);
            showError("Failed to create Bug Ticket");
        }
    };

    const openEdit = (tc) => {
        setViewCase(tc);
        setCaseForm({
            title: tc.title,
            function_name: tc.function_name || '',
            priority: tc.priority,
            type: tc.type,
            steps: tc.test_steps?.map(s => ({ action: s.action, expected_result: s.expected_result })) || []
        });
        setIsEditing(true);
        setShowCaseModal(true);
    };

    const openView = (tc) => {
        // Ensure steps are sorted
        const sortedSteps = tc.test_steps ? [...tc.test_steps].sort((a, b) => a.step_number - b.step_number) : [];
        setViewCase({ ...tc, test_steps: sortedSteps });
        setShowViewModal(true);
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    return (
        <div className="flex flex-col h-full bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-sans overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shrink-0">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-black uppercase tracking-tight">Test Library</h2>
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">V3.0</span>
                </div>
                <div className="flex items-center gap-3">
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-2 mr-4 animate-in fade-in slide-in-from-top-2">
                            <span className="text-xs font-bold text-gray-400">{selectedIds.length} Selected</span>
                            <button onClick={handleBulkDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete Selected">
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                            <button onClick={() => setShowAssignModal(true)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg" title="Assign Selected">
                                <span className="material-symbols-outlined">person_add</span>
                            </button>
                        </div>
                    )}
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-indigo-700" onClick={() => { setIsEditing(false); setCaseForm({ title: '', priority: 'Medium', type: 'Functional', steps: [{ action: '', expected_result: '' }] }); setShowCaseModal(true); }}>+ New Case</button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50" onClick={openCreateFolder}>+ Folder</button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
                    <div className="p-4">
                        <div
                            onClick={() => setSelectedFolder('ALL')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium mb-2 ${selectedFolder === 'ALL' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <span className="material-symbols-outlined text-[18px]">dataset</span>
                            All Test Cases
                        </div>

                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 mt-4">Folders</h3>
                        <div className="space-y-1">
                            {folders.map(folder => (
                                <div
                                    key={folder.id}
                                    onClick={() => setSelectedFolder(folder)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors group ${selectedFolder?.id === folder.id ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px] text-yellow-500">folder</span>
                                        <span className="truncate max-w-[120px]">{folder.name}</span>
                                    </div>
                                    <button
                                        onClick={(e) => openEditFolder(e, folder)}
                                        className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            {selectedFolder === 'ALL' ? 'All Test Cases' : selectedFolder.name}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">{testCases.length} Test Cases</p>
                    </div>

                    {/* Grouped Tables */}
                    {testCases.length > 0 ? (
                        groupedCases.map(([funcName, cases]) => (
                            <div key={funcName} className="mb-8">
                                <div className="flex items-center gap-3 mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="material-symbols-outlined text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 p-1.5 rounded-lg text-lg">extension</span>
                                    <h3 className="text-lg font-black text-gray-800 dark:text-gray-200">{funcName}</h3>
                                    <span className="text-xs font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-full">{cases.length}</span>
                                </div>

                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            <th className="py-3 px-2 w-10">
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        const ids = cases.map(c => c.id);
                                                        setSelectedIds(prev => e.target.checked ? [...new Set([...prev, ...ids])] : prev.filter(id => !ids.includes(id)));
                                                    }}
                                                    checked={cases.every(c => selectedIds.includes(c.id))}
                                                />
                                            </th>
                                            <th className="py-2 px-2">ID</th>
                                            <th className="py-2 px-2">Title</th>
                                            <th className="py-2 px-2">Priority</th>
                                            <th className="py-2 px-2">Type</th>
                                            <th className="py-2 px-2">Assigned To</th>
                                            <th className="py-2 px-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cases.map((tc, idx) => (
                                            <tr key={tc.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 group transition-colors">
                                                <td className="py-3 px-2">
                                                    <input type="checkbox" checked={selectedIds.includes(tc.id)} onChange={() => toggleSelect(tc.id)} />
                                                </td>
                                                <td className="py-3 px-2 font-mono text-xs text-gray-400">TC-{tc.id?.substring(0, 4)}</td>
                                                <td className="py-3 px-2 font-medium text-indigo-600 hover:underline cursor-pointer" onClick={() => openView(tc)}>
                                                    {tc.title}
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${tc.priority === 'High' ? 'bg-red-100 text-red-700' : tc.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                                        {tc.priority}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-sm text-gray-500">{tc.type}</td>
                                                <td className="py-3 px-2 text-sm text-gray-500">
                                                    {tc.assignee ? (
                                                        <div className="flex items-center gap-1">
                                                            <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                                                                {tc.assignee.first_name[0]}{tc.assignee.last_name[0]}
                                                            </div>
                                                            <span className="text-xs truncate max-w-[100px]">{tc.assignee.first_name}</span>
                                                        </div>
                                                    ) : <span className="text-gray-300 text-xs italic">Unassigned</span>}
                                                </td>
                                                <td className="py-3 px-2">
                                                    {selectedFolder === 'ALL' ? (
                                                        <button onClick={() => openEdit(tc)} className="text-gray-400 hover:text-indigo-600">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                    ) : (
                                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${tc.test_steps?.some(s => s.status === 'Failed') ? 'bg-red-50 text-red-600 border-red-100' :
                                                            tc.test_steps?.some(s => s.status === 'Blocked') ? 'bg-gray-100 text-gray-600 border-gray-200' :
                                                                tc.test_steps?.length > 0 && tc.test_steps.every(s => s.status === 'Passed') ? 'bg-green-50 text-green-600 border-green-100' :
                                                                    tc.test_steps?.some(s => s.status) ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                                        'bg-white text-gray-400 border-gray-200'
                                                            }`}>
                                                            {tc.test_steps?.some(s => s.status === 'Failed') ? 'Failed' :
                                                                tc.test_steps?.some(s => s.status === 'Blocked') ? 'Blocked' :
                                                                    tc.test_steps?.length > 0 && tc.test_steps.every(s => s.status === 'Passed') ? 'Passed' :
                                                                        tc.test_steps?.some(s => s.status) ? 'In Progress' :
                                                                            'Untested'}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">dataset</span>
                            <p>No test cases found. Create one!</p>
                        </div>
                    )}
                </main>
            </div>

            {/* --- MODALS --- */}

            {/* Folder Modal */}
            {showFolderModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">{editingFolder ? 'Edit Folder' : 'Create New Folder'}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Folder Name <span className="text-red-500">*</span></label>
                                <input className="w-full border rounded p-2" value={folderForm.name} onChange={e => setFolderForm({ ...folderForm, name: e.target.value })} placeholder="e.g. Q1 Sprint Regression" />
                            </div>

                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-indigo-600">auto_fix_high</span>
                                    <h4 className="font-bold text-sm text-indigo-900">Smart Import (Optional)</h4>
                                </div>
                                <p className="text-xs text-indigo-700 mb-3">
                                    {editingFolder ? "Add test cases matching these criteria to this folder." : "Automatically copy existing test cases matching these criteria into the new folder."}
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <select className="border rounded p-2 text-sm" value={folderForm.priority} onChange={e => setFolderForm({ ...folderForm, priority: e.target.value })}>
                                        <option value="">Any Priority</option>
                                        <option>High</option><option>Medium</option><option>Low</option><option>Critical</option>
                                    </select>
                                    <select className="border rounded p-2 text-sm" value={folderForm.type} onChange={e => setFolderForm({ ...folderForm, type: e.target.value })}>
                                        <option value="">Any Type</option>
                                        <option>Functional</option><option>Regression</option><option>Smoke</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button onClick={() => setShowFolderModal(false)} className="px-4 py-2 text-gray-500 font-bold">Cancel</button>
                                <button onClick={handleFolderSubmit} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">{editingFolder ? 'Update' : 'Create Folder'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-lg font-bold mb-4">Assign {selectedIds.length} Test Cases</h3>
                        <select className="w-full border p-2 rounded mb-6" value={assignUserId} onChange={e => setAssignUserId(e.target.value)}>
                            <option value="">Select User...</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.first_name} {u.last_name}</option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowAssignModal(false)} className="text-gray-500 font-bold">Cancel</button>
                            <button onClick={handleBulkAssign} className="bg-indigo-600 text-white px-4 py-2 rounded font-bold">Assign</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Case Create/Edit Modal */}
            {showCaseModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
                    <div className="w-full max-w-xl bg-white dark:bg-gray-900 h-full shadow-2xl p-6 overflow-y-auto animate-slide-in-right">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">{isEditing ? 'Edit Case' : 'New Case'}</h3>
                            <button onClick={() => setShowCaseModal(false)} className="text-gray-500">Close</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Title</label>
                                <input className="w-full border rounded p-2" value={caseForm.title} onChange={e => setCaseForm({ ...caseForm, title: e.target.value })} autoFocus />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Function / Module</label>
                                <input className="w-full border rounded p-2" placeholder="e.g. Authentication, Profile, Dashboard" value={caseForm.function_name || ''} onChange={e => setCaseForm({ ...caseForm, function_name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select className="border rounded p-2" value={caseForm.priority} onChange={e => setCaseForm({ ...caseForm, priority: e.target.value })}>
                                    <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                                </select>
                                <select className="border rounded p-2" value={caseForm.type} onChange={e => setCaseForm({ ...caseForm, type: e.target.value })}>
                                    <option>Functional</option><option>Regression</option><option>Smoke</option>
                                </select>
                            </div>
                            {/* Steps Input */}
                            <div className="pt-4 border-t">
                                <label className="block text-sm font-bold mb-2">Test Steps</label>
                                {caseForm.steps.map((step, idx) => (
                                    <div key={idx} className="bg-gray-50 p-3 rounded mb-2 border">
                                        <div className="text-xs font-bold text-gray-400 mb-1">Step {idx + 1}</div>
                                        <input className="w-full border rounded p-2 mb-2 text-sm" placeholder="Action" value={step.action} onChange={e => {
                                            const newSteps = [...caseForm.steps];
                                            newSteps[idx].action = e.target.value;
                                            setCaseForm({ ...caseForm, steps: newSteps });
                                        }} />
                                        <input className="w-full border rounded p-2 text-sm" placeholder="Expected Result" value={step.expected_result} onChange={e => {
                                            const newSteps = [...caseForm.steps];
                                            newSteps[idx].expected_result = e.target.value;
                                            setCaseForm({ ...caseForm, steps: newSteps });
                                        }} />
                                    </div>
                                ))}
                                <button onClick={() => setCaseForm({ ...caseForm, steps: [...caseForm.steps, { action: '', expected_result: '' }] })} className="text-sm text-indigo-600 font-bold">+ Add Step</button>
                            </div>
                            <div className="flex justify-end pt-6">
                                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold" onClick={handleSaveCase}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View / Execute Modal (The "Open" view) */}
            {showViewModal && viewCase && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-5xl rounded-2xl h-[90vh] shadow-2xl flex flex-col overflow-hidden">
                        <div className="p-6 border-b bg-gray-50 dark:bg-gray-800 flex justify-between items-start shrink-0">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${viewCase.priority === 'High' ? 'bg-red-100 text-red-700' : viewCase.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                        {viewCase.priority}
                                    </span>
                                    <span className="text-xs text-gray-500 font-mono tracking-wider">TC-{viewCase.id?.substring(0, 8)}</span>
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{viewCase.title}</h2>
                            </div>
                            <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Test Execution</h3>

                            <div className="space-y-1">
                                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-gray-400 uppercase border-b">
                                    <div className="col-span-1">#</div>
                                    <div className="col-span-4">Action & Expectation</div>
                                    <div className="col-span-2">Expected Result</div>
                                    <div className="col-span-3">Actual Result (If Failed)</div>
                                    <div className="col-span-2">Status</div>
                                </div>

                                {viewCase.test_steps?.map((step, idx) => (
                                    <div key={step.id || idx} className="grid grid-cols-12 gap-4 items-center p-4 border-b hover:bg-gray-50 transition-colors">
                                        <div className="col-span-1 font-mono font-bold text-gray-400">{step.step_number}</div>
                                        <div className="col-span-4 font-medium text-gray-800 dark:text-gray-200">{step.action}</div>
                                        <div className="col-span-2 text-sm text-gray-500">{step.expected_result}</div>
                                        <div className="col-span-3">
                                            <input
                                                className="w-full border border-gray-200 dark:border-gray-700 rounded p-2 text-xs bg-white dark:bg-gray-800"
                                                placeholder="Describe actual result..."
                                                value={step.actual_result || ''}
                                                onChange={(e) => {
                                                    const updatedSteps = viewCase.test_steps.map(s =>
                                                        s.id === step.id ? { ...s, actual_result: e.target.value } : s
                                                    );
                                                    setViewCase({ ...viewCase, test_steps: updatedSteps });
                                                }}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <select
                                                className={`w-full text-xs font-bold uppercase p-2 rounded border focus:outline-none ${step.status === 'Passed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    step.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        step.status === 'Blocked' ? 'bg-gray-800 text-white border-gray-700' :
                                                            'bg-white text-gray-500 border-gray-200'
                                                    }`}
                                                value={step.status || 'Untested'}
                                                onChange={(e) => {
                                                    handleStepStatusChange(step.id, e.target.value);
                                                    if (e.target.value === 'Failed') openBugReport(step.id);
                                                }}
                                            >
                                                <option value="Untested">Not Run</option>
                                                <option value="Passed">Passed</option>
                                                <option value="Failed">Failed</option>
                                                <option value="Skipped">Skipped</option>
                                                <option value="Blocked">Blocked</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bug Report Modal (Enhanced from BugTracker) */}
            {showFailModal && (
                <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 mx-auto w-full max-w-3xl rounded-lg shadow-2xl flex flex-col max-h-[95vh] animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create Bug</h2>
                            <button
                                onClick={() => setShowFailModal(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleReportBug} className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select
                                            value={bugData.project}
                                            onChange={e => setBugData({ ...bugData, project: e.target.value })}
                                            className="w-full appearance-none rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 py-2.5 pl-3 pr-10 text-sm focus:ring-primary focus:border-primary outline-none"
                                        >
                                            <option>HRMS Software</option>
                                            <option>UHDMS Core</option>
                                            <option>Mobile App</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Issue Type <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select
                                            value={bugData.issueType}
                                            onChange={e => setBugData({ ...bugData, issueType: e.target.value })}
                                            className="w-full appearance-none rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 py-2.5 pl-10 pr-10 text-sm focus:ring-primary focus:border-primary outline-none"
                                        >
                                            <option>Bug</option>
                                            <option>Task</option>
                                            <option>Story</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-red-500">
                                            <span className="material-symbols-outlined text-[18px]">bug_report</span>
                                        </div>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100 dark:border-slate-800" />

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Summary <span className="text-red-500">*</span></label>
                                <input
                                    value={bugData.title}
                                    onChange={e => setBugData({ ...bugData, title: e.target.value })}
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 py-2.5 px-3 text-sm focus:ring-primary focus:border-primary outline-none"
                                    placeholder="Summary of the bug"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                                <textarea
                                    value={bugData.description}
                                    onChange={e => setBugData({ ...bugData, description: e.target.value })}
                                    className="w-full min-h-[120px] rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 py-3 px-4 text-sm focus:ring-primary focus:border-primary outline-none"
                                    placeholder="Describe the bug..."
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</label>
                                    <div className="relative">
                                        <select
                                            value={bugData.priority}
                                            onChange={e => setBugData({ ...bugData, priority: e.target.value })}
                                            className="w-full appearance-none rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 py-2.5 pl-3 pr-10 text-sm focus:ring-primary focus:border-primary outline-none"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                            <option>Highest</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Severity</label>
                                    <div className="relative">
                                        <select
                                            value={bugData.severity}
                                            onChange={e => setBugData({ ...bugData, severity: e.target.value })}
                                            className="w-full appearance-none rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 py-2.5 pl-3 pr-10 text-sm focus:ring-primary focus:border-primary outline-none"
                                        >
                                            <option>Trivial</option>
                                            <option>Minor</option>
                                            <option>Major</option>
                                            <option>Critical</option>
                                            <option>Blocker</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assignee</label>
                                    <div className="relative">
                                        <select
                                            value={bugData.assignee}
                                            onChange={e => setBugData({ ...bugData, assignee: e.target.value })}
                                            className="w-full appearance-none rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 py-2.5 pl-3 pr-10 text-sm focus:ring-primary focus:border-primary outline-none"
                                        >
                                            <option value="">Unassigned</option>
                                            {users.map(u => (
                                                <option key={u.id} value={`${u.first_name} ${u.last_name}`}>{u.first_name} {u.last_name}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Environment</label>
                                    <input
                                        value={bugData.environment}
                                        onChange={e => setBugData({ ...bugData, environment: e.target.value })}
                                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 py-2.5 px-3 text-sm focus:ring-primary focus:border-primary outline-none"
                                        placeholder="e.g. Production, iOS 15"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attachment</label>
                                <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50 text-center">
                                    <input
                                        type="file"
                                        onChange={e => setBugAttachment(e.target.files[0])}
                                        className="hidden"
                                        id="bug-attachment"
                                    />
                                    <label htmlFor="bug-attachment" className="cursor-pointer flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400">cloud_upload</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                            {bugAttachment ? bugAttachment.name : "Click to upload screenshot or log"}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowFailModal(false)}
                                    className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-opacity-90 shadow-sm transition-all"
                                >
                                    Create Defect
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestRepository;
