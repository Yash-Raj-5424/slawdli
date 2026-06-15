import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Clock,
  FileText,
  Lock,
  ScanLine,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AboutSection from '../components/landing/AboutSection';
import { useAuth } from '../hooks/useAuth';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI-powered insights',
    description:
      'Advanced machine learning evaluates visual patterns and returns confidence-scored predictions in seconds.',
  },
  {
    icon: Shield,
    title: 'Privacy-first design',
    description:
      'Saved reports stay in your browser. Your scan history is never uploaded to a cloud account.',
  },
  {
    icon: FileText,
    title: 'Report history',
    description:
      'Save and revisit past analyses. Track changes over time and share results with your dermatologist.',
  },
  {
    icon: Clock,
    title: 'Instant results',
    description:
      'No waiting rooms or appointments needed. Upload a photo and get feedback immediately.',
  },
];

const STATS = [
  { value: '< 5s', label: 'Average analysis time' },
  { value: '3', label: 'Supported image formats' },
  { value: '100%', label: 'Local report storage' },
];

export default function Landing() {
  const { user } = useAuth();
  const analyzePath = user ? '/analyze' : '/register';
  const analyzeLabel = user ? 'Start analysis' : 'Get started free';

  return (
    <div>
      {/* Hero */}
      <section className="landing-hero relative overflow-hidden border-b border-clinical-border">
        <div className="landing-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-1.5 text-sm font-medium text-clinical-primary backdrop-blur-sm">
              <ScanLine className="h-4 w-4" aria-hidden="true" />
              Clinical-grade AI skin analysis
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-clinical-text sm:text-5xl lg:text-6xl">
              Understand your skin with{' '}
              <span className="bg-gradient-to-r from-clinical-primary to-clinical-secondary bg-clip-text text-transparent">
                confidence
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-clinical-muted sm:text-xl">
              Upload a clear photo and receive AI-assisted analysis in seconds. Built for clarity
              and calm — designed to inform, not alarm.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to={analyzePath}>
                <Button size="lg" className="min-w-[180px]">
                  {analyzeLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <a href="#about">
                <Button variant="secondary" size="lg" className="min-w-[180px]">
                  Learn more
                </Button>
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-card border border-white/60 bg-white/70 px-6 py-5 text-center shadow-card backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-clinical-primary">{value}</p>
                <p className="mt-1 text-sm text-clinical-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-clinical-text">Why Slawdli?</h2>
          <p className="mt-3 text-clinical-muted">
            A thoughtful approach to skin health — fast, private, and easy to use.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title} hover className="group">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-sky-50 text-clinical-primary transition-transform duration-200 group-hover:scale-105">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-clinical-text">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-clinical-muted">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works preview */}
      <section className="border-y border-clinical-border bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-clinical-text">Three simple steps</h2>
              <p className="mt-4 leading-relaxed text-clinical-muted">
                From photo to insight in under a minute. No account required to get started.
              </p>
              <ol className="mt-8 space-y-6">
                {[
                  { step: '01', text: 'Upload a clear, well-lit photo of the affected area' },
                  { step: '02', text: 'Our AI model analyzes visual patterns and scores predictions' },
                  { step: '03', text: 'Review results and consult a professional for diagnosis' },
                ].map(({ step, text }) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-sm font-bold text-clinical-primary">
                      {step}
                    </span>
                    <p className="pt-2 text-clinical-muted">{text}</p>
                  </li>
                ))}
              </ol>
              <Link to={analyzePath} className="mt-8 inline-block">
                <Button>
                  Try it now
                  <Zap className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="landing-preview-card rounded-2xl border border-clinical-border bg-gradient-to-br from-teal-50/50 to-sky-50/50 p-8 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-clinical-primary text-white">
                    <BarChart3 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-clinical-muted">Sample result</p>
                    <p className="font-semibold text-clinical-text">Melanocytic nevi</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    { label: 'Melanocytic nevi', pct: 87 },
                    { label: 'Benign keratosis', pct: 8 },
                    { label: 'Dermatofibroma', pct: 3 },
                  ].map(({ label, pct }) => (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-clinical-muted">{label}</span>
                        <span className="font-medium text-clinical-text">{pct}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-clinical-primary to-clinical-secondary"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 flex items-center gap-2 text-xs text-clinical-muted">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  Illustrative preview — not a real diagnosis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-clinical-primary to-clinical-primary-dark p-0 text-white shadow-card-hover">
          <div className="px-8 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to analyze your skin?</h2>
            <p className="mx-auto mt-4 max-w-lg text-teal-50">
              Upload a photo and get AI-assisted insights in seconds. Free, private, and always
              available.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to={analyzePath}>
                <Button
                  size="lg"
                  className="min-w-[180px] bg-white text-clinical-primary hover:bg-teal-50"
                >
                  Start analysis
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="secondary"
                  size="lg"
                  className="min-w-[180px] border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  View dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* About + FAQ */}
      <section className="border-t border-clinical-border bg-slate-50/50">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <AboutSection />
        </div>
      </section>
    </div>
  );
}
