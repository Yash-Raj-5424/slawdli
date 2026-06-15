import { useEffect, useState } from 'react';
import { checkHealth } from '../../api/predict';

export default function Footer() {
  const [healthy, setHealthy] = useState(null);

  useEffect(() => {
    checkHealth().then(setHealthy);
  }, []);

  return (
    <footer className="mt-auto border-t border-clinical-border bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="text-sm leading-relaxed text-clinical-muted">
          <strong className="font-medium text-clinical-text">Disclaimer:</strong> Slawdli
          provides AI-assisted analysis for informational purposes only. It is not a medical
          diagnosis. Always consult a qualified healthcare professional for health concerns.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-clinical-muted">
          <span>&copy; {new Date().getFullYear()} Slawdli</span>
          <span className="inline-flex items-center gap-2">
            <span
              className={[
                'h-2 w-2 rounded-full',
                healthy === null
                  ? 'bg-slate-300'
                  : healthy
                    ? 'bg-clinical-success'
                    : 'bg-clinical-warning',
              ].join(' ')}
              aria-hidden="true"
            />
            {healthy === null && 'Checking service…'}
            {healthy === true && 'Analysis service online'}
            {healthy === false && 'Analysis service offline'}
          </span>
        </div>
      </div>
    </footer>
  );
}
