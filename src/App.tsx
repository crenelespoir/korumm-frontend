import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEvents } from "./hooks/useEvents";
import { EventCard } from "./components/EventCard";

function EventsListPage() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return <div className="p-8 font-body text-slate">Chargement des événements…</div>;
  }

  if (error) {
    return <div className="p-8 font-body text-brick">{error}</div>;
  }

  if (events.length === 0) {
    return (
      <div className="p-8 font-body text-slate">
        Aucun événement publié pour l'instant.
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl text-brass-light mb-6">
        Événements à venir
      </h1>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function LoginPage() {
  return <div className="p-8 font-display text-2xl">Connexion organisateur (à venir)</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsListPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;