import { useEffect, useState } from 'react';
import api from '../lib/api';

export interface Participation {
  id: string;
  statut: 'INSCRIT' | 'PAYE' | 'PRESENT' | 'ANNULE';
  qrCode: string;
  qrScanneAt: string | null;
  createdAt: string;
  eventId: string;
  participantNom: string;
  participantEmail: string;
  participantTel: string | null;
}

export function useParticipations(eventId: string | undefined) {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;
    api
      .get<Participation[]>(`/participations/event/${eventId}`)
      .then((res) => setParticipations(res.data))
      .finally(() => setLoading(false));
  }, [eventId]);

  return { participations, loading };
}