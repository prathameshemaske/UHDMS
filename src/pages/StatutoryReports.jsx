import { Link } from "react-router-dom";

const StatutoryReports = () => {
    const reports = [
        { title: "ESI Report", path: "/reports/esi", icon: "medical_services", desc: "Employee State Insurance monthly contribution details" },
        { title: "TDS Challan (26Q)", path: "/reports/tds-26q", icon: "receipt_long", desc: "Quarterly TDS statement for tax deducted at source" },
        { title: "Form-16 Part A", path: "/reports/form16-part-a", icon: "description", desc: "TDS Certificate for employees (Part A)" },
        { title: "Form-16 Part B", path: "/reports/form16-part-b", icon: "assignment_turned_in", desc: "Detailed salary breakdown and tax computation (Part B)" },
        { title: "Tax Proofs", path: "/reports/tax-proofs", icon: "upload_file", desc: "Upload and manage investment proofs for tax saving" },
        { title: "Gratuity Report", path: "/reports/gratuity", icon: "savings", desc: "Gratuity liability and employee eligibility status" },
        { title: "Offer Letters", path: "/reports/offer-letters", icon: "drafts", desc: "Generate and manage employee offer letters" },
        { title: "My Payslips", path: "/employee-payslips", icon: "payments", desc: "Personal payslip history and downloads" },
    ];

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Statutory Compliance Reports</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <Link
                        key={report.path}
                        to={report.path}
                        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all group"
                    >
                        <div className="size-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-2xl">{report.icon}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{report.title}</h3>
                        <p className="text-sm text-slate-500">{report.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StatutoryReports;
