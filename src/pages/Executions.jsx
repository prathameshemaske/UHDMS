import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Executions = () => {
    // Mock Step Data with State
    const [steps, setSteps] = useState([
        {
            id: 1,
            action: 'Enter test_user@example.com in the email field.',
            expected: 'Email field accepts input and shows no errors.',
            result: 'pass' // 'pass', 'fail', 'block', null
        },
        {
            id: 2,
            action: 'Enter the valid password and click "Login".',
            expected: 'Application validates credentials against database.',
            result: 'fail'
        },
        {
            id: 3,
            action: 'Verify redirection to Dashboard.',
            expected: 'User is redirected to /dashboard.',
            result: null
        }
    ]);

    const handleStepResult = (id, result) => {
        setSteps(prev => prev.map(s => s.id === id ? { ...s, result } : s));
    };

    const getRowClass = (result) => {
        switch (result) {
            case 'pass': return 'bg-green-50/30 dark:bg-green-900/10';
            case 'fail': return 'bg-red-50/30 dark:bg-red-900/10';
            case 'block': return 'bg-orange-50/30 dark:bg-orange-900/10';
            default: return 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30';
        }
    };

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#121121] font-display text-slate-900 dark:text-slate-100 antialiased h-screen overflow-hidden flex flex-col">
            <header className="flex h-14 items-center justify-between border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121121] px-6 shrink-0 z-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-[#5048e5]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">UHDMS</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/">Dashboard</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-[#5048e5] transition-colors" to="/test-suites">Test Cases</Link>
                        <Link className="text-[#5048e5] text-sm font-semibold border-b-2 border-[#5048e5] py-4" to="/executions">Executions</Link>
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
                    <div className="h-8 w-8 rounded-full bg-[#5048e5]/10 border border-[#5048e5]/20 flex items-center justify-center text-[#5048e5] font-bold text-xs">
                        JD
                    </div>
                </div>
            </header>
            <main className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex flex-col min-w-0 bg-[#f6f6f8] dark:bg-[#121121]/50">
                    <div className="bg-white dark:bg-[#121121] px-8 py-6 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <a className="hover:text-[#5048e5] transition-colors" href="#">Executions</a>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span>Active Session</span>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <span className="mt-1 px-2 py-0.5 bg-[#5048e5]/10 text-[#5048e5] font-mono font-bold text-sm rounded">TC-101</span>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">User Login with Valid Credentials</h1>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority:</span>
                                            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">High</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assignee:</span>
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">John Doe</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Environment</label>
                                <div className="relative min-w-[200px]">
                                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-3 pr-10 text-sm font-medium focus:ring-[#5048e5] focus:border-[#5048e5] transition-all appearance-none outline-none">
                                        <option defaultValue>QA-Build-V1.2</option>
                                        <option>Staging-Main</option>
                                        <option>Prod-Mirror</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                        <div className="bg-white dark:bg-[#121121] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase w-20 text-center">Step #</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase">Action</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase">Expected Result</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase w-64 text-center">Result</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {steps.map((step) => (
                                        <tr key={step.id} className={`transition-colors ${getRowClass(step.result)}`}>
                                            <td className="py-6 px-6 text-sm font-bold text-slate-400 text-center align-top">{step.id}</td>
                                            <td className="py-6 px-6 text-sm text-slate-700 dark:text-slate-300 align-top">
                                                {step.id === 1 && <>Enter <span className="bg-[#5048e5]/5 text-[#5048e5] px-1.5 py-0.5 rounded font-mono text-xs">test_user@example.com</span> in the email field.</>}
                                                {step.id === 2 && <>Enter the valid password and click <span className="italic font-medium text-slate-900 dark:text-white">"Login"</span>.</>}
                                                {step.id === 3 && <>Verify redirection to Dashboard.</>}
                                            </td>
                                            <td className="py-6 px-6 text-sm text-slate-600 dark:text-slate-400 align-top">
                                                {step.expected}
                                            </td>
                                            <td className="py-6 px-6 align-top">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        onClick={() => handleStepResult(step.id, 'pass')}
                                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all ${step.result === 'pass' ? 'bg-green-500 text-white' : 'border border-slate-200 dark:border-slate-700 hover:bg-green-50 dark:hover:bg-green-900/20 text-slate-400 hover:text-green-500'}`}
                                                    >
                                                        {step.result === 'pass' && <span className="material-symbols-outlined text-[16px]">check_circle</span>} Pass
                                                    </button>
                                                    <button
                                                        onClick={() => handleStepResult(step.id, 'fail')}
                                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all ${step.result === 'fail' ? 'bg-red-500 text-white' : 'border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500'}`}
                                                    >
                                                        {step.result === 'fail' && <span className="material-symbols-outlined text-[16px]">cancel</span>} Fail
                                                    </button>
                                                    <button
                                                        onClick={() => handleStepResult(step.id, 'block')}
                                                        className={`px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-slate-400 hover:text-orange-500 rounded-lg text-xs font-bold transition-all ${step.result === 'block' ? 'bg-orange-500 text-white border-none' : ''}`}
                                                    >
                                                        Block
                                                    </button>
                                                </div>
                                                {step.result === 'fail' && (
                                                    <div className="mt-3 flex justify-center">
                                                        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#5048e5] text-white rounded-lg text-xs font-bold hover:bg-[#5048e5]/90 transition-all shadow-md">
                                                            <span className="material-symbols-outlined text-[16px]">bug_report</span> Log Bug
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="px-8 py-4 bg-white dark:bg-[#121121] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                            <span className="material-symbols-outlined">close</span>
                            Discard Run
                        </button>
                        <div className="flex items-center gap-3">
                            <button className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Save Progress</button>
                            <button className="px-8 py-2 bg-[#5048e5] text-white rounded-lg font-bold text-sm hover:bg-[#5048e5]/90 transition-all shadow-lg shadow-[#5048e5]/20">Complete Execution</button>
                        </div>
                    </div>
                </div>
                <aside className="w-[320px] bg-white dark:bg-[#121121] border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#5048e5] text-[20px]">history</span>
                            Run History
                        </h3>
                        <button className="text-[11px] font-bold text-[#5048e5] hover:underline uppercase">View All</button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        <div className="space-y-6 relative timeline-line">
                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1 size-[16px] rounded-full border-2 border-green-500 bg-white dark:bg-[#121121] z-10"></div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">Oct 23, 2023</span>
                                        <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-[10px] font-bold uppercase">Pass</span>
                                    </div>
                                    <span className="text-[11px] text-slate-500">Environment: QA-Build-V1.1</span>
                                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                        <span className="material-symbols-outlined text-[14px]">person</span>
                                        Sarah Jenkins
                                    </div>
                                </div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1 size-[16px] rounded-full border-2 border-red-500 bg-white dark:bg-[#121121] z-10"></div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">Oct 21, 2023</span>
                                        <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-[10px] font-bold uppercase">Fail</span>
                                    </div>
                                    <span className="text-[11px] text-slate-500">Environment: Staging-Main</span>
                                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                        <span className="material-symbols-outlined text-[14px]">person</span>
                                        Mike Ross
                                    </div>
                                </div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1 size-[16px] rounded-full border-2 border-green-500 bg-white dark:bg-[#121121] z-10"></div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">Oct 18, 2023</span>
                                        <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-[10px] font-bold uppercase">Pass</span>
                                    </div>
                                    <span className="text-[11px] text-slate-500">Environment: QA-Build-V1.0</span>
                                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                        <span className="material-symbols-outlined text-[14px]">person</span>
                                        Sarah Jenkins
                                    </div>
                                </div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1 size-[16px] rounded-full border-2 border-slate-300 bg-white dark:bg-[#121121] z-10"></div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">Oct 15, 2023</span>
                                        <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[10px] font-bold uppercase">Not Run</span>
                                    </div>
                                    <span className="text-[11px] text-slate-500">Environment: Sandbox</span>
                                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                        <span className="material-symbols-outlined text-[14px]">person</span>
                                        System
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
                        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Historical Success Rate</h4>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">78%</span>
                            <span className="text-[11px] text-green-500 font-bold pb-1">+2% from last week</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full w-[78%]"></div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default Executions;
