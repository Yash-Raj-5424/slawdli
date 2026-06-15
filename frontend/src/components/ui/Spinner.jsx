export default function Spinner({ size = 'md', label = 'Loading' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
      <div
        className={[
          'animate-spin rounded-full border-clinical-border border-t-clinical-primary',
          sizes[size],
        ].join(' ')}
        aria-hidden="true"
      />
      {label && <span className="text-sm text-clinical-muted">{label}</span>}
    </div>
  );
}
