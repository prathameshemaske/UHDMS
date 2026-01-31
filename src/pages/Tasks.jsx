import React, { useState, useEffect } from 'react';
import TaskDetailModal from '../components/tasks/TaskDetailModal';

import { taskService } from '../services/taskService';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';

const Tasks = () => {
    // View State
    const [view, setView] = useState('list'); // 'list', 'board', 'calendar', 'files'

    // Data State
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [filterType, setFilterType] = useState('assigned_to_me'); // 'assigned_to_me', 'assigned_by_me'
    const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
    const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());
    const [assignMenuOpen, setAssignMenuOpen] = useState(false); // Dropdown for assigning

    // Group Expansion State
    const [groups, setGroups] = useState({
        "Recently assigned": true,
        "To Do": true,
        "Doing": true,
        "Done": true
    });

    const [profiles, setProfiles] = useState([]);
    const { showToast } = useToast();

    useEffect(() => {
        const init = async () => {
            const user = await authService.getCurrentUser();
            setCurrentUser(user);
            await Promise.all([loadTasks(), loadProfiles()]);
        };
        init();
    }, []);

    const loadProfiles = async () => {
        try {
            const data = await authService.getAllProfiles();
            setProfiles(data || []);
        } catch (error) {
            console.error("Failed to load profiles", error);
        }
    };

    const loadTasks = async () => {
        try {
            const data = await taskService.getTasks();
            setTasks(data || []);
        } catch (error) {
            console.error("Failed to load tasks", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (task, newStatus) => {
        try {
            await taskService.updateTask(task.id, { status: newStatus });
            loadTasks();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleDelete = async (e, taskId) => {
        e.stopPropagation();
        if (window.confirm("Delete task?")) {
            await taskService.deleteTask(taskId);
            loadTasks();
        }
    };

    const handleBulkAssign = async (e, assigneeId) => {
        if (e) {
            e.stopPropagation();
        }
        setAssignMenuOpen(false); // Close immediately for better UX

        if (selectedTaskIds.size === 0) return;

        // Optimistic Update
        const updatedTasks = tasks.map(t =>
            selectedTaskIds.has(t.id) ? { ...t, assignee_id: assigneeId } : t
        );
        setTasks(updatedTasks);

        try {
            await taskService.bulkAssignTasks(Array.from(selectedTaskIds), assigneeId);
            showToast(`Assigned ${selectedTaskIds.size} tasks successfully`, 'success');
            setSelectedTaskIds(new Set());
            // loadTasks(); // Optional: Re-fetch ensuring consistency, but state is already updated
        } catch (error) {
            console.error("Failed to assign tasks", error);
            showToast("Failed to assign tasks", 'error');
            loadTasks(); // Revert on failure
        }
    };

    const toggleGroup = (group) => {
        setGroups(prev => ({ ...prev, [group]: !prev[group] }));
    };

    const toggleSelectTask = (e, taskId) => {
        e.stopPropagation();
        const newSelected = new Set(selectedTaskIds);
        if (newSelected.has(taskId)) {
            newSelected.delete(taskId);
        } else {
            newSelected.add(taskId);
        }
        setSelectedTaskIds(newSelected);
    };

    const toggleSelectAll = (e, sectionTasks) => {
        e.stopPropagation();
        const newSelected = new Set(selectedTaskIds);
        const allSectionIds = sectionTasks.map(t => t.id);
        const allSelected = allSectionIds.every(id => newSelected.has(id));

        if (allSelected) {
            allSectionIds.forEach(id => newSelected.delete(id));
        } else {
            allSectionIds.forEach(id => newSelected.add(id));
        }
        setSelectedTaskIds(newSelected);
    };

    // Organized Tasks
    const getTasksByStatus = (status) => {
        const normalize = (s) => s?.toLowerCase().replace('-', ' ') || '';
        return tasks.filter(t => {
            // Debug Log
            // console.log(`Task: ${t.title}, Status: ${t.status}, Assignee: ${t.assignee_id}, CurrentUser: ${currentUser?.id}`);

            // Context Filter
            if (currentUser && filterType !== 'all') {
                if (filterType === 'assigned_to_me' && t.assignee_id !== currentUser.id) return false;
                if (filterType === 'assigned_by_me' && t.reporter_id !== currentUser.id) return false;
            }

            const tStatus = normalize(t.status);
            if (status === 'Recently assigned') return tStatus === 'pending' || tStatus === 'new';
            if (status === 'To Do') return tStatus === 'to do';
            if (status === 'Doing') return tStatus === 'in progress' || tStatus === 'doing';
            if (status === 'Done') return tStatus === 'completed' || tStatus === 'done';

            console.warn(`Task ${t.title} has unmapped status: ${tStatus}`);
            return false;
        });
    };

    const SECTIONS = ["Recently assigned", "To Do", "Doing", "Done"];

    // --- Sub-components ---

    const ListView = () => (
        <div className="flex-1 overflow-y-auto pb-20">
            {/* List Header */}
            <div className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-500 sticky top-0 bg-white dark:bg-[#121121] z-10">
                <div className="w-10"></div>
                <div className="flex-1 pl-8">Name</div>
                <div className="w-32">Assignee</div>
                <div className="w-32">Due date</div>
                <div className="w-40">Projects</div>
                <div className="w-32">Status</div>
                <div className="w-10"></div>
            </div>

            {SECTIONS.map(section => {
                const sectionTasks = getTasksByStatus(section);
                return (
                    <div key={section} className="mt-4">
                        {/* Section Header */}
                        <div
                            className="flex items-center gap-2 px-4 py-2 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            onClick={() => toggleGroup(section)}
                        >
                            <span className={`material-symbols-outlined text-gray-400 text-lg transition-transform ${groups[section] ? 'rotate-0' : '-rotate-90'}`}>
                                arrow_drop_down
                            </span>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">{section}</h3>
                            <span className="text-xs text-gray-400 ml-2">{sectionTasks.length}</span>
                            {/* Section Checkbox (Select All for Section) */}
                            {groups[section] && sectionTasks.length > 0 && (
                                <div
                                    onClick={(e) => toggleSelectAll(e, sectionTasks)}
                                    className="ml-auto mr-4 size-5 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-[#5048e5] cursor-pointer"
                                >
                                    {sectionTasks.every(t => selectedTaskIds.has(t.id)) && <span className="material-symbols-outlined text-sm text-[#5048e5] font-bold">check</span>}
                                </div>
                            )}
                        </div>

                        {/* Tasks List */}
                        {groups[section] && (
                            <div className="border-t border-gray-100 dark:border-gray-800">
                                {sectionTasks.map(task => (
                                    <div
                                        key={task.id}
                                        onClick={() => { setSelectedTask(task); setIsModalOpen(true); }}
                                        className={`flex items-center px-4 py-2 group hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 cursor-pointer text-sm ${selectedTaskIds.has(task.id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                                    >
                                        <div className="w-10 flex items-center justify-center">
                                            <div
                                                onClick={(e) => toggleSelectTask(e, task.id)}
                                                className={`size-4 rounded border flex items-center justify-center transition-colors ${selectedTaskIds.has(task.id) ? 'bg-[#5048e5] border-[#5048e5]' : 'border-gray-300 dark:border-gray-600 hover:border-[#5048e5]'}`}
                                            >
                                                {selectedTaskIds.has(task.id) && <span className="material-symbols-outlined text-[10px] text-white font-bold">check</span>}
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center gap-3 pl-2 relative">
                                            {/* Completion Circle */}
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer z-10 
                                                    ${task.status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusChange(task, task.status === 'completed' ? 'pending' : 'completed');
                                                }}
                                            >
                                                {task.status === 'completed' && <span className="material-symbols-outlined text-[10px] font-bold">check</span>}
                                            </div>
                                            <span className={`${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'}`}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <div className="w-32 text-xs text-gray-500">
                                            {(() => {
                                                const assignee = profiles.find(p => p.id === task.assignee_id);
                                                return assignee ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-5 rounded-full bg-[#5048e5] text-white flex items-center justify-center text-[9px] font-bold">
                                                            {assignee.first_name?.[0]}{assignee.last_name?.[0]}
                                                        </div>
                                                        <span className="truncate max-w-[80px]">{assignee.first_name}</span>
                                                    </div>
                                                ) : <span className="text-gray-400 italic">Unassigned</span>;
                                            })()}
                                        </div>
                                        <div className="w-32 text-gray-500 text-xs">
                                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}
                                        </div>
                                        <div className="w-40">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium 
                                                ${section === 'Done' ? 'bg-green-100 text-green-700' :
                                                    section === 'Doing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                                Tasks Project
                                            </span>
                                        </div>
                                        <div className="w-32 text-xs text-gray-500 capitalize">{task.status}</div>
                                        <div className="w-10 flex justify-end opacity-0 group-hover:opacity-100">
                                            <button
                                                onClick={(e) => handleDelete(e, task.id)}
                                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-red-500"
                                            >
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {/* Inline Add Task */}
                                <div
                                    className="flex items-center px-4 py-2 pl-12 text-sm text-gray-400 hover:text-[#5048e5] cursor-pointer group"
                                    onClick={() => { setSelectedTask(null); setIsModalOpen(true); }}
                                >
                                    <span className="group-hover:block hidden text-xs font-semibold">Add task...</span>
                                    <span className="group-hover:hidden text-xs">Click to add task</span>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    const BoardView = () => (
        <div className="flex-1 overflow-x-auto overflow-y-hidden flex gap-6 px-6 pb-4">
            {SECTIONS.map(section => (
                <div key={section} className="w-80 flex-shrink-0 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3 font-bold text-gray-700 dark:text-gray-300">
                        <h3>{section}</h3>
                        <div className="flex gap-1">
                            <button className="text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined text-lg">add</span></button>
                            <button className="text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                        {getTasksByStatus(section).map(task => (
                            <div
                                key={task.id}
                                onClick={() => { setSelectedTask(task); setIsModalOpen(true); }}
                                className="bg-white dark:bg-[#1a192d] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-md transition-shadow group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer 
                                            ${task.status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStatusChange(task, task.status === 'completed' ? 'pending' : 'completed');
                                        }}
                                    >
                                        {task.status === 'completed' && <span className="material-symbols-outlined text-[10px] font-bold">check</span>}
                                    </div>
                                </div>
                                <h4 className={`text-sm font-medium mb-2 ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>{task.title}</h4>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                                    {task.due_date && (
                                        <div className="flex items-center text-xs text-gray-500">
                                            <span className="material-symbols-outlined text-sm mr-1">calendar_today</span>
                                            {new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    )}
                                    {(() => {
                                        const assignee = profiles.find(p => p.id === task.assignee_id);
                                        return assignee ? (
                                            <div className="size-6 bg-[#5048e5] rounded-full text-[10px] text-white flex items-center justify-center font-bold" title={`${assignee.first_name} ${assignee.last_name}`}>
                                                {assignee.first_name?.[0]}{assignee.last_name?.[0]}
                                            </div>
                                        ) : (
                                            <div className="size-6 bg-gray-200 dark:bg-gray-700 rounded-full text-[10px] text-gray-500 flex items-center justify-center" title="Unassigned">
                                                <span className="material-symbols-outlined text-sm">person_off</span>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => { setSelectedTask(null); setIsModalOpen(true); }}
                            className="w-full py-2 flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm font-medium"
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            Add task
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-[#121121] text-gray-900 dark:text-white font-sans overflow-hidden">
            <TaskDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={selectedTask}
                isCreateMode={!selectedTask}
                onSave={() => { loadTasks(); setIsModalOpen(false); }}
            />

            {/* Header Area */}
            <header className="px-6 py-4 flex flex-col gap-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <div className="relative">
                            <div
                                className="flex items-center gap-1 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded"
                                onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
                            >
                                <h1 className="text-xl font-bold">
                                    {filterType === 'assigned_to_me' ? 'Assigned to me' : filterType === 'assigned_by_me' ? 'Assigned by me' : 'All Tasks'}
                                </h1>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-gray-600">expand_more</span>
                            </div>

                            {isHeaderMenuOpen && (
                                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-[#1a192d] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 py-1">
                                    <button
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between ${filterType === 'assigned_to_me' ? 'text-[#5048e5] font-medium' : 'text-gray-700 dark:text-gray-200'}`}
                                        onClick={() => { setFilterType('assigned_to_me'); setIsHeaderMenuOpen(false); }}
                                    >
                                        <span>Assigned to me</span>
                                        {filterType === 'assigned_to_me' && <span className="material-symbols-outlined text-lg">check</span>}
                                    </button>
                                    <button
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between ${filterType === 'assigned_by_me' ? 'text-[#5048e5] font-medium' : 'text-gray-700 dark:text-gray-200'}`}
                                        onClick={() => { setFilterType('assigned_by_me'); setIsHeaderMenuOpen(false); }}
                                    >
                                        <span>Assigned by me</span>
                                        {filterType === 'assigned_by_me' && <span className="material-symbols-outlined text-lg">check</span>}
                                    </button>
                                    <button
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between ${filterType === 'all' ? 'text-[#5048e5] font-medium' : 'text-gray-700 dark:text-gray-200'}`}
                                        onClick={() => { setFilterType('all'); setIsHeaderMenuOpen(false); }}
                                    >
                                        <span>All Tasks</span>
                                        {filterType === 'all' && <span className="material-symbols-outlined text-lg">check</span>}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Second Row - Tabs & Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-transparent">
                        <button
                            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${view === 'list' ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white' : 'border-transparent hover:text-gray-700'}`}
                            onClick={() => setView('list')}
                        >
                            <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
                            List
                        </button>
                        <button
                            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${view === 'board' ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white' : 'border-transparent hover:text-gray-700'}`}
                            onClick={() => setView('board')}
                        >
                            <span className="material-symbols-outlined text-lg">dashboard</span>
                            Board
                        </button>

                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="bg-[#5048e5] hover:bg-[#4338ca] text-white text-sm font-medium px-3 py-1.5 rounded flex items-center gap-1 transition-colors"
                            onClick={() => { setSelectedTask(null); setIsModalOpen(true); }}
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            Add task
                        </button>
                    </div>
                </div>
            </header>

            {/* Bulk Action Bar - Sticky over content */}
            {selectedTaskIds.size > 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white rounded-full shadow-lg px-4 py-2 animate-in slide-in-from-bottom-5">
                    <div className="flex items-center gap-2 border-r border-gray-700 pr-3 mr-1">
                        <span className="font-bold text-sm bg-white text-black size-5 rounded-full flex items-center justify-center">
                            {selectedTaskIds.size}
                        </span>
                        <span className="text-sm font-medium">Selected</span>
                    </div>

                    {/* Assign Button with Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-1 px-3 py-1 hover:bg-gray-800 rounded-full transition-colors text-sm font-medium"
                            onClick={() => setAssignMenuOpen(!assignMenuOpen)}
                        >
                            <span className="material-symbols-outlined text-lg">person_add</span>
                            Assign to
                        </button>

                        {assignMenuOpen && (
                            <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-[#1a192d] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden animate-in zoom-in-95">
                                <div className="max-h-64 overflow-y-auto">
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 text-sm"
                                        onClick={(e) => handleBulkAssign(e, null)}
                                    >
                                        <div className="size-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                            <span className="material-symbols-outlined text-sm">person_off</span>
                                        </div>
                                        Unassign
                                    </button>
                                    {profiles.map(profile => (
                                        <button
                                            key={profile.id}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 text-sm"
                                            onClick={(e) => handleBulkAssign(e, profile.id)}
                                        >
                                            <div className="size-6 rounded-full bg-[#5048e5] text-white flex items-center justify-center text-[10px] font-bold">
                                                {profile.first_name?.[0]}{profile.last_name?.[0]}
                                            </div>
                                            <span className="truncate">{profile.first_name} {profile.last_name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="p-1.5 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white" title="Mark Complete">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                    </button>
                    <button className="p-1.5 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white" title="Move to Project">
                        <span className="material-symbols-outlined text-lg">folder</span>
                    </button>
                    <button className="p-1.5 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-red-400" title="Delete">
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                    <div className="border-l border-gray-700 h-6 mx-1"></div>
                    <button
                        className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                        onClick={() => setSelectedTaskIds(new Set())}
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>
            )}

            {/* Filter Bar (Conditional/Optional based on image, image shows it) */}
            <div className="px-6 py-2 border-b border-gray-200 dark:border-gray-800 flex items-center gap-4 text-xs font-medium text-gray-500 shrink-0">
                <button className="flex items-center gap-1 hover:text-gray-800"><span className="material-symbols-outlined text-sm">swap_vert</span> Sort</button>
                <div className="flex-1"></div>
            </div>

            {/* Content Area */}
            <main className="flex-1 overflow-hidden flex flex-col pt-2 bg-white dark:bg-[#121121] relative">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-gray-500">Loading tasks...</div>
                ) : (
                    <>
                        {view === 'list' && <ListView />}
                        {view === 'board' && <BoardView />}
                        {view === 'calendar' && (
                            <div className="flex items-center justify-center h-full text-gray-400 flex-col gap-4">
                                <span className="material-symbols-outlined text-6xl">calendar_month</span>
                                <p>Calendar View Coming Soon</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Tasks;
