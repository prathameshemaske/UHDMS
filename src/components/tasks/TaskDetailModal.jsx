import React from 'react';

const TaskDetailModal = ({ isOpen, onClose, task, isCreateMode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 dark:bg-black/60 min-h-screen flex items-center justify-center p-4 md:p-10 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Container */}
            <div className="bg-white dark:bg-[#121121] w-full max-w-6xl h-full max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="h-14 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <span className="hover:text-[#5048e5] cursor-pointer">Engineering</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="hover:text-[#5048e5] cursor-pointer">Product Launch</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-slate-900 dark:text-white font-semibold">Sprint 42</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                        <button className="flex items-center gap-2 px-2.5 py-1 bg-[#5048e5]/10 text-[#5048e5] rounded text-[11px] font-bold uppercase tracking-wider hover:bg-[#5048e5]/20 transition-colors">
                            <span className="size-2 rounded-full bg-[#5048e5]"></span>
                            {task?.status || 'In Progress'}
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                        <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors ml-2">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Main Content (Left) */}
                    <div className="w-[60%] flex flex-col overflow-y-auto custom-scrollbar border-r border-slate-100 dark:border-slate-800">
                        <div className="p-8 space-y-8">
                            <div>
                                <textarea
                                    className="w-full text-3xl font-black text-slate-900 dark:text-white bg-transparent border-none focus:ring-0 resize-none p-0 leading-tight placeholder-slate-300"
                                    placeholder="Task Title"
                                    rows="1"
                                    defaultValue={task?.title || "Finalize UI design system components"}
                                ></textarea>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-sm">description</span>
                                    Description
                                </div>
                                <div className="border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden">
                                    <div className="flex items-center gap-1 p-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">format_bold</span></button>
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">format_italic</span></button>
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">format_list_bulleted</span></button>
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">link</span></button>
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">image</span></button>
                                    </div>
                                    <div className="p-4 min-h-[120px] text-sm text-slate-600 dark:text-slate-400 focus:outline-none" contentEditable="true" suppressContentEditableWarning={true}>
                                        {task?.description || "This task involves cleaning up the main design library and ensuring all components have proper documentation for the frontend team. Please refer to the latest Figma specs."}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-sm">checklist</span>
                                        Checklist
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">2/3</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 group">
                                        <input defaultChecked className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5] size-4" type="checkbox" />
                                        <span className="text-sm text-slate-500 line-through">Audit existing color palette</span>
                                    </div>
                                    <div className="flex items-center gap-3 group">
                                        <input defaultChecked className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5] size-4" type="checkbox" />
                                        <span className="text-sm text-slate-500 line-through">Update typography tokens</span>
                                    </div>
                                    <div className="flex items-center gap-3 group">
                                        <input className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5] size-4" type="checkbox" />
                                        <span className="text-sm text-slate-700 dark:text-slate-300">Document accessibility guidelines</span>
                                    </div>
                                    <button className="flex items-center gap-2 text-xs font-medium text-[#5048e5] mt-2 hover:underline">
                                        <span className="material-symbols-outlined text-sm">add</span> Add item
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 pb-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-sm">attachment</span>
                                    Attachments
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <div className="group relative rounded-lg border border-slate-100 dark:border-slate-800 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                                        <div className="aspect-video rounded bg-slate-100 dark:bg-slate-900 mb-2 overflow-hidden">
                                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBp6-wXSB7cqKSaoLnzFNeB_X2svfANaECjqZkyrzmDx5U7pn-zxu6k9x6OWJKmvzXgzX1sqQ25DhjDcwfOICutglKsdSa3JVoQWAZyFS0Py7V4oMQvfY-AaUp-lmugAwKU7mB5AVfsf_aY9WA2PxFYQmFoVY0IUh_sVqJ5D3sFpaQdYFK-XBvQ7qwk6qZbUXrqxWKklNfN0NDkpHb6a_guZxcBtGmg9z6DaGVQ3dzZM4RNXOjr0Q7cG3-6lzcRiTXu0i6pzCioHJIT')" }}></div>
                                        </div>
                                        <div className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate">Design_System_v2.png</div>
                                        <div className="text-[9px] text-slate-400 uppercase">2.4 MB</div>
                                    </div>
                                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-100 dark:border-slate-800 hover:border-[#5048e5]/40 transition-colors group cursor-pointer aspect-video h-full">
                                        <div className="text-center">
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-[#5048e5] transition-colors">upload_file</span>
                                            <div className="text-[10px] font-medium text-slate-400">Upload</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-auto border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                                <span className="material-symbols-outlined text-sm">forum</span>
                                Comments
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="size-8 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGHCqy2z8EzGYfc-vtynS9SWtcKLkK5Oqdu_EX12c7bGwrq3yeyG-1ZPFJzkf0FwLdKXfchWsNjOFX_yNnAWGldRuhem3v9wjwbW9p-LQC6EQ4nlun2iq-0UuQeute7AGYJ8916bTun_jSDe-TLnnwjo9rZDm8RUh9qFNxadvs4Chi2BGouHZ5umJRWPzIAJojlvLAUjhOR_MfkUp68SlUsVRUlbGFLL_Ydf32BADe5TWNB92_vXHhNtOem0H80rJXSwFovBBcy9dR')" }}></div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">Sarah Jenkins</span>
                                            <span className="text-[10px] text-slate-400">2 hours ago</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">I've added the updated button states to the file. <span className="text-[#5048e5] font-medium">@Alex Rivera</span> please take a look.</p>
                                        <div className="flex items-center gap-4 pt-1">
                                            <button className="text-[10px] font-bold text-slate-400 hover:text-[#5048e5]">Reply</button>
                                            <button className="text-[10px] font-bold text-slate-400 hover:text-[#5048e5] flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">thumb_up</span> 2</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <div className="size-8 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBp6-wXSB7cqKSaoLnzFNeB_X2svfANaECjqZkyrzmDx5U7pn-zxu6k9x6OWJKmvzXgzX1sqQ25DhjDcwfOICutglKsdSa3JVoQWAZyFS0Py7V4oMQvfY-AaUp-lmugAwKU7mB5AVfsf_aY9WA2PxFYQmFoVY0IUh_sVqJ5D3sFpaQdYFK-XBvQ7qwk6qZbUXrqxWKklNfN0NDkpHb6a_guZxcBtGmg9z6DaGVQ3dzZM4RNXOjr0Q7cG3-6lzcRiTXu0i6pzCioHJIT')" }}></div>
                                    <div className="flex-1 relative">
                                        <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 pl-4 pr-12 text-sm focus:ring-2 focus:ring-[#5048e5]/20 focus:border-[#5048e5] transition-all" placeholder="Add a comment... Type @ to mention" type="text" />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5048e5] hover:bg-[#5048e5]/10 p-1.5 rounded-md transition-colors">
                                            <span className="material-symbols-outlined">send</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Sidebar (Right) */}
                    <aside className="w-[40%] bg-slate-50/50 dark:bg-slate-900/10 overflow-y-auto custom-scrollbar">
                        <div className="p-8 space-y-8">
                            <div className="space-y-6">
                                <div className="grid grid-cols-3 items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignee</span>
                                    <div className="col-span-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-lg cursor-pointer transition-colors -ml-1">
                                        <div className="size-7 rounded-full bg-cover bg-center ring-2 ring-white dark:ring-slate-900" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf7ihjs25oYbm49hAVDRoS6WdzzsdVb6Jcpl1G8RHjSkuk-G1hY9JLytA7w8ExLLGoHVdnfyN2efuJh3PpvMt4_NB04QEGgTaNgC41oGsHO_7HWLjrn6ylx7-q6dapj4Yjro49vct-9ywDbGs8cbv3cBic0pyknhNKwnx27T2wJ_Hr9kDfvnkKNu0bi40ha-q5s-9Ks_QiXc1ITNURJ3lv_ui-e9YpNKsuzn3ZYxmAHGqsjRT3naErbTWlnYpld9VpaSj2VvIMGfFs')" }}></div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">David Chen</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</span>
                                    <div className="col-span-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-lg cursor-pointer transition-colors -ml-1">
                                        <span className="material-symbols-outlined text-red-500 fill-1">flag</span>
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">High</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</span>
                                    <div className="col-span-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-lg cursor-pointer transition-colors -ml-1">
                                        <span className="material-symbols-outlined text-slate-400">calendar_today</span>
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Oct 24, 2023</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 items-start">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Tags</span>
                                    <div className="col-span-2 flex flex-wrap gap-1.5 -ml-1">
                                        <span className="px-2 py-0.5 bg-[#5048e5]/10 text-[#5048e5] rounded text-[10px] font-bold">Design</span>
                                        <span className="px-2 py-0.5 bg-[#5048e5]/10 text-[#5048e5] rounded text-[10px] font-bold">Phase 1</span>
                                        <button className="px-2 py-0.5 border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 rounded text-[10px] font-bold hover:bg-slate-100 transition-colors">
                                            + Add Tag
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-slate-100 dark:bg-slate-800"></div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-sm">link</span>
                                    Relationships
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-lg group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <span className="material-symbols-outlined text-red-500">bug_report</span>
                                            <div className="overflow-hidden">
                                                <div className="text-[11px] font-bold text-slate-400 leading-none mb-1">Linked Bug</div>
                                                <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 truncate">BUG-102: Modal shadow clipping on Safari</div>
                                            </div>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all">
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                    <button className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-[#5048e5] hover:border-[#5048e5]/40 transition-all">
                                        <span className="material-symbols-outlined text-sm">add_link</span>
                                        Link Bug ID
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 bg-[#5048e5]/5 rounded-xl space-y-3">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-[#5048e5] uppercase">Task Progress</span>
                                    <span className="text-[10px] font-bold text-[#5048e5]">66%</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#5048e5]/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#5048e5] w-[66%]"></div>
                                </div>
                                <p className="text-[10px] text-slate-500 italic">2 of 3 checklist items completed</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;
