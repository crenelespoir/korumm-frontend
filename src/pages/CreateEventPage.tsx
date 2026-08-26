import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export function CreateEventPage() {
  const navigate = useNavigate();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');
  const [dateEvenement, setDateEvenement] = useState('');
  const [nombrePlaces, setNombrePlaces] = useState(20);
  const [type, setType] = useState<'GRATUIT' | 'PAYANT'>('GRATUIT');
  const [prix, setPrix] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/events', {
        titre,
        description,
        lieu,
        dateEvenement: new Date(dateEvenement).toISOString(),
        nombrePlaces: Number(nombrePlaces),
        type,
        ...(type === 'PAYANT' ? { prix: Number(prix) } : {}),
      });
      navigate('/dashboard');
    } catch {
      setError("Impossible de créer l'événement, vérifie les champs");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full mb-4 px-3 py-2 rounded bg-[#1D2238] border border-[#2C3350] text-dune focus:outline-none focus:border-brass';
  const labelClass = 'block text-sm text-dune mb-1';

  return (
    <div className="p-8 max-w-lg">
      <h1 className="font-display text-2xl text-brass-light mb-6">Nouvel événement</h1>

      <form onSubmit={handleSubmit}>
        <label className={labelClass}>Titre</label>
        <input
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
          className={inputClass}
        />

        <label className={labelClass}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className={inputClass}
        />

        <label className={labelClass}>Lieu</label>
        <input
          value={lieu}
          onChange={(e) => setLieu(e.target.value)}
          required
          className={inputClass}
        />

        <label className={labelClass}>Date et heure</label>
        <input
          type="datetime-local"
          value={dateEvenement}
          onChange={(e) => setDateEvenement(e.target.value)}
          required
          className={inputClass}
        />

        <label className={labelClass}>Nombre de places</label>
        <input
          type="number"
          min={1}
          value={nombrePlaces}
          onChange={(e) => setNombrePlaces(Number(e.target.value))}
          required
          className={inputClass}
        />

        <label className={labelClass}>Type d'événement</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'GRATUIT' | 'PAYANT')}
          className={inputClass}
        >
          <option value="GRATUIT">Gratuit</option>
          <option value="PAYANT">Payant</option>
        </select>

        {type === 'PAYANT' && (
          <>
            <label className={labelClass}>Prix (FCFA)</label>
            <input
              type="number"
              min={1}
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              required
              className={inputClass}
            />
          </>
        )}

        {error && <p className="text-brick text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-brass text-ink font-medium hover:bg-brass-light transition-colors disabled:opacity-50"
        >
          {loading ? 'Création…' : "Créer l'événement"}
        </button>
      </form>
    </div>
  );
}