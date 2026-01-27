import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
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
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '', // Optional for single day
        allDay: false,
        description: '',
        type: 'event'
    });
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await eventService.getAllEvents();
            setEvents(data);
        } catch (error) {
            console.error("Failed to fetch events", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectSlot = ({ start, end }) => {
        setNewEvent({
            ...newEvent,
            start: format(start, "yyyy-MM-dd'T'HH:mm"),
            end: format(end, "yyyy-MM-dd'T'HH:mm"),
            allDay: false
        });
        setSelectedDate(start);
        setShowModal(true);
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
                color: '#5d55e7'
            });
            setShowModal(false);
            fetchEvents(); // Refresh
            // Reset form
            setNewEvent({ title: '', start: '', end: '', allDay: false, description: '', type: 'event' });
        } catch (error) {
            console.error("Failed to save event", error);
            alert("Failed to save event");
        }
    };

    // Custom Event Styling
    const eventStyleGetter = (event, start, end, isSelected) => {
        const backgroundColor = event.color || '#5d55e7';
        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#1a192b] border-b border-[#f1f0f4] dark:border-[#2a293a] flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-[#121117] dark:text-white font-display">Calendar</h1>
                    <p className="text-sm text-[#656487] dark:text-[#a0a0c0] font-medium mt-1">Manage schedules, events, and deadlines.</p>
                </div>
                <button
                    onClick={() => {
                        const now = new Date();
                        setNewEvent({
                            ...newEvent,
                            start: format(now, "yyyy-MM-dd'T'HH:mm"),
                            end: format(new Date(now.getTime() + 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm")
                        });
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-[#5d55e7] hover:bg-[#4a43cb] text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg shadow-[#5d55e7]/20"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Create Event
                </button>
            </header>

            <main className="flex-1 p-6 overflow-hidden">
                <div className="bg-white dark:bg-[#1a192b] rounded-xl shadow-sm border border-[#f1f0f4] dark:border-[#2a293a] h-full p-4">
                    <BigCalendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        selectable
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={(event) => alert(event.title + "\n" + (event.desc || ""))}
                        eventPropGetter={eventStyleGetter}
                        views={['month', 'week', 'day', 'agenda']}
                        defaultView='month'
                        className="custom-calendar text-[#121117] dark:text-white"
                    />
                </div>
            </main>

            {/* Create Event Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#1a192b] w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[#f1f0f4] dark:border-[#2a293a]">
                        <div className="px-6 py-4 border-b border-[#f1f0f4] dark:border-[#2a293a] flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#121117] dark:text-white">New Event</h3>
                            <button onClick={() => setShowModal(false)} className="text-[#656487] hover:text-[#121117] dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#656487] uppercase tracking-wider mb-1.5">Title</label>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#f1f0f4] dark:border-[#2a293a] bg-[#f8fafc] dark:bg-[#2a293a]/50 text-[#121117] dark:text-white focus:ring-2 focus:ring-[#5d55e7]/50 focus:border-[#5d55e7] outline-none transition-all placeholder:text-gray-400 font-medium"
                                    placeholder="Event Title"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#656487] uppercase tracking-wider mb-1.5">Start</label>
                                    <input
                                        type="datetime-local"
                                        value={newEvent.start}
                                        onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-lg border border-[#f1f0f4] dark:border-[#2a293a] bg-[#f8fafc] dark:bg-[#2a293a]/50 text-[#121117] dark:text-white text-sm focus:ring-2 focus:ring-[#5d55e7]/50 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#656487] uppercase tracking-wider mb-1.5">End</label>
                                    <input
                                        type="datetime-local"
                                        value={newEvent.end}
                                        onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-lg border border-[#f1f0f4] dark:border-[#2a293a] bg-[#f8fafc] dark:bg-[#2a293a]/50 text-[#121117] dark:text-white text-sm focus:ring-2 focus:ring-[#5d55e7]/50 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="allDay"
                                    checked={newEvent.allDay}
                                    onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                                    className="rounded border-gray-300 text-[#5d55e7] focus:ring-[#5d55e7]"
                                />
                                <label htmlFor="allDay" className="text-sm font-medium text-[#121117] dark:text-white">All Day Event</label>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#656487] uppercase tracking-wider mb-1.5">Description</label>
                                <textarea
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#f1f0f4] dark:border-[#2a293a] bg-[#f8fafc] dark:bg-[#2a293a]/50 text-[#121117] dark:text-white focus:ring-2 focus:ring-[#5d55e7]/50 focus:border-[#5d55e7] outline-none transition-all placeholder:text-gray-400 font-medium resize-none"
                                    rows="3"
                                    placeholder="Add details..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-[#f8fafc] dark:bg-[#2a293a]/50 border-t border-[#f1f0f4] dark:border-[#2a293a] flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-lg font-bold text-[#656487] hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEvent}
                                className="px-4 py-2 rounded-lg font-bold bg-[#5d55e7] text-white hover:bg-[#4a43cb] transition-colors shadow-lg shadow-[#5d55e7]/20 text-sm"
                            >
                                Save Event
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Override styles for Dark Mode support for Calendar */}
            <style>{`
                .rbc-calendar { font-family: inherit; }
                .rbc-toolbar button { color: inherit; }
                .rbc-toolbar button:active, .rbc-toolbar button.rbc-active { background-color: #5d55e7; color: white; }
                .dark .rbc-off-range-bg { background-color: #1a192b; opacity: 0.5; }
                .dark .rbc-today { background-color: rgba(93, 85, 231, 0.1); }
                .dark .rbc-header { color: white; border-bottom-color: #2a293a; }
                .dark .rbc-month-view, .dark .rbc-time-view, .dark .rbc-agenda-view { border-color: #2a293a; }
                .dark .rbc-day-bg { border-color: #2a293a; }
                .dark .rbc-off-range { color: #5a5a7a; }
            `}</style>
        </div>
    );
};

export default Calendar;
