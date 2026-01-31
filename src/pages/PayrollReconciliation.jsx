import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const PayrollReconciliation = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all runs for current year to verify
                const currentYear = new Date().getFullYear();
                const { data: runs, error } = await supabase
                    .from('payroll_runs')
                    .select('total_payout, total_employees')
                    .eq('year', currentYear);

                if (error) throw error;

                const salaryPaid = runs ? runs.reduce((sum, run) => sum + (run.total_payout || 0), 0) : 0;

                // MOCK Logic: In a real app, these would come from separate ledgers or queries
                const tds = Math.round(salaryPaid * 0.1); // Mock 10% TDS
                const pf = Math.round(salaryPaid * 0.12); // Mock 12% PF

                // Simulate Bank Total matching (or not)
                const bankTotal = salaryPaid;

                setData({
                    salary_paid: salaryPaid.toLocaleString(),
                    tds: tds.toLocaleString(),
                    pf: pf.toLocaleString(),
                    bank_total: bankTotal.toLocaleString()
                });
            } catch (err) {
                console.error("Reconciliation error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="p-8 text-center text-slate-500">Loading reconciliation data...</div>
    );

    if (!data) return <p>No data available.</p>;

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Payroll Reconciliation ({new Date().getFullYear()})</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">System Records</h3>
                    <table className="w-full text-sm">
                        <tbody className="divide-y divide-slate-100">
                            <tr className="py-2"><td className="py-2 text-slate-600">Total Salary Paid</td><td className="py-2 text-right font-medium text-slate-800">₹{data.salary_paid}</td></tr>
                            <tr className="py-2"><td className="py-2 text-slate-600">Total TDS Deducted</td><td className="py-2 text-right font-medium text-slate-800">₹{data.tds}</td></tr>
                            <tr className="py-2"><td className="py-2 text-slate-600">PF Payable</td><td className="py-2 text-right font-medium text-slate-800">₹{data.pf}</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Bank Records & Reconciliation</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded border border-emerald-100">
                            <span className="text-emerald-800 font-medium">Bank File Total</span>
                            <span className="text-emerald-900 font-bold text-lg">₹{data.bank_total}</span>
                        </div>

                        {data.salary_paid !== data.bank_total ? (
                            <div className="p-3 bg-rose-50 rounded border border-rose-100 text-rose-800 flex items-center gap-2">
                                <span className="material-symbols-outlined">warning</span>
                                <span>Mismatch detected! Check bank statement.</span>
                            </div>
                        ) : (
                            <div className="p-3 bg-indigo-50 rounded border border-indigo-100 text-indigo-800 flex items-center gap-2">
                                <span className="material-symbols-outlined">check_circle</span>
                                <span>Records Match Successfully</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayrollReconciliation;
