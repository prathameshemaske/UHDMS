import React, { useState, useEffect } from 'react';
import TaskDetailModal from '../components/tasks/TaskDetailModal';
import { taskService } from '../services/taskService';

const Tasks = () => {
    const [groups, setGroups] = useState({
        pending: true,
        inProgress: true,
        toDo: true,
        completed: false
    });

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

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
            await loadTasks(); // Refresh
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update task status");
        }
    };

    const handleDelete = async (e, taskId) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await taskService.deleteTask(taskId);
                await loadTasks();
            } catch (error) {
                console.error("Failed to delete task", error);
                alert("Failed to delete task");
            }
        }
    };

    const toggleGroup = (group) => {
        setGroups(prev => ({ ...prev, [group]: !prev[group] }));
    };

    const handleOpenModal = (task = null) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleTaskCreated = async () => {
        await loadTasks();
        setIsModalOpen(false);
    };

    // Filter tasks by status for display
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress' || t.status === 'In Progress');
    const toDoTasks = tasks.filter(t => t.status === 'to do' || t.status === 'To Do' || t.status === 'new');
    const completedTasks = tasks.filter(t => t.status === 'completed' || t.status === 'Done');

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#121121] text-slate-900 dark:text-slate-100 min-h-screen font-display flex h-screen overflow-hidden">
            <TaskDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={selectedTask}
                isCreateMode={!selectedTask}
                onSave={handleTaskCreated}
            />
            {/* Side Navigation - Kept from HTML for fidelity, though usually MainLayout handles this */}
            <aside className="w-64 border-r border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#121121] flex flex-col shrink-0 hidden md:flex">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-[#5048e5] size-8 rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">layers</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">UHDMS</span>
                    </div>
                    <nav className="space-y-1">
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="/dashboard">
                            <span className="material-symbols-outlined">grid_view</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#5048e5]/10 text-[#5048e5]" href="#">
                            <span className="material-symbols-outlined">folder</span>
                            <span className="text-sm font-medium">Projects</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="/my-tasks">
                            <span className="material-symbols-outlined">check_circle</span>
                            <span className="text-sm font-medium">My Tasks</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="/inbox">
                            <span className="material-symbols-outlined">mail</span>
                            <span className="text-sm font-medium">Inbox</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="/reports">
                            <span className="material-symbols-outlined">bar_chart</span>
                            <span className="text-sm font-medium">Reports</span>
                        </a>
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBp6-wXSB7cqKSaoLnzFNeB_X2svfANaECjqZkyrzmDx5U7pn-zxu6k9x6OWJKmvzXgzX1sqQ25DhjDcwfOICutglKsdSa3JVoQWAZyFS0Py7V4oMQvfY-AaUp-lmugAwKU7mB5AVfsf_aY9WA2PxFYQmFoVY0IUh_sVqJ5D3sFpaQdYFK-XBvQ7qwk6qZbUXrqxWKklNfN0NDkpHb6a_guZxcBtGmg9z6DaGVQ3dzZM4RNXOjr0Q7cG3-6lzcRiTXu0i6pzCioHJIT')" }}></div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold">User</span>
                            <span className="text-[10px] text-slate-500">Workspace Admin</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900/50">
                {/* Top Header */}
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-[#121121] shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <a className="hover:text-[#5048e5] transition-colors" href="#">UHDMS</a>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <a className="hover:text-[#5048e5] transition-colors" href="#">Projects</a>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-slate-900 dark:text-white">Project Alpha</span>
                        </div>
                    </div>
                    {/* Search - Simplification */}
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-slate-500 hover:text-[#5048e5] transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>
                </header>

                {/* Page Actions & View Toggle */}
                <div className="px-8 py-6 shrink-0">
                    <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">Project Tasks</h1>
                            <p className="text-slate-500 text-sm">Main workspace for the development team.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleOpenModal(null)}
                                className="flex items-center gap-2 px-4 py-2 bg-[#5048e5] text-white text-sm font-bold rounded-lg hover:bg-[#5048e5]/90 transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">add</span>
                                <span>Add Task</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Task List Table */}
                <div className="flex-1 overflow-y-auto px-8 pb-10">
                    <div className="w-full min-w-[700px]">
                        {/* Table Header */}
                        <div className="flex items-center px-4 py-2 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <div className="w-8"></div>
                            <div className="flex-1">Task Name</div>
                            <div className="w-32">Due Date</div>
                            <div className="w-32">Estimated Time</div>
                            <div className="w-32">Actions</div>
                        </div>

                        {loading ? (
                            <div className="p-8 text-center text-slate-500">Loading tasks...</div>
                        ) : (
                            <>
                                {/* PENDING */}
                                <div className="mt-4">
                                    <div onClick={() => toggleGroup('pending')} className="flex items-center gap-2 py-2 group cursor-pointer select-none">
                                        <span className={`material-symbols-outlined text-slate-400 group-hover:text-slate-600 transition-transform ${groups.pending ? '' : '-rotate-90'}`}>expand_more</span>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-amber-500 px-2 py-0.5 rounded-md text-[10px] font-black text-white uppercase">Pending</span>
                                            <span className="text-xs font-bold text-slate-400">{pendingTasks.length} Tasks</span>
                                        </div>
                                    </div>

                                    {groups.pending && (
                                        <div className="border-l-4 border-amber-500 ml-2 pl-2 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                                            {pendingTasks.map(task => (
                                                <div
                                                    key={task.id}
                                                    onClick={() => handleOpenModal(task)}
                                                    className="group flex items-center px-4 py-3 bg-white dark:bg-[#121121]/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all cursor-pointer"
                                                >
                                                    <div className="w-8" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            className="rounded border-slate-300 text-[#5048e5] cursor-pointer"
                                                            type="checkbox"
                                                            checked={false}
                                                            onChange={() => handleStatusChange(task, 'completed')}
                                                        />
                                                    </div>
                                                    <div className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-200">{task.title}</div>
                                                    <div className="w-32 flex items-center gap-2 text-xs text-slate-500">
                                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                                        <span>{new Date(task.due_date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="w-32 text-xs text-slate-500">{task.estimated_time || '-'}</div>
                                                    <div className="w-32 flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(task, 'to do'); }}
                                                            className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                                            title="Move to To Do"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDelete(e, task.id)}
                                                            className="p-1 hover:bg-red-100 rounded text-red-500"
                                                            title="Delete"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* TO DO */}
                                <div className="mt-8">
                                    <div onClick={() => toggleGroup('toDo')} className="flex items-center gap-2 py-2 group cursor-pointer select-none">
                                        <span className={`material-symbols-outlined text-slate-400 group-hover:text-slate-600 transition-transform ${groups.toDo ? '' : '-rotate-90'}`}>expand_more</span>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-slate-400 px-2 py-0.5 rounded-md text-[10px] font-black text-white uppercase">To Do</span>
                                            <span className="text-xs font-bold text-slate-400">{toDoTasks.length} Tasks</span>
                                        </div>
                                    </div>

                                    {groups.toDo && (
                                        <div className="border-l-4 border-slate-400 ml-2 pl-2 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                                            {toDoTasks.map(task => (
                                                <div
                                                    key={task.id}
                                                    onClick={() => handleOpenModal(task)}
                                                    className="group flex items-center px-4 py-3 bg-white dark:bg-[#121121]/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all cursor-pointer"
                                                >
                                                    <div className="w-8" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            className="rounded border-slate-300 text-[#5048e5] cursor-pointer"
                                                            type="checkbox"
                                                            checked={false}
                                                            onChange={() => handleStatusChange(task, 'completed')}
                                                        />
                                                    </div>
                                                    <div className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-200">{task.title}</div>
                                                    <div className="w-32 flex items-center gap-2 text-xs text-slate-500">
                                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                                        <span>{new Date(task.due_date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="w-32 text-xs text-slate-500">{task.estimated_time || '-'}</div>
                                                    <div className="w-32 flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(task, 'pending'); }}
                                                            className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                                            title="Move to Pending"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(task, 'in-progress'); }}
                                                            className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                                            title="Start Progress"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">play_arrow</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDelete(e, task.id)}
                                                            className="p-1 hover:bg-red-100 rounded text-red-500"
                                                            title="Delete"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Inline Add Task */}
                                            <div onClick={() => handleOpenModal()} className="flex items-center px-4 py-2 text-slate-400 hover:text-[#5048e5] transition-colors cursor-pointer group">
                                                <span className="material-symbols-outlined text-sm mr-2">add</span>
                                                <span className="text-xs font-semibold">Add New Task</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* IN PROGRESS */}
                                <div className="mt-8">
                                    <div onClick={() => toggleGroup('inProgress')} className="flex items-center gap-2 py-2 group cursor-pointer select-none">
                                        <span className={`material-symbols-outlined text-slate-400 group-hover:text-[#5048e5] transition-transform ${groups.inProgress ? '' : '-rotate-90'}`}>expand_more</span>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-[#5048e5] px-2 py-0.5 rounded-md text-[10px] font-black text-white uppercase">In Progress</span>
                                            <span className="text-xs font-bold text-slate-400">{inProgressTasks.length} Tasks</span>
                                        </div>
                                    </div>

                                    {groups.inProgress && (
                                        <div className="border-l-4 border-[#5048e5] ml-2 pl-2 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                                            {inProgressTasks.map(task => (
                                                <div
                                                    key={task.id}
                                                    onClick={() => handleOpenModal(task)}
                                                    className="group flex items-center px-4 py-3 bg-white dark:bg-[#121121]/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all cursor-pointer"
                                                >
                                                    <div className="w-8" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            className="rounded border-slate-300 text-[#5048e5] cursor-pointer"
                                                            type="checkbox"
                                                            checked={false}
                                                            onChange={() => handleStatusChange(task, 'completed')}
                                                        />
                                                    </div>
                                                    <div className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-200">{task.title}</div>
                                                    <div className="w-32 flex items-center gap-2 text-xs text-slate-500">
                                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                                        <span>{new Date(task.due_date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="w-32 text-xs text-slate-500">{task.estimated_time || '-'}</div>
                                                    <div className="w-32 flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(task, 'to do'); }}
                                                            className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                                            title="Move to To Do"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDelete(e, task.id)}
                                                            className="p-1 hover:bg-red-100 rounded text-red-500"
                                                            title="Delete"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* COMPLETED */}
                                <div className="mt-8 opacity-60">
                                    <div onClick={() => toggleGroup('completed')} className="flex items-center gap-2 py-2 group cursor-pointer select-none">
                                        <span className={`material-symbols-outlined text-slate-400 transition-transform ${groups.completed ? '' : '-rotate-90'}`}>chevron_right</span>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-emerald-500 px-2 py-0.5 rounded-md text-[10px] font-black text-white uppercase">Completed</span>
                                            <span className="text-xs font-bold text-slate-400">{completedTasks.length} Tasks</span>
                                        </div>
                                    </div>
                                    {groups.completed && (
                                        <div className="border-l-4 border-emerald-500 ml-2 pl-2 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                                            {completedTasks.map(task => (
                                                <div key={task.id} className="group flex items-center px-4 py-3 bg-white dark:bg-[#121121]/30 border border-transparent rounded-lg">
                                                    <div className="w-8">
                                                        <input
                                                            className="rounded border-slate-300 text-emerald-500 cursor-pointer"
                                                            type="checkbox"
                                                            checked={true}
                                                            onChange={() => handleStatusChange(task, 'in-progress')}
                                                        />
                                                    </div>
                                                    <div className="flex-1 text-sm font-medium text-slate-500 line-through">{task.title}</div>
                                                    <div className="w-32 flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(task, 'in-progress'); }}
                                                            className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                                            title="Move to In Progress"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDelete(e, task.id)}
                                                            className="p-1 hover:bg-red-100 rounded text-red-500"
                                                            title="Delete"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Tasks;
