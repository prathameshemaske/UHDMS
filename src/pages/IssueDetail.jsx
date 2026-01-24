import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const IssueDetail = () => {
    const { id } = useParams();
    const [bug, setBug] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchBugDetails();
    }, [id]);

    const fetchBugDetails = async () => {
        try {
            const { data, error } = await supabase
                .from('bugs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setBug(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading issue...</div>;
    if (!bug) return <div className="p-8 text-center text-slate-500">Issue not found.</div>;

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'text-red-500';
            case 'medium': return 'text-orange-400';
            case 'low': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="bg-[#f6f6f8] min-h-screen text-slate-900 font-display">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-[#4F46E5]">
                        <div className="size-6">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path></svg>
                        </div>
                        <h1 className="text-slate-900 text-lg font-bold tracking-tight">UHDMS</h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-slate-600 text-sm font-medium hover:text-[#4F46E5] transition-colors">Dashboard</Link>
                        <Link to="/bugs" className="text-[#4F46E5] text-sm font-bold border-b-2 border-[#4F46E5] py-4 -mb-3">Issues</Link>
                        <a className="text-slate-600 text-sm font-medium hover:text-[#4F46E5] transition-colors" href="#">Projects</a>
                        <a className="text-slate-600 text-sm font-medium hover:text-[#4F46E5] transition-colors" href="#">Boards</a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1.5 w-64">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                        <input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400" placeholder="Search issues..." type="text" />
                    </div>
                    <button className="bg-[#4F46E5] text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all">
                        Create Issue
                    </button>
                    <div className="size-8 rounded-full bg-cover border border-slate-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFyopq1iVnSmfrJbYpI8YVLZVcUyc91jUapMjs_V3Aj2wdHldgxtgyzN530t6ME__SmmWOWKAnLwPxgdA7u5H3Sj6K9E-iupZ1iI60ZkwhBizFG4i99oLH4TfELMTG6OG0B7MntAchEJTpRdNEL-HhGM2pyXZ3sOqtAf_-l_5XfCPmlpQ3K_e8mUd4GGZr3VDH1_apRWigPh6ROQHlvhMVpAR-ESuUBDxM4bH3Td07banNXwzqrTa9kmssvv469P8NtqLdxFnh12jH")' }}></div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <a className="hover:text-[#4F46E5]" href="#">Projects</a>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <Link className="hover:text-[#4F46E5]" to="/bugs">Engineering Bug Tracker</Link>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="font-medium text-slate-900">UHD-{bug.id.toString().slice(0, 4)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-500">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-500">
                            <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
                    {/* Main Content Column */}
                    <div className="col-span-1 md:col-span-7 space-y-8">
                        <section>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{bug.title}</h1>
                        </section>

                        <section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Description</h3>
                            <div className="text-slate-700 leading-relaxed space-y-4">
                                <p>{bug.description || "No description provided."}</p>
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Steps to Reproduce</h3>
                            <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                                <li>Open App on target device (iOS/Android).</li>
                                <li>Navigate to the reported screen.</li>
                                <li>Observe the reported behavior.</li>
                                {/* Static placeholder for now as Steps aren't in DB */}
                            </ol>
                        </section>

                        <section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Attachments (3)</h3>
                                <button className="text-[#4F46E5] text-sm font-semibold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">add</span> Add
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="group relative rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:border-[#4F46E5]">
                                    <div className="aspect-video bg-slate-100 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkcMQkWt3VO5SBihtwHry8wJpjSIEkY5mObchDOPciN2ibuf2-VIEy9wvBgqlW69t4iyx8CNJ4upsQGm4Ojxmk9JhFg9KMz1BEZZj_-JXBKObSYQfZHwy1ume9XOgvsvdaAYwTvrqj85jS3UirFbvQkryTZ63hepQorW4xUFtkQEc16NsS82Nf3E4NTMh7kHpiR8IWoYJERsGZzvFawJj6n6E3M7Yl2WyGRrHSRtDTOWhAvu7nE2MpgirbtZdE9goqHe5VCNnytdDA")' }}></div>
                                    <div className="p-2 flex items-center gap-2 border-t border-slate-200 bg-white">
                                        <span className="material-symbols-outlined text-sm text-slate-400">image</span>
                                        <span className="text-xs font-medium truncate">screen_flicker_01.png</span>
                                    </div>
                                </div>
                                {/* Reduced to 1 image + upload box for brevity/layout match */}
                                <div className="group relative rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:border-[#4F46E5] flex items-center justify-center bg-slate-50 border-dashed">
                                    <div className="p-8 text-center">
                                        <span className="material-symbols-outlined text-slate-400 mb-1">upload</span>
                                        <p className="text-xs text-slate-400">Drop files here</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="border-b border-slate-200 px-6">
                                <div className="flex items-center gap-8 h-12">
                                    <button className="text-sm font-bold text-[#4F46E5] border-b-2 border-[#4F46E5] h-full">Comments</button>
                                    <button className="text-sm font-medium text-slate-500 hover:text-slate-900 h-full">History</button>
                                    <button className="text-sm font-medium text-slate-500 hover:text-slate-900 h-full">Work Log</button>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex gap-4">
                                    <div className="size-8 rounded-full bg-cover shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZDE1tpniyMU8AXJLUJvvVo7b_84KVyvpRt7MygiWh5HxA4BPUB8lRSScd3VkMKVToxyWIvrIafdZ5l2MWW7HhA6hbF-HY-NIb1Y-SHq1JHEq2vcL0BLclga9bkiNsS_JuCk2o0aYGRF1J6GI4q36FrukF-LuRLDoQCOHmfM0lhlkilgVXMc0J7DrMhL8tknnZseVs4G_945u9v03S_kCzoEuD5_FydpKk2zxOZaPZvLd6dAQCXi6YRFZ2-BjbTjC_PkJDMNmiYeWg")' }}></div>
                                    <div className="flex-1 space-y-3">
                                        <textarea className="w-full border-slate-200 rounded-lg text-sm focus:ring-[#4F46E5] focus:border-[#4F46E5] min-h-[80px] p-3" placeholder="Add a comment..."></textarea>
                                        <div className="flex justify-end gap-2">
                                            <button className="px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                                            <button className="px-4 py-1.5 text-sm font-semibold bg-[#4F46E5] text-white rounded-lg">Comment</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6 pt-4">
                                    <div className="flex gap-4">
                                        <div className="size-8 rounded-full bg-cover shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgvHsfPOrE0yQsOToxVEDmtzL2vW4lBNe0vZtVp9FPkSnDWCSIjdqybDhmlkr2jh_3rZXVOQSdbf4YkKI2X5pgwLDvcYQ3pvEoISN6uNJfvjUM05yfhg_WDVyLWez_pwlFVDKVwIxNIslgcwkeXBYUd1MzLYqlFK8z9VY__mjb5BupZU4kjiOJBsqQ3zpH2cHEdzjy2M5N_sVa0z8nj8ninmucA49sD1uUEeoukRhZ_jDuitQhd93MJVDW2dQ68s-zmkcZICGIkKvQ")' }}></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-bold text-slate-900">Sam Chen</span>
                                                <span className="text-xs text-slate-400">2 hours ago</span>
                                            </div>
                                            <div className="text-sm text-slate-600 leading-relaxed">I managed to reproduce this on a physical iPhone 13 Pro. It looks like a CSS transition conflict on the login overlay.</div>
                                            <div className="flex items-center gap-4 mt-2">
                                                <button className="text-xs text-slate-400 hover:text-[#4F46E5] font-medium">Reply</button>
                                                <button className="text-xs text-slate-400 hover:text-[#4F46E5] font-medium">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="col-span-1 md:col-span-3 space-y-6">
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Status</p>
                            <button className="w-full flex items-center justify-between px-4 py-2 bg-indigo-50 border border-[#4F46E5]/20 rounded-lg text-[#4F46E5] font-bold hover:bg-indigo-100 transition-colors">
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-[#4F46E5] animate-pulse"></span>
                                    <span className="uppercase">{bug.status || 'In Progress'}</span>
                                </div>
                                <span className="material-symbols-outlined">expand_more</span>
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-slate-500 mb-2 font-medium">Assignee</p>
                                    <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer border border-transparent hover:border-slate-200 transition-all">
                                        <div className="size-6 rounded-full bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmmcC3cuimXSLtq4CwFDfXn9b2OLsYtwCF9VouBd-LBvEriDxGmmaKWded8tqrTOqewN8DICGBqCctdpCmVXJxRajCnEjaBBWECHGI1061zbc4557YKy9cR2jdQdRa_7Eix7RKx695cMLuafhRGM523zf5F-D-7pwVIUdIUiZui7j1H9Ys_LVUTg-Z0Gzit5ZfLoz4VHtwo-g-X4hXfih0yx_yfDLXn5zpGUx67Wn4Y-37leCfajN0_6dLbNHKmdM2e1nr0m8h9au3")' }}></div>
                                        <span className="text-sm font-medium text-slate-700">Marcus Kane</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-2 font-medium">Reporter</p>
                                    <div className="flex items-center gap-2 px-2">
                                        <div className="size-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">AR</div>
                                        <span className="text-sm text-slate-700">Alex Rivera</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-2 font-medium">Priority</p>
                                    <div className="flex items-center gap-1.5 px-2">
                                        <span className={`material-symbols-outlined ${getPriorityColor(bug.priority)} text-[18px]`}>keyboard_double_arrow_up</span>
                                        <span className="text-sm font-semibold text-slate-700">{bug.priority || 'Medium'}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-2 font-medium">Labels</p>
                                    <div className="flex flex-wrap gap-1.5 px-2">
                                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold border border-indigo-200">iOS-ONLY</span>
                                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold border border-indigo-200">AUTH</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1 font-medium px-2">Created</p>
                                    <p className="text-sm text-slate-700 px-2">{new Date(bug.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Linked Tasks</h3>
                                <button className="p-1 hover:bg-slate-100 rounded">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">add</span>
                                </button>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#4F46E5]/40 cursor-pointer transition-colors group">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-slate-400 text-lg group-hover:text-[#4F46E5] transition-colors">assignment_turned_in</span>
                                    <div>
                                        <p className="text-xs font-bold text-[#4F46E5] mb-0.5">HR-402</p>
                                        <p className="text-sm font-medium text-slate-700 line-clamp-2">Update mobile login policy documentation</p>
                                        <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-bold">
                                            DONE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default IssueDetail;
