import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const SalaryHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Fetch payslips with run details (month/year)
                const { data, error } = await supabase
                    .from('payslips')
                    .select(`
                        id,
                        gross_salary,
                        net_salary,
                        deductions,
                        payroll_runs (
                            month,
                            year
                        ),
                        profiles:user_id (
                            first_name,
                            last_name
                        )
                    `)
                    .order('id', { ascending: false }); // Latest first

                if (error) throw error;

                if (data) {
                    setHistory(data);
                }
            } catch (err) {
                console.error("Salary History Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Salary Payment History</h2>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600">Period</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Employee</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Gross Pay</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right text-red-500">Deductions</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right text-emerald-600">Net Pay</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan="6" className="p-6 text-center text-slate-500">Loading history...</td></tr>
                        ) : history.length === 0 ? (
                            <tr><td colSpan="6" className="p-6 text-center text-slate-500">No payment history found.</td></tr>
                        ) : (
                            history.map((record) => (
                                <tr key={record.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {record.payroll_runs?.month || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {record.profiles ? `${record.profiles.first_name} ${record.profiles.last_name}` : 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-600">₹{record.gross_salary?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-red-500">-₹{record.deductions?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-bold text-emerald-600">₹{record.net_salary?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-50 transition">
                                            Slip
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalaryHistory;
