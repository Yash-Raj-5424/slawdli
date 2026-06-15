import { formatConfidence } from '../../utils/formatLabel';

export default function ConfidenceMeter({ confidence, size = 120 }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - confidence * circumference;
  const percentage = Math.round(confidence * 100);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Confidence: ${percentage} percent`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0D9488"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-clinical-text">{percentage}%</span>
        <span className="text-xs text-clinical-muted">confidence</span>
      </div>
    </div>
  );
}

export function ConfidenceBar({ label, confidence, highlight = false }) {
  const width = `${Math.round(confidence * 100)}%`;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className={highlight ? 'font-medium text-clinical-text' : 'text-clinical-muted'}>
          {label}
        </span>
        <span className="tabular-nums text-clinical-muted">{formatConfidence(confidence)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={[
            'h-full rounded-full transition-all duration-700 ease-out',
            highlight ? 'bg-clinical-primary' : 'bg-teal-300',
          ].join(' ')}
          style={{ width }}
        />
      </div>
    </div>
  );
}
