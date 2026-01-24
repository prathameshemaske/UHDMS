import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const BugTracker = () => {
    const navigate = useNavigate();
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form data for creating a new bug
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'To Do',
        assignee: 'Jane Doe',
        severity: 'Major',
        project: 'HRMS Software',
        issueType: 'Bug',
        environment: ''
    });

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('bugs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBugs(data || []);
        } catch (error) {
            console.error('Error fetching bugs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title) return;

        try {
            // DB Schema only has title/description currently.
            // We omit other fields to prevent 'column not found' errors.
            const payload = {
                title: formData.title,
                description: formData.description,
                priority: formData.priority,
                status: formData.status,
                severity: formData.severity,
                project: formData.project,
                assignee: formData.assignee,
                issue_type: formData.issueType,
                environment: formData.environment,
                // Assign reporter as current user if available, handled by RLS/Supabase Auth usually or explicitly here
            };

            const { error } = await supabase.from('bugs').insert([payload]);
            if (error) throw error;

            setIsModalOpen(false);
            setFormData({
                title: '', description: '', priority: 'Medium', status: 'To Do',
                assignee: 'Jane Doe', severity: 'Major', project: 'HRMS Software', issueType: 'Bug', environment: ''
            });
            fetchBugs();
        } catch (error) {
            console.error('Error creating bug:', error);
            alert(`Failed to create bug: ${error.message || 'Unknown error'}`);
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'High': return <span className="material-symbols-outlined text-red-500" title="High">keyboard_double_arrow_up</span>;
            case 'Medium': return <span className="material-symbols-outlined text-orange-400" title="Medium">keyboard_arrow_up</span>;
            case 'Low': return <span className="material-symbols-outlined text-blue-400" title="Low">keyboard_arrow_down</span>;
            default: return <span className="material-symbols-outlined text-orange-400" title="Medium">keyboard_arrow_up</span>; // Default to Medium
        }
    };

    const getStatusPillClass = (status) => {
        switch (status) {
            case 'Done': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'; // Default Gray (To Do)
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#f6f6f8] dark:bg-[#121121] text-[#0f0e1b] dark:text-[#f9f8fb] font-display">
            {/* Top Nav */}
            <header className="h-16 flex items-center justify-between px-8 border-b border-[#e8e8f3] dark:border-[#2a293d] bg-white dark:bg-[#1a192d] shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#545095] text-sm font-medium">
                        <span>UHDMS</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span>Projects</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-[#0f0e1b] dark:text-white">Bug Tracker</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#545095] text-lg">search</span>
                        <input className="pl-10 pr-4 py-1.5 bg-[#f6f6f8] dark:bg-[#252440] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 placeholder-[#545095] outline-none transition-all" placeholder="Search issues..." type="text" />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                    >
                        <span className="material-symbols-outlined">add</span> Create Bug
                    </button>
                    <div className="flex gap-1">
                        <button className="p-2 hover:bg-[#f6f6f8] dark:hover:bg-[#252440] rounded-lg text-[#545095] transition-colors"><span className="material-symbols-outlined">notifications</span></button>
                        <button className="p-2 hover:bg-[#f6f6f8] dark:hover:bg-[#252440] rounded-lg text-[#545095] transition-colors"><span className="material-symbols-outlined">help</span></button>
                    </div>
                </div>
            </header>

            {/* Filters Bar */}
            <div className="p-4 border-b border-[#e8e8f3] dark:border-[#2a293d] bg-white dark:bg-[#1a192d] flex flex-wrap gap-2 items-center shrink-0">
                {['Status', 'Priority', 'Assignee', 'Severity'].map(filter => (
                    <button key={filter} className="flex items-center gap-2 px-3 py-1.5 bg-[#f6f6f8] dark:bg-[#252440] hover:bg-[#e8e8f3] rounded-lg text-xs font-medium transition-colors">
                        {filter}: <span className="text-primary">All</span>
                        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                    </button>
                ))}
                <div className="h-4 w-px bg-[#e8e8f3] mx-2"></div>
                <button className="text-primary text-xs font-medium hover:underline">Clear all</button>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Table Area */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-white dark:bg-[#1a192d] border-b border-[#e8e8f3] dark:border-[#2a293d] z-10">
                            <tr>
                                <th className="p-4 text-[11px] font-bold uppercase text-[#545095] dark:text-[#a19ec4] tracking-wider w-32">Key</th>
                                <th className="p-4 text-[11px] font-bold uppercase text-[#545095] dark:text-[#a19ec4] tracking-wider">Summary</th>
                                <th className="p-4 text-[11px] font-bold uppercase text-[#545095] dark:text-[#a19ec4] tracking-wider w-24">Priority</th>
                                <th className="p-4 text-[11px] font-bold uppercase text-[#545095] dark:text-[#a19ec4] tracking-wider w-32">Status</th>
                                <th className="p-4 text-[11px] font-bold uppercase text-[#545095] dark:text-[#a19ec4] tracking-wider w-40 hidden xl:table-cell">Reporter</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e8e8f3] dark:divide-[#2a293d]">
                            {loading ? (
                                <tr><td colSpan="5" className="p-12 text-center text-gray-400">Loading bugs...</td></tr>
                            ) : bugs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                                <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-[#0f0e1b] dark:text-white mb-1">No bugs found!</h3>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                bugs.map((bug) => (
                                    <tr
                                        key={bug.id}
                                        onClick={() => navigate(`/bugs/${bug.id}`)}
                                        className="cursor-pointer hover:bg-[#f6f6f8] dark:hover:bg-[#252440] border-l-4 border-transparent hover:border-primary transition-colors"
                                    >
                                        <td className="p-4 text-sm font-mono text-[#545095]">UHD-{bug.id.toString().slice(0, 4)}</td>
                                        <td className="p-4 text-sm font-medium">{bug.title}</td>
                                        <td className="p-4">{getPriorityIcon(bug.priority || 'Medium')}</td>
                                        <td className="p-4">
                                            <span className={`status-pill ${getStatusPillClass(bug.status || 'To Do')}`}>
                                                {bug.status || 'To Do'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[#545095] hidden xl:table-cell">Jane Doe</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Create Bug Modal Overlay (Full Page Override) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0e1b]/60 backdrop-blur-[2px] p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-lg shadow-2xl flex flex-col max-h-[95vh] animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create Bug</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Body - Scrollable */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select
                                            name="project"
                                            value={formData.project}
                                            onChange={handleInputChange}
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
                                            name="issueType"
                                            value={formData.issueType}
                                            onChange={handleInputChange}
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
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 py-2.5 px-3 text-sm focus:ring-primary focus:border-primary outline-none"
                                    placeholder="E.g. Profile picture not uploading"
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                                    <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-3 py-2 flex items-center gap-1">
                                        <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                                        <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                                        <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                                        <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">format_list_numbered</span></button>
                                        <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                                        <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">link</span></button>
                                        <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">image</span></button>
                                    </div>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full min-h-[120px] border-none focus:ring-0 text-sm py-3 px-4 dark:bg-slate-900 placeholder:text-slate-400 outline-none resize-y"
                                        placeholder="Describe the bug, steps to reproduce, and expected behavior..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</label>
                                    <div className="relative">
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleInputChange}
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
                                            name="severity"
                                            value={formData.severity}
                                            onChange={handleInputChange}
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

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Environment</label>
                                <input
                                    name="environment"
                                    value={formData.environment}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 py-2.5 px-3 text-sm focus:ring-primary focus:border-primary outline-none"
                                    placeholder="e.g. Production, iOS 15, Chrome 98"
                                    type="text"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attachments</label>
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                                    <span className="material-symbols-outlined text-slate-400 text-3xl">cloud_upload</span>
                                    <div className="text-center">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Drag and drop files here or <span class="text-primary font-bold">browse</span></p>
                                        <p className="text-[11px] text-slate-400 mt-1">Maximum size: 25MB (PNG, JPG, PDF, TXT)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions embedded in form for submit handling */}
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-opacity-90 shadow-sm transition-all"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BugTracker;
