import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const EmployeePayslips = () => {
    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayslips = async () => {
            try {
                // Fetch user's payslips (assuming RLS or logged in user)
                // For now fetching all or limiting to current user if possible
                const { data: { user } } = await supabase.auth.getUser();

                let query = supabase
                    .from('payslips')
                    .select('*, payroll_runs(month, year)')
                    .order('payment_date', { ascending: false });

                if (user) {
                    query = query.eq('user_id', user.id);
                }

                const { data, error } = await query;

                if (error) {
                    console.error("Supabase Error:", error);
                    // Fallback for demo if DB is empty/error
                    setPayslips([]);
                } else {
                    setPayslips(data || []);
                }
            } catch (err) {
                console.error("Error fetching payslips:", err);
                setPayslips([]); // Ensure state is cleared on error
            } finally {
                setLoading(false);
            }
        };

        fetchPayslips();
    }, []);

    const handleDownload = (id) => {
        alert("Downloading PDF for Payslip ID: " + id);
        // Implement actual PDF download logic here or link to backend
    };

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">My Payslips</h1>
                <p className="text-slate-500 mt-2">View and download your monthly salary statements.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Month</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Payment Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Gross Pay</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Deductions</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Net Pay</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="6" className="p-8 text-center text-slate-500">Loading payslips...</td></tr>
                            ) : payslips.length === 0 ? (
                                <tr><td colSpan="6" className="p-8 text-center text-slate-500">No payslips found.</td></tr>
                            ) : (
                                payslips.map((slip) => (
                                    <tr key={slip.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {slip.payroll_runs ? `${slip.payroll_runs.month}` : 'Unknown Period'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {slip.payment_date ? new Date(slip.payment_date).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-600">₹{slip.gross_salary?.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right text-red-500">-₹{slip.deductions?.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-bold text-emerald-600">₹{slip.net_salary?.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDownload(slip.id)}
                                                className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors flex items-center justify-center mx-auto"
                                                title="Download PDF"
                                            >
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
    );
};

export default EmployeePayslips;
