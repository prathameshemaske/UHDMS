import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const SalaryStructure = () => {
    const [employees, setEmployees] = useState([]);
    const [selected, setSelected] = useState(null);
    const [ctc, setCtc] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*');
            if (data) {
                // Add full_name property to each employee object
                const mapped = data.map(e => ({
                    ...e,
                    full_name: `${e.first_name || ''} ${e.last_name || ''}`.trim() || e.email
                }));
                setEmployees(mapped);
            }
            if (error) console.error(error);
        };
        fetchEmployees();
    }, []);

    // Fetch existing structure when user is selected
    useEffect(() => {
        const fetchStructure = async () => {
            if (!selected) {
                setCtc(0);
                return;
            }

            setLoading(true);
            const { data, error } = await supabase
                .from('salary_structures')
                .select('ctc')
                .eq('employee_id', selected.id)
                .single();

            if (data) {
                setCtc(data.ctc);
            } else {
                setCtc(0); // Reset if no structure exists
            }
            if (error && error.code !== 'PGRST116') { // Ignore "No rows found" error
                console.error("Error fetching structure:", error);
            }
            setLoading(false);
        };

        fetchStructure();
    }, [selected]);

    const calculate = () => {
        const basic = ctc * 0.4;
        const hra = basic * 0.4;
        const allowances = ctc - (basic + hra);
        const pf = basic * 0.12;
        const gross = basic + hra + allowances;
        const net = gross - pf;

        return { basic, hra, allowances, pf, gross, net };
    };

    const save = async () => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('salary_structures')
                .upsert({
                    employee_id: selected.id,
                    ctc: ctc,
                    basic: calc.basic,
                    hra: calc.hra,
                    allowances: calc.allowances,
                    pf: calc.pf,
                    gross: calc.gross,
                    net: calc.net,
                    effective_date: new Date().toISOString()
                }, { onConflict: 'employee_id' });

            if (error) throw error;
            alert(`Salary structure saved for ${selected.full_name}`);
        } catch (error) {
            console.error("Save failed:", error);
            alert("Failed to save salary structure");
        } finally {
            setLoading(false);
        }
    };

    const calc = calculate();

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Salary Structure Configuration</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 max-w-2xl">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Select Employee</label>
                    <select
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => {
                            const val = e.target.value;
                            setSelected(val ? JSON.parse(val) : null);
                        }}
                    >
                        <option value="">-- Choose Employee --</option>
                        {employees.map((e) => (
                            <option key={e.id} value={JSON.stringify(e)}>
                                {e.full_name} ({e.email})
                            </option>
                        ))}
                    </select>
                </div>

                {selected && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Annual CTC (₹)</label>
                            <input
                                type="number"
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={ctc}
                                onChange={(e) => setCtc(Number(e.target.value))}
                                placeholder="e.g. 1200000"
                            />
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-2 font-semibold text-slate-600">Component</th>
                                        <th className="px-4 py-2 font-semibold text-slate-600 text-right">Amount (Monthly)</th>
                                        <th className="px-4 py-2 font-semibold text-slate-600 text-right">Amount (Yearly)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="px-4 py-2 text-slate-700">Basic Salary (40% of CTC)</td>
                                        <td className="px-4 py-2 text-right text-slate-600">₹{(calc.basic / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="px-4 py-2 text-right font-medium text-slate-800">₹{calc.basic.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-slate-700">HRA (40% of Basic)</td>
                                        <td className="px-4 py-2 text-right text-slate-600">₹{(calc.hra / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="px-4 py-2 text-right font-medium text-slate-800">₹{calc.hra.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-slate-700">Allowances (Balancing)</td>
                                        <td className="px-4 py-2 text-right text-slate-600">₹{(calc.allowances / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="px-4 py-2 text-right font-medium text-slate-800">₹{calc.allowances.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    </tr>
                                    <tr className="bg-indigo-50/50">
                                        <td className="px-4 py-2 font-semibold text-indigo-700">Gross Salary</td>
                                        <td className="px-4 py-2 text-right font-semibold text-indigo-700">₹{(calc.gross / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="px-4 py-2 text-right font-bold text-indigo-800">₹{calc.gross.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-slate-500">PF Contribution (12% of Basic)</td>
                                        <td className="px-4 py-2 text-right text-rose-600">-₹{(calc.pf / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="px-4 py-2 text-right text-rose-600">-₹{calc.pf.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    </tr>
                                    <tr className="bg-emerald-50">
                                        <td className="px-4 py-3 font-bold text-emerald-800">Net Take Home (Pre-Tax)</td>
                                        <td className="px-4 py-3 text-right font-bold text-emerald-800">₹{(calc.net / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="px-4 py-3 text-right font-bold text-emerald-800">₹{calc.net.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <button
                            onClick={save}
                            disabled={loading || ctc <= 0}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : 'Save Structure'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalaryStructure;
