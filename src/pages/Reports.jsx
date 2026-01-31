import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { testService } from '../services/testService';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('hr'); // 'hr' or 'qa'
    const [testCases, setTestCases] = useState([]);

    useEffect(() => {
        const loadIds = async () => {
            try {
                const [emps, cases] = await Promise.all([
                    authService.getAllProfiles(),
                    testService.getAllCasesFlat()
                ]);
                setEmployees(emps || []);
                setTestCases(cases || []);
            } catch (error) {
                console.error("Error loading report data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadIds();
    }, []);

    // --- HR Data Aggregation ---
    const deptData = useMemo(() => {
        const counts = {};
        employees.forEach(e => {
            const dept = e.department || 'Unassigned';
            counts[dept] = (counts[dept] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    }, [employees]);

    const locationData = useMemo(() => {
        const counts = {};
        employees.forEach(e => {
            const loc = e.location || 'Unknown';
            counts[loc] = (counts[loc] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    }, [employees]);

    const typeData = useMemo(() => {
        const counts = {};
        employees.forEach(e => {
            const type = e.employment_type || 'Full-Time';
            counts[type] = (counts[type] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [employees]);

    // --- QA Data Aggregation ---
    const testStatusData = useMemo(() => {
        // Calculate status per case based on its steps
        const counts = { Passed: 0, Failed: 0, Blocked: 0, Untested: 0, 'In Progress': 0 };
        testCases.forEach(tc => {
            const steps = tc.test_steps || [];
            if (steps.length === 0) {
                counts.Untested++;
                return;
            }
            if (steps.some(s => s.status === 'Failed')) {
                counts.Failed++;
            } else if (steps.some(s => s.status === 'Blocked')) {
                counts.Blocked++;
            } else if (steps.every(s => s.status === 'Passed')) {
                counts.Passed++;
            } else if (steps.some(s => s.status)) {
                counts['In Progress']++;
            } else {
                counts.Untested++;
            }
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value })).filter(d => d.value > 0);
    }, [testCases]);

    const testPriorityData = useMemo(() => {
        const counts = {};
        testCases.forEach(tc => {
            const p = tc.priority || 'Medium';
            counts[p] = (counts[p] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [testCases]);

    const testTypeData = useMemo(() => {
        const counts = {};
        testCases.forEach(tc => {
            const t = tc.type || 'Functional';
            counts[t] = (counts[t] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [testCases]);

    // COLORS
    const COLORS = ['#5048e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const STATUS_COLORS = {
        Passed: '#10b981', Failed: '#ef4444', Blocked: '#6b7280',
        Untested: '#9ca3af', 'In Progress': '#3b82f6'
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f6f6f8] dark:bg-[#121121]">
                <p className="text-gray-500 font-medium">Loading reports...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-sans">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 lg:px-10 py-3 sticky top-0 z-30">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#5048e5]">
                        <div className="size-6">
                            <span className="material-symbols-outlined text-2xl">analytics</span>
                        </div>
                        <h2 className="text-gray-900 dark:text-white text-xl font-black leading-tight tracking-tight">Analytics</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('hr')}
                        className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'hr' ? 'bg-white dark:bg-gray-700 text-[#5048e5] shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        Workforce
                    </button>
                    <button
                        onClick={() => setActiveTab('qa')}
                        className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'qa' ? 'bg-white dark:bg-gray-700 text-[#5048e5] shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        Quality Assurance
                    </button>
                </div>
            </header>

            <main className="flex-1 px-6 lg:px-20 py-8">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header Text */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                            {activeTab === 'hr' ? 'Workforce Analytics' : 'Test Execution Report'}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {activeTab === 'hr' ? 'Real-time insights into your organization structure.' : 'Overview of test case execution, pass rates, and coverage.'}
                        </p>
                    </div>

                    {activeTab === 'hr' ? (
                        /* HR ANALYTICS CONTENT */
                        <div className="space-y-8 animate-in fade-in duration-300">
                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Employees</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white">{employees.length}</p>
                                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full mt-2 inline-block">+12% vs last month</span>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Departments</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white">{deptData.length}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Office Locations</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white">{locationData.length}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Full-Time Ratio</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white">
                                        {employees.length > 0 ? Math.round((typeData.find(t => t.name === 'Full-Time')?.value || 0) / employees.length * 100) : 0}%
                                    </p>
                                </div>
                            </div>

                            {/* HR Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Headcount by Department</h3>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={deptData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                                    {deptData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                                </Pie>
                                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Employment Type</h3>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={typeData} layout="vertical">
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} cursor={{ fill: 'transparent' }} />
                                                <Bar dataKey="value" fill="#5048e5" radius={[0, 4, 4, 0]} barSize={20} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* QA ANALYTICS CONTENT */
                        <div className="space-y-8 animate-in fade-in duration-300">
                            {/* QA KPI Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Test Cases</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white">{testCases.length}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Automated Ratio</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white">0%</p>
                                    <span className="text-xs font-semibold text-gray-400 mt-2 inline-block">Manual Testing Only</span>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Passing</p>
                                    <p className="text-4xl font-black text-emerald-500">
                                        {testCases.length > 0 ?
                                            Math.round((testStatusData.find(d => d.name === 'Passed')?.value || 0) / testCases.length * 100)
                                            : 0}%
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Critical Issues</p>
                                    <p className="text-4xl font-black text-red-500">
                                        {testCases.filter(c => c.priority === 'Critical').length}
                                    </p>
                                    <span className="text-xs font-semibold text-red-400 mt-2 inline-block">Test Cases marked Critical</span>
                                </div>
                            </div>

                            {/* QA Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Test Execution Status</h3>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={testStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                                                    {testStatusData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Test Cases by Priority</h3>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={testPriorityData} layout="vertical">
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} cursor={{ fill: 'transparent' }} />
                                                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 lg:col-span-2">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Test Distribution by Type</h3>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={testTypeData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} cursor={{ fill: '#F3F4F6' }} />
                                                <Bar dataKey="value" fill="#5048e5" radius={[4, 4, 0, 0]} barSize={50} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Reports;
