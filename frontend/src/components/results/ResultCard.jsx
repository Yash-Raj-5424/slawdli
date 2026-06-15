import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ConfidenceMeter from './ConfidenceMeter';
import PredictionBreakdown from './PredictionBreakdown';
import { formatDate, formatLabel } from '../../utils/formatLabel';

export default function ResultCard({ result, timestamp, showDisclaimer = true }) {
  if (!result) return null;

  return (
    <Card className="animate-slide-up space-y-6" aria-live="polite">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-clinical-primary">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium text-clinical-muted">Primary result</p>
          <h2 className="mt-1 text-2xl font-bold text-clinical-text">
            {formatLabel(result.prediction)}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="primary">{Math.round(result.confidence * 100)}% confidence</Badge>
            {result.filename && (
              <span className="text-xs text-clinical-muted">{result.filename}</span>
            )}
            {timestamp && (
              <span className="text-xs text-clinical-muted">{formatDate(timestamp)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 border-y border-clinical-border py-6 sm:flex-row sm:items-start">
        <ConfidenceMeter confidence={result.confidence} />
        <div className="w-full flex-1">
          <PredictionBreakdown
            allPredictions={result.all_predictions}
            topPrediction={result.prediction}
          />
        </div>
      </div>

      {showDisclaimer && (
        <div className="flex gap-3 rounded-lg bg-slate-50 p-4">
          <AlertCircle className="h-5 w-5 shrink-0 text-clinical-secondary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-clinical-muted">
            This result is AI-generated and for informational purposes only. Please consult a
            dermatologist or healthcare provider for professional evaluation.
          </p>
        </div>
      )}
    </Card>
  );
}
