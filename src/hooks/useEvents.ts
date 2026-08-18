import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Event } from '../lib/types';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api
        .get<Event[]>('/events')
        .then((res) => setEvents(res.data))
        .catch(() => setError("Impossible de charger les évènements"))
        .finally(() => setLoading(false));
    }, []);

    return { events, loading, error };
}