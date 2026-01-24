import React, { useState, useEffect } from 'react';
import { reimbursementService } from '../services/reimbursementService';

const BonusReimbursement = () => {
    const [reimbursements, setReimbursements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await reimbursementService.getAll();
                setReimbursements(data || []);
            } catch (error) {
                console.error("Failed to load reimbursements", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleNewEntry = async () => {
        const description = prompt("Enter Description:");
        if (!description) return;
        const amount = prompt("Enter Amount:");
        if (!amount) return;
        const category = prompt("Enter Category (Travel, Internet, Food, etc):");

        try {
            const newReimbursement = await reimbursementService.create({
                description,
                amount: parseFloat(amount),
                category
            });
            setReimbursements([newReimbursement, ...reimbursements]);
            alert("Reimbursement Request Created!");
        } catch (error) {
            console.error("Failed to create reimbursement", error);
            alert("Failed to create request. Ensure you are logged in.");
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white min-h-screen font-display p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* PageHeading */}
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
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-[#e5e7eb] dark:border-white/10 rounded-lg text-sm font-bold text-[#121117] dark:text-white hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-lg">download</span>
                            <span>Export Report</span>
                        </button>
                        <button onClick={handleNewEntry} className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                            <span className="material-symbols-outlined text-lg">add</span>
                            <span>New Entry</span>
                        </button>
                    </div>
                </div>
                {/* Tabs */}
                <div className="border-b border-[#e5e7eb] dark:border-white/10 flex gap-8">
                    <a className="group relative py-4 px-1 text-sm font-bold text-[#656487] dark:text-gray-400 hover:text-primary transition-colors" href="#">
                        Bonuses
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-primary/30"></span>
                    </a>
                    <a className="relative py-4 px-1 text-sm font-bold text-primary" href="#">
                        Reimbursements
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                    </a>
                    <a className="group relative py-4 px-1 text-sm font-bold text-[#656487] dark:text-gray-400 hover:text-primary transition-colors" href="#">
                        Audit Logs
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-primary/30"></span>
                    </a>
                </div>
                {/* Toolbar */}
                <div className="bg-white dark:bg-white/5 rounded-xl border border-[#e5e7eb] dark:border-white/10 p-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-[#f1f0f4] dark:bg-white/5 p-1 rounded-lg">
                            <button className="px-3 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-white/10 shadow-sm text-primary">All Claims</button>
                            <button className="px-3 py-1.5 text-xs font-bold rounded-md text-[#656487] hover:text-[#121117] dark:text-gray-400 transition-colors">Pending</button>
                            <button className="px-3 py-1.5 text-xs font-bold rounded-md text-[#656487] hover:text-[#121117] dark:text-gray-400 transition-colors">Approved</button>
                        </div>
                        <div className="h-6 w-[1px] bg-[#e5e7eb] dark:bg-white/10 mx-2"></div>
                        <button className="p-2 text-[#656487] hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-xl">tune</span>
                        </button>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all">
                        <span className="material-symbols-outlined text-xl fill-icon" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span>Bulk Approve Selected</span>
                    </button>
                </div>
                {/* Data Table */}
                <div className="bg-white dark:bg-white/5 rounded-xl border border-[#e5e7eb] dark:border-white/10 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#f9fafb] dark:bg-white/5 border-b border-[#e5e7eb] dark:border-white/10">
                                <th className="px-6 py-4 w-12">
                                    <input className="rounded text-primary focus:ring-primary bg-white dark:bg-white/10 border-[#e5e7eb] dark:border-white/20" type="checkbox" />
                                </th>
                                <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Description</th>
                                <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Expense Category</th>
                                <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider text-center">Receipt</th>
                                <th className="px-4 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e5e7eb] dark:divide-white/10">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-10 text-center text-[#656487]">Loading reimbursements...</td>
                                </tr>
                            ) : reimbursements.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-10 text-center text-[#656487]">No reimbursement records found.</td>
                                </tr>
                            ) : (
                                reimbursements.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#f9fafb] dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input className="rounded text-primary focus:ring-primary bg-white dark:bg-white/10 border-[#e5e7eb] dark:border-white/20" type="checkbox" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Placeholder Logic for Initials/Avatar since simplified table usually shows requestor but here showing description as primary col */}
                                                <div>
                                                    <p className="text-sm font-bold text-[#121117] dark:text-white">{item.description}</p>
                                                    <p className="text-[10px] text-[#656487] dark:text-gray-400">{new Date(item.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">{item.category}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm font-mono font-bold text-[#121117] dark:text-white">${item.amount}</p>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <button className="text-primary hover:text-primary/80 transition-colors" title="View Receipt">
                                                <span className="material-symbols-outlined">receipt_long</span>
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className={`flex items-center gap-1.5 ${item.status === 'approved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                                <span className="size-1.5 rounded-full bg-current"></span>
                                                <span className="text-xs font-bold capitalize">{item.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1 hover:bg-primary/10 rounded text-[#656487] dark:text-gray-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-xl">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="px-6 py-4 bg-[#f9fafb] dark:bg-white/5 border-t border-[#e5e7eb] dark:border-white/10 flex items-center justify-between">
                        <p className="text-xs text-[#656487] dark:text-gray-400 font-medium">Showing {reimbursements.length} results</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BonusReimbursement;
