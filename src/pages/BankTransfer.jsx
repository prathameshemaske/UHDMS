import React from 'react';
import { bankService } from '../services/bankService';

const BankTransfer = () => {
    const handleDownload = async (bank) => {
        try {
            const { url, filename } = await bankService.generateBankFile("BATCH-OCT-2023", bank);

            // Trigger Download
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed", error);
            alert("Failed to generate file");
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Bank Transfer Advice</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Selected Batch</p>
                    <p className="text-lg font-bold text-slate-800">October 2023</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Total Net Pay</p>
                    <p className="text-lg font-bold text-emerald-600">₹ 24,50,000</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Employees</p>
                    <p className="text-lg font-bold text-slate-800">42</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Bank Account</p>
                    <p className="text-lg font-bold text-indigo-600">HDFC **** 8892</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center h-20 w-20 bg-indigo-50 rounded-full mb-6 text-indigo-600">
                    <span className="material-symbols-outlined text-4xl">account_balance</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Generate Bank Advice File</h2>
                <p className="text-slate-500 mb-8">
                    Download the salary disbursement file compatible with your corporate banking portal.
                    Supported formats: HDFC, ICICI, SBI (Excel/CSV).
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => handleDownload("HDFC")}
                        className="flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-600 rounded-lg font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    >
                        <span className="material-symbols-outlined">download</span> HDFC Format
                    </button>
                    <button
                        onClick={() => handleDownload("ICICI")}
                        className="flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-600 rounded-lg font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    >
                        <span className="material-symbols-outlined">download</span> ICICI Format
                    </button>
                    <button
                        onClick={() => handleDownload("SBI")}
                        className="flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-600 rounded-lg font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    >
                        <span className="material-symbols-outlined">download</span> SBI Format
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BankTransfer;
