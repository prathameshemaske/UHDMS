import React from 'react';

const NewChatModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="absolute inset-0 z-40" onClick={onClose}></div>
            <div className="relative z-50 w-full max-w-[520px] bg-white dark:bg-[#1a1a2e] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-5 border-b border-[#f1f0f4] dark:border-[#2a2a3a] flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#121117] dark:text-white">New Chat</h2>
                    <button className="text-[#656487] hover:text-[#121117] dark:hover:text-white" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <div className="flex items-center w-full rounded-lg bg-[#f1f0f4] dark:bg-[#2a2a3a] border border-transparent focus-within:border-[#5d55e7]/50 focus-within:bg-white dark:focus-within:bg-[#1a1a2e] transition-all">
                        <div className="pl-4 text-[#656487]">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input className="w-full border-none bg-transparent focus:ring-0 text-sm py-3 px-3 placeholder:text-[#656487] dark:text-white" placeholder="Search people or channels" type="text" autoFocus />
                    </div>
                </div>
                <div className="px-6 py-2 flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#5d55e7]/10 rounded-full border border-[#5d55e7]/20">
                        <div className="size-5 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDczfXd8_jpmsiDQgD-cOiUEHbZ-D_2FtIeot5wHLv0RrX8GieBQaFdO0yruN3vR3cZ0AYBUXxNCACOsBB9tlD15g37u8X5zc-oyDs6q99Ssjvd20VAatjrPQ_MVqXspVA7yCP6zZujO2BrF8Xx6Ivg8D8SI1sDh34zF9KI5SO2rzZrsIlzMBuJOmKGm9LMpzhPJxWU6fZ2J4Oj0-qerpkP019SleG5Aagj4CSnC7SqFd7PJ5VAshJEP1JpIBjAsuJeokhEkGp37sdG")' }}></div>
                        <span className="text-xs font-semibold text-[#5d55e7]">Alice Smith</span>
                        <button className="text-[#5d55e7]/70 hover:text-[#5d55e7] flex items-center">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#5d55e7]/10 rounded-full border border-[#5d55e7]/20">
                        <div className="size-5 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1kyewXmUa-pLv9ERGvyvVDXgVNaeB6T3X8JO40vOodOJhJSskQD1-k0BaoN6T7V2qdS08yYmiCJlV6Yr5hnE7HGMGRbpfQkXa9545utL72gB22hHv785kKVM6aBTL_8stS029OSM70iFGq3PLTWDc6U2jWNm6g73lEL-O9TLzRsS5KcfL9IRarairhFN0xcUXnvvbYjt286m8PLNv0XaNYzgpo86QtXWAKo1r4yw0_N02HwW8E0nGkG1Ad6LvqSqBMoQMuiuqIjfn")' }}></div>
                        <span className="text-xs font-semibold text-[#5d55e7]">Bob Johnson</span>
                        <button className="text-[#5d55e7]/70 hover:text-[#5d55e7] flex items-center">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                </div>
                <div className="px-2 py-2 max-h-[320px] overflow-y-auto">
                    <p className="px-4 py-2 text-[11px] font-bold text-[#656487] uppercase tracking-wider">Suggested</p>
                    <div className="px-4 py-3 flex items-center justify-between hover:bg-[#f1f0f4] dark:hover:bg-[#2a2a3a] rounded-lg cursor-pointer group mx-2">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="size-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZfGtjMWw3RZqM5dLigJVTf0ye7hrKwJF54vlo-_ZcF960tXKdH00c-wdIVdRJaO9wdXIzQ8-Ego8ybhBFHg8dy0sDhbaIrEvsC907dHJzFdHUusC7AUyCW2nOl-ftTj3YdHJdYsUTNEzW8WcqdOT_OsWiK67mxthIZRS690WNpaK69FBAMjBcsItGcDg_D4cKkunoDiDxdl_PynVxaI4gD93Ti0xCuOpSExGqAf91eeirIUNJN3mSKj6nVYa23fljsjzWxthgo9WE")' }}></div>
                                <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 border-2 border-white dark:border-[#1a1a2e] rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#121117] dark:text-white">Charlie Davis</p>
                                <p className="text-xs text-[#656487]">@charlie_davis</p>
                            </div>
                        </div>
                        <div className="size-5 rounded border border-[#5d55e7] bg-[#5d55e7] flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                        </div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between hover:bg-[#f1f0f4] dark:hover:bg-[#2a2a3a] rounded-lg cursor-pointer group mx-2">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="size-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVqL6JG4kgHlK1sj-bqlWPtW5ziXGTPu25nz49p2l217f38hkzDMS4kzGKGMGJSqZekXRdDqfSh6TRfurDYaCL8DzI_61nBQqWzoIk96Qlc9BPlgEuMIDQPcfLh737VcATkTBw6hi_iB4v2wMx8A_Nv42pVZ7I7RBYxyNEmbkUiPNZ2xcq3zGi3Q9WHVB2LqoOZV6MkGrrE3NjG4RY5yRVnQUDGT_Y8N2Qnm6bZ9IwGlNlQcSDAEt0p_XZkWJOne6Xh9_y_FmdaQ4R")' }}></div>
                                <div className="absolute -bottom-1 -right-1 size-3 bg-gray-400 border-2 border-white dark:border-[#1a1a2e] rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#121117] dark:text-white">Dana White</p>
                                <p className="text-xs text-[#656487]">Away • HR Lead</p>
                            </div>
                        </div>
                        <div className="size-5 rounded border border-[#e2e8f0] dark:border-gray-600"></div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between hover:bg-[#f1f0f4] dark:hover:bg-[#2a2a3a] rounded-lg cursor-pointer group mx-2">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="size-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtiOxG1ceovyBZ0IXQ0QDbZPMuUyawYoTud81Z16laYJvJFkUGNcH5_5TkGUlHZzA56141lM9CZYUl0usqX4sx9w4FQBgaVI1mEjpneAFcQrm0Gl0ILdPi-r8cNAnpFEaSaJFRhxxK6KNQXp-M7ooWWeY7r0iglej4WQIgHQVUA6yvCJXdOawpEspAR4bUsBPS_kzmMBhA5lK7akN7EJezz-HVDfxcwzLLv2cenqs7JCIvkJ7BhTI4cIggsTbpX-b1ck1ck2I4zxJ4")' }}></div>
                                <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 border-2 border-white dark:border-[#1a1a2e] rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#121117] dark:text-white">Edward Norton</p>
                                <p className="text-xs text-[#656487]">Online • QA Engineer</p>
                            </div>
                        </div>
                        <div className="size-5 rounded border border-[#e2e8f0] dark:border-gray-600"></div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between hover:bg-[#f1f0f4] dark:hover:bg-[#2a2a3a] rounded-lg cursor-pointer group mx-2">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-[#f1f0f4] dark:bg-[#2a2a3a] flex items-center justify-center text-[#656487]">
                                <span className="material-symbols-outlined text-xl">tag</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#121117] dark:text-white">marketing-team</p>
                                <p className="text-xs text-[#656487]">8 members</p>
                            </div>
                        </div>
                        <div className="size-5 rounded border border-[#e2e8f0] dark:border-gray-600"></div>
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-[#f1f0f4] dark:border-[#2a2a3a] flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
                    <p className="text-xs text-[#656487]">Select multiple to create a group chat</p>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-lg text-sm font-bold text-[#656487] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={onClose}>Cancel</button>
                        <button className="px-6 py-2 rounded-lg bg-[#5d55e7] text-white text-sm font-bold hover:bg-[#5d55e7]/90 transition-all shadow-md shadow-[#5d55e7]/20">Start Chat</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewChatModal;
