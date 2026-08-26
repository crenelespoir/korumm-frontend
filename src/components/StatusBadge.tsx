const styles: Record<string, string> = {
  PRESENT: 'bg-teal/20 text-teal-light',
  PAYE: 'bg-brass/20 text-brass-light',
  INSCRIT: 'bg-slate/20 text-slate',
  ANNULE: 'bg-brick/20 text-brick',
};

export function StatusBadge({ statut }: { statut: string }) {
  return (
    <span
      className={`font-mono text-[10px] px-2 py-1 rounded-full uppercase tracking-wide ${styles[statut] ?? styles.INSCRIT}`}
    >
      {statut}
    </span>
  );
}