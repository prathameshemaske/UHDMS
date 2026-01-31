import React, { useState, useEffect } from 'react';
import { complianceService } from '../services/complianceService';
import { useToast } from '../context/ToastContext';

const Compliance = () => {
    const { showSuccess, showError } = useToast();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('All Types');

    useEffect(() => {
        loadHistory();
    }, []);

    const [error, setError] = useState(null);

    const loadHistory = async () => {
        try {
            const data = await complianceService.getHistory();
            setHistory(data || []);
        } catch (err) {
            console.error("Compliance Load Error:", err);
            // Don't block the UI, just show empty state or error message
            setError("Could not load history. Please checking database connection.");
            setHistory([]);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async (type, period) => {
        if (!confirm(`Generate and file ${type} for ${period}?`)) return;
        try {
            await complianceService.generateReport(type, period);
            showSuccess(`${type} generated successfully!`);
            loadHistory();
        } catch (error) {
            showError("Failed to generate report");
        }
    };

    const handleDownload = () => {
        alert("This would download the actual CSV/PDF file in a real deployment.");
    };

    const filteredHistory = filterType === 'All Types'
        ? history
        : history.filter(h => h.type === filterType);

    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const currentQuarter = `Q${Math.floor((new Date().getMonth() + 3) / 3)} ${new Date().getFullYear()}`;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#121117] dark:text-white min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Simplified Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="max-w-2xl">
                        <h1 className="text-[#121117] dark:text-white text-3xl font-black tracking-tight mb-2">Statutory Compliance (India)</h1>
                        <p className="text-[#656487] dark:text-white/60 text-base">Manage Filing of PF (Form 5/10/12A), ESI, and TDS (Form 24Q) returns.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#f1f0f4] dark:border-white/10 rounded-lg bg-white dark:bg-[#1a192a] text-sm font-semibold hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-lg">calendar_month</span>
                            <span>FY {new Date().getFullYear()}-{new Date().getFullYear() + 1}</span>
                        </button>
                    </div>
                </div>

                {/* Action Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* PF Electronic Challan */}
                    <div className="bg-white dark:bg-[#1a192a] border border-[#f1f0f4] dark:border-white/10 rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000')" }}></div>
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-bold mb-1">PF Electronic Challan</h3>
                            <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">EPFO India</p>
                            <p className="text-sm text-[#656487] dark:text-white/60 mb-6">Process Form 5, 10, & 12A. Monthly provident fund contributions.</p>
                            <div className="mt-auto flex flex-col gap-2">
                                <button
                                    onClick={() => handleGenerate('PF Challan', currentMonth)}
                                    className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                                    <span className="material-symbols-outlined text-lg">autorenew</span>
                                    File for {currentMonth}
                                </button>
                                <button onClick={handleDownload} className="w-full py-2.5 border border-primary/20 text-primary dark:text-primary dark:border-primary/40 rounded-lg text-sm font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Download ECR File
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ESI Contribution Report */}
                    <div className="bg-white dark:bg-[#1a192a] border border-[#f1f0f4] dark:border-white/10 rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000')" }}></div>
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-bold mb-1">ESI Contribution</h3>
                            <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">ESIC Portal</p>
                            <p className="text-sm text-[#656487] dark:text-white/60 mb-6">Monthly ESIC contribution summary and individual deductions.</p>
                            <div className="mt-auto flex flex-col gap-2">
                                <button
                                    onClick={() => handleGenerate('ESI Contribution', currentMonth)}
                                    className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                                    <span className="material-symbols-outlined text-lg">autorenew</span>
                                    File for {currentMonth}
                                </button>
                                <button onClick={handleDownload} className="w-full py-2.5 border border-primary/20 text-primary dark:text-primary dark:border-primary/40 rounded-lg text-sm font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Download Excel
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TDS Quarterly Return */}
                    <div className="bg-white dark:bg-[#1a192a] border border-[#f1f0f4] dark:border-white/10 rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=1000')" }}></div>
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-bold mb-1">TDS Quarterly (Form 24Q)</h3>
                            <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">Income Tax Dept</p>
                            <p className="text-sm text-[#656487] dark:text-white/60 mb-6">Quarterly income tax returns (24Q) for employee salary deductions.</p>
                            <div className="mt-auto flex flex-col gap-2">
                                <button
                                    onClick={() => handleGenerate('TDS Return', currentQuarter)}
                                    className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                                    <span className="material-symbols-outlined text-lg">autorenew</span>
                                    File for {currentQuarter}
                                </button>
                                <button onClick={handleDownload} className="w-full py-2.5 border border-primary/20 text-primary dark:text-primary dark:border-primary/40 rounded-lg text-sm font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Download FVU File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filing History Table */}
                <div className="bg-white dark:bg-[#1a192a] border border-[#f1f0f4] dark:border-white/10 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-[#f1f0f4] dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-lg font-bold">Compliance Filing History</h3>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#656487] text-lg">filter_list</span>
                                <select
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="pl-10 pr-8 py-1.5 rounded-lg border border-[#f1f0f4] dark:border-white/10 bg-white dark:bg-white/5 text-sm appearance-none focus:ring-primary outline-none">
                                    <option>All Types</option>
                                    <option>PF Challan</option>
                                    <option>ESI Contribution</option>
                                    <option>TDS Return</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-background-light/50 dark:bg-white/5">
                                    <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Report Type</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Filing Period</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Submission Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Acknowledgment #</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#656487] dark:text-white/40 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f1f0f4] dark:divide-white/5">
                                {loading ? (
                                    <tr><td colSpan="6" className="p-6 text-center text-sm text-[#656487]">Loading...</td></tr>
                                ) : filteredHistory.length === 0 ? (
                                    <tr><td colSpan="6" className="p-6 text-center text-sm text-[#656487]">No filing history found.</td></tr>
                                ) : (
                                    filteredHistory?.map((item) => (
                                        <tr key={item.id} className="hover:bg-background-light/30 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">description</span>
                                                    <span className="text-sm font-semibold">{item.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">{item.period}</td>
                                            <td className="px-6 py-4 text-sm">{new Date(item.submission_date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-sm font-mono text-primary">{item.acknowledgment_number}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 flex items-center w-fit gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Filed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={handleDownload} className="text-[#656487] dark:text-white/60 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">download</span>
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
    );
};

export default Compliance;
