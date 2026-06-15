import { sortPredictions, formatLabel } from '../../utils/formatLabel';
import { ConfidenceBar } from './ConfidenceMeter';

export default function PredictionBreakdown({ allPredictions, topPrediction }) {
  const items = sortPredictions(allPredictions);

  if (!items.length) {
    return (
      <p className="text-sm text-clinical-muted">No detailed breakdown available.</p>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-clinical-muted">
        All predictions
      </h3>
      <div className="space-y-3">
        {items.map(({ label, confidence }) => (
          <ConfidenceBar
            key={label}
            label={formatLabel(label)}
            confidence={confidence}
            highlight={label === topPrediction}
          />
        ))}
      </div>
    </div>
  );
}
