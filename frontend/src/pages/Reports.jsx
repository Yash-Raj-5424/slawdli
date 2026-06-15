import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, FileImage, Trash2 } from 'lucide-react';
import ResultCard from '../components/results/ResultCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useReports } from '../hooks/useReports';
import { formatDate, formatLabel } from '../utils/formatLabel';

export default function Reports() {
  const { reports, deleteReport, clearReports } = useReports();
  const [expandedId, setExpandedId] = useState(null);

  if (!reports.length) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <Card className="flex flex-col items-center py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-clinical-primary">
            <FileImage className="h-10 w-10" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-clinical-text">No scans yet</h1>
          <p className="mt-2 max-w-md text-clinical-muted">
            Your saved analyses will appear here. Run your first scan and save the results.
          </p>
          <Link to="/analyze" className="mt-8 inline-block">
            <Button>Start analysis</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleClearAll = () => {
    if (window.confirm('Delete all saved reports? This cannot be undone.')) {
      clearReports();
      setExpandedId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-clinical-text">Reports</h1>
          <p className="mt-1 text-sm text-clinical-muted">
            {reports.length} saved {reports.length === 1 ? 'scan' : 'scans'} stored in your browser
          </p>
        </div>
        <Button variant="danger" size="sm" onClick={handleClearAll}>
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear all
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => {
          const expanded = expandedId === report.id;
          return (
            <Card key={report.id} hover className="overflow-hidden p-0">
              <button
                type="button"
                className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                aria-expanded={expanded}
                onClick={() => setExpandedId(expanded ? null : report.id)}
              >
                <img
                  src={report.imageDataUrl}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-clinical-text">
                    {formatLabel(report.prediction)}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant="primary">
                      {Math.round(report.confidence * 100)}% confidence
                    </Badge>
                    <span className="text-xs text-clinical-muted">
                      {formatDate(report.createdAt)}
                    </span>
                  </div>
                </div>
                {expanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-clinical-muted" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-clinical-muted" />
                )}
              </button>

              {expanded && (
                <div className="border-t border-clinical-border p-4 sm:p-5">
                  <ResultCard
                    result={{
                      filename: report.filename,
                      prediction: report.prediction,
                      confidence: report.confidence,
                      all_predictions: report.all_predictions,
                    }}
                    timestamp={report.createdAt}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      deleteReport(report.id);
                      if (expandedId === report.id) setExpandedId(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Delete report
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
