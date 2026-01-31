import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const TDS26Q = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profiles for TDS report
                const { data: employees, error } = await supabase
                    .from('profiles')
                    .select('id, first_name, last_name, email')
                    .limit(20);

                if (error) throw error;

                if (employees) {
                    const mapped = employees.map(e => ({
                        pan: `ABCDE${Math.floor(1000 + Math.random() * 9000)}F`, // Mock PAN
                        name: `${e.first_name || ''} ${e.last_name || ''}`.trim() || e.email,
                        tds: Math.floor(Math.random() * 5000) * 10 // Mock TDS amount
                    }));
                    setData(mapped);
                }
            } catch (err) {
                console.error("TDS Report Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDownload = () => {
        if (!data.length) return alert("No data to download");

        const headers = ["Employee Name, PAN Number, Total TDS Deducted"];
        const rows = data.map(r => `"${r.name}", ${r.pan}, ${r.tds}`);

        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "tds_26q_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">TDS Quarterly Return (26Q)</h2>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">description</span>
                    <span>Generate File</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600">Employee Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">PAN Number</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Total TDS Deducted</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan="3" className="p-6 text-center text-slate-500">Loading data...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan="3" className="p-6 text-center text-slate-500">No records found.</td></tr>
                        ) : (
                            data.map((r, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 text-slate-800 font-medium">{r.name}</td>
                                    <td className="px-6 py-4 text-slate-600 font-mono">{r.pan}</td>
                                    <td className="px-6 py-4 text-right text-slate-600">₹{r.tds.toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TDS26Q;
