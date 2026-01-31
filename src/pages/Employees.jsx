import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Employees = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter State
    const [filters, setFilters] = useState({
        department: '',
        location: '',
        skill: ''
    });

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

    // Derived Unique Values for Dropdowns
    const uniqueDepartments = useMemo(() => [...new Set(employees.map(e => e.department).filter(Boolean))], [employees]);
    const uniqueLocations = useMemo(() => [...new Set(employees.map(e => e.location).filter(Boolean))], [employees]);
    const uniqueSkills = useMemo(() => {
        const allSkills = employees.flatMap(e => e.skills || []);
        return [...new Set(allSkills)];
    }, [employees]);

    // Filter Logic
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchesSearch = (
                (emp.first_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (emp.last_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (emp.job_title || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesDept = !filters.department || emp.department === filters.department;
            const matchesLoc = !filters.location || emp.location === filters.location;
            const matchesSkill = !filters.skill || (emp.skills && emp.skills.includes(filters.skill));

            return matchesSearch && matchesDept && matchesLoc && matchesSkill;
        });
    }, [employees, searchTerm, filters]);

    const activeFilterCount = Object.values(filters).filter(Boolean).length;

    const clearFilters = () => setFilters({ department: '', location: '', skill: '' });

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-white font-display">
            {/* TopNavBar - Custom Details Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 lg:px-10 py-3 sticky top-0 z-30">
                <div className="flex items-center gap-8 w-full max-w-4xl">
                    <div className="flex items-center gap-4 text-[#5048e5]">
                        <div className="size-6">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                        </div>
                        <h2 className="text-gray-900 dark:text-white text-xl font-black leading-tight tracking-tight">UHDMS</h2>
                    </div>
                    {/* Search Field */}
                    <div className="flex-1 max-w-xl">
                        <label className="relative flex items-center">
                            <span className="absolute left-3 text-gray-400 material-symbols-outlined">search</span>
                            <input
                                className="w-full h-10 pl-10 pr-4 rounded-lg border-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#5048e5]/50 text-sm outline-none"
                                placeholder="Search by name, role, or keyword..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="hidden xl:flex items-center gap-6">
                        <Link className="text-[#5048e5] text-sm font-bold border-b-2 border-[#5048e5] pb-0.5" to="/employees">Directory</Link>
                        <Link className="text-gray-600 dark:text-gray-300 text-sm font-semibold hover:text-[#5048e5] transition-colors" to="/teams">Teams</Link>
                        <Link className="text-gray-600 dark:text-gray-300 text-sm font-semibold hover:text-[#5048e5] transition-colors" to="/reports">Reports</Link>
                    </nav>
                    {/* Replaced Icons with Add Button as requested */}
                    <Link to="/onboarding?create=true" className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#5048e5] text-white font-bold text-sm shadow-md hover:bg-[#5048e5]/90 transition-all">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Add Employee
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-6 lg:px-20 py-8">
                <div className="max-w-[1400px] mx-auto">
                    {/* PageHeading */}
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">Employee Directory</p>
                            <p className="text-gray-500 dark:text-gray-400 text-base">Manage and connect with your hybrid workforce ({filteredEmployees.length} members)</p>
                        </div>
                    </div>

                    {/* ToolBar & Chips (Filters Row) */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-3 items-center">
                                <button
                                    onClick={activeFilterCount > 0 ? clearFilters : undefined}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider border transition-colors ${activeFilterCount > 0 ? 'bg-indigo-50 text-[#5048e5] border-[#5048e5]/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-transparent'}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">{activeFilterCount > 0 ? 'filter_alt_off' : 'tune'}</span>
                                    {activeFilterCount > 0 ? 'Clear' : 'Filters'}
                                </button>
                                <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2"></div>

                                {/* Filter Dropdowns */}
                                <div className="flex flex-wrap gap-3">
                                    {/* Department Filter */}
                                    <div className="relative group">
                                        <select
                                            className="appearance-none h-9 pl-4 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-300 outline-none hover:border-[#5048e5]/50 focus:border-[#5048e5] transition-colors cursor-pointer"
                                            value={filters.department}
                                            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                                        >
                                            <option value="">Department</option>
                                            {uniqueDepartments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 text-[20px]">expand_more</span>
                                        </div>
                                    </div>

                                    {/* Location Filter */}
                                    <div className="relative group">
                                        <select
                                            className="appearance-none h-9 pl-4 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-300 outline-none hover:border-[#5048e5]/50 focus:border-[#5048e5] transition-colors cursor-pointer"
                                            value={filters.location}
                                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                        >
                                            <option value="">Location</option>
                                            {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 text-[20px]">expand_more</span>
                                        </div>
                                    </div>

                                    {/* Skill Filter */}
                                    <div className="relative group">
                                        <select
                                            className="appearance-none h-9 pl-4 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-300 outline-none hover:border-[#5048e5]/50 focus:border-[#5048e5] transition-colors cursor-pointer"
                                            value={filters.skill}
                                            onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
                                        >
                                            <option value="">Skill Set</option>
                                            {uniqueSkills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 text-[20px]">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded-md shadow-sm ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-[#5048e5]' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <span className="material-symbols-outlined block">grid_view</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-md shadow-sm ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-[#5048e5]' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <span className="material-symbols-outlined block">list</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <p className="text-gray-500">Loading directory...</p>
                        </div>
                    ) : filteredEmployees.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No employees found matching your filters.</p>
                            <button onClick={clearFilters} className="text-[#5048e5] font-bold mt-2 hover:underline">Clear all filters</button>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredEmployees.map(emp => (
                                        <div key={emp.id} className="group relative flex flex-col items-center bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-[#5048e5]/20 transition-all">
                                            <div className="relative mb-4">
                                                <div className="size-24 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 border-gray-50 dark:border-gray-800" style={{ backgroundImage: `url("${emp.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                                                <div className="absolute bottom-1 right-1 size-5 rounded-full border-4 border-white dark:border-gray-900 bg-emerald-500" title="At Work"></div>
                                            </div>
                                            <div className="text-center mb-6">
                                                <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight">{emp.first_name} {emp.last_name}</p>
                                                <p className="text-[#5048e5] text-sm font-semibold mb-1">{emp.job_title || 'Employee'}</p>
                                                <div className="flex flex-wrap justify-center gap-1 mt-2">
                                                    {emp.department && <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{emp.department}</span>}
                                                    {emp.location && <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{emp.location}</span>}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 justify-end">
                                                <Link to={`/employees/${emp.id}`} className="flex items-center justify-center size-9 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#5048e5]/10 hover:text-[#5048e5] transition-colors" title="View Profile">
                                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                                </Link>
                                                <button className="flex items-center justify-center size-9 rounded-lg bg-[#5048e5]/10 text-[#5048e5] hover:bg-[#5048e5] hover:text-white transition-all" title="Send Message">
                                                    <Link to="/communication" className="flex items-center justify-center w-full h-full">
                                                        <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                                    <div className="table-container overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Employee</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Designation</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Department</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Location</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {filteredEmployees.map(emp => (
                                                    <tr key={emp.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-3">
                                                                <div className="size-10 bg-center bg-no-repeat bg-cover rounded-full border border-gray-200 dark:border-gray-700" style={{ backgroundImage: `url("${emp.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                                                                <span className="font-bold text-gray-900 dark:text-white">{emp.first_name} {emp.last_name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#5048e5]">{emp.job_title || 'Employee'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{emp.department || '-'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{emp.location || '-'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-2">
                                                                <span className="size-2 rounded-full bg-emerald-500"></span>
                                                                <span className="text-xs font-bold uppercase tracking-tight text-emerald-600 dark:text-emerald-400">Active</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Link to={`/employees/${emp.id}`} className="p-2 text-gray-400 hover:text-[#5048e5] transition-colors" title="View Profile">
                                                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                                                </Link>
                                                                <Link to="/communication" className="p-2 text-[#5048e5] hover:text-[#5048e5]/70 transition-colors" title="Send Message">
                                                                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
            <footer className="mt-auto py-6 text-center text-gray-500 dark:text-gray-400 text-xs border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                © 2024 UHDMS Platform. All rights reserved. Built for modern hybrid workflows.
            </footer>
        </div>
    );
};

export default Employees;
