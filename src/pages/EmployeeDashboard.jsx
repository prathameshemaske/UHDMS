import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { attendanceService } from '../services/attendanceService';
import { taskService } from '../services/taskService';

const EmployeeDashboard = () => {
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    // Data State
    const [currentUser, setCurrentUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [attendance, setAttendance] = useState(null);
    const [history, setHistory] = useState([]);
    const [elapsedTime, setElapsedTime] = useState('00:00:00');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            const user = await authService.getCurrentUser();
            if (!user) return;
            setCurrentUser(user);

            // Load Tasks
            try {
                const allTasks = await taskService.getTasks(); // Or getMyTasks if available/filtered
                // Filter for this user if getTasks returns all
                const myTasks = allTasks.filter(t => t.assignee_id === user.id && t.status !== 'completed');
                // Sort by priority (assuming priority field or deadline)
                myTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
                setTasks(myTasks.slice(0, 5));
            } catch (e) { console.error("Tasks error", e); }

            // Load Attendance
            try {
                const todayFn = await attendanceService.getTodayStatus(user.id);
                setAttendance(todayFn);

                const historyData = await attendanceService.getHistory(user.id);
                setHistory(historyData);
            } catch (e) { console.error("Attendance error", e); }

            setLoading(false);
        };
        loadData();
    }, []);

    // Timer Logic
    useEffect(() => {
        let interval;
        if (attendance?.clock_in && !attendance?.clock_out) {
            interval = setInterval(() => {
                const start = new Date(attendance.clock_in).getTime();
                const now = new Date().getTime();
                const diff = now - start;

                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setElapsedTime(
                    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                );
            }, 1000);
        } else if (attendance?.clock_out) {
            // Calculate final duration
            const start = new Date(attendance.clock_in).getTime();
            const end = new Date(attendance.clock_out).getTime();
            const diff = end - start;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setElapsedTime(
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );
        } else {
            setElapsedTime('00:00:00');
        }
        return () => clearInterval(interval);
    }, [attendance]);

    const handleClockIn = async () => {
        if (!currentUser) return;
        try {
            const data = await attendanceService.clockIn(currentUser.id);
            setAttendance(data);
            // Refresh history
            const historyData = await attendanceService.getHistory(currentUser.id);
            setHistory(historyData);
        } catch (error) {
            alert("Error clocking in: " + error.message);
        }
    };

    const handleClockOut = async () => {
        if (!attendance) return;
        try {
            const data = await attendanceService.clockOut(attendance.id);
            setAttendance(data);
            // Refresh history
            const historyData = await attendanceService.getHistory(currentUser?.id);
            setHistory(historyData);
        } catch (error) {
            alert("Error clocking out: " + error.message);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-display text-[#0f0e1b] dark:text-[#f9f8fb] overflow-hidden">
            {/* Modal Overlay */}
            {isLeaveModalOpen && (
                <div className="fixed inset-0 z-[60] bg-[#0f0e1b]/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#1a192d] w-full max-w-[560px] rounded-lg shadow-2xl border border-[#e8e8f3] dark:border-[#2a2945] flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#0f0e1b] dark:text-white">Apply for Leave</h2>
                            <button
                                onClick={() => setIsLeaveModalOpen(false)}
                                className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5] transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Leave Type</label>
                                <select className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] py-2.5">
                                    <option disabled selected value="">Select leave type</option>
                                    <option value="sick">Sick Leave</option>
                                    <option value="casual">Casual Leave</option>
                                    <option value="paid">Paid Leave</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Start Date</label>
                                    <input className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] py-2.5" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">End Date</label>
                                    <input className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] py-2.5" type="date" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Total Days</label>
                                <input className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-[#f8f9fa] dark:bg-[#121121] text-sm text-[#545095] cursor-not-allowed py-2.5" readOnly type="text" value="0" />
                                <p className="text-[11px] text-[#545095] dark:text-gray-500 italic">Total days are calculated automatically excluding weekends.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Reason for Leave</label>
                                <textarea className="w-full rounded-lg border-[#e8e8f3] dark:border-[#2a2945] bg-white dark:bg-[#21203b] text-sm focus:ring-[#5048e5] focus:border-[#5048e5] py-2.5" placeholder="Please describe the reason for your application..." rows="3"></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#545095] dark:text-gray-300">Supporting Documents (Optional)</label>
                                <div className="border-2 border-dashed border-[#e8e8f3] dark:border-[#2a2945] rounded-lg p-6 flex flex-col items-center justify-center bg-[#f6f6f8]/30 dark:bg-[#21203b]/30 hover:bg-[#5048e5]/5 transition-colors cursor-pointer group">
                                    <span className="material-symbols-outlined text-[#5048e5] mb-2">cloud_upload</span>
                                    <p className="text-xs text-[#545095] dark:text-gray-400 font-medium group-hover:text-[#5048e5]">Click to upload or drag and drop</p>
                                    <p className="text-[10px] text-[#545095] dark:text-gray-500 mt-1 uppercase">PDF, JPG or PNG (Max 5MB)</p>
                                    <input className="hidden" type="file" />
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-end gap-3">
                            <button
                                onClick={() => setIsLeaveModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-semibold text-[#545095] dark:text-gray-300 hover:bg-[#f6f6f8] dark:hover:bg-[#21203b] rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-2.5 text-sm font-semibold bg-[#5048e5] text-white rounded-lg shadow-md hover:bg-[#5048e5]/90 transition-all">
                                Submit Application
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* History Modal */}
            {isHistoryModalOpen && (
                <div className="fixed inset-0 z-[60] bg-[#0f0e1b]/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#1a192d] w-full max-w-2xl rounded-lg shadow-2xl border border-[#e8e8f3] dark:border-[#2a2945] flex flex-col max-h-[80vh]">
                        <div className="px-6 py-4 border-b border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#0f0e1b] dark:text-white">Attendance History</h2>
                            <button
                                onClick={() => setIsHistoryModalOpen(false)}
                                className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5] transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#e8e8f3] dark:border-[#2a2945]">
                                        <th className="py-2 text-sm font-semibold text-[#545095] dark:text-gray-400">Date</th>
                                        <th className="py-2 text-sm font-semibold text-[#545095] dark:text-gray-400">Clock In</th>
                                        <th className="py-2 text-sm font-semibold text-[#545095] dark:text-gray-400">Clock Out</th>
                                        <th className="py-2 text-sm font-semibold text-[#545095] dark:text-gray-400">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((record, index) => {
                                        const start = record.clock_in ? new Date(record.clock_in) : null;
                                        const end = record.clock_out ? new Date(record.clock_out) : null;
                                        let duration = '-';
                                        if (start && end) {
                                            const diff = end - start;
                                            const hrs = Math.floor(diff / 3600000);
                                            const mins = Math.floor((diff % 3600000) / 60000);
                                            duration = `${hrs}h ${mins}m`;
                                        }
                                        return (
                                            <tr key={record.id} className="border-b border-[#e8e8f3] dark:border-[#2a2945] last:border-0 hover:bg-gray-50 dark:hover:bg-[#21203b]">
                                                <td className="py-3 text-sm text-[#0f0e1b] dark:text-white">{new Date(record.date).toLocaleDateString()}</td>
                                                <td className="py-3 text-sm text-[#0f0e1b] dark:text-white">{start ? start.toLocaleTimeString() : '-'}</td>
                                                <td className="py-3 text-sm text-[#0f0e1b] dark:text-white">{end ? end.toLocaleTimeString() : '-'}</td>
                                                <td className="py-3 text-sm text-[#0f0e1b] dark:text-white">{duration}</td>
                                            </tr>
                                        );
                                    })}
                                    {history.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="py-6 text-center text-sm text-[#545095]">No history found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content (Blurred when modal open) */}
            <div className={`flex flex-col min-h-screen transition-all duration-300 ${isLeaveModalOpen ? 'blur-[2px] pointer-events-none select-none' : ''}`}>


                <main className="flex-1 px-4 md:px-10 lg:px-40 py-8 max-w-[1280px] mx-auto w-full">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 mb-6 text-sm font-medium">
                        <a className="text-[#545095] dark:text-gray-400 hover:text-[#5048e5]" href="#">Home</a>
                        <span className="text-[#545095] dark:text-gray-600">/</span>
                        <span className="text-[#0f0e1b] dark:text-white">Dashboard</span>
                    </div>
                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* 1. Attendance Card (Left, 2/3 width) */}
                        <div className="col-span-12 lg:col-span-8">
                            <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] overflow-hidden">
                                <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <p className="text-[#545095] dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Attendance Tracker</p>
                                        <h3 className="text-[#0f0e1b] dark:text-white text-3xl font-bold tracking-tight mb-2">{elapsedTime}</h3>
                                        <p className="text-[#545095] dark:text-gray-400 text-base">
                                            Hours Worked Today •
                                            <span className={`font-medium ml-1 ${attendance?.clock_in && !attendance?.clock_out ? 'text-green-500' : 'text-gray-500'}`}>
                                                Status: {attendance?.clock_in && !attendance?.clock_out ? 'Logged In' : attendance?.clock_out ? 'Logged Out' : 'Not Logged In'}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {!attendance ? (
                                            <button
                                                onClick={handleClockIn}
                                                className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#5048e5] text-white text-base font-bold transition-all hover:bg-[#5048e5]/90 shadow-md"
                                            >
                                                <span className="material-symbols-outlined">login</span>
                                                <span>Clock In</span>
                                            </button>
                                        ) : !attendance.clock_out ? (
                                            <button
                                                onClick={handleClockOut}
                                                className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-red-500 text-white text-base font-bold transition-all hover:bg-red-600 shadow-md"
                                            >
                                                <span className="material-symbols-outlined">logout</span>
                                                <span>Clock Out</span>
                                            </button>
                                        ) : (
                                            <div className="text-gray-500 font-medium">Shift Completed</div>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-[#f6f6f8] dark:bg-[#21203b] px-6 py-3 border-t border-[#e8e8f3] dark:border-[#2a2945] flex justify-between text-xs font-medium text-[#545095] dark:text-gray-400">
                                    <span>Last sync: Just now</span>
                                    <button onClick={() => setIsHistoryModalOpen(true)} className="hover:text-[#5048e5] underline">View Full History</button>
                                </div>
                            </div>
                            {/* 3. My Tasks (Below Attendance) */}
                            <div className="mt-6 bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945]">
                                <div className="p-6 border-b border-[#e8e8f3] dark:border-[#2a2945] flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-[#0f0e1b] dark:text-white">My Tasks</h2>
                                    <button onClick={() => navigate('/tasks')} className="text-[#5048e5] text-sm font-semibold hover:underline">View All Tasks</button>
                                </div>
                                <div className="divide-y divide-[#e8e8f3] dark:divide-[#2a2945]">
                                    {tasks.length === 0 ? (
                                        <div className="p-6 text-center text-gray-500 text-sm">No pending tasks.</div>
                                    ) : (
                                        tasks.map(task => (
                                            <div key={task.id} className="p-6 flex items-center justify-between hover:bg-[#f6f6f8]/50 dark:hover:bg-[#21203b] transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className={`mt-1 rounded-lg p-2 flex items-center justify-center ${task.priority === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-[#5048e5]/10 text-[#5048e5]'}`}>
                                                        <span className="material-symbols-outlined">
                                                            {task.priority === 'urgent' ? 'priority_high' : 'assignment'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[#0f0e1b] dark:text-white font-semibold line-clamp-1">{task.title}</h4>
                                                        <p className="text-sm text-[#545095] dark:text-gray-400 line-clamp-1">{task.description || 'No description'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 text-right shrink-0">
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${task.priority === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {task.priority || 'Normal'}
                                                    </span>
                                                    <span className="text-xs text-[#545095] dark:text-gray-500">
                                                        Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Right Column (1/3 width) */}
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                            {/* 2. Leave Balance */}
                            <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] p-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gray-50/80 dark:bg-[#1a192d]/80 backdrop-blur-sm z-10 flex items-center justify-center">
                                    <span className="bg-[#5048e5] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Coming Soon</span>
                                </div>
                                <h2 className="text-lg font-bold text-[#0f0e1b] dark:text-white mb-6">Leave Balance</h2>
                                <div className="flex flex-col items-center opacity-50">
                                    <div className="relative flex items-center justify-center mb-6">
                                        <div className="size-40 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#5048e5 0% 75%, #e8e8f3 75% 100%)' }}>
                                            <div className="size-32 bg-white dark:bg-[#1a192d] rounded-full flex flex-col items-center justify-center">
                                                <span className="text-2xl font-bold text-[#5048e5]">15</span>
                                                <span className="text-xs text-[#545095] dark:text-gray-400 font-medium">OF 20 DAYS</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="size-3 rounded-full bg-[#5048e5]"></span>
                                                <span className="text-[#0f0e1b] dark:text-white font-medium">Available</span>
                                            </div>
                                            <span className="text-[#545095] dark:text-gray-400">15 Days</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="size-3 rounded-full bg-[#e8e8f3] dark:bg-[#2a2945]"></span>
                                                <span className="text-[#0f0e1b] dark:text-white font-medium">Taken</span>
                                            </div>
                                            <span className="text-[#545095] dark:text-gray-400">5 Days</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.location.href = '/leave-history'}
                                        className="w-full mt-6 py-2 text-[#5048e5] font-semibold text-sm border border-[#5048e5]/20 rounded-lg hover:bg-[#5048e5]/5 transition-colors"
                                    >
                                        History Details
                                    </button>
                                </div>
                            </div>
                            {/* 4. Quick Links */}
                            <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] p-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gray-50/80 dark:bg-[#1a192d]/80 backdrop-blur-sm z-10 flex items-center justify-center">
                                    <span className="bg-[#5048e5] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Coming Soon</span>
                                </div>
                                <h2 className="text-lg font-bold text-[#0f0e1b] dark:text-white mb-6">Quick Actions</h2>
                                <div className="grid grid-cols-1 gap-4 opacity-50">
                                    <button
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f6f6f8] dark:bg-[#21203b] hover:bg-[#5048e5] hover:text-white group transition-all"
                                    >
                                        <div className="size-10 rounded-lg bg-white dark:bg-[#2a2945] text-[#5048e5] flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">receipt_long</span>
                                        </div>
                                        <span className="font-bold text-sm">Download Payslip</span>
                                        <span className="material-symbols-outlined ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                                    </button>
                                    <button
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f6f6f8] dark:bg-[#21203b] hover:bg-[#5048e5] hover:text-white group transition-all"
                                    >
                                        <div className="size-10 rounded-lg bg-white dark:bg-[#2a2945] text-[#5048e5] flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">event_available</span>
                                        </div>
                                        <span className="font-bold text-sm">Apply for Leave</span>
                                        <span className="material-symbols-outlined ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                                    </button>
                                    <button
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f6f6f8] dark:bg-[#21203b] hover:bg-[#5048e5] hover:text-white group transition-all"
                                    >
                                        <div className="size-10 rounded-lg bg-white dark:bg-[#2a2945] text-[#5048e5] flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">support_agent</span>
                                        </div>
                                        <span className="font-bold text-sm">IT Support Ticket</span>
                                        <span className="material-symbols-outlined ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Bottom Footer Info */}
                <footer className="mt-auto px-40 py-6 border-t border-[#e8e8f3] dark:border-[#2a2945] text-center text-xs text-[#545095] dark:text-gray-500">
                    © 2023 UHDMS Platform • Enterprise Human Resource Management System
                </footer>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
