import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { supabase } from '../../supabaseClient';

const TaskDetailModal = ({ isOpen, onClose, task, isCreateMode, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'to do',
        priority: 'Medium',
        project: 'General',
        due_date: ''
    });
    const [loading, setLoading] = useState(false);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const data = await authService.getAllProfiles();
                setProfiles(data || []);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };
        fetchProfiles();
    }, []);

    useEffect(() => {
        if (isOpen) {
            if (task && !isCreateMode) {
                setFormData({
                    title: task.title || '',
                    description: task.description || '',
                    status: task.status || 'pending',
                    priority: task.priority || 'Medium',
                    project: task.project || 'General',
                    due_date: task.due_date ? task.due_date.split('T')[0] : '',
                    assignee_id: task.assignee_id || ''
                });
            } else {
                // Reset for create mode
                // Fetch user to set default if needed, or just leave empty
                // We'll leave assignee empty unless required
                setFormData({
                    title: '',
                    description: '',
                    status: 'to do',
                    priority: 'Medium',
                    project: 'General',
                    due_date: '',
                    assignee_id: ''
                });
            }
        }
    }, [isOpen, task, isCreateMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        // Validation
        if (!formData.title || !formData.title.trim()) {
            alert("Title is required");
            return;
        }
        if (!formData.description || !formData.description.trim()) {
            alert("Description is required");
            return;
        }
        if (!formData.project || !formData.project.trim()) {
            alert("Project is required");
            return;
        }
        if (!formData.due_date) {
            alert("Due Date is required");
            return;
        }

        try {
            setLoading(true);
            const user = await authService.getCurrentUser();

            const payload = {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                priority: formData.priority,
                project: formData.project,
                due_date: formData.due_date,
                assignee_id: formData.assignee_id || null
            };

            // Use taskService to ensure notifications are triggered
            if (isCreateMode) {
                // Insert
                await import('../../services/taskService').then(({ taskService }) =>
                    taskService.createTask(payload)
                );
            } else {
                // Update
                await import('../../services/taskService').then(({ taskService }) =>
                    taskService.updateTask(task.id, payload)
                );
            }

            if (onSave) onSave();
            onClose();

        } catch (error) {
            console.error("Error saving task:", error);
            alert(`Failed to save task: ${error.message || JSON.stringify(error)}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 dark:bg-black/60 min-h-screen flex items-center justify-center p-4 md:p-10 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Container */}
            <div className="bg-white dark:bg-[#121121] w-full max-w-6xl h-full max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="h-14 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <span className="hover:text-[#5048e5] cursor-pointer">Tasks</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-slate-900 dark:text-white font-semibold">{isCreateMode ? 'New Task' : 'Edit Task'}</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="bg-[#5048e5]/10 text-[#5048e5] rounded text-[11px] font-bold uppercase tracking-wider border-none focus:ring-0 py-1 pl-2 pr-8 cursor-pointer hover:bg-[#5048e5]/20 transition-colors"
                        >
                            <option value="pending">Pending</option>
                            <option value="to do">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-1.5 bg-[#5048e5] text-white text-sm font-semibold rounded hover:bg-[#5048e5]/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors ml-2">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Main Content (Left) */}
                    <div className="w-[60%] flex flex-col overflow-y-auto custom-scrollbar border-r border-slate-100 dark:border-slate-800">
                        <div className="p-8 space-y-8">
                            <div>
                                <textarea
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full text-3xl font-black text-slate-900 dark:text-white bg-transparent border-none focus:ring-0 resize-none p-0 leading-tight placeholder-slate-300"
                                    placeholder="Task Title"
                                    rows="1"
                                ></textarea>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-sm">description</span>
                                    Description
                                </div>
                                <div className="border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden h-64">
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full h-full p-4 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-0 resize-none"
                                        placeholder="Add task description..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Sidebar (Right) */}
                    <aside className="w-[40%] bg-slate-50/50 dark:bg-slate-900/10 overflow-y-auto custom-scrollbar">
                        <div className="p-8 space-y-8">
                            <div className="space-y-6">
                                {/* Assignee Dropdown */}
                                <div className="grid grid-cols-3 items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignee</span>
                                    <div className="col-span-2">
                                        <select
                                            name="assignee_id"
                                            value={formData.assignee_id || ''}
                                            onChange={handleChange}
                                            className="w-full bg-white dark:bg-slate-800 border-none rounded-md px-2 py-1 text-sm font-medium text-slate-900 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-slate-700"
                                        >
                                            <option value="">Unassigned</option>
                                            {profiles.map(p => (
                                                <option key={p.id} value={p.id}>
                                                    {p.first_name} {p.last_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</span>
                                    <div className="col-span-2">
                                        <input
                                            name="project"
                                            value={formData.project}
                                            onChange={handleChange}
                                            className="w-full bg-white dark:bg-slate-800 border-none rounded-md px-2 py-1 text-sm font-medium text-slate-900 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-slate-700"
                                            placeholder="Project Name"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</span>
                                    <div className="col-span-2">
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            className="w-full bg-white dark:bg-slate-800 border-none rounded-md px-2 py-1 text-sm font-medium text-slate-900 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-slate-700"
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Highest">Highest</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</span>
                                    <div className="col-span-2">
                                        <input
                                            type="date"
                                            name="due_date"
                                            value={formData.due_date}
                                            onChange={handleChange}
                                            className="w-full bg-white dark:bg-slate-800 border-none rounded-md px-2 py-1 text-sm font-medium text-slate-900 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-slate-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;
