import React, { useState, useEffect } from 'react';
import { taxService } from '../services/taxService';
import { useToast } from '../context/ToastContext';

const TaxDeclaration = () => {
    const { showSuccess, showError } = useToast();
    const [declarations, setDeclarations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adminRemarks, setAdminRemarks] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await taxService.getAll();
            setDeclarations(data || []);
            if (data && data.length > 0) {
                // Select first pending if available, else first
                const firstPending = data.find(d => d.status === 'pending');
                setSelectedId(firstPending ? firstPending.id : data[0].id);
            }
        } catch (error) {
            console.error(error);
            showError("Failed to load tax declarations");
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (status) => {
        if (!selectedId) return;
        try {
            await taxService.updateStatus(selectedId, status, adminRemarks);
            showSuccess(`Declaration marked as ${status}`);

            // Update local state
            setDeclarations(declarations.map(d =>
                d.id === selectedId ? { ...d, status, admin_remarks: adminRemarks } : d
            ));
        } catch (error) {
            showError(`Failed to ${status} declaration`);
        }
    };

    const activeDeclaration = declarations.find(d => d.id === selectedId);

    const filteredDeclarations = filterStatus === 'All'
        ? declarations
        : declarations.filter(d => statusFilter(d, filterStatus));

    function statusFilter(d, filter) {
        if (filter === 'All') return true;
        if (filter === 'Pending') return d.status === 'pending';
        if (filter === 'Verified') return d.status === 'verified';
        if (filter === 'Rejected') return d.status === 'rejected';
        if (filter === 'Clarification') return d.status === 'clarification_needed';
        return true;
    }

    // Calculations
    const totalDeclared = activeDeclaration ?
        (activeDeclaration.total_80c_amount || 0) +
        (activeDeclaration.total_80d_amount || 0) +
        (activeDeclaration.hra_total_rent || 0)
        : 0;

    const handleClarification = async () => {
        if (!selectedId) return;

        let remarks = adminRemarks;
        if (!remarks) {
            remarks = prompt("Enter clarification question for the employee:");
            if (!remarks) return; // User cancelled
            setAdminRemarks(remarks);
        }

        try {
            await taxService.updateStatus(selectedId, 'clarification_needed', remarks);
            showSuccess(`Clarification requested`);

            // Update local state
            setDeclarations(declarations.map(d =>
                d.id === selectedId ? { ...d, status: 'clarification_needed', admin_remarks: remarks } : d
            ));
        } catch (error) {
            console.error(error);
            showError(`Failed to submit request`);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#121117] dark:text-white min-h-screen font-display flex flex-col h-screen overflow-hidden">
            <main className="flex-1 flex overflow-hidden">
                {/* Left Content: List & Controls */}
                <div className="flex-1 flex flex-col overflow-y-auto px-4 lg:px-8 py-8">
                    {/* Page Heading (No Breadcrumbs, No Header) */}
                    <div className="flex flex-wrap justify-between items-end gap-3 px-4 py-4">
                        <div className="flex min-w-72 flex-col gap-1">
                            <h1 className="text-[#121117] dark:text-white text-3xl font-black leading-tight tracking-tight">Tax Declaration Review</h1>
                            <p className="text-[#656487] dark:text-gray-400 text-base font-normal leading-normal">
                                FY {activeDeclaration?.financial_year || '2023-24'} • {declarations.filter(d => d.status === 'pending').length} submissions pending review
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {/* Keep Filter/Export only if needed by user, they seemed OK with content area */}
                            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white text-sm font-bold gap-2">
                                <span className="material-symbols-outlined text-lg">download</span>
                                <span>Export Report</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-4">
                        <div className="flex border-b border-[#dcdce5] dark:border-[#2a2a3a] gap-8 overflow-x-auto scrollbar-hide">
                            {['All', 'Pending', 'Verified', 'Rejected', 'Clarification'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap px-2 transition-colors ${filterStatus === status ? 'border-b-primary text-primary' : 'border-b-transparent text-[#656487] hover:text-primary'}`}
                                >
                                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                                        {status} ({declarations.filter(d => statusFilter(d, status)).length})
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="px-4 py-6 flex-1">
                        <div className="flex flex-col overflow-hidden rounded-xl border border-[#dcdce5] dark:border-[#2a2a3a] bg-white dark:bg-[#1a192a] shadow-sm h-full">
                            <div className="overflow-auto flex-1">
                                <table className="w-full text-left border-collapse relative">
                                    <thead className="sticky top-0 z-10 bg-[#f9fafb] dark:bg-[#212035] shadow-sm">
                                        <tr className="border-b border-[#dcdce5] dark:border-[#2a2a3a]">
                                            <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Employee</th>
                                            <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Employee ID</th>
                                            <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Total Declared</th>
                                            <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Submission Date</th>
                                            <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider text-center">Status</th>
                                            <th className="px-6 py-4 text-[#656487] dark:text-gray-300 text-xs font-bold uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#dcdce5] dark:divide-[#2a2a3a]">
                                        {loading ? (
                                            <tr><td colSpan="6" className="p-8 text-center text-[#656487]">Loading...</td></tr>
                                        ) : filteredDeclarations.length === 0 ? (
                                            <tr><td colSpan="6" className="p-8 text-center text-[#656487]">No declarations found.</td></tr>
                                        ) : (
                                            filteredDeclarations.map(decl => (
                                                <tr
                                                    key={decl.id}
                                                    onClick={() => { setSelectedId(decl.id); setAdminRemarks(decl.admin_remarks || ''); }}
                                                    className={`hover:bg-[#f9fafb] dark:hover:bg-[#212035] transition-colors border-l-4 cursor-pointer ${selectedId === decl.id ? 'bg-primary/5 border-l-primary' : 'bg-white dark:bg-[#1a192a] border-l-transparent'
                                                        }`}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs bg-cover"
                                                                style={{ backgroundImage: `url("${decl.employee?.avatar_url || ''}")` }}>
                                                                {!decl.employee?.avatar_url && (decl.employee?.first_name?.[0] || 'U')}
                                                            </div>
                                                            <span className="text-[#121117] dark:text-white font-semibold text-sm">
                                                                {decl.employee ? `${decl.employee.first_name} ${decl.employee.last_name}` : 'Unknown'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">
                                                        EMP-{decl.employee?.id?.substring(0, 4).toUpperCase()}
                                                    </td>
                                                    <td className="px-6 py-4 text-[#121117] dark:text-white font-medium text-sm">
                                                        ₹{(decl.total_80c_amount + decl.total_80d_amount + decl.hra_total_rent).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-[#656487] dark:text-gray-300 text-sm">
                                                        {new Date(decl.submission_date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${decl.status === 'verified' ? 'bg-green-100 text-green-800' :
                                                                decl.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                                                                    decl.status === 'clarification_needed' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-amber-100 text-amber-800'
                                                            }`}>
                                                            {decl.status === 'pending' ? 'Pending' :
                                                                decl.status === 'verified' ? 'Verified' :
                                                                    decl.status === 'rejected' ? 'Rejected' : 'Clarification'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-primary font-bold text-sm hover:underline">
                                                            {selectedId === decl.id ? 'Reviewing' : 'View'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Panel: Review Details */}
                {activeDeclaration && (
                    <aside className="w-[480px] bg-white dark:bg-[#1a192a] border-l border-[#dcdce5] dark:border-[#2a2a3a] flex flex-col shadow-2xl relative z-10 transition-transform">
                        <div className="p-6 border-b border-[#dcdce5] dark:border-[#2a2a3a] flex items-center justify-between sticky top-0 bg-white dark:bg-[#1a192a] z-20">
                            <div className="flex flex-col">
                                <h3 className="text-xl font-bold text-[#121117] dark:text-white">Declaration Details</h3>
                                <p className="text-sm text-[#656487] dark:text-gray-400 font-medium">
                                    {activeDeclaration.employee ? `${activeDeclaration.employee.first_name} ${activeDeclaration.employee.last_name}` : 'Employee'} • {activeDeclaration.financial_year}
                                </p>
                            </div>
                            <button onClick={() => setSelectedId(null)} className="text-[#656487] hover:text-rose-500">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Section 80C */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Section 80C</h4>
                                    <span className="text-sm font-bold text-[#121117] dark:text-white">₹{activeDeclaration.total_80c_amount?.toLocaleString() || 0}</span>
                                </div>
                                <div className="space-y-3">
                                    {activeDeclaration.section_80c_items?.map((item, idx) => (
                                        <div key={idx} className="flex flex-col p-4 bg-background-light dark:bg-[#212035] rounded-lg border border-[#dcdce5] dark:border-[#2a2a3a]">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold text-[#121117] dark:text-white">{item.name}</span>
                                                <span className="text-xs font-bold text-[#656487] dark:text-gray-400">₹{item.amount?.toLocaleString()}</span>
                                            </div>
                                            {item.doc_url ? (
                                                <a className="flex items-center gap-2 text-primary text-xs font-bold hover:underline" href={item.doc_url} target="_blank" rel="noreferrer">
                                                    <span className="material-symbols-outlined text-sm">description</span>
                                                    View Receipt
                                                </a>
                                            ) : (
                                                <span className="text-xs text-amber-500 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[10px]">warning</span> No Receipt
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                    {(!activeDeclaration.section_80c_items || activeDeclaration.section_80c_items.length === 0) && (
                                        <p className="text-sm text-[#656487] italic">No 80C items declared.</p>
                                    )}
                                </div>
                            </section>

                            {/* Section 80D */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Section 80D</h4>
                                    <span className="text-sm font-bold text-[#121117] dark:text-white">₹{activeDeclaration.total_80d_amount?.toLocaleString() || 0}</span>
                                </div>
                                <div className="space-y-3">
                                    {activeDeclaration.section_80d_items?.map((item, idx) => (
                                        <div key={idx} className="flex flex-col p-4 bg-background-light dark:bg-[#212035] rounded-lg border border-[#dcdce5] dark:border-[#2a2a3a]">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold text-[#121117] dark:text-white">{item.name}</span>
                                                <span className="text-xs font-bold text-[#656487] dark:text-gray-400">₹{item.amount?.toLocaleString()}</span>
                                            </div>
                                            {item.doc_url && (
                                                <a className="flex items-center gap-2 text-primary text-xs font-bold hover:underline" href={item.doc_url} target="_blank" rel="noreferrer">
                                                    <span className="material-symbols-outlined text-sm">description</span>
                                                    View Policy
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                    {(!activeDeclaration.section_80d_items || activeDeclaration.section_80d_items.length === 0) && (
                                        <p className="text-sm text-[#656487] italic">No 80D items declared.</p>
                                    )}
                                </div>
                            </section>

                            {/* HRA */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">House Rent (HRA)</h4>
                                    <span className="text-sm font-bold text-[#121117] dark:text-white">₹{activeDeclaration.hra_total_rent?.toLocaleString() || 0} /yr</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex flex-col p-4 bg-background-light dark:bg-[#212035] rounded-lg border border-[#dcdce5] dark:border-[#2a2a3a]">
                                        <div className="flex flex-col gap-1 mb-3">
                                            <span className="text-sm font-semibold text-[#121117] dark:text-white">Rent Receipts</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {activeDeclaration.hra_receipts?.length > 0 ? (
                                                activeDeclaration.hra_receipts.map((url, idx) => (
                                                    <a key={idx} className="flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold hover:bg-primary/20 transition-colors" href={url} target="_blank" rel="noreferrer">
                                                        <span className="material-symbols-outlined text-sm">attachment</span>
                                                        Receipt_{idx + 1}
                                                    </a>
                                                ))
                                            ) : (
                                                <span className="text-sm text-[#656487] italic">No receipts uploaded.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Admin Remarks */}
                            <section className="pb-24">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-[#656487] dark:text-gray-400 mb-4">Admin Remarks</h4>
                                <textarea
                                    className="w-full bg-background-light dark:bg-[#212035] border border-[#dcdce5] dark:border-[#2a2a3a] rounded-lg p-3 text-sm focus:ring-primary focus:border-primary text-[#121117] dark:text-white placeholder:text-[#656487]"
                                    placeholder="Add notes for the employee or internal verification notes..."
                                    rows="3"
                                    value={adminRemarks}
                                    onChange={(e) => setAdminRemarks(e.target.value)}
                                ></textarea>
                            </section>
                        </div>

                        {/* Side Panel Action Footer */}
                        <div className="p-6 border-t border-[#dcdce5] dark:border-[#2a2a3a] bg-white dark:bg-[#1a192a] flex flex-col gap-3 sticky bottom-0 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                            {activeDeclaration.status === 'pending' || activeDeclaration.status === 'clarification_needed' ? (
                                <>
                                    <div className="flex gap-3">
                                        <button onClick={() => handleAction('rejected')} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-lg">close</span>
                                            Reject
                                        </button>
                                        <button onClick={() => handleAction('verified')} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-lg">check_circle</span>
                                            Verify
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleClarification}
                                        className="w-full bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white font-bold py-2.5 rounded-lg text-sm transition-colors hover:bg-[#e2e2e8] flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-lg">question_answer</span>
                                        Request Clarification
                                    </button>
                                </>
                            ) : (
                                <div className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 ${activeDeclaration.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
                                    <span className="material-symbols-outlined text-lg">{activeDeclaration.status === 'verified' ? 'check_circle' : 'block'}</span>
                                    Previously {activeDeclaration.status}
                                </div>
                            )}
                        </div>
                    </aside>
                )}
            </main>
        </div>
    );
};

export default TaxDeclaration;
