import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { payrollService } from '../services/payrollService';
import { authService } from '../services/authService';

const Payslip = () => {
    const [payslips, setPayslips] = useState([]);
    const [currentPayslip, setCurrentPayslip] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [financialDetails, setFinancialDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const user = await authService.getCurrentUser();
                setUserProfile(user);

                const [payslipData, finances] = await Promise.all([
                    payrollService.getPayslips(),
                    payrollService.getFinancialDetails()
                ]);

                setPayslips(payslipData);
                if (payslipData && payslipData.length > 0) {
                    setCurrentPayslip(payslipData[0]); // Default to latest
                }
                setFinancialDetails(finances);
            } catch (error) {
                console.error("Failed to load payroll data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-primary">Loading...</div>;
    }

    if (!currentPayslip) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-[#121117] dark:text-white gap-4">
                <h2 className="text-2xl font-bold">No Payslips Found</h2>
                <p className="text-[#656487]">You don't have any generated payslips yet.</p>
                <Link to="/" className="text-primary hover:underline">Return to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#121117] dark:text-[#f6f6f8] min-h-screen">
            {/* Top Navigation Bar */}
            <header className="no-print sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f1f0f4] dark:border-[#2a2a3a] bg-white dark:bg-[#1a1a2e] px-10 py-3">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#121117] dark:text-white">
                        <div className="size-6 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">UHDMS</h2>
                    </div>
                    <nav className="flex items-center gap-9">
                        <Link className="text-[#121117] dark:text-[#dcdce5] text-sm font-medium leading-normal hover:text-primary transition-colors" to="/">Dashboard</Link>
                        <a className="text-primary text-sm font-bold leading-normal" href="#">Employees</a>
                        <a className="text-[#121117] dark:text-[#dcdce5] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Payroll</a>
                        <a className="text-[#121117] dark:text-[#dcdce5] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Projects</a>
                        <a className="text-[#121117] dark:text-[#dcdce5] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Settings</a>
                    </nav>
                </div>
                <div className="flex flex-1 justify-end gap-6 items-center">
                    <label className="flex flex-col min-w-40 !h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-[#656487] flex border-none bg-[#f1f0f4] dark:bg-[#2a2a3a] items-center justify-center pl-4 rounded-l-lg">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input className="form-input flex w-full min-w-0 flex-1 border-none bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white focus:ring-0 h-full placeholder:text-[#656487] px-4 rounded-r-lg pl-2 text-sm font-normal" placeholder="Search employee or ID" />
                        </div>
                    </label>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                    </div>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" data-alt="User profile avatar" style={{ backgroundImage: `url("${userProfile?.avatar_url || 'https://via.placeholder.com/150'}")` }}></div>
                </div>
            </header>
            <main className="max-w-[1100px] mx-auto px-4 py-8 flex flex-col gap-6">
                {/* Breadcrumbs */}
                <div className="no-print flex flex-wrap gap-2 items-center">
                    <a className="text-[#656487] dark:text-[#a0a0b8] text-sm font-medium hover:text-primary transition-colors" href="#">Payroll</a>
                    <span className="text-[#656487] dark:text-[#a0a0b8] material-symbols-outlined text-sm">chevron_right</span>
                    <a className="text-[#656487] dark:text-[#a0a0b8] text-sm font-medium hover:text-primary transition-colors" href="#">Payslips</a>
                    <span className="text-[#656487] dark:text-[#a0a0b8] material-symbols-outlined text-sm">chevron_right</span>
                    <span className="text-primary text-sm font-bold">{currentPayslip.month} {currentPayslip.year}</span>
                </div>
                {/* Page Heading */}
                <div className="no-print flex flex-wrap justify-between items-center gap-4 bg-white dark:bg-[#1a1a2e] p-6 rounded-xl border border-[#f1f0f4] dark:border-[#2a2a3a] shadow-sm">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[#121117] dark:text-white text-3xl font-black tracking-tight">Employee Payslip</h1>
                        <p className="text-[#656487] dark:text-[#a0a0b8] text-sm font-normal">Monthly salary statement for {currentPayslip.month} {currentPayslip.year}</p>
                    </div>
                    <div className="flex gap-3">
                        {payslips.length > 1 && (
                            <div className="relative group">
                                <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-[#f1f0f4] dark:bg-[#2a2a3a] text-[#121117] dark:text-white text-sm font-bold hover:bg-[#e2e2ea] transition-all">
                                    <span className="material-symbols-outlined mr-2 text-[20px]">history</span>
                                    History
                                </button>
                                {/* Simple Dropdown for History */}
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#1a1a2e] border border-[#f1f0f4] dark:border-[#2a2a3a] shadow-xl rounded-lg hidden group-hover:block z-10">
                                    {payslips.map(ps => (
                                        <button
                                            key={ps.id}
                                            onClick={() => setCurrentPayslip(ps)}
                                            className="block w-full text-left px-4 py-2 text-sm text-[#121117] dark:text-white hover:bg-[#f1f0f4] dark:hover:bg-[#2a2a3a]"
                                        >
                                            {ps.month} {ps.year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => window.print()}
                            className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all">
                            <span className="material-symbols-outlined mr-2 text-[20px]">download</span>
                            Download PDF
                        </button>
                    </div>
                </div>
                {/* Payslip Card (The "Printed" Document) */}
                <div className="print-container bg-white dark:bg-[#1a1a2e] rounded-xl border border-[#e5e7eb] dark:border-[#2a2a3a] shadow-2xl overflow-hidden payslip-card">
                    {/* Company Header Block */}
                    <div className="flex flex-col md:flex-row justify-between p-8 border-b border-dashed border-[#e5e7eb] dark:border-[#2a2a3a] gap-6">
                        <div className="flex items-center gap-5">
                            <div className="size-16 bg-primary/10 rounded-xl flex items-center justify-center">
                                <svg className="size-10 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#121117] dark:text-white">UHDMS Ltd.</h2>
                                <p className="text-[#656487] dark:text-[#a0a0b8] text-sm">123 Tech Square, Software Park, Silicon Valley</p>
                                <p className="text-[#656487] dark:text-[#a0a0b8] text-xs">Email: hr@uhdms.com | Web: www.uhdms.com</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Pay Period</p>
                            <p className="text-xl font-bold text-[#121117] dark:text-white">{currentPayslip.month} {currentPayslip.year}</p>
                            <p className="text-[#656487] dark:text-[#a0a0b8] text-sm">Issue Date: {new Date(currentPayslip.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    {/* Employee Meta Data */}
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 bg-background-light/30 dark:bg-background-dark/30">
                        <div className="flex flex-col gap-1">
                            <p className="text-[#656487] dark:text-[#a0a0b8] text-[11px] font-bold uppercase tracking-widest">Employee Name</p>
                            <p className="text-[#121117] dark:text-white text-base font-semibold">{userProfile?.first_name} {userProfile?.last_name}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[#656487] dark:text-[#a0a0b8] text-[11px] font-bold uppercase tracking-widest">Employee ID</p>
                            <p className="text-[#121117] dark:text-white text-base font-semibold">EMP-{userProfile?.id?.substring(0, 8).toUpperCase()}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[#656487] dark:text-[#a0a0b8] text-[11px] font-bold uppercase tracking-widest">Department</p>
                            <p className="text-[#121117] dark:text-white text-base font-semibold">{userProfile?.department || 'N/A'}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[#656487] dark:text-[#a0a0b8] text-[11px] font-bold uppercase tracking-widest">Designation</p>
                            <p className="text-[#121117] dark:text-white text-base font-semibold">{userProfile?.job_title || 'N/A'}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[#656487] dark:text-[#a0a0b8] text-[11px] font-bold uppercase tracking-widest">PAN No.</p>
                            <p className="text-[#121117] dark:text-white text-base font-semibold uppercase tracking-wider">{financialDetails?.pan_number || 'N/A'}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[#656487] dark:text-[#a0a0b8] text-[11px] font-bold uppercase tracking-widest">Bank Account</p>
                            <p className="text-[#121117] dark:text-white text-base font-semibold tracking-widest">{financialDetails?.account_number ? `XXXX-${financialDetails.account_number.slice(-4)}` : 'N/A'}</p>
                        </div>
                    </div>
                    {/* Detailed Breakdown */}
                    <div className="flex flex-col lg:flex-row border-t border-[#e5e7eb] dark:border-[#2a2a3a]">
                        {/* Earnings Column */}
                        <div className="flex-1 p-8 lg:border-r border-[#e5e7eb] dark:border-[#2a2a3a]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center">
                                    <span className="material-symbols-outlined mr-2 text-[20px]">payments</span> Earnings
                                </h3>
                                <span className="text-xs text-[#656487] dark:text-[#a0a0b8] font-medium">Amount (USD)</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-[#f1f0f4] dark:border-[#2a2a3a]">
                                    <p className="text-[#121117] dark:text-[#dcdce5] text-sm">Basic Salary</p>
                                    <p className="text-[#121117] dark:text-white text-sm font-bold">${financialDetails?.base_salary || 0}</p>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-[#f1f0f4] dark:border-[#2a2a3a]">
                                    <p className="text-[#121117] dark:text-[#dcdce5] text-sm">House Rent Allowance (HRA)</p>
                                    <p className="text-[#121117] dark:text-white text-sm font-bold">${financialDetails?.hra || 0}</p>
                                </div>
                                {/* Dynamic adjustments based on total_earnings if needed, currently using static fillers to match total for demo unless we calculate strictly */}
                                <div className="flex justify-between items-center py-2 border-b border-[#f1f0f4] dark:border-[#2a2a3a]">
                                    <p className="text-[#121117] dark:text-[#dcdce5] text-sm">Special Allowance</p>
                                    <p className="text-[#121117] dark:text-white text-sm font-bold">{(currentPayslip.total_earnings - (financialDetails?.base_salary || 0) - (financialDetails?.hra || 0)).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between items-center bg-[#f1f0f4] dark:bg-[#2a2a3a] p-3 rounded-lg">
                                <p className="text-[#121117] dark:text-white text-sm font-bold">Total Gross Earnings</p>
                                <p className="text-[#121117] dark:text-white text-base font-black">${currentPayslip.total_earnings}</p>
                            </div>
                        </div>
                        {/* Deductions Column */}
                        <div className="flex-1 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest flex items-center">
                                    <span className="material-symbols-outlined mr-2 text-[20px]">money_off</span> Deductions
                                </h3>
                                <span className="text-xs text-[#656487] dark:text-[#a0a0b8] font-medium">Amount (USD)</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-[#f1f0f4] dark:border-[#2a2a3a]">
                                    <p className="text-[#121117] dark:text-[#dcdce5] text-sm">Provident Fund (PF)</p>
                                    <p className="text-red-500 text-sm font-bold">-${financialDetails?.pf_contribution || 0}</p>
                                </div>
                                {/* Simplified Deduction Breakdown */}
                                <div className="flex justify-between items-center py-2 border-b border-[#f1f0f4] dark:border-[#2a2a3a]">
                                    <p className="text-[#121117] dark:text-[#dcdce5] text-sm">Tax & Other Deductions</p>
                                    <p className="text-red-500 text-sm font-bold">-${(currentPayslip.total_deductions - (financialDetails?.pf_contribution || 0)).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between items-center bg-red-50 dark:bg-red-900/10 p-3 rounded-lg">
                                <p className="text-red-600 dark:text-red-400 text-sm font-bold">Total Deductions</p>
                                <p className="text-red-600 dark:text-red-400 text-base font-black">${currentPayslip.total_deductions}</p>
                            </div>
                        </div>
                    </div>
                    {/* Footer Summary */}
                    <div className="p-8 border-t border-[#e5e7eb] dark:border-[#2a2a3a] flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col gap-2 max-w-md">
                            <p className="text-[#656487] dark:text-[#a0a0b8] text-xs font-bold uppercase tracking-widest">Amount in Words</p>
                            <p className="text-[#121117] dark:text-white text-sm italic">Computed Automatically</p>
                        </div>
                        <div className="bg-primary px-10 py-6 rounded-xl text-center shadow-xl shadow-primary/20">
                            <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Net Payable Salary</p>
                            <p className="text-white text-4xl font-black tracking-tighter">${currentPayslip.net_pay}</p>
                        </div>
                    </div>
                    {/* Footer Disclaimers */}
                    <div className="bg-[#f8f9fa] dark:bg-[#151525] p-6 text-center border-t border-[#e5e7eb] dark:border-[#2a2a3a]">
                        <p className="text-[#656487] dark:text-[#a0a0b8] text-[11px] leading-relaxed">
                            This is a computer-generated document and does not require a physical signature.
                            If you have any discrepancies in the data, please contact the HR department within 48 hours.
                            <br /> UHDMS Ltd © 2023 - All Rights Reserved.
                        </p>
                    </div>
                </div>
                {/* Footer Actions (Helper/Secondary) */}
                <div className="no-print flex justify-center gap-4 py-6 border-t border-[#f1f0f4] dark:border-[#2a2a3a] mt-4">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center text-[#656487] hover:text-primary transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined mr-2 text-[18px]">print</span> Print Statement
                    </button>
                    <span className="text-[#dcdce5]">|</span>
                    <button className="flex items-center text-[#656487] hover:text-primary transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined mr-2 text-[18px]">help</span> Help & Support
                    </button>
                    <span className="text-[#dcdce5]">|</span>
                    <button className="flex items-center text-[#656487] hover:text-primary transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined mr-2 text-[18px]">share</span> Share via Email
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Payslip;
