import { useEffect, useState } from "react";
import { financialService } from "../services/financialService";

const PayrollAuditLog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const data = await financialService.getAuditLogs();
            setLogs(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, []);

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Payroll Audit Log</h2>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Action</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Details</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Performed By</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading && (
                            <tr><td colSpan="4" className="p-6 text-center text-slate-500">Loading...</td></tr>
                        )}
                        {!loading && logs.length === 0 && (
                            <tr><td colSpan="4" className="p-6 text-center text-slate-500">No audit records found</td></tr>
                        )}
                        {logs.map((l) => (
                            <tr key={l.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-slate-600">{new Date(l.created_at).toLocaleString()}</td>
                                <td className="px-6 py-4 font-medium text-slate-800 capitalize">{l.action?.replace(/_/g, ' ')}</td>
                                <td className="px-6 py-4 text-slate-600 truncate max-w-xs" title={l.details}>{l.details || '-'}</td>
                                <td className="px-6 py-4 text-slate-600">
                                    {l.performer ? `${l.performer.first_name} ${l.performer.last_name}` : 'System'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayrollAuditLog;
