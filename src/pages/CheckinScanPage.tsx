import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import api from '../lib/api';

interface ScanResult {
  success: boolean;
  message: string;
  participant?: { nom: string; email: string };
  evenement?: string;
}

export function CheckinScanPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader');
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => handleScan(decodedText),
        () => {}, // erreurs de frame ignorées, normal — la plupart des frames n'ont pas de QR dedans
      )
      .catch(() => {
        setResult({ success: false, message: 'Impossible d\'accéder à la caméra' });
      });

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  async function handleScan(qrCode: string) {
    if (!scanning) return; // évite les doubles déclenchements sur la même frame
    setScanning(false);
    scannerRef.current?.pause();

    try {
      const res = await api.post('/checkin/scan', { qrCode });
      setResult({
        success: true,
        message: res.data.message,
        participant: res.data.participant,
        evenement: res.data.evenement,
      });
    } catch (err: any) {
      setResult({
        success: false,
        message: err.response?.data?.message ?? 'QR code invalide',
      });
    }
  }

  function scanSuivant() {
    setResult(null);
    setScanning(true);
    scannerRef.current?.resume();
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <button
        onClick={() => navigate(`/dashboard/events/${id}`)}
        className="font-mono text-xs text-slate hover:text-brass-light mb-6"
      >
        ← Retour à l'événement
      </button>

      <h1 className="font-display text-2xl text-brass-light mb-6">Scanner une entrée</h1>

      <div id="qr-reader" className="rounded-2xl overflow-hidden mb-6" />

      {result && (
        <div
          className={`rounded-xl p-5 mb-4 ${
            result.success ? 'bg-teal/15 border border-teal' : 'bg-brick/15 border border-brick'
          }`}
        >
          <p className={`font-display text-lg mb-1 ${result.success ? 'text-teal-light' : 'text-brick'}`}>
            {result.success ? 'Entrée validée' : 'Refusé'}
          </p>
          <p className="text-sm text-dune">{result.message}</p>
          {result.participant && (
            <p className="text-sm text-slate mt-2">
              {result.participant.nom} · {result.participant.email}
            </p>
          )}
        </div>
      )}

      {result && (
        <button
          onClick={scanSuivant}
          className="w-full py-2 rounded bg-brass text-ink font-medium hover:bg-brass-light transition-colors"
        >
          Scanner le suivant
        </button>
      )}
    </div>
  );
}