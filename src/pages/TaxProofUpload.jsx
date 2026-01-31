import { useState } from "react";

const TaxProofUpload = () => {
    const [files, setFiles] = useState([]);

    const handleUpload = (e) => {
        const newFiles = Array.from(e.target.files).map(file => ({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            status: 'Uploaded'
        }));
        setFiles([...files, ...newFiles]);
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Tax Proof Submission</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
                <h3 className="text-lg font-bold mb-4 text-slate-700">Upload Investment Proofs</h3>
                <div className="border-2 border-dashed border-indigo-200 rounded-lg p-8 text-center bg-indigo-50/50 hover:bg-indigo-50 transition cursor-pointer relative">
                    <input
                        type="file"
                        multiple
                        onChange={handleUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <span className="material-symbols-outlined text-4xl text-indigo-400 mb-2">cloud_upload</span>
                    <p className="text-indigo-600 font-medium">Click to upload or drag files here</p>
                    <p className="text-xs text-slate-500 mt-1">Supports PDF, JPG, PNG (Max 5MB)</p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-200 font-bold text-slate-700">Uploaded Documents</div>
                    <ul className="divide-y divide-slate-100">
                        {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between p-4 hover:bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">description</span>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{file.name}</p>
                                        <p className="text-xs text-slate-500">{file.size}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{file.status}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="p-4 border-t border-slate-200 flex justify-end">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition">
                            Submit for Verification
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaxProofUpload;
