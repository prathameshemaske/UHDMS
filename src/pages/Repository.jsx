import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { testSuiteService } from '../services/testSuiteService';
import { testCaseService } from '../services/testCaseService';
import { testRunService } from '../services/testRunService';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';

const Repository = () => {
    const navigate = useNavigate();
    const { success, error: showError } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialSuiteId = searchParams.get('suite');

    const [suites, setSuites] = useState([]);
    const [selectedSuite, setSelectedSuite] = useState(null);
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [suiteStats, setSuiteStats] = useState({});

    // Selection & Copy State
    const [selectedCases, setSelectedCases] = useState([]);
    const [copyModal, setCopyModal] = useState({ open: false });

    // Search State (This is for the sidebar filter, not the main case search)
    const [sidebarSearchTerm, setSidebarSearchTerm] = useState('');

    useEffect(() => {
        fetchSuites();
        fetchAllStats();
        authService.getCurrentUser().then(setCurrentUser);
    }, []);

    // Sync URL with selection
    useEffect(() => {
        if (selectedSuite && selectedSuite.id !== 'unassigned') {
            setSearchParams({ suite: selectedSuite.id });
        } else if (selectedSuite && selectedSuite.id === 'unassigned') {
            setSearchParams({ suite: 'unassigned' });
        }
    }, [selectedSuite, setSearchParams]);

    useEffect(() => {
        if (selectedSuite) {
            fetchCases(selectedSuite.id);
        } else {
            setCases([]);
        }
        // Clear selection when changing folder
        setSelectedCases([]);
    }, [selectedSuite]);

    const fetchAllStats = async () => {
        const { data: allCases, error } = await supabase
            .from('test_cases')
            .select('suite_id, execution_status, bug_id');

        if (error || !allCases) {
            console.error("Error fetching all cases for stats:", error);
            return;
        }

        const stats = {};
        allCases.forEach(c => {
            const suitId = c.suite_id || 'unassigned';
            if (!stats[suitId]) {
                stats[suitId] = { total: 0, pass: 0, fail: 0, blocked: 0, bugs: 0 };
            }
            stats[suitId].total++;
            if (c.execution_status === 'Pass') stats[suitId].pass++;
            if (c.execution_status === 'Fail') stats[suitId].fail++;
            if (c.execution_status === 'Blocked') stats[suitId].blocked++;
            if (c.bug_id) stats[suitId].bugs++;
        });
        setSuiteStats(stats);
    };

    const fetchSuites = async () => {
        try {
            const data = await testSuiteService.getAll();
            setSuites(data);

            // Prioritize URL param, else default
            if (initialSuiteId) {
                if (initialSuiteId === 'unassigned') {
                    setSelectedSuite({ id: 'unassigned', title: 'Unassigned / General' });
                } else {
                    const found = data.find(s => s.id.toString() === initialSuiteId);
                    if (found) setSelectedSuite(found);
                    else if (data.length > 0) setSelectedSuite(data[0]);
                    else setSelectedSuite({ id: 'unassigned', title: 'Unassigned / General' });
                }
            } else {
                if (data.length > 0) setSelectedSuite(data[0]);
                else setSelectedSuite({ id: 'unassigned', title: 'Unassigned / General' });
            }
        } catch (error) {
            console.error("Failed to fetch suites:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCases = async (suiteId) => {
        try {
            let data;
            if (suiteId === 'unassigned') {
                const { data: unassignedCases, error } = await supabase
                    .from('test_cases')
                    .select('*')
                    .is('suite_id', null)
                    .order('created_at', { ascending: false });
                if (error) throw error;
                data = unassignedCases;
            } else {
                data = await testCaseService.getBySuiteId(suiteId);
            }
            setCases(data);
        } catch (error) {
            console.error("Failed to fetch cases:", error);
        }
    };

    const handleCreateSuite = async () => {
        const title = prompt("Enter new Suite/Folder name:");
        if (!title) return;

        try {
            const newSuite = await testSuiteService.create({ title });
            setSuites([...suites, newSuite]);
            setSelectedSuite(newSuite);
            fetchAllStats();
            success(`Folder "${title}" created successfully`);
        } catch (err) {
            showError("Failed to create suite: " + err.message);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // Select all visible cases (no filter anymore)
            setSelectedCases(cases.map(c => c.id));
        } else {
            setSelectedCases([]);
        }
    };

    const handleSelectCase = (e, id) => {
        e.stopPropagation();
        if (e.target.checked) {
            setSelectedCases([...selectedCases, id]);
        } else {
            setSelectedCases(selectedCases.filter(c => c !== id));
        }
    };

    const handleCopyCases = async (targetSuiteId) => {
        if (selectedCases.length === 0) return;

        try {
            const suiteId = targetSuiteId === 'unassigned' ? null : targetSuiteId;

            // Execute Copy for all selected
            await Promise.all(selectedCases.map(id => testCaseService.copy(id, suiteId)));

            // Refresh cases if staying in same suite, or let user know
            if (selectedSuite) {
                fetchCases(selectedSuite.id);
                fetchAllStats();
            }

            setCopyModal({ open: false });
            setSelectedCases([]);
            success(`Successfully copied ${selectedCases.length} test cases.`);
        } catch (err) {
            console.error("Failed to copy cases:", err);
            showError("Failed to copy some cases: " + err.message);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return 'text-red-700 bg-red-100 border-red-200';
            case 'High': return 'text-orange-700 bg-orange-100 border-orange-200';
            case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
            case 'Low': return 'text-blue-700 bg-blue-100 border-blue-200';
            default: return 'text-slate-500 bg-slate-100 border-slate-200';
        }
    };

    // Filtered suites for sidebar display
    const filteredSuites = suites.filter(s => s.title.toLowerCase().includes(sidebarSearchTerm.toLowerCase()));

    return (
        <div className="bg-[#f9fafb] dark:bg-[#111827] font-sans text-slate-900 dark:text-slate-100 antialiased h-screen overflow-hidden flex flex-col">
            <header className="flex h-16 items-center justify-between border-b border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 px-6 shrink-0 z-20">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-[#5048e5]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">UHDMS</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/">Dashboard</Link>
                        <Link className="text-[#5048e5] text-sm font-semibold border-b-2 border-[#5048e5] py-[22px]" to="/repository">Repository</Link>
                        <Link className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/test-suites">Test Cases</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex flex-1 overflow-hidden">
                <aside className="w-1/4 min-w-[300px] border-r border-[#E5E7EB] dark:border-slate-800 bg-[#F3F4F6] dark:bg-slate-900/50 flex flex-col hidden md:flex">
                    <div className="p-5">
                        <button onClick={handleCreateSuite} className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-[#E5E7EB] dark:border-slate-700 px-4 py-2.5 rounded-lg font-semibold text-sm hover:shadow-sm transition-all">
                            <span className="material-symbols-outlined text-[20px] text-[#5048e5]">create_new_folder</span>
                            Add Folder
                        </button>
                    </div>
                    <div className="px-5 mb-4">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                            <input
                                className="w-full bg-white/50 dark:bg-slate-800/50 border-[#E5E7EB] dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-[#5048e5] focus:border-[#5048e5] transition-all placeholder-slate-400 outline-none"
                                placeholder="Filter folders..."
                                type="text"
                                value={sidebarSearchTerm}
                                onChange={(e) => setSidebarSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1">
                        {loading ? (
                            <div className="text-center text-slate-400 text-sm py-4">Loading suites...</div>
                        ) : (
                            <>
                                <div
                                    onClick={() => setSelectedSuite({ id: 'unassigned', title: 'Unassigned / General' })}
                                    className={`flex flex-col gap-1 px-3 py-2 rounded-lg cursor-pointer transition-colors ${selectedSuite?.id === 'unassigned' ? 'bg-[#5048e5]/10 text-[#5048e5]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`material-symbols-outlined text-[20px] ${selectedSuite?.id === 'unassigned' ? 'text-[#5048e5]' : 'text-slate-400'}`}>folder_open</span>
                                        <span className="text-sm font-medium flex-1 truncate">Unassigned / General</span>
                                    </div>
                                    <div className="flex gap-2 ml-8 text-[10px] opacity-70">
                                        <span className="text-slate-500">{(suiteStats['unassigned']?.total || 0)} Cases</span>
                                        {suiteStats['unassigned']?.fail > 0 && <span className="text-red-500 font-bold">{suiteStats['unassigned']?.fail} Failed</span>}
                                    </div>
                                </div>

                                {filteredSuites.filter(s => s.id !== 'unassigned').map(suite => (
                                    <div
                                        key={suite.id}
                                        onClick={() => setSelectedSuite(suite)}
                                        className={`flex flex-col gap-1 px-3 py-2 rounded-lg cursor-pointer transition-colors ${selectedSuite?.id === suite.id ? 'bg-[#5048e5]/10 text-[#5048e5]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined text-[20px] ${selectedSuite?.id === suite.id ? 'text-[#5048e5]' : 'text-slate-400'}`}>folder</span>
                                            <span className="text-sm font-medium flex-1 truncate">{suite.title}</span>
                                        </div>
                                        <div className="flex gap-2 ml-8 text-[10px] opacity-70">
                                            <span className="text-slate-500">{(suiteStats[suite.id]?.total || 0)} Cases</span>
                                            {suiteStats[suite.id]?.pass > 0 && <span className="text-green-600">{suiteStats[suite.id]?.pass} Pass</span>}
                                            {suiteStats[suite.id]?.fail > 0 && <span className="text-red-500 font-bold">{suiteStats[suite.id]?.fail} Failed</span>}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </aside>
                <section className="flex-1 bg-white dark:bg-slate-900 flex flex-col min-w-0">
                    <div className="px-8 py-6 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">
                                <span>Repository</span>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <span className="text-slate-500">Suite</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedSuite ? selectedSuite.title : 'Select a Folder'}</h1>
                            {selectedSuite && (
                                <div className="flex gap-4 mt-2 text-xs font-semibold">
                                    <span className="text-slate-500">Total: {suiteStats[selectedSuite.id]?.total || 0}</span>
                                    <span className="text-green-600">Pass: {suiteStats[selectedSuite.id]?.pass || 0}</span>
                                    <span className="text-red-600">Fail: {suiteStats[selectedSuite.id]?.fail || 0}</span>
                                    <span className="text-orange-600">Blocked: {suiteStats[selectedSuite.id]?.blocked || 0}</span>
                                    <span className="text-slate-700">Bugs: {suiteStats[selectedSuite.id]?.bugs || 0}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            {selectedCases.length > 0 && (
                                <button
                                    onClick={() => setCopyModal({ open: true })}
                                    className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all"
                                >
                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                    Copy ({selectedCases.length})
                                </button>
                            )}

                            <Link
                                to={selectedSuite ? `/test-cases/create?suite=${selectedSuite.id}` : '#'}
                                className={`flex items-center justify-center gap-2 bg-[#5048e5] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md shadow-[#5048e5]/20 ${!selectedSuite ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                            >
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Create Test Case
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        {cases.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <span className="material-symbols-outlined text-5xl mb-3 text-slate-300">topic</span>
                                <p className="text-sm font-medium">
                                    No test cases in this folder.
                                </p>
                                {selectedSuite && <p className="text-xs">Click "Create Test Case" to add one.</p>}
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10 border-b border-[#E5E7EB] dark:border-slate-800">
                                    <tr>
                                        <th className="py-4 px-4 w-12 text-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                                                onChange={handleSelectAll}
                                                checked={cases.length > 0 && selectedCases.length === cases.length}
                                            />
                                        </th>
                                        <th className="py-4 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-24">ID</th>
                                        <th className="py-4 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Title</th>
                                        <th className="py-4 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-32">Priority</th>
                                        <th className="py-4 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-48">Execution Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E5E7EB] dark:divide-slate-800">
                                    {cases.map(tc => (
                                        <tr key={tc.id} onClick={() => navigate(`/test-cases/${tc.id}`)} className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors group ${selectedCases.includes(tc.id) ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                                            <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                                                    checked={selectedCases.includes(tc.id)}
                                                    onChange={(e) => handleSelectCase(e, tc.id)}
                                                />
                                            </td>
                                            <td className="py-4 px-4 text-sm font-mono text-slate-400">{tc.id.substring(0, 6)}...</td>
                                            <td className="py-4 px-4">
                                                <div className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{tc.title}</div>
                                                <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{tc.description || 'No description'}</div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2 py-1 text-[10px] font-bold rounded border ${getPriorityColor(tc.priority)}`}>{tc.priority || 'N/A'}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2 py-1 text-[10px] font-bold rounded border ${tc.execution_status === 'Pass' ? 'bg-green-100 text-green-700 border-green-200' :
                                                    tc.execution_status === 'Fail' ? 'bg-red-100 text-red-700 border-red-200' :
                                                        tc.execution_status === 'Blocked' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                            'bg-slate-100 text-slate-500 border-slate-200'
                                                    }`}>
                                                    {tc.execution_status || 'Not Run'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            </main>

            {/* Copy Modal */}
            {copyModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Copy Test Cases</h3>
                            <button onClick={() => setCopyModal({ open: false })} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Select the destination folder for the {selectedCases.length} selected cases.</p>

                        <div className="max-h-[300px] overflow-y-auto border border-slate-200 rounded-lg divide-y divide-slate-100">
                            <button
                                onClick={() => handleCopyCases('unassigned')}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium text-slate-700"
                            >
                                <span className="material-symbols-outlined text-slate-400">folder_open</span> Unassigned
                            </button>
                            {suites.filter(s => s.id !== 'unassigned').map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => handleCopyCases(s.id)}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium text-slate-700"
                                >
                                    <span className="material-symbols-outlined text-[#5048e5]">folder</span> {s.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Repository;
