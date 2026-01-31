import { supabase } from '../supabaseClient';

export const payrollDataService = {
    // Get PENDING or DRAFT run for approval
    getPendingRun: async () => {
        const { data, error } = await supabase
            .from('payroll_runs')
            .select('*')
            .in('approval_status', ['Pending', 'Draft'])
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // Ignore no rows found
        return data;
    },

    // Approve Run
    approveRun: async (id, comments) => {
        const { error } = await supabase
            .from('payroll_runs')
            .update({
                approval_status: 'Approved',
                status: 'Paid',
                approver_comments: comments,
                disbursement_date: new Date().toISOString()
            })
            .eq('id', id);
        if (error) throw error;
    },

    // Reject Run
    rejectRun: async (id, comments) => {
        const { error } = await supabase
            .from('payroll_runs')
            .update({
                approval_status: 'Rejected',
                status: 'Draft', // Back to draft
                approver_comments: comments
            })
            .eq('id', id);
        if (error) throw error;
    },

    // GENERATE Payroll Run
    generatePayrollRun: async () => {
        // 1. Determine Month/Year (e.g., current month)
        const date = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentMonth = monthNames[date.getMonth()];
        const currentYear = date.getFullYear();
        const runMonthStr = `${currentMonth} ${currentYear}`;

        // 2. Fetch All Employees (Profiles)
        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .select('*');

        if (profileError) throw profileError;

        // Check if run already exists
        let run;
        const { data: existing } = await supabase
            .from('payroll_runs')
            .select('*')
            .eq('month', runMonthStr)
            .neq('approval_status', 'Rejected')
            .maybeSingle();

        if (existing) {
            run = existing;
            // Regenerate: Clear old payslips
            await supabase.from('payslips').delete().eq('run_id', run.id);
        } else {
            // 3. Create Draft Payroll Run
            // Calculate Real Variance Data (Mock Budget vs Actual)
            const varianceData = profiles.reduce((acc, profile) => {
                const dept = (profile.department || 'Unassigned').toLowerCase();
                if (!acc[dept]) acc[dept] = { amount: 0, count: 0 };

                // Assume monthly salary is annual / 12
                const monthlySalary = (profile.salary_per_annum || 600000) / 12;
                acc[dept].amount += monthlySalary;
                acc[dept].count += 1;
                return acc;
            }, {});

            // Format variance for JSONB
            Object.keys(varianceData).forEach(key => {
                const actual = varianceData[key].amount;
                const variance = Math.floor(Math.random() * 10000) - 5000;
                varianceData[key] = {
                    amount: Math.round(actual),
                    diff: variance,
                    type: variance > 0 ? 'increase' : 'decrease',
                    reason: variance > 0 ? 'New Hires' : 'Leaves/Deductions'
                };
            });

            const { data: newRun, error: runError } = await supabase
                .from('payroll_runs')
                .insert([{
                    month: runMonthStr,
                    year: currentYear,
                    status: 'Processing',
                    approval_status: 'Pending',
                    total_employees: profiles.length,
                    total_payout: 0,
                    variance_data: varianceData
                }])
                .select()
                .single();

            if (runError) {
                console.error("Error creating new run:", runError);
                throw runError;
            }
            console.log("Created new run:", run);
            run = newRun;
        }

        // Fetch Active Loans
        console.log("Fetching active loans...");
        const { data: allActiveLoans } = await supabase
            .from('loans')
            .select('*')
            .eq('status', 'active');

        // 4. Calculate Payslips
        // Fetch Unpaid Leaves for this month
        console.log("Fetching unpaid leaves...");
        const { data: leaves } = await supabase
            .from('leaves')
            .select('*')
            .eq('status', 'approved')
            .eq('leave_type', 'Unpaid');

        let totalPayout = 0;
        const payslipsToInsert = [];

        // Fetch Real Salary Structures
        console.log("Fetching salary structures...");
        const { data: structures } = await supabase
            .from('salary_structures')
            .select('*');

        console.log("Found structures:", structures);

        const DAYS_IN_MONTH = 30;

        for (const emp of profiles) {
            console.log(`Processing employee: ${emp.id} (${emp.email})`);

            // Find employee salary structure
            const structure = structures?.find(s => s.employee_id === emp.id);
            const actualBase = structure ? structure.gross / 12 : (emp.salary_per_annum || 600000) / 12;

            console.log(`  - Structure found? ${!!structure}`);
            console.log(`  - Base Salary (Monthly): ${actualBase}`);

            const realBasic = structure ? structure.basic / 12 : actualBase * 0.4;

            const perDay = actualBase / DAYS_IN_MONTH;

            // Calculate Leave Deductions
            const empLeaves = leaves?.filter(l => l.user_id === emp.id) || [];
            let unpaidDays = 0;

            empLeaves.forEach(l => {
                if (new Date(l.start_date).getMonth() === date.getMonth()) {
                    const start = new Date(l.start_date);
                    const end = new Date(l.end_date);
                    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
                    unpaidDays += diff;
                }
            });

            const leaveDeduction = Math.round(unpaidDays * perDay);

            // Calculate Loan Deduction
            const empLoans = allActiveLoans?.filter(l => l.employee_id === emp.id) || [];
            const loanDeduction = empLoans.reduce((sum, loan) => sum + (loan.monthly_emi || 0), 0);

            // Calculate Tax 
            const taxDeduction = Math.round(actualBase * 0.10);

            const totalDeductions = leaveDeduction + loanDeduction + taxDeduction;
            const netSalary = Math.round(actualBase - totalDeductions);

            totalPayout += netSalary;

            payslipsToInsert.push({
                run_id: run.id,
                user_id: emp.id,
                basic_salary: Math.round(actualBase),
                additions: 0,
                deductions: totalDeductions,
                net_salary: netSalary
            });
        }

        // 5. Insert Payslips
        if (payslipsToInsert.length > 0) {
            console.log(`Inserting ${payslipsToInsert.length} payslips...`);
            const { error: payslipError } = await supabase
                .from('payslips')
                .insert(payslipsToInsert);
            if (payslipError) {
                console.error("Error inserting payslips:", payslipError);
                throw payslipError;
            }
        } else {
            console.warn("No payslips generated!");
        }

        // 6. Update Run Totals
        await supabase
            .from('payroll_runs')
            .update({
                total_payout: totalPayout,
                status: 'Draft'
            })
            .eq('id', run.id);

        console.log("Payroll run completed successfully.");
        return run;
    },

    // Generic fetch
    getAllRuns: async () => {
        const { data, error } = await supabase
            .from('payroll_runs')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }
};
