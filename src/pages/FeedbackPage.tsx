import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';

export function FeedbackPage() {
  const { participationId } = useParams<{ participationId: string }>();
  const [note, setNote] = useState(5);
  const [commentaire, setCommentaire] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/feedbacks/evenement', {
        participationId,
        note,
        commentaire: commentaire || undefined,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Impossible d'envoyer ton avis");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <h1 className="font-display text-2xl text-teal-light mb-2">Merci !</h1>
        <p className="text-slate mb-6">Ton avis a bien été enregistré.</p>
        <Link to="/" className="font-mono text-xs text-brass-light hover:text-brass">
          ← Retour aux événements
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="font-display text-2xl text-brass-light mb-1">Ton avis compte</h1>
      <p className="text-sm text-slate mb-6">
        Quelques mots sur l'événement auquel tu viens de participer.
      </p>

      <form onSubmit={handleSubmit}>
        <label className="block text-sm text-dune mb-2">Note</label>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNote(n)}
              className={`w-10 h-10 rounded-full font-display transition-colors ${
                n <= note ? 'bg-brass text-ink' : 'bg-[#1D2238] text-slate'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <label className="block text-sm text-dune mb-1">Commentaire (optionnel)</label>
        <textarea
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          rows={4}
          className="w-full mb-4 px-3 py-2 rounded bg-[#1D2238] border border-[#2C3350] text-dune focus:outline-none focus:border-brass"
        />

        {error && <p className="text-brick text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-brass text-ink font-medium hover:bg-brass-light transition-colors disabled:opacity-50"
        >
          {loading ? 'Envoi…' : 'Envoyer mon avis'}
        </button>
      </form>
    </div>
  );
}