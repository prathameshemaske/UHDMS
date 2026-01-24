import React from 'react';

const VideoCall = () => {
    return (
        <div className="bg-[#121121] font-display text-white overflow-hidden h-screen w-full relative flex flex-col bg-black">
            <style dangerouslySetInnerHTML={{
                __html: `
                .video-overlay {
                    background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.6) 100%);
                }
                .fill-icon {
                    font-variation-settings: 'FILL' 1;
                }
            `}} />

            {/* Main Video Area */}
            <div className="absolute inset-0 w-full h-full">
                <div className="w-full h-full bg-center bg-cover bg-no-repeat grayscale-[0.1]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDH0Ddsxo_JFIXB12Sf1nKfnivKNDHjQOz5JSOZfErNIBUq76NfZB4a89Pr_lTHTqfnD8HpGklvit__L5fP2Ph8fx4GwzJjtfB2dw8ZEcyvSULwoJcXSJeMrjsaty5p55OUZr6dAG3oXjbqacwyOePKacBKrHg2QsOKg-GEo3pmNUg_g_7LJJAH6tzPoognarw2En8M0zX-k_ggKAclgic-fJ4jTFAfRL1zrN5uza6s4OfX9k7gSGqewsQHGsCdsOg9pipfhaJc44Uf")' }}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="video-overlay absolute inset-0"></div>
                </div>

                {/* Top Left Info */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold tracking-wide">Alice Smith</span>
                        <span className="text-xs text-white/60 ml-2">12:45</span>
                    </div>
                </div>

                {/* Top Right Status */}
                <div className="absolute top-6 right-6 flex items-center gap-4">
                    <div className="bg-black/40 backdrop-blur-md p-2 rounded-lg border border-white/10">
                        <span className="material-symbols-outlined text-green-400 text-xl">signal_cellular_alt</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs text-white/60">lock</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Encrypted</span>
                    </div>
                </div>
            </div>

            {/* Self View (PiP) */}
            <div className="absolute top-24 right-6 w-64 aspect-video rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#1a192e]">
                <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDcdpnVW2mQPlSUjAVVfmyC0YUYtGQo65xu2PRNzko_Q8hXJ309UuEd__51TtFgfk9hiOaTmlI5I-dtCMdk6E1gNfG0IEcHTmF1FaBKSkjsx4NUFY3TKMHAXdWnWR9XFxchgUZer76k80ZRQ8xE8d3i57vEcNHt0_BG1Jd-2TMLk_G3OGVrDIc_lYDth5nZf4cConqwTIvlMGpLIjlHr9ZKN9_zdEjRxBb9Sx04a1aS6Enqhg08ThlfDQOsg73nVOnjtmanNg0GiFYY")' }}>
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] font-medium">You</div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <button className="group flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/5">
                        <span className="material-symbols-outlined">mic</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">Mute</span>
                </button>
                <button className="group flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#6366f1] flex items-center justify-center border border-white/20 shadow-lg shadow-indigo-500/20">
                        <span className="material-symbols-outlined fill-icon">videocam</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#6366f1] uppercase tracking-tighter">Camera</span>
                </button>
                <button className="group flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/5">
                        <span className="material-symbols-outlined">present_to_all</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">Share</span>
                </button>
                <div className="h-10 w-px bg-white/10 mx-2"></div>
                <button className="group flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/5">
                        <span className="material-symbols-outlined">settings</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">Settings</span>
                </button>
                <button
                    className="group flex flex-col items-center gap-1 ml-4"
                    onClick={() => window.location.href = '/communication'}
                >
                    <div className="w-14 h-14 rounded-2xl bg-red-600 hover:bg-red-700 transition-all flex items-center justify-center border border-white/20 shadow-xl shadow-red-900/40">
                        <span className="material-symbols-outlined fill-icon text-2xl">call_end</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">End Call</span>
                </button>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-6 bottom-1/2 translate-y-1/2 flex flex-col gap-3">
                <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">chat_bubble</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">group</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">grid_view</span>
                </button>
            </div>
        </div>
    );
};

export default VideoCall;
