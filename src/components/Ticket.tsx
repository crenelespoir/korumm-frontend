import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface TicketProps {
  participantNom: string;
  eventTitre: string;
  eventDate: string;
  eventLieu: string;
  qrCode: string;
  statut: string;
}

export const Ticket = forwardRef<HTMLDivElement, TicketProps>(function Ticket(
    { participantNom, eventTitre, eventDate, eventLieu, qrCode, statut }, ref,) {
  return (
    <div ref={ref} className="rounded-2xl overflow-hidden bg-dune text-ink max-w-sm mx-auto">
      <div className="p-6">
        <div className="font-mono text-[11px] uppercase tracking-wider text-teal mb-2">
          {statut === 'PAYE' || statut === 'INSCRIT' ? 'Billet confirmé' : statut}
        </div>
        <h2 className="font-display text-xl font-medium mb-1">{eventTitre}</h2>
        <p className="text-sm text-[#5A5748]">{eventDate} · {eventLieu}</p>
        <p className="text-sm text-[#5A5748] mt-2">{participantNom}</p>
      </div>

      <div className="border-t-2 border-dashed border-[#C7BFA8] p-6 flex flex-col items-center bg-dune-2">
        <div className="bg-white p-3 rounded-lg">
          <QRCodeSVG value={qrCode} size={160} />
        </div>
        <p className="font-mono text-[10px] text-[#5A5748] mt-3">
          Présente ce Ticket à l'entrée
        </p>
      </div>
    </div>
  );
});