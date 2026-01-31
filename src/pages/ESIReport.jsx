import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ESIReport = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch payslips with employee details
                const { data: slips, error } = await supabase
                    .from('payslips')
                    .select('*, profiles:user_id(full_name, id)')
                    .limit(20); // Limit for demo

                if (error) throw error;

                if (slips) {
                    const mapped = slips.map(s => {
                        const gross = s.gross_salary || 0;
                        return {
                            employee_id: s.user_id,
                            name: s.profiles?.full_name || 'Unknown',
                            gross: gross,
                            esi_employee: Math.round(gross * 0.0075), // 0.75%
                            esi_employer: Math.round(gross * 0.0325)  // 3.25%
                        };
                    });
                    setData(mapped);
                }
            } catch (err) {
                console.error("ESI Report Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDownload = () => {
        if (!data.length) return alert("No data to download");

        const headers = ["Employee ID, Name, Gross Wages, Employee Cont., Employer Cont."];
        const rows = data.map(r => `${r.employee_id}, "${r.name}", ${r.gross}, ${r.esi_employee}, ${r.esi_employer}`);

        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "esi_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">ESI Monthly Report</h2>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">download</span>
                    <span>Download ECR</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600">Employee</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Gross Wages</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Employee Cont. (0.75%)</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Employer Cont. (3.25%)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan="4" className="p-6 text-center text-slate-500">Loading data...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan="4" className="p-6 text-center text-slate-500">No records found.</td></tr>
                        ) : (
                            data.map((r, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 text-slate-800 font-medium">{r.name}</td>
                                    <td className="px-6 py-4 text-right text-slate-600">₹{r.gross.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-slate-600">₹{r.esi_employee.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-slate-600">₹{r.esi_employer.toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ESIReport;
