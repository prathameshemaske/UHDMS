const GratuityReport = () => {
    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Gratuity Report</h2>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600 mt-1">info</span>
                <div>
                    <h4 className="font-bold text-amber-800">Eligibility Criteria</h4>
                    <p className="text-sm text-amber-700">Employees are eligible for gratuity after completing 5 years of continuous service.</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600">Employee</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Date of Joining</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Years of Service</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Gratuity Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Accrued Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-800">John Doe</td>
                            <td className="px-6 py-4 text-slate-600">15 Jan 2018</td>
                            <td className="px-6 py-4 text-slate-600">6 Years</td>
                            <td className="px-6 py-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Eligible</span></td>
                            <td className="px-6 py-4 text-right font-mono">₹ 1,50,000</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-800">Jane Smith</td>
                            <td className="px-6 py-4 text-slate-600">20 Mar 2022</td>
                            <td className="px-6 py-4 text-slate-600">2 Years</td>
                            <td className="px-6 py-4"><span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs font-bold">Not Eligible</span></td>
                            <td className="px-6 py-4 text-right font-mono">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GratuityReport;
