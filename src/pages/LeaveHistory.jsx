import React, { useState, useEffect } from 'react';
import { leaveService } from '../services/leaveService';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';

const LeaveHistory = () => {
    const { showSuccess, showError } = useToast();
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); // Quick check for demo
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        leave_type: 'Annual',
        start_date: '',
        end_date: '',
        reason: ''
    });

    useEffect(() => {
        checkUserAndLoad();
    }, []);

    const checkUserAndLoad = async () => {
        try {
            setLoading(true);
            const user = await authService.getCurrentUser();
            setCurrentUser(user);

            // For MVP demo, lets check if the user is an admin or just assume everyone can see the admin view toggle?
            // Let's fetch the profile to see role if it exists, or just default to fetching OWN leaves first.
            // We'll add a separate "Admin View" toggle if needed, or just fetch ALL if admin.
            // For now, let's fetch OWN leaves by default.
            fetchMyLeaves();

        } catch (error) {
            console.error("Auth check failed", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyLeaves = async () => {
        try {
            setLoading(true);
            const data = await leaveService.getMyLeaves();
            setLeaves(data || []);
            setIsAdmin(false); // Showing my leaves
        } catch (error) {
            console.error(error);
            showError("Failed to fetch leaves");
        } finally {
            setLoading(false);
        }
    };

    const fetchAllLeaves = async () => {
        try {
            setLoading(true);
            const data = await leaveService.getAllLeaves();
            setLeaves(data || []);
            setIsAdmin(true); // Showing all leaves (Admin Mode)
        } catch (error) {
            console.error(error);
            showError("Failed to fetch all leaves");
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        if (!formData.start_date || !formData.end_date) {
            alert("Please select dates");
            return;
        }
        try {
            await leaveService.applyForLeave(formData);
            showSuccess("Leave application submitted!");
            setIsModalOpen(false);
            setFormData({ leave_type: 'Annual', start_date: '', end_date: '', reason: '' });
            fetchMyLeaves(); // Refresh
        } catch (error) {
            console.error(error);
            showError("Failed to apply");
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await leaveService.updateLeaveStatus(id, status);
            showSuccess(`Leave ${status}!`);
            fetchAllLeaves(); // Refresh list
        } catch (error) {
            console.error(error);
            showError(`Failed to ${status} leave`);
        }
    };

    // Calculate days helper
    const getDays = (start, end) => {
        const s = new Date(start);
        const e = new Date(end);
        const diffTime = Math.abs(e - s);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-display text-[#0f0e1b] dark:text-[#f9f8fb]">
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a192d] border-b border-solid border-[#e8e8f3] dark:border-[#2a2945] px-4 md:px-10 lg:px-40 py-3">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-[#5048e5]">
                            <h2 className="text-[#0f0e1b] dark:text-white text-xl font-bold leading-tight tracking-tight">UHDMS</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-9">
                            <a className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors" href="/employee-dashboard">Dashboard</a>
                            <a className="text-[#5048e5] text-sm font-semibold border-b-2 border-[#5048e5] pb-1" href="#">Leave Management</a>
                        </nav>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={fetchMyLeaves}
                            className={`px-3 py-1 rounded text-sm font-medium ${!isAdmin ? 'bg-[#5048e5] text-white' : 'text-gray-500'}`}
                        >
                            My Leaves
                        </button>
                        <button
                            onClick={fetchAllLeaves}
                            className={`px-3 py-1 rounded text-sm font-medium ${isAdmin ? 'bg-[#5048e5] text-white' : 'text-gray-500'}`}
                        >
                            Admin View
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex-1 px-4 md:px-10 lg:px-40 py-8 max-w-[1280px] mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0f0e1b] dark:text-white">
                            {isAdmin ? 'Leave Requests (Admin)' : 'My Leave History'}
                        </h1>
                        <p className="text-sm text-[#545095] dark:text-gray-400 mt-1">
                            {isAdmin ? 'Manage and review employee leave requests.' : 'View your past requests and status.'}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-6 h-11 bg-[#5048e5] text-white rounded-lg font-semibold hover:bg-[#5048e5]/90 transition-all shadow-sm"
                    >
                        <span className="material-symbols-outlined">add</span>
                        <span>Apply for Leave</span>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-[#1a192d] rounded-xl shadow-sm border border-[#e8e8f3] dark:border-[#2a2945] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f6f6f8] dark:bg-[#21203b] border-b border-[#e8e8f3] dark:border-[#2a2945]">
                                    {isAdmin && <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Employee</th>}
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Leave Type</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Dates</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400 text-center">Days</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#545095] dark:text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8e8f3] dark:divide-[#2a2945]">
                                {leaves.length === 0 ? (
                                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">No leave records found.</td></tr>
                                ) : (
                                    leaves.map(leave => (
                                        <tr key={leave.id} className="hover:bg-[#f6f6f8]/30 dark:hover:bg-[#21203b]/30 transition-colors">
                                            {isAdmin && (
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-8 rounded-full bg-slate-200 bg-cover" style={{ backgroundImage: `url('${leave.profile?.avatar_url || ''}')` }}></div>
                                                        <div>
                                                            <div className="font-bold text-sm">{leave.profile?.first_name} {leave.profile?.last_name}</div>
                                                            <div className="text-xs text-gray-400">{leave.profile?.job_title}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-[#0f0e1b] dark:text-white">{leave.leave_type}</span>
                                                {leave.reason && <p className="text-xs text-gray-500 max-w-[200px] truncate">{leave.reason}</p>}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#545095] dark:text-gray-300">
                                                {leave.start_date} &rarr; {leave.end_date}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-center font-medium">
                                                {getDays(leave.start_date, leave.end_date)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                                    ${leave.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                                        leave.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                                                            'bg-amber-100 text-amber-700'}`}>
                                                    {leave.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {isAdmin && leave.status === 'pending' && (
                                                    <div className="flex gap-2 justify-end">
                                                        <button
                                                            onClick={() => handleStatusUpdate(leave.id, 'approved')}
                                                            className="text-xs bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(leave.id, 'rejected')}
                                                            className="text-xs bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-600"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Apply Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#1a192d] p-6 rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95">
                        <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select
                                    className="w-full rounded border-gray-300 p-2"
                                    value={formData.leave_type}
                                    onChange={e => setFormData({ ...formData, leave_type: e.target.value })}
                                >
                                    <option>Annual</option>
                                    <option>Sick</option>
                                    <option>Unpaid</option>
                                    <option>Casual</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full rounded border-gray-300 p-2"
                                        value={formData.start_date}
                                        onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full rounded border-gray-300 p-2"
                                        value={formData.end_date}
                                        onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Reason</label>
                                <textarea
                                    className="w-full rounded border-gray-300 p-2"
                                    rows="3"
                                    value={formData.reason}
                                    onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                    placeholder="Optional reason..."
                                ></textarea>
                            </div>
                            <div className="flex gap-2 justify-end mt-4">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
                                <button onClick={handleApply} className="px-4 py-2 bg-[#5048e5] text-white rounded hover:bg-[#5048e5]/90">Submit Application</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default LeaveHistory;
