import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Event } from '../lib/types';
import { useParticipations } from '../hooks/useParticipations';
import { StatusBadge } from '../components/StatusBadge';

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const { participations, loading: loadingParticipations } = useParticipations(id);

  useEffect(() => {
    if (!id) return;
    api.get<Event>(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <div className="p-8 text-slate">Chargement…</div>;

  const presents = participations.filter((p) => p.statut === 'PRESENT').length;

  return (
    <div className="p-8 max-w-2xl">
      <button
        onClick={() => navigate('/dashboard')}
        className="font-mono text-xs text-slate hover:text-brass-light mb-6"
      >
        ← Retour au dashboard
      </button>

      <h1 className="font-display text-2xl text-brass-light mb-1">{event.titre}</h1>
      <p className="text-sm text-slate mb-6">
        {event.lieu} · {new Date(event.dateEvenement).toLocaleDateString('fr-FR')}
      </p>

      <div className="flex gap-6 mb-8">
        <div>
          <div className="font-display text-2xl text-dune">{participations.length}</div>
          <div className="font-mono text-[11px] text-slate uppercase">Inscrits</div>
        </div>
        <div>
          <div className="font-display text-2xl text-teal-light">{presents}</div>
          <div className="font-mono text-[11px] text-slate uppercase">Présents</div>
        </div>
        <div>
          <div className="font-display text-2xl text-dune">{event.nombrePlaces}</div>
          <div className="font-mono text-[11px] text-slate uppercase">Places</div>
        </div>
      </div>

      <Link
        to={`/dashboard/events/${id}/scan`}
        className="inline-block mb-8 font-mono text-xs px-4 py-2 rounded bg-brass text-ink hover:bg-brass-light transition-colors"
      >
        Scanner les entrées
      </Link>

      <h2 className="font-display text-lg text-dune mb-3">Participants</h2>

      {loadingParticipations && <p className="text-slate text-sm">Chargement…</p>}

      {!loadingParticipations && participations.length === 0 && (
        <p className="text-slate text-sm">Aucune inscription pour l'instant.</p>
      )}

      <div className="flex flex-col gap-2">
        {participations.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between bg-ink-2 rounded px-4 py-3"
          >
            <div>
              <div className="text-sm text-dune">{p.participantNom}</div>
              <div className="font-mono text-[11px] text-slate">{p.participantEmail}</div>
            </div>
            <StatusBadge statut={p.statut} />
          </div>
        ))}
      </div>
    </div>
  );
}