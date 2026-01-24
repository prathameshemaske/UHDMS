import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CreateTestCase = () => {
    const { id } = useParams(); // Using id to determine if update mode, but mock data is static for now
    const [steps, setSteps] = useState([
        { id: 1, action: 'Navigate to the login page.', expected: 'Login form with email and password fields is displayed.', data: 'URL: /auth/login' },
        { id: 2, action: 'Enter credentials and click "Login".', expected: 'User is authenticated and redirected to dashboard.', data: 'user_standard / pass_123' },
        { id: 3, action: 'Verify user profile name in header.', expected: 'Header displays "Welcome, John Doe".', data: '--' },
    ]);

    const addStep = () => {
        setSteps([...steps, { id: steps.length + 1, action: '', expected: '', data: '' }]);
    };

    const removeStep = (id) => {
        setSteps(steps.filter(s => s.id !== id));
    };

    return (
        <div className="bg-white dark:bg-[#0f172a] font-sans text-slate-900 dark:text-slate-100 antialiased min-h-screen">
            <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Link className="hover:text-[#4F46E5] transition-colors" to="/repository">Regression</Link>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <a className="hover:text-[#4F46E5] transition-colors" href="#">Authentication</a>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="font-mono font-medium text-slate-900 dark:text-slate-300">TC-101</span>
                    </nav>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 group">
                            <input className="w-full text-3xl font-bold border-none p-0 focus:ring-0 bg-transparent text-slate-900 dark:text-white cursor-text hover:bg-slate-50 dark:hover:bg-slate-800 rounded px-2 -ml-2 transition-all" type="text" defaultValue="User Login with Valid Credentials" />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">share</span> Share
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-semibold hover:bg-[#4F46E5]/90 transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">save</span> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-8">
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
                        <div className="relative">
                            <select className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-[#4F46E5] focus:border-[#4F46E5] appearance-none py-2 px-3 pr-10 outline-none">
                                <option value="draft">Draft</option>
                                <option defaultValue selected>Ready</option>
                                <option value="deprecated">Deprecated</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Priority</label>
                        <div className="flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                            <button className="flex-1 py-1 text-xs font-bold rounded bg-red-50 text-red-600 dark:bg-red-900/30">P1</button>
                            <button className="flex-1 py-1 text-xs font-bold rounded text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700">P2</button>
                            <button className="flex-1 py-1 text-xs font-bold rounded text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700">P3</button>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assigned To</label>
                        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded-lg px-3">
                            <div className="size-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-indigo-600">SM</div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sarah Mitchell</span>
                            <button className="ml-auto text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Version</label>
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-lg flex items-center justify-between">
                            <span className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">v1.2</span>
                            <button className="text-[#4F46E5] text-[18px]"><span className="material-symbols-outlined">history</span></button>
                        </div>
                    </div>
                </section>
                <div className="space-y-10">
                    <section className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Preconditions</h3>
                            <div className="flex gap-2">
                                <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">format_bold</span>
                                </button>
                                <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                                </button>
                                <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">link</span>
                                </button>
                            </div>
                        </div>
                        <div className="min-h-[140px] w-full p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 leading-relaxed text-sm" contentEditable suppressContentEditableWarning>
                            <p className="mb-2">1. The user must have a valid registered account in the staging environment.</p>
                            <p className="mb-2">2. The application's authentication service must be reachable (check health status).</p>
                            <p>3. Clear browser cache and cookies or use an incognito window to ensure a fresh session.</p>
                            <p className="mt-4 text-slate-400 italic">Configure these setup instructions before starting the test execution.</p>
                        </div>
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
                                        <th className="w-12 px-4 py-3 text-[11px] font-bold text-slate-400 uppercase text-center"></th>
                                        <th className="w-16 px-4 py-3 text-[11px] font-bold text-slate-400 uppercase text-center">Step</th>
                                        <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase">Action</th>
                                        <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase">Expected Result</th>
                                        <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase">Test Data</th>
                                        <th className="w-12 px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {steps.map((step, index) => (
                                        <tr key={step.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <td className="px-4 py-4 text-center cursor-grab text-slate-300 group-hover:text-slate-400">
                                                <span className="material-symbols-outlined">drag_indicator</span>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-slate-500 text-center">{index + 1}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300" contentEditable suppressContentEditableWarning>{step.action}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400" contentEditable suppressContentEditableWarning>{step.expected}</td>
                                            <td className="px-4 py-4 text-sm font-mono text-[#4F46E5] bg-[#4F46E5]/5 rounded" contentEditable suppressContentEditableWarning>{step.data}</td>
                                            <td className="px-4 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => removeStep(step.id)} className="text-slate-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section className="space-y-4 pt-10 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400">history</span> Execution History
                            </h3>
                            <button className="text-sm font-semibold text-[#4F46E5] hover:underline">View All Runs</button>
                        </div>
                        <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-lg">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase">Result</th>
                                        <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase">Date Executed</th>
                                        <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase">Executed By</th>
                                        <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <tr>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                <span className="size-1.5 rounded-full bg-green-500"></span> PASS
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Oct 24, 2023 • 10:45 AM</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">SM</div>
                                                <span className="text-sm font-medium">Sarah Mitchell</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">1m 12s</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                                <span className="size-1.5 rounded-full bg-red-500"></span> FAIL
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Oct 23, 2023 • 03:20 PM</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">JD</div>
                                                <span className="text-sm font-medium">John Doe</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">45s</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
            <div className="fixed bottom-8 right-8">
                <button className="flex items-center gap-3 bg-[#4F46E5] text-white px-6 py-3.5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-[#4F46E5]/30">
                    <span className="material-symbols-outlined">play_circle</span>
                    Run Test Case
                </button>
            </div>
        </div>
    );
};

export default CreateTestCase;
