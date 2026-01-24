import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testCaseService } from '../services/testCaseService';

const TestCases = () => {
    const [selectedCase, setSelectedCase] = useState(null);
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const data = await testCaseService.getAll();
                setCases(data || []);
                if (data && data.length > 0 && !selectedCase) {
                    setSelectedCase(data[0]); // Select first by default if nothing selected
                }
            } catch (error) {
                console.error("Failed to load test cases", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCases();
    }, []);

    const handleCreateSuite = async () => {
        // Simple prompt for now, could be a modal
        const title = prompt("Enter Test Suite/Case Title:");
        if (!title) return;

        try {
            const newCase = await testCaseService.create({
                title,
                status: 'Not Run',
                steps: []
            });
            setCases([...cases, newCase]);
            setSelectedCase(newCase);
        } catch (err) {
            console.error(err);
            alert("Failed to create test case");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pass':
                return (
                    <div className="flex items-center gap-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full w-fit">
                        <div className="size-1.5 rounded-full bg-green-500"></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Pass</span>
                    </div>
                );
            case 'Fail':
                return (
                    <div className="flex items-center gap-2 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full w-fit">
                        <div className="size-1.5 rounded-full bg-red-500"></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Fail</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full w-fit">
                        <div className="size-1.5 rounded-full bg-slate-400"></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Not Run</span>
                    </div>
                );
        }
    };

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#121121] font-display text-slate-900 dark:text-slate-100 antialiased h-screen overflow-hidden flex flex-col">
            {/* Top Nav Bar */}
            <header className="flex h-14 items-center justify-between border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121121] px-6 shrink-0">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-[#5048e5]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">UHDMS Platform</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/">Dashboard</Link>
                        <Link className="text-[#5048e5] text-sm font-semibold border-b-2 border-[#5048e5] py-4" to="/test-suites">Test Cases</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/executions">Executions</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/repository">Repository</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-[#5048e5]/10 border border-[#5048e5]/20 flex items-center justify-center text-[#5048e5] font-bold text-xs" data-alt="User avatar profile picture">
                        JD
                    </div>
                </div>
            </header>

            {/* Main Workspace Shell */}
            <main className="flex flex-1 overflow-hidden">
                {/* Left Pane: Folder Tree Navigation (20%) */}
                <aside className="w-1/5 min-w-[240px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121121] flex flex-col hidden md:flex">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <button className="w-full flex items-center justify-center gap-2 bg-[#5048e5] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5048e5]/90 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            New Suite
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                        <div className="mb-4">
                            <h3 className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Test Suites</h3>
                            <div className="space-y-1 mt-1">
                                <div className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
                                    <span className="material-symbols-outlined text-[20px]">folder</span>
                                    <span className="text-sm font-medium flex-1">All Suites</span>
                                    <span className="text-xs text-slate-400 hidden group-hover:block">124</span>
                                </div>
                                <div className="flex items-center gap-3 px-3 py-2 bg-[#5048e5]/10 text-[#5048e5] rounded-lg cursor-pointer">
                                    <span className="material-symbols-outlined text-[20px]">folder_open</span>
                                    <span className="text-sm font-semibold flex-1">Regression</span>
                                    <span className="text-xs font-bold">42</span>
                                </div>
                                <div className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
                                    <span className="material-symbols-outlined text-[20px]">folder</span>
                                    <span className="text-sm font-medium flex-1">Smoke</span>
                                    <span className="text-xs text-slate-400 hidden group-hover:block">12</span>
                                </div>
                                <div className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
                                    <span className="material-symbols-outlined text-[20px]">folder</span>
                                    <span className="text-sm font-medium flex-1">Sanity</span>
                                    <span className="text-xs text-slate-400 hidden group-hover:block">18</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Archive</h3>
                            <div className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer mt-1">
                                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                                <span className="text-sm font-medium">Archived Cases</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Middle Pane: Case List (40%) */}
                <section className="w-full md:w-2/5 min-w-[400px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121121] flex flex-col">
                    {/* Toolbar/Breadcrumb */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                        <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-2">
                            <span>UHDMS</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span>Test Suites</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-slate-900 dark:text-white font-medium">Regression</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold text-slate-900 dark:text-white">Regression Suite Cases</h1>
                            <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 font-medium">{cases.length} Cases</span>
                        </div>
                    </div>
                    {/* Search */}
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#121121]/50 shrink-0">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                            <input className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-[#5048e5] focus:border-[#5048e5] transition-all outline-none" placeholder="Search test cases..." type="text" />
                        </div>
                    </div>
                    {/* List View */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="py-2.5 px-4 text-[11px] font-bold text-slate-400 uppercase">ID</th>
                                    <th className="py-2.5 px-4 text-[11px] font-bold text-slate-400 uppercase">Title</th>
                                    <th className="py-2.5 px-4 text-[11px] font-bold text-slate-400 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {cases.map((tc) => (
                                    <tr
                                        key={tc.id}
                                        onClick={() => setSelectedCase(tc)}
                                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-l-4 ${selectedCase?.id === tc.id ? 'bg-[#5048e5]/5 border-l-[#5048e5]' : 'border-l-transparent'}`}
                                    >
                                        <td className="py-4 px-4 text-xs font-mono text-slate-500">{tc.id}</td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">{tc.title}</div>
                                            <div className="text-[11px] text-slate-500">Last updated {tc.updated}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            {getStatusBadge(tc.status)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Right Pane: Detailed Test Step Editor (40%) */}
                {selectedCase ? (
                    <section className="w-full md:w-2/5 min-w-[400px] bg-white dark:bg-[#121121] flex flex-col shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)] z-20">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-[#5048e5] px-1.5 py-0.5 bg-[#5048e5]/10 rounded">{selectedCase.id}</span>
                                    <span className="text-xs text-slate-400">• {selectedCase.priority || 'Medium'} Priority</span>
                                </div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedCase.title}</h2>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                                    <span className="material-symbols-outlined">edit</span>
                                </button>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>
                        {/* Editor Body */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                            {/* Pre-conditions */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-slate-400">info</span>
                                    Pre-conditions
                                </label>
                                <div className="relative group">
                                    <textarea
                                        className="w-full min-h-[100px] border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-sm p-4 focus:ring-1 focus:ring-[#5048e5] focus:border-[#5048e5] transition-all resize-none leading-relaxed outline-none"
                                        placeholder="e.g. User has an active account and is on the login landing page."
                                        defaultValue={selectedCase.preConditions || "1. User must have a verified account in the staging database.\n2. The UHDMS application is accessible via standard HTTPS.\n3. No prior session cookies exist in the browser."}
                                    ></textarea>
                                </div>
                            </div>
                            {/* Test Steps Table */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px] text-slate-400">list_alt</span>
                                        Test Steps
                                    </label>
                                    <button className="text-xs text-[#5048e5] font-bold hover:underline flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">add</span>
                                        Add Step
                                    </button>
                                </div>
                                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                            <tr>
                                                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase w-12 text-center">#</th>
                                                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase">Action</th>
                                                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase">Expected Result</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {selectedCase.steps && selectedCase.steps.length > 0 ? selectedCase.steps.map((step) => (
                                                <tr key={step.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                    <td className="py-4 px-4 text-sm font-medium text-slate-400 text-center align-top">{step.id}</td>
                                                    <td className="py-4 px-4 text-sm text-slate-700 dark:text-slate-300 align-top">
                                                        {step.action}
                                                    </td>
                                                    <td className="py-4 px-4 text-sm text-slate-600 dark:text-slate-400 align-top">
                                                        {step.expected}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="3" className="p-4 text-center text-sm text-slate-500">No steps defined.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Footer Pane */}
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#121121] shrink-0">
                            <button className="w-full flex items-center justify-center gap-3 bg-[#5048e5] text-white py-4 rounded-xl font-bold text-base hover:bg-[#5048e5]/90 hover:scale-[1.01] transition-all shadow-lg shadow-[#5048e5]/20">
                                <span className="material-symbols-outlined">play_circle</span>
                                Execute Test
                            </button>
                            <p className="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">history</span>
                                Last executed by Sarah M. on Oct 24, 2023
                            </p>
                        </div>
                    </section>
                ) : (
                    <section className="w-full md:w-2/5 min-w-[400px] bg-white dark:bg-[#121121] flex flex-col items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-4xl mb-2">article</span>
                        <p>Select a test case to view details</p>
                    </section>
                )}
            </main>
        </div>
    );
};

export default TestCases;
