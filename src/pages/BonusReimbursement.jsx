import React, { useState, useEffect } from 'react';
import { reimbursementService } from '../services/reimbursementService';
import { bonusService } from '../services/bonusService';
import { financialService } from '../services/financialService';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';

const BonusReimbursement = () => {
    const { showSuccess, showError } = useToast();
    const [activeTab, setActiveTab] = useState('reimbursements');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null); // Simple role check if possible

    // Filter/Selection State
    const [selectedIds, setSelectedIds] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');

    // Modals
    const [isReimburseModalOpen, setIsReimburseModalOpen] = useState(false);
    const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);

    // Form Data
    const [reimburseForm, setReimburseForm] = useState({ description: '', amount: '', category: 'Travel' });
    const [bonusForm, setBonusForm] = useState({ user_id: '', amount: '', reason: '' });
    const [employees, setEmployees] = useState([]); // For bonus dropdown

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        fetchTabData();
        setSelectedIds([]);
    }, [activeTab]);

    const loadInitialData = async () => {
        try {
            const user = await authService.getCurrentUser();
            // Assuming simplified role check or just checking if user can fetch employees
            const emps = await financialService.getAllEmployees();
            setEmployees(emps || []);
            setUserRole(user?.role || 'employee'); // Fallback
        } catch (error) {
            console.error("Init load error", error);
        }
    };

    const fetchTabData = async () => {
        setLoading(true);
        try {
            let result = [];
            if (activeTab === 'reimbursements') {
                result = await reimbursementService.getAll();
            } else if (activeTab === 'bonuses') {
                result = await bonusService.getAll();
            } else if (activeTab === 'audit') {
                result = await financialService.getAuditLogs();
            }
            setData(result || []);
        } catch (error) {
            console.error("Fetch error", error);
            showError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    // --- Actions ---

    const handleBulkApprove = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`Approve ${selectedIds.length} items?`)) return;

        try {
            if (activeTab === 'reimbursements') {
                await reimbursementService.bulkApprove(selectedIds);
                showSuccess("Reimbursements approved!");
                fetchTabData(); // Refresh
                setSelectedIds([]);
            }
        } catch (error) {
            showError("Bulk approve failed");
        }
    };

    const handleCreateReimbursement = async (e) => {
        e.preventDefault();
        try {
            await reimbursementService.create({
                ...reimburseForm,
                amount: parseFloat(reimburseForm.amount)
            });
            showSuccess("Request created!");
            setIsReimburseModalOpen(false);
            setReimburseForm({ description: '', amount: '', category: 'Travel' });
            if (activeTab === 'reimbursements') fetchTabData();
        } catch (error) {
            showError("Create failed");
        }
    };

    const handleCreateBonus = async (e) => {
        e.preventDefault();
        try {
            await bonusService.create({
                ...bonusForm,
                amount: parseFloat(bonusForm.amount)
            });
            showSuccess("Bonus awarded!");
            setIsBonusModalOpen(false);
            setBonusForm({ user_id: '', amount: '', reason: '' });
            if (activeTab === 'bonuses') fetchTabData();
        } catch (error) {
            showError("Create bonus failed");
        }
    };

    // --- Export ---
    const handleExport = () => {
        if (data.length === 0) {
            showError("No data to export");
            return;
        }

        // Simple CSV generation
        const headers = Object.keys(data[0]).join(",");
        const rows = data.map(obj =>
            Object.values(obj).map(val =>
                typeof val === 'object' ? JSON.stringify(val).replace(/,/g, ';') : val
            ).join(",")
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${activeTab}_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- Helper Functions ---
    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(data.map(i => i.id));
        } else {
            setSelectedIds([]);
        }
    };

    const filteredData = data.filter(item => {
        if (filterStatus === 'All') return true;
        // Audit logs usually don't have status, ignore filter for them or map properly
        if (activeTab === 'audit') return true;
        return item.status?.toLowerCase() === filterStatus.toLowerCase();
    });

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white min-h-screen font-display p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <nav className="flex items-center gap-2 text-xs font-medium text-[#656487] dark:text-gray-400 mb-2">
                            <span>Financials</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-primary">Management</span>
                        </nav>
                        <h2 className="text-[#121117] dark:text-white text-3xl font-black leading-tight tracking-tight">Bonus & Reimbursement Management</h2>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-[#e5e7eb] dark:border-white/10 rounded-lg text-sm font-bold text-[#121117] dark:text-white hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-lg">download</span>
                            <span>Export Report</span>
                        </button>

                        {activeTab === 'reimbursements' && (
                            <button onClick={() => setIsReimburseModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                                <span className="material-symbols-outlined text-lg">add</span>
                                <span>New Request</span>
                            </button>
                        )}

                        {activeTab === 'bonuses' && (
                            <button onClick={() => setIsBonusModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                                <span className="material-symbols-outlined text-lg">military_tech</span>
                                <span>Award Bonus</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-[#e5e7eb] dark:border-white/10 flex gap-8">
                    <button
                        onClick={() => setActiveTab('bonuses')}
                        className={`relative py-4 px-1 text-sm font-bold transition-colors ${activeTab === 'bonuses' ? 'text-primary' : 'text-[#656487] hover:text-primary'}`}
                    >
                        Bonuses
                        {activeTab === 'bonuses' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('reimbursements')}
                        className={`relative py-4 px-1 text-sm font-bold transition-colors ${activeTab === 'reimbursements' ? 'text-primary' : 'text-[#656487] hover:text-primary'}`}
                    >
                        Reimbursements
                        {activeTab === 'reimbursements' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('audit')}
                        className={`relative py-4 px-1 text-sm font-bold transition-colors ${activeTab === 'audit' ? 'text-primary' : 'text-[#656487] hover:text-primary'}`}
                    >
                        Audit Logs
                        {activeTab === 'audit' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                    </button>
                </div>

                {/* Toolbar (Only for Bonuses/Reimbursements) */}
                {activeTab !== 'audit' && (
                    <div className="bg-white dark:bg-white/5 rounded-xl border border-[#e5e7eb] dark:border-white/10 p-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-[#f1f0f4] dark:bg-white/5 p-1 rounded-lg">
                                {['All', 'Pending', 'Approved'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${filterStatus === status ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-[#656487] hover:text-[#121117] dark:text-gray-400'}`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {activeTab === 'reimbursements' && selectedIds.length > 0 && (
                            <button onClick={handleBulkApprove} className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-lg text-sm font-bold hover:bg-emerald-500/20 transition-all">
                                <span className="material-symbols-outlined text-xl fill-icon" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                <span>Approve {selectedIds.length} Selected</span>
                            </button>
                        )}
                    </div>
                )}

                {/* Data Table */}
                <div className="bg-white dark:bg-white/5 rounded-xl border border-[#e5e7eb] dark:border-white/10 overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="p-10 text-center text-[#656487]">Loading...</div>
                    ) : filteredData.length === 0 ? (
                        <div className="p-10 text-center text-[#656487]">No records found.</div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f9fafb] dark:bg-white/5 border-b border-[#e5e7eb] dark:border-white/10">
                                    {activeTab !== 'audit' && (
                                        <th className="px-6 py-4 w-12">
                                            <input
                                                onChange={toggleSelectAll}
                                                checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                                                className="rounded text-primary focus:ring-primary bg-white dark:bg-white/10 border-[#e5e7eb] dark:border-white/20" type="checkbox"
                                            />
                                        </th>
                                    )}

                                    {/* Dynamic Headers */}
                                    {activeTab === 'reimbursements' && (
                                        <>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Description</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Category</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider text-center">Receipt</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        </>
                                    )}

                                    {activeTab === 'bonuses' && (
                                        <>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Employee</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Reason</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Issued By</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        </>
                                    )}

                                    {activeTab === 'audit' && (
                                        <>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Action</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Performed By</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Details</th>
                                            <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Date</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e5e7eb] dark:divide-white/10">
                                {filteredData.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#f9fafb] dark:hover:bg-white/5 transition-colors group">
                                        {activeTab !== 'audit' && (
                                            <td className="px-6 py-4">
                                                <input
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => toggleSelect(item.id)}
                                                    className="rounded text-primary focus:ring-primary bg-white dark:bg-white/10 border-[#e5e7eb] dark:border-white/20" type="checkbox"
                                                />
                                            </td>
                                        )}

                                        {/* Reimbursements Row */}
                                        {activeTab === 'reimbursements' && (
                                            <>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-[#121117] dark:text-white">{item.description}</span>
                                                        <span className="text-[10px] text-[#656487] dark:text-gray-400">{new Date(item.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">{item.category}</span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-mono font-bold text-[#121117] dark:text-white">${item.amount}</span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <button className="text-primary hover:text-primary/80 transition-colors">
                                                        <span className="material-symbols-outlined">receipt_long</span>
                                                    </button>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className={`flex items-center gap-1.5 ${item.status === 'approved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                                        <span className="size-1.5 rounded-full bg-current"></span>
                                                        <span className="text-xs font-bold capitalize">{item.status}</span>
                                                    </div>
                                                </td>
                                            </>
                                        )}

                                        {/* Bonuses Row */}
                                        {activeTab === 'bonuses' && (
                                            <>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-6 bg-gray-200 rounded-full bg-cover"
                                                            style={{ backgroundImage: `url("${item.employee?.avatar_url || ''}")` }}></div>
                                                        <span className="text-sm font-bold text-[#121117] dark:text-white">
                                                            {item.employee ? `${item.employee.first_name} ${item.employee.last_name}` : 'Unknown'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-[#656487] dark:text-gray-400">{item.reason}</td>
                                                <td className="px-4 py-4 text-sm font-bold text-green-600 dark:text-green-400">+${item.amount}</td>
                                                <td className="px-4 py-4 text-xs text-[#656487] dark:text-gray-400">
                                                    {item.issuer ? `${item.issuer.first_name} ${item.issuer.last_name}` : 'System'}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className={`flex items-center gap-1.5 ${item.status === 'approved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                                        <span className="size-1.5 rounded-full bg-current"></span>
                                                        <span className="text-xs font-bold capitalize">{item.status}</span>
                                                    </div>
                                                </td>
                                            </>
                                        )}

                                        {/* Audit Row */}
                                        {activeTab === 'audit' && (
                                            <>
                                                <td className="px-4 py-4 text-sm font-bold text-[#121117] dark:text-white capitalize">{item.action.replace('_', ' ')}</td>
                                                <td className="px-4 py-4 text-sm text-[#656487] dark:text-gray-400">
                                                    {item.performer ? `${item.performer.first_name} ${item.performer.last_name}` : 'System'}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-[#656487] dark:text-gray-400 max-w-xs truncate">{item.details}</td>
                                                <td className="px-4 py-4 text-xs text-[#656487] dark:text-gray-400">{new Date(item.created_at).toLocaleString()}</td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* MODALS */}

            {/* Create Reimbursement Modal */}
            {isReimburseModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#1e293b] dark:text-white">New Reimbursement Request</h3>
                            <button onClick={() => setIsReimburseModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateReimbursement} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Description</label>
                                <input
                                    type="text" required
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Client Lunch"
                                    value={reimburseForm.description}
                                    onChange={(e) => setReimburseForm({ ...reimburseForm, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Amount ($)</label>
                                <input
                                    type="number" step="0.01" required
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    value={reimburseForm.amount}
                                    onChange={(e) => setReimburseForm({ ...reimburseForm, amount: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Category</label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                                    value={reimburseForm.category}
                                    onChange={(e) => setReimburseForm({ ...reimburseForm, category: e.target.value })}
                                >
                                    <option value="Travel">Travel</option>
                                    <option value="Food">Food</option>
                                    <option value="Internet">Internet</option>
                                    <option value="Office Supplies">Office Supplies</option>
                                    <option value="Software">Software</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsReimburseModalOpen(false)} className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Create Bonus Modal */}
            {isBonusModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#1e293b] dark:text-white">Award Performance Bonus</h3>
                            <button onClick={() => setIsBonusModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateBonus} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Employee</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                                    value={bonusForm.user_id}
                                    onChange={(e) => setBonusForm({ ...bonusForm, user_id: e.target.value })}
                                >
                                    <option value="">Select Employee...</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.first_name} {emp.last_name} ({emp.job_title})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Amount ($)</label>
                                <input
                                    type="number" step="1" required
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="500"
                                    value={bonusForm.amount}
                                    onChange={(e) => setBonusForm({ ...bonusForm, amount: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Reason</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Exceptional performance in Q1"
                                    value={bonusForm.reason}
                                    onChange={(e) => setBonusForm({ ...bonusForm, reason: e.target.value })}
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsBonusModalOpen(false)} className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">Award Bonus</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BonusReimbursement;
