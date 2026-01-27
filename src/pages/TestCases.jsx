import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { testCaseService } from '../services/testCaseService';

const TestCases = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState([]);
    const [filteredCases, setFilteredCases] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterCases();
    }, [cases, searchQuery, statusFilter, priorityFilter]);

    const loadData = async () => {
        try {
            const data = await testCaseService.getAll();
            setCases(data || []);
        } catch (error) {
            console.error("Failed to load test cases", error);
        } finally {
            setLoading(false);
        }
    };

    const filterCases = () => {
        let result = [...cases];

        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(lowerQ) ||
                String(c.id).includes(lowerQ)
            );
        }

        if (statusFilter !== 'All') {
            result = result.filter(c => c.status === statusFilter);
        }

        if (priorityFilter !== 'All') {
            result = result.filter(c => c.priority === priorityFilter);
        }

        setFilteredCases(result);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-600 bg-red-50 border-red-100';
            case 'Critical': return 'text-red-700 bg-red-100 border-red-200 font-bold';
            case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-100';
            case 'Low': return 'text-blue-600 bg-blue-50 border-blue-100';
            default: return 'text-slate-500 bg-slate-50 border-slate-100';
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pass':
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Pass</span>;
            case 'Fail':
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Fail</span>;
            case 'Blocked':
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Blocked</span>;
            default:
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">Not Run</span>;
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#f6f6f8] dark:bg-[#121121] font-display text-slate-900 dark:text-slate-100">
            {/* Header */}
            <header className="h-16 flex items-center justify-between px-8 border-b border-[#e8e8f3] dark:border-[#2a293d] bg-white dark:bg-[#1a192d] shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#545095] text-sm font-medium">
                        <span>QA</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-[#0f0e1b] dark:text-white">All Test Cases</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input
                            className="pl-10 pr-4 py-1.5 bg-[#f6f6f8] dark:bg-[#252440] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#5048e5] w-64 placeholder-slate-400 outline-none transition-all"
                            placeholder="Search cases..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-[#f6f6f8] dark:bg-[#252440] border-none rounded-lg text-xs px-3 py-1.5 outline-none font-medium"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Not Run">Not Run</option>
                        <option value="Pass">Pass</option>
                        <option value="Fail">Fail</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                    <select
                        className="bg-[#f6f6f8] dark:bg-[#252440] border-none rounded-lg text-xs px-3 py-1.5 outline-none font-medium"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="All">All Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>

                    <Link to="/test-cases/create" className="bg-[#5048e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined">add</span> Create Case
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-auto p-8">
                {loading ? (
                    <div className="flex items-center justify-center h-40 text-slate-400">Loading cases...</div>
                ) : (
                    <div className="bg-white dark:bg-[#1a192d] rounded-xl border border-[#e8e8f3] dark:border-[#2a293d] shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-[#252440]/50 border-b border-[#e8e8f3] dark:border-[#2a293d] text-xs uppercase tracking-wider text-slate-500">
                                    <th className="px-6 py-4 font-bold w-20">ID</th>
                                    <th className="px-6 py-4 font-bold">Title</th>
                                    <th className="px-6 py-4 font-bold">Priority</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold text-right">Updated</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8e8f3] dark:divide-[#2a293d]">
                                {filteredCases.map(tc => (
                                    <tr
                                        key={tc.id}
                                        onClick={() => navigate(`/test-cases/${tc.id}`)}
                                        className="hover:bg-slate-50 dark:hover:bg-[#252440]/30 cursor-pointer transition-colors group"
                                    >
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">#{tc.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{tc.title}</div>
                                            {tc.pre_conditions && <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{tc.pre_conditions}</div>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-[10px] font-bold rounded border ${getPriorityColor(tc.priority)}`}>
                                                {tc.priority || 'Medium'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(tc.status)}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400 text-right">
                                            {new Date(tc.updated_at || tc.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {filteredCases.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">
                                            No test cases found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TestCases;
