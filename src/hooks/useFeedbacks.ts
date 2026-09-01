import { useEffect, useState } from 'react';
import api from '../lib/api';

interface Feedback {
  id: string;
  type: 'EVENEMENT' | 'PLATEFORME';
  note: number | null;
  commentaire: string | null;
  createdAt: string;
  participation: {
    participantNom: string;
  };
}

export function useFeedbacks(eventId: string | undefined) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;
    api
      .get<Feedback[]>(`/feedbacks/event/${eventId}`)
      .then((res) => setFeedbacks(res.data))
      .finally(() => setLoading(false));
  }, [eventId]);

  return { feedbacks, loading };
}