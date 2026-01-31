import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import SalaryModal from "../components/payroll/SalaryModal";
import { payrollDataService } from "../services/payrollDataService";

const PayrollDashboard = () => {
    const [month, setMonth] = useState(new Date().getMonth()); // 0-indexed for Date
    const [year, setYear] = useState(new Date().getFullYear());
    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState(null);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const loadPayslips = async () => {
        setLoading(true);
        try {
            // Find the run for this month/year
            const runMonthStr = `${monthNames[month]} ${year}`;
            console.log("Searching for run:", runMonthStr);

            const { data: runs, error: runError } = await supabase
                .from('payroll_runs')
                .select('id')
                .eq('month', runMonthStr)
                .eq('year', year)
                .limit(1);

            if (runError) {
                console.error("Error fetching runs:", runError);
            }

            console.log("Runs found:", runs);

            if (runs && runs.length > 0) {
                const runId = runs[0].id;
                console.log("Run ID:", runId);

                // Fetch payslips for this run
                const { data: slips, error } = await supabase
                    .from('payslips')
                    .select('*, profiles:user_id(full_name)') // Join with profiles
                    .eq('run_id', runId);

                if (error) {
                    console.error("Error fetching payslips:", error);
                    throw error;
                }

                console.log("Payslips fetched raw:", slips);

                // Transform data for display
                const formattedSlips = slips.map(s => ({
                    ...s,
                    full_name: s.profiles?.full_name || 'Unknown',
                    final_gross: s.basic_salary + (s.additions || 0), // Simplified
                    pf: Math.round(s.basic_salary * 0.12), // Mock PF if not in DB
                    tds: Math.round(s.basic_salary * 0.10) // Mock TDS
                }));
                console.log("Formatted slips:", formattedSlips);
                setPayslips(formattedSlips);
            } else {
                console.log("No run found for this month.");
                setPayslips([]);
            }
        } catch (error) {
            console.error("Error loading payslips:", error);
        } finally {
            setLoading(false);
        }
    };

    const runPayroll = async () => {
        setLoading(true);
        try {
            await payrollDataService.generatePayrollRun();
            loadPayslips();
            alert("Payroll run completed successfully!");
        } catch (error) {
            console.error("Run error", error);
            alert("Failed to run payroll: " + (error.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    const totals = payslips.reduce(
        (acc, p) => {
            acc.gross += Number(p.final_gross || 0);
            acc.pf += Number(p.pf || 0);
            acc.tds += Number(p.tds || 0);
            acc.net += Number(p.net_salary || 0);
            return acc;
        },
        { gross: 0, pf: 0, tds: 0, net: 0 }
    );

    useEffect(() => {
        loadPayslips();
    }, [month, year]);

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Payroll Dashboard</h2>

            <div className="flex gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm items-center">
                <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="border border-slate-300 rounded px-3 py-2 text-sm bg-white"
                >
                    {monthNames.map((m, i) => (
                        <option key={i} value={i}>{m}</option>
                    ))}
                </select>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="border border-slate-300 rounded px-3 py-2 text-sm w-24 bg-white"
                />
                <button
                    onClick={loadPayslips}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                    Load
                </button>
                <button
                    onClick={runPayroll}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Run Payroll'}
                </button>
            </div>

            {loading && <p className="text-slate-500 text-sm">Loading data...</p>}

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-slate-700">Employee</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">Gross Salary</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">PF</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">TDS</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">Net Salary</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {payslips.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                    No records found for this month. Click "Run Payroll" to generate.
                                </td>
                            </tr>
                        ) : (
                            payslips.map((p) => (
                                <tr
                                    key={p.id}
                                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                                    onClick={() => setSelectedPayslip(p)}
                                >
                                    <td className="px-6 py-3 font-medium text-slate-900">{p.full_name}</td>
                                    <td className="px-6 py-3 text-slate-600">₹{p.final_gross?.toLocaleString()}</td>
                                    <td className="px-6 py-3 text-slate-600">₹{p.pf?.toLocaleString()}</td>
                                    <td className="px-6 py-3 text-slate-600">₹{p.tds?.toLocaleString()}</td>
                                    <td className="px-6 py-3 font-bold text-emerald-700">₹{p.net_salary?.toLocaleString()}</td>
                                    <td className="px-6 py-3">
                                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">View</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    {payslips.length > 0 && (
                        <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                            <tr>
                                <td className="px-6 py-3 text-slate-900">Total</td>
                                <td className="px-6 py-3 text-slate-900">₹{totals.gross.toLocaleString()}</td>
                                <td className="px-6 py-3 text-slate-900">₹{totals.pf.toLocaleString()}</td>
                                <td className="px-6 py-3 text-slate-900">₹{totals.tds.toLocaleString()}</td>
                                <td className="px-6 py-3 text-emerald-700">₹{totals.net.toLocaleString()}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>

            {selectedPayslip && (
                <SalaryModal
                    payslip={selectedPayslip}
                    onClose={() => setSelectedPayslip(null)}
                />
            )}
        </div>
    );
};

export default PayrollDashboard;
