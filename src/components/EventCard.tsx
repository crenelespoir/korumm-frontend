import type { Event } from '../lib/types';

export function EventCard({ event }: { event: Event }) {
  const date = new Date(event.dateEvenement).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex rounded-2xl overflow-hidden bg-dune text-ink max-w-md">
      <div className="flex-1 p-6">
        <div className="font-mono text-[11px] uppercase tracking-wider text-teal mb-2">
          {event.type === 'PAYANT' ? `${event.prix} FCFA` : 'Gratuit'}
        </div>
        <h3 className="font-display text-xl font-medium mb-1">{event.titre}</h3>
        <p className="text-sm text-[#5A5748] leading-relaxed">
          {date} · {event.lieu}
        </p>
        <div className="mt-3 text-xs text-[#5A5748]">
          {event.nombrePlaces} places
        </div>
      </div>

      <div className="w-px border-l-2 border-dashed border-[#C7BFA8]" />

      <div className="w-32 flex flex-col items-center justify-center gap-2 bg-dune-2 p-4">
        <div
          className="w-12 h-12 rounded"
          style={{
            background:
              'repeating-linear-gradient(90deg, #14182B 0 4px, transparent 4px 8px), repeating-linear-gradient(0deg, #14182B 0 4px, transparent 4px 8px)',
            backgroundBlendMode: 'multiply',
          }}
        />
        <span className="font-mono text-[10px] text-[#5A5748]">
          {event.id.slice(0, 8).toUpperCase()}
        </span>
      </div>
    </div>
  );
}