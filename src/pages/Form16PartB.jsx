import { useState } from "react";

const Form16PartB = () => {
    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Form 16 - Part B</h2>
                <button
                    onClick={() => alert("Downloading Form 16 Part B...")}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition"
                >
                    <span className="material-symbols-outlined">download</span>
                    Download PDF
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 max-w-4xl mx-auto">
                <div className="text-center border-b pb-4 mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Annexure to Form 16</h3>
                    <p className="text-slate-500">Details of Salary Paid and any other income and tax deducted</p>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Gross Salary</span>
                        <span className="font-mono font-medium">₹ 12,00,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Less: Allowances to the extent exempt u/s 10</span>
                        <span className="font-mono font-medium text-emerald-600">- ₹ 50,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Less: Deductions u/s 16</span>
                        <span className="font-mono font-medium text-emerald-600">- ₹ 50,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 bg-slate-50 px-2 rounded">
                        <span className="font-bold text-slate-800">Income Chargeable under the head "Salaries"</span>
                        <span className="font-mono font-bold">₹ 11,00,000</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form16PartB;
