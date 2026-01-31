import React from 'react';

const SalaryModal = ({ payslip, onClose }) => {
    if (!payslip) return null;

    // Parse numeric values safely
    const basic = Number(payslip.basic_salary) || 0;
    const gross = Number(payslip.final_gross) || 0; // Assuming this includes HRA/Allowances
    const net = Number(payslip.net_salary) || 0;
    const pf = Number(payslip.pf) || 0;
    const tds = Number(payslip.tds) || 0;
    const totalDeductions = Number(payslip.deductions) || 0;

    // Estimate HRA/Allowances from Gross - Basic (since we didn't save breakdown explicitly in payslip, only in structure)
    // Ideally, payslip table should store these. For now, we derive:
    const allowances = gross - basic;

    // Other deductions (Loans/Leaves) = Total Deductions - (PF + TDS)
    const otherDeductions = totalDeductions - (pf + tds);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-100">
                {/* Header - Lighter Theme */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Payslip Details</h2>
                        <p className="text-indigo-100 text-sm mt-1 opacity-90">Confidential & Private</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Employee Info */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Employee Name</p>
                            <p className="font-bold text-slate-800 text-lg">{payslip.full_name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Pay Period</p>
                            <p className="font-semibold text-slate-800">Current Month</p>
                        </div>
                    </div>
                </div>

                {/* Salary Breakdown */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Earnings */}
                    <div>
                        <h3 className="text-emerald-700 font-bold uppercase text-xs tracking-wider mb-5 border-b border-emerald-100 pb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Earnings
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-baseline">
                                <span className="text-slate-600 font-medium">Basic Salary</span>
                                <span className="font-bold text-slate-800">₹{basic.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-slate-600 font-medium">HRA & Allowances</span>
                                <span className="font-bold text-slate-800">₹{allowances.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-slate-100 mt-2">
                                <span className="font-bold text-slate-700 text-base">Gross Pay</span>
                                <span className="font-bold text-slate-900 text-base">₹{gross.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Deductions */}
                    <div>
                        <h3 className="text-rose-700 font-bold uppercase text-xs tracking-wider mb-5 border-b border-rose-100 pb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Deductions
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-baseline">
                                <span className="text-slate-600 font-medium">Provident Fund (PF)</span>
                                <span className="font-bold text-slate-800">₹{pf.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-slate-600 font-medium">Tax (TDS)</span>
                                <span className="font-bold text-slate-800">₹{tds.toLocaleString()}</span>
                            </div>
                            {otherDeductions > 0 && (
                                <div className="flex justify-between items-baseline">
                                    <span className="text-slate-600 font-medium">Loans & Leaves</span>
                                    <span className="font-bold text-slate-800">₹{otherDeductions.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-3 border-t border-slate-100 mt-2">
                                <span className="font-bold text-slate-700 text-base">Total Deductions</span>
                                <span className="font-bold text-rose-600 text-base">- ₹{totalDeductions.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Net Pay */}
                <div className="mx-6 mb-6 bg-slate-50 rounded-xl border border-slate-200 p-6 flex justify-between items-center">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Net Payable Amount</p>
                        <p className="text-slate-400 text-xs">Gross Earnings - Total Deductions</p>
                    </div>
                    <div className="text-3xl font-extrabold text-indigo-700">
                        ₹{net.toLocaleString()}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all"
                    >
                        Close
                    </button>
                    <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalaryModal;
