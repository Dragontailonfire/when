import { useState } from 'preact/hooks';
import './style.css';

interface Event {
    id: string;
    title: string;
    date: string;
}

export function Home() {
    const [events, setEvents] = useState<Event[]>([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(() => {
        const now = new Date();
        return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);
    });

    const handleSubmit = (e: Event | any) => {
        e.preventDefault();
        const newEvent: Event = {
            id: Date.now().toString(),
            title,
            date
        };
        setEvents([...events, newEvent]);
        setTitle('');
        setDate('');
    };

    return (
        <div class="home">
            <div class="event-form-container">
                <h1>Event Manager</h1>
                <form onSubmit={handleSubmit} class="event-form">
                    <div class="form-group">
                        <label htmlFor="title">Event Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            required
                            placeholder="Enter event title"
                        />
                    </div>
                    <div class="form-group">
                        <label htmlFor="date">Event Date:</label>
                        <input
                            type="datetime-local"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.currentTarget.value)}
                            required
                        />
                    </div>
                    <button type="submit">Add Event</button>
                </form>
            </div>

            <div class="events-container">
                <h2>Saved Events</h2>
                <div class="event-list">
                    {events.map(event => (
                        <div key={event.id} class="event-card">
                            <h3>{event.title}</h3>
                            <p>{new Date(event.date).toLocaleString()}</p>
                        </div>
                    ))}
                    {events.length === 0 && (
                        <p class="no-events">No events added yet. Add your first event!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
