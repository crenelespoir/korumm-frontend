import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEvents } from '../hooks/useEvents';
import { EventCard } from '../components/EventCard';

export function DashboardPage() {
  const { logout } = useAuth();
  const { events, loading, error } = useEvents();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-2xl text-brass-light">Dashboard organisateur</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/events/new')}
            className="font-mono text-xs px-4 py-2 rounded bg-brass text-ink hover:bg-brass-light transition-colors"
          >
            + Nouvel événement
          </button>
          <button
            onClick={handleLogout}
            className="font-mono text-xs text-slate hover:text-brick transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </div>

      {loading && <p className="text-slate">Chargement…</p>}
      {error && <p className="text-brick">{error}</p>}
      {!loading && events.length === 0 && (
        <p className="text-slate">Tu n'as encore créé aucun événement.</p>
      )}

      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => navigate(`/dashboard/events/${event.id}`)}
            className="text-left"
          >
            <EventCard event={event} />
          </button>
        ))}
      </div>
    </div>
  );
}