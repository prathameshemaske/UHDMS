import React from 'react';
import { Link } from 'react-router-dom';

const PayrollDataSync = () => {
    return (
        <div className="flex flex-1 justify-center py-8 font-display bg-background-light dark:bg-background-dark min-h-screen">
            <div className="layout-content-container flex flex-col max-w-[1024px] flex-1 px-6">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap gap-2 items-center mb-4">
                    <a className="text-[#656487] dark:text-gray-400 text-sm font-medium" href="#">Payroll Cycle</a>
                    <span className="text-[#656487] text-sm font-medium material-symbols-outlined !text-[14px]">chevron_right</span>
                    <span className="text-[#121117] dark:text-white text-sm font-semibold">Run Payroll</span>
                </nav>
                {/* Page Heading & Progress */}
                <div className="flex flex-col gap-6 mb-8">
                    <div className="flex flex-wrap justify-between items-end gap-3">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[#121117] dark:text-white text-4xl font-black tracking-tight">Run Payroll: October 2023</h1>
                            <p className="text-[#656487] dark:text-gray-400 text-base font-normal">Step 1: Data Synchronization - Ensuring all external records are up to date.</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#656487] dark:text-gray-400">Step 1 of 4</span>
                        </div>
                    </div>
                    {/* Step Stepper */}
                    <div className="grid grid-cols-4 gap-4 w-full h-2">
                        <div className="bg-primary rounded-full"></div>
                        <div className="bg-[#dcdce5] dark:bg-gray-700 rounded-full"></div>
                        <div className="bg-[#dcdce5] dark:bg-gray-700 rounded-full"></div>
                        <div className="bg-[#dcdce5] dark:bg-gray-700 rounded-full"></div>
                    </div>
                </div>
                {/* Main Progress Tracker */}
                <div className="bg-white dark:bg-gray-900 border border-[#f1f0f4] dark:border-gray-800 rounded-xl p-6 mb-8 shadow-sm">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">sync</span>
                                <p className="text-[#121117] dark:text-white text-lg font-bold">Overall Sync Progress</p>
                            </div>
                            <p className="text-primary text-xl font-black">45%</p>
                        </div>
                        <div className="w-full bg-[#dcdce5] dark:bg-gray-700 rounded-full h-3">
                            <div className="h-3 rounded-full bg-primary" style={{ width: '45%' }}></div>
                        </div>
                        <p className="text-[#656487] dark:text-gray-400 text-sm italic">Fetching performance bonuses from third-party APIs...</p>
                    </div>
                </div>
                {/* Module Cards Grid */}
                <div className="grid grid-cols-1 gap-6 mb-12">
                    {/* Card 1: Completed */}
                    <div className="flex items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-[#f1f0f4] dark:border-gray-800">
                        <div className="flex gap-6 items-start flex-1">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400">event_available</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">Completed</span>
                                </div>
                                <p className="text-[#121117] dark:text-white text-xl font-bold">Attendance & Leave</p>
                                <p className="text-[#656487] dark:text-gray-400 text-sm font-normal">1,240 records synced successfully from UHDMS HRIS.</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-32 bg-center bg-no-repeat bg-cover rounded-lg" data-alt="Abstract green digital data nodes" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyTipPLX-KxjC5EEGPOCqxCgy7Gb5GXhWKODd7TZg6pId7CslI-G7HywFLOunT6jhcSrsqxcfcy-FOS6X6Uf3TmW6JXKmQqBYiWAo5_AV0dp56GiXrcUzFflGKexbFU86Bd7S_Rleh05x8RRkqA-CaukjudleOTcL5YcKuL0oIs9ksphx-QcJJrJSWbCNKgJRFTT4ksyjQI8E7e3QqnUs7JOWSptnOJqm0D8nxPoG4O0c8CDPIMyNm79Sjbb_6bOIQDOruZliHdD-u")' }}></div>
                    </div>
                    {/* Card 2: In Progress */}
                    <div className="flex items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-2 ring-primary/20 border border-primary/20">
                        <div className="flex gap-6 items-start flex-1">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">payments</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">In Progress</span>
                                </div>
                                <p className="text-[#121117] dark:text-white text-xl font-bold">Tasks & Variable Pay</p>
                                <p className="text-[#656487] dark:text-gray-400 text-sm font-normal mb-3">Fetching performance bonuses... 65% complete.</p>
                                <div className="w-full max-w-sm bg-primary/10 rounded-full h-1.5">
                                    <div className="h-1.5 rounded-full bg-primary" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block w-32 bg-center bg-no-repeat bg-cover rounded-lg" data-alt="Abstract indigo glowing data connections" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoBAGFyfA0xfZPRr4QL58idgLgpcf6KCg6ssw19z8CTKNrHheDShXlyI3nLJtoUFM4G3tAY16XVhZcn7LJj-G4jFyi9u3PipxqEsExjchFM_4M0pspX8YN09hB48AGGPHocHxRtgJXo79cv6VofZe5UVUnhqqUgU98iffM-qibFfcHkfj1sEaj00CcMUgeIpZZ6ZTTz_foz9IcIKaAuqKb9_ZSTrDszh_ZMlND0isO6BllglrxZ4DXJlGZFMylEuy-KtIfNBGz5wc0")' }}></div>
                    </div>
                    {/* Card 3: Pending */}
                    <div className="flex items-stretch justify-between gap-6 rounded-xl bg-background-light dark:bg-gray-900/50 p-6 shadow-sm border border-dashed border-[#dcdce5] dark:border-gray-800">
                        <div className="flex gap-6 items-start flex-1 opacity-60">
                            <div className="p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                                <span className="material-symbols-outlined text-gray-500">account_balance</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">Pending</span>
                                </div>
                                <p className="text-[#121117] dark:text-white text-xl font-bold">Tax Updates</p>
                                <p className="text-[#656487] dark:text-gray-400 text-sm font-normal">Awaiting latest regulatory tables from Government portal.</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-32 bg-center bg-no-repeat bg-cover rounded-lg grayscale opacity-30" data-alt="Abstract gray scale geometric shapes" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVfRS11xFpbaiBpYgP1Iw4MgtSzM21ttchoHR8UFEykJp7R-FwxScpC5smz1prMiYzY--e8BI4wsTWyfkkzuzQbVGOeq41c3sEud8698zpxAGcM2k3LgMLQLFsKVmQkKn8S77cTPCWoX_xsDeit6ghiiF0mueZvEob6MBlqKxemghz4nOVUqk1CuZMTjKyg_eV0_ewAs75o7hXZO63qgnV4099H9Uf7m6HZSlHH5WKMeVUCX9sXxrkElm-uXhJIgrJW6R_KM8sPl22")' }}></div>
                    </div>
                </div>
                {/* Action Footer */}
                <div className="flex justify-between items-center bg-white dark:bg-background-dark p-6 border-t border-[#f1f0f4] dark:border-gray-800 -mx-6 px-12 fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]" style={{ left: '16rem' }}> {/* Offset for sidebar */}
                    <div className="flex items-center gap-2 text-[#656487] dark:text-gray-400">
                        <span className="material-symbols-outlined !text-lg">history</span>
                        <span className="text-sm font-medium">Last full sync: 2 hours ago</span>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2.5 rounded-lg border border-[#dcdce5] dark:border-gray-700 text-[#121117] dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Cancel Process
                        </button>
                        <Link to="/payroll-input-review" className="px-8 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined !text-lg">sync_alt</span>
                            Sync All Data
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayrollDataSync;
