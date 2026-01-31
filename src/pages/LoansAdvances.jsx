import React, { useState, useEffect } from "react";
import { authService } from "../services/authService";
import { loanService } from "../services/loanService";

const LoansAdvances = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        type: 'Personal Loan',
        request_amount: '',
        tenure_months: '12',
        reason: ''
    });

    const [selectedLoan, setSelectedLoan] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    useEffect(() => {
        loadLoans();
        loadUserRole();
    }, []);

    const loadUserRole = async () => {
        try {
            const user = await authService.getCurrentUser();
            if (user && user.role) {
                setUserRole(user.role.toLowerCase());
            } else {
                setUserRole('employee');
            }
        } catch (error) {
            console.error("Failed to load role", error);
        }
    };

    const loadLoans = async () => {
        try {
            const data = await loanService.getAllLoans();
            setLoans(data || []);
        } catch (error) {
            console.error("Failed to load loans:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            // Calculate EMI (0% Interest Policy)
            const P = parseFloat(formData.request_amount);
            const N = parseInt(formData.tenure_months);
            const emi = P / N;

            await loanService.applyForLoan({
                request_amount: P,
                tenure_months: N,
                reason: formData.reason,
                monthly_emi: Math.round(emi)
            });
            alert("Loan application submitted successfully!");
            setIsModalOpen(false);
            loadLoans();
        } catch (error) {
            console.error("Application failed:", error);
            alert(`Failed to submit: ${error.message || error.details || "Unknown error"}`);
        }
    };

    const handleAction = async (id, status) => {
        try {
            if (!confirm(`Are you sure you want to ${status} this loan request?`)) return;

            await loanService.updateLoanStatus(id, status);
            alert(`Loan ${status} successfully!`);
            setIsDetailModalOpen(false);
            loadLoans();
        } catch (error) {
            console.error("Action failed:", error);
            alert("Failed to update status");
        }
    };

    const openDetails = (loan) => {
        setSelectedLoan(loan);
        setIsDetailModalOpen(true);
    };

    // Calculate Totals
    const totalDisbursed = loans.reduce((sum, loan) => sum + (loan.status === 'active' || loan.status === 'closed' ? Number(loan.request_amount) : 0), 0);
    const activeCount = loans.filter(l => l.status === 'active').length;

    const isHR = userRole === 'admin' || userRole === 'hr';

    return (
        <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-slate-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Loans & Advances</h1>
                    <p className="text-slate-500 text-sm">Manage employee loan requests and EMI recovery.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
                >
                    <span className="material-symbols-outlined">add</span> New Loan Request
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Disbursed</p>
                    <h3 className="text-3xl font-bold mt-2">₹ {totalDisbursed.toLocaleString()}</h3>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Recovered YTD</p>
                    <h3 className="text-3xl font-bold text-emerald-600 mt-2">₹ 0</h3>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Active Loans</p>
                    <h3 className="text-3xl font-bold text-indigo-600 mt-2">{activeCount}</h3>
                </div>
            </div>

            {/* Loan List Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Employee</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Tenure</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-right">EMI</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Requested On</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {loading ? (
                                <tr><td colSpan="7" className="p-8 text-center text-slate-500">Loading loans...</td></tr>
                            ) : loans.length === 0 ? (
                                <tr><td colSpan="7" className="p-8 text-center text-slate-500">No loan records found.</td></tr>
                            ) : (
                                loans.map(loan => (
                                    <tr
                                        key={loan.id}
                                        onClick={() => openDetails(loan)}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            <div className="font-bold text-slate-800 dark:text-white">
                                                {/* Fallback chain for Name */}
                                                {loan.profiles?.full_name || loan.employee_name || 'Unknown User'}
                                            </div>
                                            <div className="text-xs text-slate-500">{loan.reason}</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold">₹{Number(loan.request_amount).toLocaleString()}</td>
                                        <td className="px-6 py-4">{loan.tenure_months} Months</td>
                                        <td className="px-6 py-4 text-right font-mono">₹{Math.round(loan.monthly_emi || 0).toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                                ${loan.status === 'active' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                                    loan.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                        loan.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                            'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                                {loan.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-500">
                                            {new Date(loan.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">View</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Loan Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Apply for Loan</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleApply} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Loan Type</label>
                                <select
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option>Personal Loan</option>
                                    <option>Salary Advance</option>
                                    <option>Emergency Fund</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g. 50000"
                                    value={formData.request_amount}
                                    onChange={e => setFormData({ ...formData, request_amount: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Tenure (Months)</label>
                                <select
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={formData.tenure_months}
                                    onChange={e => setFormData({ ...formData, tenure_months: e.target.value })}
                                >
                                    <option value="6">6 Months</option>
                                    <option value="12">12 Months</option>
                                    <option value="24">24 Months</option>
                                    <option value="36">36 Months</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Reason</label>
                                <textarea
                                    required
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px]"
                                    placeholder="Brief reason for the request..."
                                    value={formData.reason}
                                    onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Interest Rate:</span>
                                    <span className="font-bold text-emerald-600">0% (Company Policy)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 font-medium font-bold uppercase text-xs">Estimated Monthly Deduction:</span>
                                    <span className="text-xl font-bold text-indigo-600">
                                        ₹{(() => {
                                            const P = parseFloat(formData.request_amount) || 0;
                                            const N = parseInt(formData.tenure_months) || 12;

                                            if (P === 0) return 0;
                                            return Math.round(P / N).toLocaleString();
                                        })()}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-indigo-200"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View/Action Details Modal */}
            {isDetailModalOpen && selectedLoan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Loan Application Details</h3>
                            <button onClick={() => setIsDetailModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                                    {(selectedLoan.profiles?.full_name || selectedLoan.employee_name || 'U')[0].toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedLoan.profiles?.full_name || selectedLoan.employee_name || 'Unknown User'}
                                    </h4>
                                    <p className="text-sm text-slate-500">{selectedLoan.profiles?.email || 'No Email'}</p>
                                </div>
                                <div className="ml-auto">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                        ${selectedLoan.status === 'active' ? 'bg-indigo-100 text-indigo-700' :
                                            selectedLoan.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                                selectedLoan.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-amber-100 text-amber-700'}`}>
                                        {selectedLoan.status}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <p className="text-xs text-slate-500 font-bold uppercase">Amount</p>
                                    <p className="text-xl font-bold text-slate-800 dark:text-white">₹{Number(selectedLoan.request_amount).toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <p className="text-xs text-slate-500 font-bold uppercase">Tenure</p>
                                    <p className="text-xl font-bold text-slate-800 dark:text-white">{selectedLoan.tenure_months} Months</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <p className="text-xs text-slate-500 font-bold uppercase mb-2">Reason for Loan</p>
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                                    {selectedLoan.reason}
                                </p>
                            </div>

                            {/* Actions - Only show if pending AND if user is HR/Admin */}
                            {isHR ? (
                                <>
                                    {selectedLoan.status === 'pending' ? (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleAction(selectedLoan.id, 'rejected')}
                                                className="flex-1 py-3 text-red-600 font-bold bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                                            >
                                                Reject Application
                                            </button>
                                            <button
                                                onClick={() => handleAction(selectedLoan.id, 'approved')}
                                                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-200"
                                            >
                                                Approve Loan
                                            </button>
                                        </div>
                                    ) : selectedLoan.status === 'approved' ? (
                                        <button
                                            onClick={() => handleAction(selectedLoan.id, 'active')}
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
                                        >
                                            Disburse Money (Mark Active)
                                        </button>
                                    ) : (
                                        <div className="text-center text-slate-400 text-sm italic">
                                            This application has been closed/processed.
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-center">
                                    <p className="text-xs text-slate-500">
                                        Your request is currently <strong>{selectedLoan.status}</strong>.
                                        {selectedLoan.status === 'pending' && " Pending approval from HR."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoansAdvances;


