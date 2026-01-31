import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import {
    format,
    parse,
    startOfWeek,
    getDay,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isToday,
    endOfWeek
} from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventService } from '../services/eventService';
import Loading from '../components/common/Loading';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const Calendar = () => {
    // Data State
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    // UI State
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [mainDate, setMainDate] = useState(new Date());
    const [view, setView] = useState('month');

    // Filters
    const [filters, setFilters] = useState({
        meetings: true,
        tasks: true,
        events: true,
        holidays: true
    });

    // Form State
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        allDay: false,
        description: '',
        type: 'event'
    });

    useEffect(() => {
        fetchEvents();

        // Real-time subscription for event updates
        const subscription = import('../supabaseClient').then(({ supabase }) => {
            return supabase
                .channel('public:meeting_participants')
                .on('postgres_changes', {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'meeting_participants'
                }, (payload) => {
                    console.log("Meeting status updated:", payload);
                    fetchEvents(); // Refresh calendar to show new status
                })
                .subscribe();
        });

        return () => {
            subscription.then(sub => sub.unsubscribe());
        };
    }, []);

    useEffect(() => {
        applyFilters();
    }, [events, filters]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await import('../supabaseClient').then(m => m.supabase.auth.getUser());
            setCurrentUser(user);

            const data = await eventService.getAllEvents();
            setEvents(data);
        } catch (error) {
            console.error("Failed to fetch events", error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        const filtered = events.filter(evt => {
            if (evt.type === 'meeting' && !filters.meetings) return false;
            if (evt.type === 'task' && !filters.tasks) return false;
            if (evt.type === 'event' && !filters.events) return false;
            if (evt.type === 'holiday' && !filters.holidays) return false;
            return true;
        });
        setFilteredEvents(filtered);
    };

    // Actions
    const handleSelectSlot = ({ start, end }) => {
        const startDateStr = format(start, "yyyy-MM-dd'T'HH:mm");
        const endDateStr = format(end, "yyyy-MM-dd'T'HH:mm");

        setNewEvent({
            ...newEvent,
            start: startDateStr,
            end: endDateStr,
            allDay: false,
            title: '',
            description: ''
        });
        setShowCreateModal(true);
    };

    const handleSaveEvent = async () => {
        if (!newEvent.title || !newEvent.start) return;

        try {
            await eventService.createEvent({
                title: newEvent.title,
                start_time: new Date(newEvent.start).toISOString(),
                end_time: newEvent.end ? new Date(newEvent.end).toISOString() : new Date(new Date(newEvent.start).getTime() + 60 * 60 * 1000).toISOString(),
                all_day: newEvent.allDay,
                description: newEvent.description,
                type: 'event',
                color: '#4F46E5'
            });
            setShowCreateModal(false);
            fetchEvents();
            setNewEvent({ title: '', start: '', end: '', allDay: false, description: '', type: 'event' });
        } catch (error) {
            console.error("Failed to save event", error);
            alert("Failed to save event");
        }
    };

    const handleDeleteEvent = async () => {
        if (!selectedEvent || selectedEvent.origin !== 'event') {
            alert("Cannot delete external events/tasks from here.");
            return;
        }

        if (confirm("Are you sure you want to delete this event?")) {
            try {
                const id = selectedEvent.id.split('-')[1];
                await eventService.deleteEvent(id);
                setSelectedEvent(null);
                fetchEvents();
            } catch (error) {
                console.error("Failed to delete event", error);
            }
        }
    };

    // Custom Components
    const eventStyleGetter = (event) => {
        let backgroundColor = event.color || '#4F46E5';
        if (event.type === 'meeting') backgroundColor = '#10b981';
        if (event.type === 'task') backgroundColor = '#f59e0b';
        if (event.type === 'holiday') backgroundColor = '#f43f5e';

        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.9,
                color: 'white',
                border: '0px',
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 'bold'
            }
        };
    };

    // Custom Toolbar Matching Image
    const CustomToolbar = (toolbar) => {
        const goToBack = () => {
            toolbar.onNavigate('PREV');
            setMainDate(subMonths(mainDate, 1));
        };
        const goToNext = () => {
            toolbar.onNavigate('NEXT');
            setMainDate(addMonths(mainDate, 1));
        };
        const goToCurrent = () => {
            toolbar.onNavigate('TODAY');
            setMainDate(new Date());
        };

        const label = () => {
            const date = toolbar.date;
            return <h2 className="text-2xl font-black text-[#0f0e1b] dark:text-white tracking-tight">{format(date, 'MMMM yyyy')}</h2>;
        };

        return (
            <div className="px-8 py-6 flex items-center justify-between bg-white dark:bg-[#1a192d] border-b border-border-light dark:border-[#2d2c44]">
                <div className="flex items-center gap-6">
                    {label()}
                    <div className="flex items-center bg-gray-100 dark:bg-[#2d2c44] rounded-lg p-1">
                        <button onClick={goToBack} className="p-1.5 hover:bg-white dark:hover:bg-[#3d3c5a] rounded-md transition-all text-gray-500 dark:text-gray-300">
                            <span className="material-symbols-outlined text-sm font-bold">arrow_back_ios_new</span>
                        </button>
                        <button onClick={goToCurrent} className="px-4 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#3d3c5a] rounded-md transition-all">Today</button>
                        <button onClick={goToNext} className="p-1.5 hover:bg-white dark:hover:bg-[#3d3c5a] rounded-md transition-all text-gray-500 dark:text-gray-300">
                            <span className="material-symbols-outlined text-sm font-bold">arrow_forward_ios</span>
                        </button>
                    </div>
                </div>
                <div className="flex bg-gray-100 dark:bg-[#2d2c44] rounded-lg p-1">
                    {['month', 'week', 'day', 'agenda'].map(v => (
                        <button
                            key={v}
                            onClick={() => {
                                setView(v);
                                toolbar.onView(v);
                            }}
                            className={`px-4 py-1.5 text-xs font-bold rounded-md capitalize transition-all ${view === v
                                ? 'bg-white text-primary shadow-sm dark:bg-[#3d3c5a] dark:text-white'
                                : 'text-gray-500 hover:text-primary'}`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) return <Loading />;

    return (
        <div className="flex h-full bg-background-light dark:bg-background-dark font-display overflow-hidden">
            {/* Sidebar (Filters Only - No Mini Calendar) */}
            <aside className="w-64 bg-white dark:bg-[#1a192d] border-r border-border-light dark:border-[#2d2c44] flex-none hidden xl:flex flex-col pt-8 px-6">
                <div className="flex flex-col gap-8">
                    {/* Create Button */}
                    <button
                        onClick={() => {
                            const now = new Date();
                            setNewEvent({
                                ...newEvent,
                                start: format(now, "yyyy-MM-dd'T'HH:mm"),
                                end: format(new Date(now.getTime() + 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm")
                            });
                            setShowCreateModal(true);
                        }}
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-xl">add</span>
                        Create Event
                    </button>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#545095] dark:text-gray-400">My Calendars</h3>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${filters.meetings ? 'bg-emerald-500' : 'border-2 border-gray-300'}`}>
                                    {filters.meetings && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}
                                </div>
                                <input type="checkbox" checked={filters.meetings} onChange={(e) => setFilters({ ...filters, meetings: e.target.checked })} className="hidden" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-500 transition-colors">Team Events</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${filters.tasks ? 'bg-indigo-500' : 'border-2 border-gray-300'}`}>
                                    {filters.tasks && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}
                                </div>
                                <input type="checkbox" checked={filters.tasks} onChange={(e) => setFilters({ ...filters, tasks: e.target.checked })} className="hidden" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-500 transition-colors">Sprint Deadlines</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${filters.events ? 'bg-gray-400' : 'border-2 border-gray-300'}`}>
                                    {filters.events && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}
                                </div>
                                <input type="checkbox" checked={filters.events} onChange={(e) => setFilters({ ...filters, events: e.target.checked })} className="hidden" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Personal</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${filters.holidays ? 'bg-amber-500' : 'border-2 border-gray-300'}`}>
                                    {filters.holidays && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}
                                </div>
                                <input type="checkbox" checked={filters.holidays} onChange={(e) => setFilters({ ...filters, holidays: e.target.checked })} className="hidden" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-500 transition-colors">Company Holidays</span>
                            </label>
                        </div>
                    </div>

                    {/* Optional: Upcoming Preview */}
                    <div className="flex flex-col gap-4 mt-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#545095] dark:text-gray-400">Next 48 Hours</h3>
                        <div className="flex flex-col gap-4">
                            {filteredEvents
                                .filter(e => new Date(e.start) > new Date() && new Date(e.start) < new Date(Date.now() + 48 * 60 * 60 * 1000))
                                .slice(0, 3)
                                .map(e => (
                                    <div key={e.id} className={`flex gap-3 items-start border-l-2 pl-3`} style={{ borderColor: e.color || '#4F46E5' }}>
                                        <div>
                                            <p className="text-sm font-bold text-[#0f0e1b] dark:text-white line-clamp-1">{e.title}</p>
                                            <p className="text-[11px] text-gray-500">{format(new Date(e.start), 'EEE, h:mm a')}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            {filteredEvents.filter(e => new Date(e.start) > new Date() && new Date(e.start) < new Date(Date.now() + 48 * 60 * 60 * 1000)).length === 0 && (
                                <p className="text-xs text-gray-400 italic">No upcoming events</p>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Calendar Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-white dark:bg-[#1a192d]">
                <div className="flex-1 overflow-hidden">
                    <BigCalendar
                        localizer={localizer}
                        events={filteredEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        scrollToTime={new Date(1970, 1, 1, 9)}
                        selectable
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={(event) => setSelectedEvent(event)}
                        eventPropGetter={eventStyleGetter}
                        components={{
                            toolbar: CustomToolbar
                        }}
                        date={mainDate}
                        onNavigate={setMainDate}
                        view={view}
                        onView={setView}
                        className="text-[#0f0e1b] dark:text-white border-none"
                    />
                </div>
            </main>

            {/* View Event Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#1a192d] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        {/* Modal Content - Same as before */}
                        <div className="px-6 py-5 border-b border-border-light dark:border-[#2d2c44] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedEvent.type === 'meeting' ? 'bg-emerald-100 text-emerald-600' :
                                    selectedEvent.type === 'task' ? 'bg-amber-100 text-amber-600' :
                                        selectedEvent.type === 'holiday' ? 'bg-rose-100 text-rose-600' :
                                            'bg-indigo-100 text-indigo-600'
                                    }`}>
                                    <span className="material-symbols-outlined">
                                        {selectedEvent.type === 'meeting' ? 'groups' :
                                            selectedEvent.type === 'task' ? 'check_circle' :
                                                selectedEvent.type === 'holiday' ? 'celebration' : 'event'}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#0f0e1b] dark:text-white leading-tight">{selectedEvent.title}</h2>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedEvent.type === 'meeting' ? 'text-emerald-600' :
                                        selectedEvent.type === 'task' ? 'text-amber-600' :
                                            'text-indigo-600'
                                        }`}>
                                        {selectedEvent.type}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-gray-400 mt-0.5">schedule</span>
                                <div>
                                    <p className="text-sm font-semibold text-[#0f0e1b] dark:text-white">{format(new Date(selectedEvent.start), 'EEEE, MMMM d, yyyy')}</p>
                                    <p className="text-sm text-[#545095] dark:text-gray-400 mt-0.5">
                                        {selectedEvent.allDay ? 'All Day' : `${format(new Date(selectedEvent.start), 'h:mm a')} - ${format(new Date(selectedEvent.end), 'h:mm a')}`}
                                    </p>
                                </div>
                            </div>

                            {selectedEvent.desc && (
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-gray-400 mt-0.5">description</span>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{selectedEvent.desc}</p>
                                </div>
                            )}

                            {/* Attendees Section for Meetings */}
                            {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] font-bold text-[#545095] dark:text-gray-400 uppercase tracking-widest mb-3">Attendees</h3>
                                    <div className="space-y-3">
                                        {selectedEvent.participants.map((p, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    {p.profiles?.avatar_url ? (
                                                        <div className="h-8 w-8 rounded-full bg-center bg-cover border-2 border-white dark:border-[#1a192d]" style={{ backgroundImage: `url("${p.profiles.avatar_url}")` }}></div>
                                                    ) : (
                                                        <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 text-[10px] font-bold">
                                                            {p.profiles?.first_name?.[0] || '?'}{p.profiles?.last_name?.[0] || ''}
                                                        </div>
                                                    )}
                                                    <span className="text-sm font-medium text-[#0f0e1b] dark:text-gray-200">
                                                        {p.profiles ? `${p.profiles.first_name} ${p.profiles.last_name}` : 'Unknown User'}
                                                    </span>
                                                </div>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'accepted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                    p.status === 'tentative' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                                        'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                                    }`}>
                                                    {p.status ? p.status.charAt(0).toUpperCase() + p.status.slice(1) : 'Pending'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Meeting Link */}
                            {selectedEvent.link && (
                                <div className="pt-4 border-t border-border-light dark:border-[#2d2c44]">
                                    <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-indigo-600">videocam</span>
                                            <div className="text-sm">
                                                <p className="font-bold text-indigo-900 dark:text-indigo-200">Video Call</p>
                                                <p className="text-indigo-600 dark:text-indigo-400 truncate max-w-[150px]">{selectedEvent.link}</p>
                                            </div>
                                        </div>
                                        <a href={selectedEvent.link} target="_blank" rel="noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">Join</a>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-4 bg-gray-50/50 dark:bg-[#24233a] flex items-center justify-between">
                            {selectedEvent.origin === 'event' ? (
                                <button onClick={handleDeleteEvent} className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                    Delete
                                </button>
                            ) : selectedEvent.origin === 'meeting' && currentUser ? (
                                (() => {
                                    // Check if I am a participant
                                    const myParticipantData = selectedEvent.participants?.find(p => p.user_id === currentUser.id);
                                    if (myParticipantData && myParticipantData.status !== 'accepted' && myParticipantData.status !== 'declined') {
                                        return (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            const meetingId = selectedEvent.id.split('-')[1];
                                                            await eventService.updateMeetingStatus(meetingId, 'accepted');
                                                            fetchEvents();
                                                            setSelectedEvent(null);
                                                        } catch (e) {
                                                            console.error(e);
                                                            alert("Failed to accept");
                                                        }
                                                    }}
                                                    className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-lg">check</span> Accept
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            const meetingId = selectedEvent.id.split('-')[1];
                                                            await eventService.updateMeetingStatus(meetingId, 'declined');
                                                            fetchEvents();
                                                            setSelectedEvent(null);
                                                        } catch (e) {
                                                            console.error(e);
                                                            alert("Failed to decline");
                                                        }
                                                    }}
                                                    className="flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-lg">close</span> Decline
                                                </button>
                                            </div>
                                        );
                                    } else if (myParticipantData) {
                                        return <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2"> You {myParticipantData.status} this</span>;
                                    }
                                    return <div></div>;
                                })()
                            ) : <div></div>}
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setSelectedEvent(null)} className="bg-white dark:bg-[#1a192d] border border-border-light dark:border-[#2d2c44] text-[#0f0e1b] dark:text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Event Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#1a192d] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-border-light dark:border-[#2d2c44] flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#0f0e1b] dark:text-white">New Event</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-[#545095] dark:text-gray-400 uppercase tracking-widest mb-2">Title</label>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    className="w-full bg-[#f8fafc] dark:bg-[#2d2c44] border-gray-200 dark:border-transparent rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    placeholder="Event Title"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-[#545095] dark:text-gray-400 uppercase tracking-widest mb-2">Start</label>
                                    <div className="relative">
                                        <input
                                            type="datetime-local"
                                            value={newEvent.start}
                                            onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                                            className="w-full bg-[#f8fafc] dark:bg-[#2d2c44] border-gray-200 dark:border-transparent rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-[#545095] dark:text-gray-400 uppercase tracking-widest mb-2">End</label>
                                    <div className="relative">
                                        <input
                                            type="datetime-local"
                                            value={newEvent.end}
                                            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                                            className="w-full bg-[#f8fafc] dark:bg-[#2d2c44] border-gray-200 dark:border-transparent rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    id="allDay"
                                    type="checkbox"
                                    checked={newEvent.allDay}
                                    onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <label className="text-sm font-semibold text-[#0f0e1b] dark:text-gray-200" htmlFor="allDay">All Day Event</label>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-[#545095] dark:text-gray-400 uppercase tracking-widest mb-2">Description</label>
                                <textarea
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    className="w-full bg-[#f8fafc] dark:bg-[#2d2c44] border-gray-200 dark:border-transparent rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none outline-none"
                                    placeholder="Add details..."
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50/50 dark:bg-[#24233a] flex items-center justify-end gap-6">
                            <button onClick={() => setShowCreateModal(false)} className="text-sm font-bold text-gray-500 hover:text-[#0f0e1b] dark:hover:text-white transition-colors">Cancel</button>
                            <button onClick={handleSaveEvent} className="bg-primary text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:bg-opacity-90 transition-all">Save Event</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .rbc-calendar { font-family: inherit; border: none; }
                .rbc-header {
                     border-bottom: 2px solid #f1f5f9;
                     padding: 16px 0;
                     font-size: 11px;
                     font-weight: 800;
                     text-transform: uppercase;
                     letter-spacing: 0.1em;
                     color: #656487;
                     background: #fff;
                }
                .dark .rbc-header { border-bottom-color: #2d2c44; color: #a0a0c0; background: #1a192d; }
                .rbc-month-view { border: none; }
                .rbc-day-bg { border-right: 1px solid #f1f5f9; }
                .dark .rbc-day-bg { border-right-color: #2d2c44; }
                .rbc-month-row { border-bottom: 1px solid #f1f5f9; }
                .dark .rbc-month-row { border-bottom-color: #2d2c44; }
                .rbc-off-range-bg { background-color: #f8fafc; }
                .dark .rbc-off-range-bg { background-color: #1a192b; opacity: 0.5; }
                .rbc-today { background-color: transparent; }
                .rbc-date-cell { padding: 12px; font-weight: 600; font-size: 0.85rem; color: #1e293b; }
                .dark .rbc-date-cell { color: #cbd5e1; }
                .rbc-now .rbc-date-cell { color: #4F46E5; }
                .rbc-event { border-radius: 4px; padding: 4px 8px; font-size: 11px; font-weight: 600; }
                .rbc-toolbar { display: none; }
            `}</style>
        </div>
    );
};

export default Calendar;
