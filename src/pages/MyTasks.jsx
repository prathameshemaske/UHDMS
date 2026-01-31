import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { taskService } from '../services/taskService';
import TaskDetailModal from '../components/tasks/TaskDetailModal';

const MyTasks = () => {
    const [groups, setGroups] = useState({
        pending: true,
        inProgress: true,
        toDo: true,
        completed: false
    });
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);

            // Use taskService to get tasks (it already filters/orders)
            const data = await taskService.getMyTasks();
            if (data) setTasks(data);
        } catch (error) {
            console.error("Failed to load tasks", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (task, newStatus) => {
        try {
            await taskService.updateTask(task.id, { status: newStatus });
            await loadData(); // Refresh list to reflect changes
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update task status");
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
        await loadData();
        setIsModalOpen(false);
    };

    const pendingTasks = tasks.filter(t => t.status === 'pending');
    const inProgressTasks = tasks.filter(t => ['in-progress', 'In Progress', 'inprogress'].includes(t.status));
    const toDoTasks = tasks.filter(t => ['to do', 'To Do', 'new', 'todo'].includes(t.status));
    const completedTasks = tasks.filter(t => ['completed', 'Done'].includes(t.status));

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display flex h-screen overflow-hidden">
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-primary size-8 rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">layers</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">UHDMS</span>
                    </div>
                    <nav className="space-y-1">
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/dashboard">
                            <span className="material-symbols-outlined">grid_view</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
                            <span className="material-symbols-outlined">folder</span>
                            <span className="text-sm font-medium">Projects</span>
                        </a>
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary" to="/my-tasks">
                            <span className="material-symbols-outlined">check_circle</span>
                            <span className="text-sm font-medium">My Tasks</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/inbox">
                            <span className="material-symbols-outlined">mail</span>
                            <span className="text-sm font-medium">Inbox</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/reports">
                            <span className="material-symbols-outlined">bar_chart</span>
                            <span className="text-sm font-medium">Reports</span>
                        </Link>
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center" style={{ backgroundImage: `url('${user?.avatar_url || 'https://via.placeholder.com/150'}')` }}></div>
                        <div className="flex flex-col text-left">
                            <span className="text-xs font-semibold">{user?.first_name || 'User'}</span>
                            <span className="text-[10px] text-slate-500">Personal View</span>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900/50">
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-background-dark shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <a className="hover:text-primary transition-colors" href="#">UHDMS</a>
                            <span className="material-symbols-outlined !text-xs">chevron_right</span>
                            <span className="text-slate-900 dark:text-white">My Tasks</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg">search</span>
                            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search my tasks..." type="text" />
                        </div>
                        <button className="size-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="size-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${user?.avatar_url || 'https://via.placeholder.com/150'}')` }}></div>
                    </div>
                </header>
                <div className="px-8 pt-8 pb-4">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">My Tasks</h1>
                            <p className="text-slate-500 text-sm">Managing assignments for {user?.first_name} across all active projects.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleOpenModal(null)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                                <span className="material-symbols-outlined !text-lg">add</span>
                                <span>New Task</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-primary text-white">In Progress</button>
                            <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Completed</button>
                            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
                            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary">
                                <span className="material-symbols-outlined !text-lg">tune</span>
                                Custom Filter
                            </button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <button className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-lg">sort</span> Sort
                            </button>
                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                <button className="px-3 py-1 bg-white dark:bg-slate-700 shadow-sm rounded-md text-primary font-semibold text-xs transition-all">List</button>
                                <button className="px-3 py-1 text-slate-500 font-medium text-xs">Calendar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-8 pb-10">
                    <div className="w-full">
                        <div className="flex items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            <div className="w-8"></div>
                            <div className="flex-[2]">Task Name</div>
                            <div className="flex-1">Project</div>
                            <div className="w-32">Priority</div>
                            <div className="w-32">Status</div>
                        </div>
                        {loading ? <div className="p-8 text-center text-slate-500">Loading tasks...</div> : (
                            <>
                                {/* PENDING - New Section */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 py-3 border-b border-slate-100 dark:border-slate-800 group cursor-pointer" onClick={() => toggleGroup('pending')}>
                                        <span className={`material-symbols-outlined text-amber-500 transition-transform ${groups.pending ? '' : '-rotate-90'}`}>expand_more</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">Pending</span>
                                        <span className="text-xs font-medium text-slate-400">{pendingTasks.length} tasks</span>
                                    </div>
                                    {groups.pending && (
                                        <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                            {pendingTasks.map(task => (
                                                <div key={task.id} onClick={() => handleOpenModal(task)} className="group flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer">
                                                    <div className="w-8" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            className="rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                                                            type="checkbox"
                                                            checked={false}
                                                            onChange={() => handleStatusChange(task, 'completed')}
                                                        />
                                                    </div>
                                                    <div className="flex-[2] flex flex-col">
                                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{task.title}</span>
                                                        <span className="text-xs text-slate-500 truncate max-w-[300px]">{task.description}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">{task.project || 'GENERAL'}</span>
                                                    </div>
                                                    <div className="w-32">
                                                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-500 uppercase">
                                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                            {task.priority || 'Medium'}
                                                        </span>
                                                    </div>
                                                    <div className="w-32 flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(task, 'to do'); }}
                                                            className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                                            title="Move to To Do"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); if (window.confirm('Delete?')) taskService.deleteTask(task.id).then(loadData); }}
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

                                <div className="mb-6">
                                    <div className="flex items-center gap-2 py-3 border-b border-slate-100 dark:border-slate-800 group cursor-pointer" onClick={() => toggleGroup('toDo')}>
                                        <span className={`material-symbols-outlined text-slate-400 transition-transform ${groups.toDo ? '' : '-rotate-90'}`}>expand_more</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">To Do</span>
                                        <span className="text-xs font-medium text-slate-400">{toDoTasks.length} tasks</span>
                                    </div>
                                    {groups.toDo && (
                                        <div>
                                            {toDoTasks.map(task => (
                                                <div key={task.id} onClick={() => handleOpenModal(task)} className="group flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer">
                                                    <div className="w-8" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            className="rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                                                            type="checkbox"
                                                            checked={false}
                                                            onChange={() => handleStatusChange(task, 'completed')}
                                                        />
                                                    </div>
                                                    <div className="flex-[2] flex flex-col">
                                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{task.title}</span>
                                                        <span className="text-xs text-slate-500 truncate max-w-[300px]">{task.description}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">{task.project || 'GENERAL'}</span>
                                                    </div>
                                                    <div className="w-32">
                                                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-500 uppercase">
                                                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                                            {task.priority || 'Medium'}
                                                        </span>
                                                    </div>
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
                                                            onClick={(e) => { e.stopPropagation(); if (window.confirm('Delete?')) taskService.deleteTask(task.id).then(loadData); }}
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

                                <div className="mb-6">
                                    <div className="flex items-center gap-2 py-3 border-b border-slate-100 dark:border-slate-800 group cursor-pointer" onClick={() => toggleGroup('inProgress')}>
                                        <span className={`material-symbols-outlined text-primary transition-transform ${groups.inProgress ? '' : '-rotate-90'}`}>expand_more</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">In Progress</span>
                                        <span className="text-xs font-medium text-slate-400">{inProgressTasks.length} tasks</span>
                                    </div>
                                    {groups.inProgress && (
                                        <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                            {inProgressTasks.map(task => (
                                                <div key={task.id} onClick={() => handleOpenModal(task)} className="group flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer">
                                                    <div className="w-8" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            className="rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                                                            type="checkbox"
                                                            checked={false}
                                                            onChange={() => handleStatusChange(task, 'completed')}
                                                        />
                                                    </div>
                                                    <div className="flex-[2] flex flex-col">
                                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{task.title}</span>
                                                        <span className="text-xs text-slate-500 truncate max-w-[300px]">{task.description}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{task.project || 'GENERAL'}</span>
                                                    </div>
                                                    <div className="w-32">
                                                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-500 uppercase">
                                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                            {task.priority || 'Medium'}
                                                        </span>
                                                    </div>
                                                    <div className="w-32 flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(task, 'to do'); }}
                                                            className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                                            title="Move to To Do"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); if (window.confirm('Delete?')) taskService.deleteTask(task.id).then(loadData); }}
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

                                <div className="mb-6 opacity-60">
                                    <div className="flex items-center gap-2 py-3 border-b border-slate-100 dark:border-slate-800 group cursor-pointer" onClick={() => toggleGroup('completed')}>
                                        <span className={`material-symbols-outlined text-slate-400 transition-transform ${groups.completed ? '' : '-rotate-90'}`}>chevron_right</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">Completed</span>
                                        <span className="text-xs font-medium text-slate-400">{completedTasks.length} tasks</span>
                                    </div>
                                    {groups.completed && (
                                        <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                            {completedTasks.map(task => (
                                                <div key={task.id} className="group flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all text-slate-400">
                                                    <div className="w-8" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            className="rounded border-slate-300 text-primary focus:ring-primary/20 opacity-50 cursor-pointer"
                                                            type="checkbox"
                                                            checked={true}
                                                            onChange={() => handleStatusChange(task, 'in-progress')}
                                                        />
                                                    </div>
                                                    <div className="flex-[2] text-sm font-medium line-through">{task.title}</div>
                                                    <div className="flex-1">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 dark:bg-slate-800">{task.project || 'GENERAL'}</span>
                                                    </div>
                                                    <div className="w-32">
                                                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase opacity-50">
                                                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                                            Low
                                                        </span>
                                                    </div>
                                                    <div className="w-32 flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusChange(task, 'in-progress'); }}
                                                            className="p-1 hover:bg-slate-200 rounded text-slate-500"
                                                            title="Move to In Progress"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); if (window.confirm('Delete?')) taskService.deleteTask(task.id).then(loadData); }}
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
            <TaskDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={selectedTask}
                isCreateMode={!selectedTask}
                onSave={handleTaskCreated}
            />
        </div>
    );
};

export default MyTasks;
