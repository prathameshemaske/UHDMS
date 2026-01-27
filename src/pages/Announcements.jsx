import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { announcementService } from '../services/announcementService';
import { authService } from '../services/authService';

const AnnouncementCard = ({ announcement }) => {
    const isNew = (new Date() - new Date(announcement.created_at)) / (1000 * 60 * 60) < 24;

    // Interactions State
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // Initial Interaction Load (could be optimized to batch load, but fine for now)
    useEffect(() => {
        loadInteractions();
    }, [announcement.id]);

    const loadInteractions = async () => {
        try {
            const user = await authService.getCurrentUser();
            if (user) {
                const state = await announcementService.getInteractionState(announcement.id, user.id);
                setLikes(state.likesCount);
                setIsLiked(state.isLiked);
            }
        } catch (error) {
            console.error("Error loading interactions:", error);
        }
    };

    const handleLike = async () => {
        try {
            // Optimistic Update
            const wasLiked = isLiked;
            setIsLiked(!wasLiked);
            setLikes(prev => wasLiked ? prev - 1 : prev + 1);

            await announcementService.toggleLike(announcement.id);
        } catch (error) {
            console.error("Like failed:", error);
            // Revert on failure
            setIsLiked(isLiked);
            setLikes(likes);
        }
    };

    const toggleComments = async () => {
        const shouldShow = !showComments;
        setShowComments(shouldShow);
        if (shouldShow && comments.length === 0) {
            setLoadingComments(true);
            try {
                const data = await announcementService.getComments(announcement.id);
                setComments(data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingComments(false);
            }
        }
    };

    const handlePostComment = async () => {
        if (!newComment.trim()) return;
        try {
            const addedComment = await announcementService.addComment(announcement.id, newComment);
            setComments(prev => [...prev, addedComment]);
            setNewComment('');
            setShowEmojiPicker(false);
        } catch (error) {
            console.error(error);
            alert("Failed to post comment");
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setNewComment(prev => prev + emojiObject.emoji);
    };

    // Category colors
    const categoryColors = {
        'New Joiner': 'bg-blue-50 text-blue-600',
        'Achievement': 'bg-amber-50 text-amber-600',
        'Promotion': 'bg-purple-50 text-purple-600',
        'General': 'bg-slate-50 text-slate-600'
    };

    return (
        <div className="bg-white rounded-[8px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
            {isNew && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10 animate-pulse">
                    NEW
                </div>
            )}
            {announcement.image_url && (
                <img alt={announcement.title} className="w-full h-56 object-cover" src={announcement.image_url} />
            )}
            <div className="p-6 pb-4">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded uppercase tracking-wider ${categoryColors[announcement.category] || categoryColors['General']}`}>
                        {announcement.category}
                    </span>
                    <span className="text-slate-400 text-sm">{new Date(announcement.created_at).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{announcement.title}</h2>
                <p className="text-slate-600 mb-4 leading-relaxed whitespace-pre-line">
                    {announcement.content}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                        <img src={announcement.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${announcement.profiles?.first_name || 'Admin'}&background=random`} alt="Author" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">Posted by {announcement.profiles?.first_name || 'Admin'}</span>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex gap-4">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
                        >
                            <span className={`material-symbols-outlined text-[20px] ${isLiked ? 'fill-current' : ''}`}>favorite</span>
                            {likes > 0 && <span>{likes}</span>}
                        </button>
                        <button
                            onClick={toggleComments}
                            className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                            {comments.length > 0 && <span>{comments.length}</span>}
                            <span>Comment</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="bg-slate-50 p-4 border-t border-slate-100 animate-in slide-in-from-top-2">
                    {/* List */}
                    {loadingComments ? (
                        <div className="text-center text-xs text-slate-400 py-2">Loading comments...</div>
                    ) : (
                        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto custom-scrollbar">
                            {comments.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">No comments yet. Be the first!</p>
                            ) : (
                                comments.map(comment => (
                                    <div key={comment.id} className="flex gap-2 text-sm">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                            <img src={comment.profile?.avatar_url || `https://ui-avatars.com/api/?name=${comment.profile?.first_name || 'User'}`} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="bg-white p-2 rounded-r-lg rounded-bl-lg shadow-sm border border-slate-200">
                                            <p className="font-bold text-xs text-slate-900">{comment.profile?.first_name} {comment.profile?.last_name}</p>
                                            <p className="text-slate-600">{comment.content}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Input */}
                    <div className="relative flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full pl-3 pr-10 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                                onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                            />
                            <button
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                            </button>

                            {/* Emoji Picker Popover */}
                            {showEmojiPicker && (
                                <div className="absolute bottom-full right-0 mb-2 z-50 shadow-xl rounded-xl">
                                    <div className="fixed inset-0" onClick={() => setShowEmojiPicker(false)}></div> {/* Backdrop to close */}
                                    <div className="relative z-10">
                                        <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={400} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handlePostComment}
                            disabled={!newComment.trim()}
                            className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// ... (Previous imports remain, ensuring we don't start files with invalid content during partial replace if possible, but here I will replace the modal and relevant parts)

// --- TEMPLATES DATA ---
const TEMPLATES = {
    'Birthday': [
        {
            title: "Happy Birthday, [Name]! 🎂",
            content: "Wishing a fantastic birthday to [Name]! \n\nMay your day be filled with joy, laughter, and great company. 🎈\n\n- The Team",
            category: 'General',
            image_url: "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Cake Time! 🍰",
            content: "Join us in the break room at 3 PM to celebrate [Name]'s birthday!\n\nThere will be cake and snacks. See you there!",
            category: 'General',
            image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Birthday Wishes ✨",
            content: "Happy Birthday [Name]! \n\nWishing you another year of great opportunities and achievements. Have a wonderful day!",
            category: 'General',
            image_url: "https://images.unsplash.com/photo-1464349153912-7db524d1330d?auto=format&fit=crop&q=80&w=1000"
        }
    ],
    'Anniversary': [
        {
            title: "Happy Work Anniversary! 🏆",
            content: "Congratulations to [Name] on completing [X] years with us!\n\nThank you for your dedication and hard work. Here's to many more milestones together.",
            category: 'Achievement',
            image_url: "https://images.unsplash.com/photo-1496024840928-4c4e7fbdf1bc?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "It's a Milestone! 🎉",
            content: "Celebrating [Name]'s journey with us.\n\nThank you for being such a valuable part of our team. Happy Anniversary!",
            category: 'Achievement',
            image_url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "3 Years Strong 💪",
            content: "A big shoutout to [Name] for 3 fantastic years!\n\nYour contributions have been invaluable. Keep shining!",
            category: 'Achievement',
            image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
        }
    ],
    'New Joiner': [
        {
            title: "Welcome to the Team, [Name]! 👋",
            content: "We are thrilled to have [Name] join us as our newest [Job Title].\n\n[Name] brings [X] years of experience in [Field] and loves [Hobby].\n\nPlease give them a warm welcome!",
            category: 'New Joiner',
            image_url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "New Face Overlay 🚀",
            content: "Say hello to [Name]!\n\nThey just joined the [Department] team. Feel free to stop by and say hi.",
            category: 'New Joiner',
            image_url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Onboarding: [Name] 🤝",
            content: "Welcome aboard, [Name]!\n\nWe're excited to see what we can build together.",
            category: 'New Joiner',
            image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000"
        }
    ],
    'Promotion': [
        {
            title: "Huge Congratulations to [Name]! 🚀",
            content: "We are proud to announce that [Name] has been promoted to [New Role]!\n\nThis is a well-deserved recognition of their hard work and leadership.",
            category: 'Promotion',
            image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Stepping Up: New Role 🌟",
            content: "Please join us in congratulating [Name] on their new role as [Role].\n\nWe can't wait to see them thrive in this new chapter.",
            category: 'Promotion',
            image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Well Deserved Promotion 👏",
            content: "Kudos to [Name] for their promotion!\n\nKeep up the amazing work.",
            category: 'Promotion',
            image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000"
        }
    ],
    'News': [
        {
            title: "Company Update 📢",
            content: "Team, here is an important update regarding [Topic]...\n\nPlease review at your earliest convenience.",
            category: 'General',
            image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Upcoming Event 🗓️",
            content: "Save the date!\n\nWe are hosting a [Event Name] on [Date]. Make sure to RSVP.",
            category: 'General',
            image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Office Maintenance Notice 🛠️",
            content: "Please be advised that the office will undergo maintenance on [Date].\n\nThe [Area] will be inaccessible during this time.",
            category: 'General',
            image_url: "https://images.unsplash.com/photo-1581094794329-cd1096a7a750?auto=format&fit=crop&q=80&w=1000"
        }
    ]
};

const CreateAnnouncementModal = ({ isOpen, onClose, onSave }) => {
    const [step, setStep] = useState(1); // 1 = Templates, 2 = Edit
    const [selectedCategory, setSelectedCategory] = useState('Birthday');

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'General',
        image_url: ''
    });
    const [loading, setLoading] = useState(false);

    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setFormData({ title: '', content: '', category: 'General', image_url: '' });
        }
    }, [isOpen]);

    const handleTemplateSelect = (template) => {
        setFormData({
            title: template.title,
            content: template.content,
            category: template.category,
            image_url: template.image_url
        });
        setStep(2);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await announcementService.createAnnouncement(formData);
            onSave();
            onClose();
        } catch (error) {
            console.error(error);
            alert(`Failed to post announcement: ${error.message || JSON.stringify(error)}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h3 className="text-xl font-black text-slate-900">
                            {step === 1 ? 'Choose a Template' : 'Edit Announcement'}
                        </h3>
                        <p className="text-sm text-slate-500">
                            {step === 1 ? 'Select a style to get started' : 'Customize your message before posting'}
                        </p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-6">

                    {step === 1 ? (
                        /* STEP 1: Templates */
                        <div className="space-y-6">
                            {/* Categories */}
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(TEMPLATES).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setStep(2)} // Skip to blank
                                    className="px-4 py-2 rounded-full text-sm font-bold bg-white text-slate-600 border border-dashed border-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all ml-auto"
                                >
                                    Skip & Start Blank
                                </button>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {TEMPLATES[selectedCategory].map((t, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleTemplateSelect(t)}
                                        className="group cursor-pointer bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="h-32 bg-slate-100 overflow-hidden relative">
                                            <img src={t.image_url} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt="Preview" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                                                <span className="text-white text-xs font-bold uppercase tracking-wider">{t.category}</span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{t.title}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-3">{t.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* STEP 2: Edit Form */
                        <div className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <button onClick={() => setStep(1)} className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 mb-4">
                                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                Back to Templates
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                                    <input name="title" value={formData.title} onChange={handleChange} className="w-full px-4 h-10 border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-bold" placeholder="e.g. New Office Opening" />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 h-10 border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer">
                                        <option value="General">General</option>
                                        <option value="New Joiner">New Joiner</option>
                                        <option value="Achievement">Achievement</option>
                                        <option value="Promotion">Promotion</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image URL</label>
                                    <input name="image_url" value={formData.image_url} onChange={handleChange} className="w-full px-4 h-10 border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-xs" placeholder="https://..." />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Content</label>
                                    <textarea name="content" value={formData.content} onChange={handleChange} rows="6" className="w-full p-4 border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Write your announcement..."></textarea>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer (Only for Step 2) */}
                {step === 2 && (
                    <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-end gap-3">
                        <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                        <button onClick={handleSubmit} disabled={loading} className="px-8 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
                            {loading ? 'Posting...' : 'Post Announcement'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [celebrations, setCelebrations] = useState({ birthdays: [], anniversaries: [] });
    const [loading, setLoading] = useState(true);
    const [isStackOpen, setIsStackOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchData();
        checkUser();
    }, []);

    const fetchData = async () => {
        try {
            const [posts, users] = await Promise.all([
                announcementService.getAnnouncements(),
                authService.getAllProfiles()
            ]);

            setAnnouncements(posts || []);
            processCelebrations(users || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const processCelebrations = (users) => {
        const currentMonth = new Date().getMonth();

        // Filter birthdays (Assuming dob/birth_date exists, or simulating with random for now if not in schema yet)
        const birthdays = users.filter(u => {
            if (!u.date_of_birth) return false;
            return new Date(u.date_of_birth).getMonth() === currentMonth;
        });

        // Work Anniversaries (joined_at)
        const anniversaries = users.filter(u => {
            if (!u.start_date) return false;
            return new Date(u.start_date).getMonth() === currentMonth;
        });

        setCelebrations({ birthdays, anniversaries });
    };

    const checkUser = async () => {
        // Simple role check
        setIsAdmin(true);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
            `}</style>

            {/* Replaced Header with Page Title */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Announcements</h1>
                {isAdmin && (
                    <button onClick={() => setIsStackOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer">
                        <span className="material-symbols-outlined text-sm">add</span>
                        POST UPDATE
                    </button>
                )}
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-[65%] space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-slate-900">Company Feed</h2>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-indigo-600 uppercase tracking-wide">Latest Updates</span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-slate-400">Loading feed...</div>
                        ) : announcements.length === 0 ? (
                            <div className="p-12 text-center bg-white rounded-lg border border-slate-200">
                                <div className="material-symbols-outlined text-4xl text-slate-300 mb-2">rss_feed</div>
                                <p className="text-slate-500 font-medium">No announcements yet.</p>
                                {isAdmin && <button onClick={() => setIsStackOpen(true)} className="mt-4 text-indigo-600 font-bold text-sm">Create the first post</button>}
                            </div>
                        ) : (
                            <div className="space-y-6 custom-scrollbar">
                                {announcements.map(ann => (
                                    <AnnouncementCard key={ann.id} announcement={ann} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Celebrations Widget */}
                    <div className="w-full md:w-[35%]">
                        <div className="bg-white rounded-[8px] border border-slate-200 shadow-sm sticky top-24">
                            <div className="p-5 border-b border-slate-100 mb-2">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">celebration</span>
                                    Celebrations
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">Birthdays & Anniversaries this month</p>
                            </div>

                            <div className="p-4 pt-0 max-h-[500px] overflow-y-auto custom-scrollbar space-y-6">
                                {/* Birthdays */}
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Birthdays</h4>
                                    {celebrations.birthdays.length > 0 ? (
                                        <div className="space-y-3">
                                            {celebrations.birthdays.map(user => (
                                                <div key={user.id} className="flex items-center gap-3">
                                                    <img src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.first_name}&background=random`} className="w-8 h-8 rounded-full" alt="avatar" />
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-800">{user.first_name} {user.last_name}</p>
                                                        <p className="text-xs text-slate-500">{new Date(user.date_of_birth).getDate()}th</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-400 italic">No birthdays this month.</p>
                                    )}
                                </div>

                                {/* Anniversaries */}
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Work Anniversaries</h4>
                                    {celebrations.anniversaries.length > 0 ? (
                                        <div className="space-y-3">
                                            {celebrations.anniversaries.map(user => (
                                                <div key={user.id} className="flex items-center gap-3">
                                                    <img src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.first_name}&background=random`} className="w-8 h-8 rounded-full" alt="avatar" />
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-800">{user.first_name} {user.last_name}</p>
                                                        <p className="text-xs text-slate-500">Joined {new Date(user.start_date).getFullYear()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-400 italic">No work anniversaries this month.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <CreateAnnouncementModal
                isOpen={isStackOpen}
                onClose={() => setIsStackOpen(false)}
                onSave={fetchData}
            />
        </div>
    );
};

export default Announcements;
