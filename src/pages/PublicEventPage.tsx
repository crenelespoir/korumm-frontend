import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import type { Event } from '../lib/types';

export function PublicEventPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [participantNom, setParticipantNom] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [participantTel, setParticipantTel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ paymentUrl: string | null } | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get<Event>(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/participations', {
        eventId: id,
        participantNom,
        participantEmail,
        participantTel: participantTel || undefined,
      });

      if (res.data.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        setSuccess({ paymentUrl: null });
      }
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Impossible de s\'inscrire');
    } finally {
      setLoading(false);
    }
  }

  if (!event) return <div className="p-8 text-slate">Chargement…</div>;

  if (success) {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <h1 className="font-display text-2xl text-teal-light mb-2">Inscription confirmée</h1>
        <p className="text-slate mb-6">
          Tu recevras ton QR code d'entrée par email. À bientôt pour « {event.titre} ».
        </p>
        <Link to="/" className="font-mono text-xs text-brass-light hover:text-brass">
          ← Voir d'autres événements
        </Link>
      </div>
    );
  }

  const inputClass =
    'w-full mb-4 px-3 py-2 rounded bg-[#1D2238] border border-[#2C3350] text-dune focus:outline-none focus:border-brass';

  return (
    <div className="p-8 max-w-md mx-auto">
      <Link to="/" className="font-mono text-xs text-slate hover:text-brass-light mb-6 inline-block">
        ← Tous les événements
      </Link>

      <h1 className="font-display text-2xl text-brass-light mb-1">{event.titre}</h1>
      <p className="text-sm text-slate mb-1">{event.description}</p>
      <p className="text-sm text-slate mb-6">
        {event.lieu} · {new Date(event.dateEvenement).toLocaleDateString('fr-FR')}
        {event.type === 'PAYANT' && ` · ${event.prix} FCFA`}
      </p>

      <form onSubmit={handleSubmit}>
        <label className="block text-sm text-dune mb-1">Nom complet</label>
        <input
          value={participantNom}
          onChange={(e) => setParticipantNom(e.target.value)}
          required
          className={inputClass}
        />

        <label className="block text-sm text-dune mb-1">Email</label>
        <input
          type="email"
          value={participantEmail}
          onChange={(e) => setParticipantEmail(e.target.value)}
          required
          className={inputClass}
        />

        <label className="block text-sm text-dune mb-1">Téléphone (optionnel)</label>
        <input
          value={participantTel}
          onChange={(e) => setParticipantTel(e.target.value)}
          className={inputClass}
        />

        {error && <p className="text-brick text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-brass text-ink font-medium hover:bg-brass-light transition-colors disabled:opacity-50"
        >
          {loading
            ? 'Inscription…'
            : event.type === 'PAYANT'
              ? 'Continuer vers le paiement'
              : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}