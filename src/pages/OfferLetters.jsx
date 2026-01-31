import { useState } from "react";

const OfferLetters = () => {
    const [template, setTemplate] = useState("Standard");

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Offer Letter Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Generate New */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-fit">
                    <h3 className="text-lg font-bold mb-4 text-slate-700">Generate New Offer</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Candidate Name</label>
                            <input type="text" className="w-full border border-slate-300 rounded-lg p-2 text-sm" placeholder="Enter full name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Role / Position</label>
                            <input type="text" className="w-full border border-slate-300 rounded-lg p-2 text-sm" placeholder="e.g. Senior Developer" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Annual CTC</label>
                            <input type="number" className="w-full border border-slate-300 rounded-lg p-2 text-sm" placeholder="e.g. 1200000" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Template</label>
                            <select
                                value={template}
                                onChange={(e) => setTemplate(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                            >
                                <option>Standard Full Time</option>
                                <option>Contractor</option>
                                <option>Internship</option>
                            </select>
                        </div>
                        <button
                            onClick={() => alert(`Generated offer letter for ${template} role!`)}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
                        >
                            Generate & Preview
                        </button>
                    </div>
                </div>

                {/* History */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-fit">
                    <div className="p-4 border-b border-slate-200 font-bold text-slate-700">Recent Offers</div>
                    <ul className="divide-y divide-slate-100">
                        {["Michael Scott", "Jim Halpert", "Pam beesly"].map((name, i) => (
                            <li key={i} className="flex items-center justify-between p-4 hover:bg-slate-50">
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{name}</p>
                                    <p className="text-xs text-slate-500">Sent on: {new Date().toLocaleDateString()}</p>
                                </div>
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OfferLetters;
