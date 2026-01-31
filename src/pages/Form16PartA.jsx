import { useState } from "react";

const Form16PartA = () => {
    // Mock Data - In a real app, this would come from Settings or Backend
    const [data] = useState({
        employer_name: "UHDMS Enterprise Solutions Ltd.",
        tan: "MUMU12345F",
        pan: "AAACU1234F",
        year: "2024-2025",
        total_tds: "₹ 1,50,000"
    });

    const handleDownload = () => {
        alert("Downloading PDF... (Mock Action)");
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Form 16 - Part A</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 max-w-2xl">
                <h3 className="text-lg font-bold text-slate-700 mb-4 border-b pb-2">Employer Details</h3>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Name and Address of Employer</span>
                        <span className="font-medium text-slate-800">{data.employer_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">TAN of Deduction</span>
                        <span className="font-medium text-slate-800">{data.tan}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">PAN of Employer</span>
                        <span className="font-medium text-slate-800">{data.pan}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 mt-3">
                        <span className="text-slate-500">Assessment Year</span>
                        <span className="font-bold text-slate-800">{data.year}</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        <span className="material-symbols-outlined">download</span>
                        Download Certificate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Form16PartA;
