import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Reports = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await authService.getAllProfiles();
                setEmployees(data || []);
            } catch (error) {
                console.error("Error fetching employees:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    // --- Data Aggregation ---

    // 1. Headcount by Department
    const deptData = useMemo(() => {
        const counts = {};
        employees.forEach(e => {
            const dept = e.department || 'Unassigned';
            counts[dept] = (counts[dept] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    }, [employees]);

    // 2. Location Distribution (Bar)
    const locationData = useMemo(() => {
        const counts = {};
        employees.forEach(e => {
            const loc = e.location || 'Unknown';
            counts[loc] = (counts[loc] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    }, [employees]);

    // 3. Employment Type (Donut)
    const typeData = useMemo(() => {
        const counts = {};
        employees.forEach(e => {
            const type = e.employment_type || 'Full-Time';
            counts[type] = (counts[type] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [employees]);

    // COLORS
    const COLORS = ['#5048e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const BAR_COLORS = ['#5048e5', '#6366f1', '#818cf8', '#a5b4fc'];

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
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                        </div>
                        <h2 className="text-gray-900 dark:text-white text-xl font-black leading-tight tracking-tight">UHDMS</h2>
                    </div>
                </div>
                <nav className="hidden xl:flex items-center gap-6">
                    <Link className="text-gray-600 dark:text-gray-300 text-sm font-semibold hover:text-[#5048e5] transition-colors" to="/employees">Directory</Link>
                    <Link className="text-gray-600 dark:text-gray-300 text-sm font-semibold hover:text-[#5048e5] transition-colors" to="/teams">Teams</Link>
                    <Link className="text-[#5048e5] text-sm font-bold border-b-2 border-[#5048e5] pb-0.5" to="/reports">Reports</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link to="/employees/add" className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#5048e5] text-white font-bold text-sm shadow-md hover:bg-[#5048e5]/90 transition-all">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Add Employee
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-6 lg:px-20 py-8">
                <div className="max-w-[1400px] mx-auto">
                    {/* Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Workforce Analytics</h1>
                        <p className="text-gray-500 dark:text-gray-400">Real-time insights into your organization structure.</p>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Employees</p>
                            <p className="text-4xl font-black text-gray-900 dark:text-white">{employees.length}</p>
                            <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full mt-2 inline-block">+12% vs last month</span>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Departments</p>
                            <p className="text-4xl font-black text-gray-900 dark:text-white">{deptData.length}</p>
                            <span className="text-xs font-semibold text-gray-400 mt-2 inline-block">Across organization</span>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Office Locations</p>
                            <p className="text-4xl font-black text-gray-900 dark:text-white">{locationData.length}</p>
                            <span className="text-xs font-semibold text-gray-400 mt-2 inline-block">Global presence</span>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Full-Time Ratio</p>
                            <p className="text-4xl font-black text-gray-900 dark:text-white">
                                {Math.round((typeData.find(t => t.name === 'Full-Time')?.value || 0) / (employees.length || 1) * 100)}%
                            </p>
                            <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-full mt-2 inline-block">Core workforce</span>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* 1. Headcount by Department (Pie) */}
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Headcount by Department</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={deptData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {deptData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 2. Employment Type (Donut / Bar) */}
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Employment Type Distribution</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={typeData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                            cursor={{ fill: 'transparent' }}
                                        />
                                        <Bar dataKey="value" fill="#5048e5" radius={[0, 4, 4, 0]} barSize={20}>
                                            {typeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 3. Location (Bar) */}
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 lg:col-span-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Employee Distribution by Location</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={locationData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                            cursor={{ fill: '#F3F4F6' }}
                                        />
                                        <Bar dataKey="value" fill="#5048e5" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Reports;
