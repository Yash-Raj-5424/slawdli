import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BarChart3,
  FileImage,
  ScanLine,
  TrendingUp,
} from 'lucide-react';
import { useReports } from '../hooks/useReports';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatDate, formatLabel } from '../utils/formatLabel';

export default function Dashboard() {
  const { reports } = useReports();
  const { user } = useAuth();
  const displayName = user?.name?.trim() || user?.username;

  const stats = useMemo(() => {
    const total = reports.length;
    const avgConfidence =
      total === 0 ? 0 : reports.reduce((sum, r) => sum + r.confidence, 0) / total;
    const latest = reports[0];
    const highConfidence = reports.filter((r) => r.confidence >= 0.8).length;

    return { total, avgConfidence, latest, highConfidence };
  }, [reports]);

  const statCards = [
    {
      icon: FileImage,
      label: 'Total scans',
      value: stats.total,
      accent: 'bg-teal-50 text-clinical-primary',
    },
    {
      icon: TrendingUp,
      label: 'Avg confidence',
      value: stats.total ? `${(stats.avgConfidence * 100).toFixed(1)}%` : '—',
      accent: 'bg-sky-50 text-clinical-secondary',
    },
    {
      icon: Activity,
      label: 'High confidence',
      value: stats.highConfidence,
      accent: 'bg-emerald-50 text-clinical-success',
    },
    {
      icon: BarChart3,
      label: 'Latest result',
      value: stats.latest ? formatLabel(stats.latest.prediction) : 'No scans yet',
      accent: 'bg-violet-50 text-violet-600',
      small: true,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-clinical-text">
            {displayName ? `Welcome back, ${displayName.split(' ')[0]}` : 'Dashboard'}
          </h1>
          <p className="mt-2 text-clinical-muted">
            Overview of your skin analysis activity and recent results.
          </p>
        </div>
        <Link to="/analyze">
          <Button>
            <ScanLine className="h-4 w-4" aria-hidden="true" />
            New analysis
          </Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ icon: Icon, label, value, accent, small }) => (
          <Card key={label} hover>
            <div className="flex items-start justify-between">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-4 text-sm text-clinical-muted">{label}</p>
            <p
              className={[
                'mt-1 font-bold text-clinical-text',
                small ? 'text-base leading-snug' : 'text-2xl',
              ].join(' ')}
            >
              {value}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-clinical-text">Recent reports</h2>
            {reports.length > 0 && (
              <Link
                to="/reports"
                className="inline-flex items-center gap-1 text-sm font-medium text-clinical-primary hover:underline"
              >
                View all
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          {reports.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-clinical-primary">
                <FileImage className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="font-medium text-clinical-text">No scans yet</p>
              <p className="mt-1 max-w-sm text-sm text-clinical-muted">
                Run your first analysis to see results and track your skin health over time.
              </p>
              <Link to="/analyze" className="mt-6">
                <Button size="sm">Start your first scan</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.slice(0, 5).map((report) => (
                <div
                  key={report.id}
                  className="flex items-center gap-4 rounded-lg border border-clinical-border p-3 transition-colors hover:bg-slate-50/80"
                >
                  <img
                    src={report.imageDataUrl}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-clinical-text">
                      {formatLabel(report.prediction)}
                    </p>
                    <p className="text-xs text-clinical-muted">{formatDate(report.createdAt)}</p>
                  </div>
                  <Badge variant="primary">{Math.round(report.confidence * 100)}%</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-clinical-text">Quick actions</h2>
          <div className="mt-4 space-y-3">
            <Link
              to="/analyze"
              className="flex items-center gap-3 rounded-lg border border-clinical-border p-4 transition-colors hover:border-teal-200 hover:bg-teal-50/50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-clinical-primary">
                <ScanLine className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-clinical-text">New analysis</p>
                <p className="text-xs text-clinical-muted">Upload and scan a photo</p>
              </div>
            </Link>
            <Link
              to="/reports"
              className="flex items-center gap-3 rounded-lg border border-clinical-border p-4 transition-colors hover:border-teal-200 hover:bg-teal-50/50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-clinical-secondary">
                <FileImage className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-clinical-text">View reports</p>
                <p className="text-xs text-clinical-muted">
                  {reports.length} saved {reports.length === 1 ? 'scan' : 'scans'}
                </p>
              </div>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-lg border border-clinical-border p-4 transition-colors hover:border-teal-200 hover:bg-teal-50/50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Activity className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-clinical-text">Edit profile</p>
                <p className="text-xs text-clinical-muted">Update your personal info</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
