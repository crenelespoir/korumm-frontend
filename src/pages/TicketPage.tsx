import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import html2canvas from 'html2canvas';
import { Ticket } from '../components/Ticket';

interface ParticipationWithEvent {
  id: string;
  statut: string;
  qrCode: string;
  participantNom: string;
  event: {
    titre: string;
    lieu: string;
    dateEvenement: string;
    type: 'GRATUIT' | 'PAYANT';
  };
}

export function TicketPage() {
  const { id } = useParams<{ id: string }>();
  const [participation, setParticipation] = useState<ParticipationWithEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get<ParticipationWithEvent>(`/participations/${id}`)
      .then((res) => setParticipation(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDownload() {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      await document.fonts.ready;

      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: '#EDE7D8',
        useCORS: true,
      });

      const dataUrl = canvas.toDataURL('image/png');  
      const link = document.createElement('a');
      link.download = `korumm-billet-${participation?.event.titre.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  if (loading) return <div className="p-8 text-center text-slate">Chargement…</div>;
  if (!participation) return <div className="p-8 text-center text-brick">Billet introuvable.</div>;

  if (participation.event.type === 'PAYANT' && participation.statut === 'INSCRIT') {
    return (
      <div className="p-8 max-w-sm mx-auto text-center">
        <h1 className="font-display text-xl text-brass-light mb-2">Paiement en cours de confirmation</h1>
        <p className="text-sm text-slate mb-6">
          Ça peut prendre quelques instants. Actualise cette page dans un moment.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="font-mono text-xs px-4 py-2 rounded bg-brass text-ink hover:bg-brass-light"
        >
          Actualiser
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link to="/" className="font-mono text-xs text-slate hover:text-brass-light mb-6 inline-block">
        ← Tous les événements
      </Link>

      <Ticket
        ref={ticketRef}
        participantNom={participation.participantNom}
        eventTitre={participation.event.titre}
        eventDate={new Date(participation.event.dateEvenement).toLocaleDateString('fr-FR')}
        eventLieu={participation.event.lieu}
        qrCode={participation.qrCode}
        statut={participation.statut}
      />

      <div className="max-w-sm mx-auto mt-4">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-2 rounded bg-brass text-ink font-medium hover:bg-brass-light transition-colors disabled:opacity-50"
        >
          {downloading ? 'Génération…' : 'Télécharger le billet'}
        </button>
      </div>
    </div>
  );
}