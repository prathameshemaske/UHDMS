import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bugService } from '../services/bugService';
import { authService } from '../services/authService';

const IssueDetail = () => {
    const { id } = useParams();
    const [bug, setBug] = useState(null);
    const [comments, setComments] = useState([]);
    const [history, setHistory] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [linkedItems, setLinkedItems] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('comments');
    const [allUsers, setAllUsers] = useState([]);

    // Inline Edit States
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState('');
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [descDraft, setDescDraft] = useState('');

    // Dropdown States
    const [statusOpen, setStatusOpen] = useState(false);
    const [assigneeOpen, setAssigneeOpen] = useState(false);
    const [priorityOpen, setPriorityOpen] = useState(false);

    // Linked Task Input
    const [linkTaskId, setLinkTaskId] = useState('');
    const [isLinkInputVisible, setIsLinkInputVisible] = useState(false);

    useEffect(() => {
        if (id) {
            loadData();
            authService.getCurrentUser().then(setCurrentUser);
            fetchUsers();
        }
    }, [id]);

    const fetchUsers = async () => {
        try {
            const users = await bugService.getAllProfiles();
            setAllUsers(users);
        } catch (e) {
            console.error("Failed to load users", e);
        }
    };

    const loadData = async () => {
        try {
            const data = await bugService.getBugDetails(id);
            setBug(data);
            setTitleDraft(data.title);
            setDescDraft(data.description || '');
            setComments(data.comments || []);

            const [hist, attach, links] = await Promise.all([
                bugService.getHistory(id),
                bugService.getAttachments(id),
                bugService.getLinkedItems(id)
            ]);
            setHistory(hist);
            setAttachments(attach);
            setLinkedItems(links);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateField = async (field, value) => {
        try {
            const user = await authService.getCurrentUser();
            const updated = await bugService.updateBug(id, { [field]: value }, user.id);
            setBug(prev => ({ ...prev, [field]: updated[field] }));

            // Refresh history
            const hist = await bugService.getHistory(id);
            setHistory(hist);

            // Close dropdowns
            setStatusOpen(false);
            setAssigneeOpen(false);
            setPriorityOpen(false);

        } catch (error) {
            alert(`Failed to update ${field}: ` + error.message);
        }
    };

    const saveTitle = async () => {
        if (titleDraft === bug.title) {
            setIsEditingTitle(false);
            return;
        }
        await handleUpdateField('title', titleDraft);
        setIsEditingTitle(false);
    };

    const saveDescription = async () => {
        if (descDraft === bug.description) {
            setIsEditingDesc(false);
            return;
        }
        await handleUpdateField('description', descDraft);
        setIsEditingDesc(false);
    };

    const handlePostComment = async () => {
        if (!newComment.trim()) return;
        try {
            const comment = await bugService.addComment(id, newComment);
            setComments(prev => [...prev, comment]);
            setNewComment('');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            await bugService.uploadAttachment(id, file);
            const attach = await bugService.getAttachments(id);
            setAttachments(attach);
        } catch (error) {
            alert('Upload failed: ' + error.message);
        }
    };

    const handleLinkTask = async () => {
        if (!linkTaskId) return;
        try {
            await bugService.linkTask(id, linkTaskId);
            const links = await bugService.getLinkedItems(id);
            setLinkedItems(links);
            setLinkTaskId('');
            setIsLinkInputVisible(false);
        } catch (error) {
            alert('Failed to link task (Ensure Task ID is valid): ' + error.message);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading issue...</div>;
    if (!bug) return (
        <div className="p-8 text-center">
            <div className="text-slate-500 mb-2">Issue not found.</div>
            <button onClick={loadData} className="text-indigo-600 font-bold hover:underline">Retry</button>
        </div>
    );

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'text-red-500';
            case 'highest': return 'text-red-700';
            case 'medium': return 'text-orange-400';
            case 'low': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="bg-[#f6f6f8] min-h-screen text-slate-900 font-display">
            {/* Header */}


            <main className="max-w-[1440px] mx-auto px-6 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link className="hover:text-[#4F46E5]" to="/bugs">Bug Tracker</Link>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="font-medium text-slate-900">UHD-{bug.id.toString().slice(0, 4)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
                    {/* Main Content Column */}
                    <div className="col-span-1 md:col-span-7 space-y-8">
                        {/* Title Section (Click to Edit) */}
                        <section>
                            {isEditingTitle ? (
                                <input
                                    className="w-full text-3xl font-bold text-slate-900 tracking-tight border-b-2 border-[#4F46E5] focus:outline-none bg-transparent"
                                    value={titleDraft}
                                    onChange={(e) => setTitleDraft(e.target.value)}
                                    onBlur={saveTitle} // Save on click away
                                    onKeyDown={(e) => e.key === 'Enter' && saveTitle()}
                                    autoFocus
                                />
                            ) : (
                                <h1
                                    onClick={() => setIsEditingTitle(true)}
                                    className="text-3xl font-bold text-slate-900 tracking-tight cursor-text hover:bg-slate-100 rounded px-1 -mx-1 border border-transparent hover:border-slate-200 transition-colors"
                                    title="Click to edit"
                                >
                                    {bug.title}
                                </h1>
                            )}
                        </section>

                        {/* Description Section (Click to Edit) */}
                        <section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm group relative">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Description</h3>
                            {isEditingDesc ? (
                                <textarea
                                    className="w-full min-h-[150px] text-slate-700 leading-relaxed border border-[#4F46E5] rounded p-2 focus:ring-1 focus:ring-[#4F46E5]"
                                    value={descDraft}
                                    onChange={(e) => setDescDraft(e.target.value)}
                                    onBlur={saveDescription}
                                    autoFocus
                                />
                            ) : (
                                <div
                                    onClick={() => setIsEditingDesc(true)}
                                    className="text-slate-700 leading-relaxed space-y-4 cursor-text hover:bg-slate-50 p-2 -m-2 rounded transition-colors min-h-[100px]"
                                    title="Click to edit description"
                                >
                                    {bug.description ? (
                                        <div className="markdown-preview space-y-2">
                                            {bug.description.split('\n').map((line, i) => {
                                                // Check for list items
                                                if (line.trim().startsWith('- ')) {
                                                    return (
                                                        <div key={i} className="flex gap-2 ml-4">
                                                            <span className="text-slate-400">•</span>
                                                            <span dangerouslySetInnerHTML={{
                                                                __html: line.replace(/^- /, '')
                                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                                            }} />
                                                        </div>
                                                    );
                                                }
                                                // Check for ordered list
                                                if (/^\d+\. /.test(line.trim())) {
                                                    return (
                                                        <div key={i} className="flex gap-2 ml-4">
                                                            <span className="text-slate-400 font-mono text-xs pt-1">{line.match(/^\d+\./)[0]}</span>
                                                            <span dangerouslySetInnerHTML={{
                                                                __html: line.replace(/^\d+\. /, '')
                                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                                            }} />
                                                        </div>
                                                    );
                                                }
                                                // Standard paragraph with bold/italic link support
                                                // Note: This is specific safe replacement for specific markers
                                                if (!line.trim()) return <br key={i} />;

                                                const htmlContent = line
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                    .replace(/\*(.*?)\*/g, '<em>$1</em>');

                                                return <div key={i} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
                                            })}
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 italic">No description provided. Click to add one.</span>
                                    )}
                                </div>
                            )}
                        </section>

                        {/* Attachments */}
                        <section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Attachments ({attachments.length})</h3>
                                <label className="text-[#4F46E5] text-sm font-semibold flex items-center gap-1 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded">
                                    <span className="material-symbols-outlined text-sm">add</span> Add
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {attachments.map(att => (
                                    <a key={att.id} href={att.file_url} target="_blank" rel="noopener noreferrer" className="group relative rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:border-[#4F46E5]">
                                        <div className="aspect-video bg-slate-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-400 text-3xl">description</span>
                                        </div>
                                        <div className="p-2 flex items-center gap-2 border-t border-slate-200 bg-white">
                                            <span className="text-xs font-medium truncate">{att.file_name}</span>
                                        </div>
                                    </a>
                                ))}
                                {attachments.length === 0 && <div className="text-sm text-slate-400 italic">No attachments.</div>}
                            </div>
                        </section>

                        {/* Comments & History Tabs */}
                        <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="border-b border-slate-200 px-6">
                                <div className="flex items-center gap-8 h-12">
                                    <button
                                        onClick={() => setActiveTab('comments')}
                                        className={`text-sm font-bold h-full border-b-2 transition-colors ${activeTab === 'comments' ? 'text-[#4F46E5] border-[#4F46E5]' : 'text-slate-500 border-transparent hover:text-slate-900'}`}
                                    >
                                        Comments ({comments.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('history')}
                                        className={`text-sm font-bold h-full border-b-2 transition-colors ${activeTab === 'history' ? 'text-[#4F46E5] border-[#4F46E5]' : 'text-slate-500 border-transparent hover:text-slate-900'}`}
                                    >
                                        History
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                {activeTab === 'comments' && (
                                    <>
                                        <div className="flex gap-4">
                                            <div className="size-8 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                                                <img src={currentUser?.avatar_url || `https://ui-avatars.com/api/?name=${currentUser?.email || 'User'}&background=random`} className="w-full h-full object-cover" alt="Me" />
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <textarea
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    className="w-full border-slate-200 rounded-lg text-sm focus:ring-[#4F46E5] focus:border-[#4F46E5] min-h-[80px] p-3"
                                                    placeholder="Add a comment..."
                                                ></textarea>
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={handlePostComment} className="px-4 py-1.5 text-sm font-semibold bg-[#4F46E5] text-white rounded-lg hover:bg-opacity-90">Comment</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6 pt-4">
                                            {comments.map((comment) => (
                                                <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
                                                    <div className="size-8 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                                                        <img
                                                            src={comment.author?.avatar_url || `https://ui-avatars.com/api/?name=${comment.author?.first_name || 'User'}&background=random`}
                                                            className="w-full h-full object-cover"
                                                            alt="Author"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-bold text-slate-900">{comment.author?.first_name} {comment.author?.last_name}</span>
                                                            <span className="text-xs text-slate-400">{new Date(comment.created_at).toLocaleString()}</span>
                                                        </div>
                                                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{comment.content}</div>
                                                    </div>
                                                </div>
                                            ))}
                                            {comments.length === 0 && <p className="text-center text-slate-400 italic">No comments yet.</p>}
                                        </div>
                                    </>
                                )}

                                {activeTab === 'history' && (
                                    <div className="space-y-4">
                                        {history.map(item => (
                                            <div key={item.id} className="flex gap-3 text-sm text-slate-600 border-b border-slate-100 pb-3">
                                                <span className="material-symbols-outlined text-slate-400 text-[18px]">history</span>
                                                <div>
                                                    <span className="font-bold text-slate-900">{item.author?.first_name || 'User'}</span>
                                                    <span> changed </span>
                                                    <span className="font-semibold text-slate-800">{item.field_changed}</span>
                                                    <span> from </span>
                                                    <span className="line-through text-slate-400">{item.old_value || '(empty)'}</span>
                                                    <span> to </span>
                                                    <span className="font-bold text-[#4F46E5]">{item.new_value}</span>
                                                    <div className="text-xs text-slate-400 mt-1">{new Date(item.created_at).toLocaleString()}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {history.length === 0 && <p className="text-center text-slate-400 italic">No history yet.</p>}
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="col-span-1 md:col-span-3 space-y-6">
                        {/* Status */}
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm relative z-20">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Status</p>
                            <div className="relative">
                                <button
                                    onClick={() => setStatusOpen(!statusOpen)}
                                    className="w-full flex items-center justify-between px-4 py-2 bg-indigo-50 border border-[#4F46E5]/20 rounded-lg text-[#4F46E5] font-bold hover:bg-indigo-100 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`size-2 rounded-full ${bug.status === 'Done' ? 'bg-green-500' : 'bg-[#4F46E5]'} animate-pulse`}></span>
                                        <span className="uppercase">{bug.status || 'To Do'}</span>
                                    </div>
                                    <span className="material-symbols-outlined">expand_more</span>
                                </button>
                                {statusOpen && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 animate-in fade-in zoom-in-95 duration-100">
                                        {['To Do', 'In Progress', 'Done'].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => handleUpdateField('status', s)}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 font-medium"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details Panel */}
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6 relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Details</h3>
                            <div className="space-y-4">
                                {/* Assignee Change */}
                                <div>
                                    <p className="text-xs text-slate-500 mb-2 font-medium">Assignee</p>
                                    <div className="relative">
                                        <button
                                            onClick={() => setAssigneeOpen(!assigneeOpen)}
                                            className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 w-full text-left"
                                        >
                                            <div className="size-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                                                {bug.assignee ? bug.assignee.charAt(0) : '?'}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 truncate flex-1">{bug.assignee || 'Unassigned'}</span>
                                            <span className="material-symbols-outlined text-xs text-slate-400">edit</span>
                                        </button>
                                        {/* Dropdown for Assignee */}
                                        {assigneeOpen && (
                                            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                                                {allUsers.map(user => (
                                                    <button
                                                        key={user.id}
                                                        onClick={() => handleUpdateField('assignee', `${user.first_name} ${user.last_name}`)}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2"
                                                    >
                                                        <div className="size-5 rounded-full bg-slate-100 overflow-hidden">
                                                            {user.avatar_url && <img src={user.avatar_url} className="w-full h-full object-cover" />}
                                                        </div>
                                                        {user.first_name} {user.last_name}
                                                    </button>
                                                ))}
                                                <button onClick={() => handleUpdateField('assignee', '')} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Unassign</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Priority Change */}
                                <div>
                                    <p className="text-xs text-slate-500 mb-2 font-medium">Priority</p>
                                    <div className="relative">
                                        <button
                                            onClick={() => setPriorityOpen(!priorityOpen)}
                                            className="flex items-center gap-1.5 px-2 w-full text-left hover:bg-slate-50 p-1 rounded"
                                        >
                                            <span className={`material-symbols-outlined ${getPriorityColor(bug.priority)} text-[18px]`}>keyboard_double_arrow_up</span>
                                            <span className="text-sm font-semibold text-slate-700 flex-1">{bug.priority || 'Medium'}</span>
                                            <span className="material-symbols-outlined text-xs text-slate-400">edit</span>
                                        </button>
                                        {priorityOpen && (
                                            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 animate-in fade-in zoom-in-95 duration-100">
                                                {['Low', 'Medium', 'High', 'Highest'].map(p => (
                                                    <button
                                                        key={p}
                                                        onClick={() => handleUpdateField('priority', p)}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 font-medium"
                                                    >
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 mb-1 font-medium px-2">Created</p>
                                    <p className="text-sm text-slate-700 px-2">{new Date(bug.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Linked Tasks */}
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Linked Tasks</h3>
                                <button onClick={() => setIsLinkInputVisible(!isLinkInputVisible)} className="p-1 hover:bg-slate-100 rounded">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">add</span>
                                </button>
                            </div>
                            {isLinkInputVisible && (
                                <div className="flex gap-2 mb-3">
                                    <input
                                        value={linkTaskId}
                                        onChange={e => setLinkTaskId(e.target.value)}
                                        placeholder="Task ID (UUID)..."
                                        className="w-full text-xs border p-1 rounded"
                                    />
                                    <button onClick={handleLinkTask} className="text-xs bg-[#4F46E5] text-white px-2 rounded">Link</button>
                                </div>
                            )}
                            {linkedItems.map(link => (
                                <div key={link.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#4F46E5]/40 cursor-pointer transition-colors group mb-2">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-slate-400 text-lg group-hover:text-[#4F46E5] transition-colors">assignment_turned_in</span>
                                        <div>
                                            {/* Fallback display if task details aren't joined properly or task is null */}
                                            <p className="text-xs font-bold text-[#4F46E5] mb-0.5">Linked Item</p>
                                            <p className="text-sm font-medium text-slate-700 line-clamp-1 truncate w-40">{link.target_task_id}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {linkedItems.length === 0 && <div className="text-sm text-slate-400 italic">No linked tasks.</div>}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default IssueDetail;
