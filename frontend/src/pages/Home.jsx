import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Activity,
  UserCheck,
  CheckCircle,
  ScanEye,
  FileBarChart2,
  Lock,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Home() {
  const { user } = useAuth();
  const startAnalysisPath = user ? '/analyze' : '/login';

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-clinical-bg">
      {/* Hero section */}
      <section className="landing-hero landing-hero-glow border-b border-clinical-border py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Text & Actions */}
            <div className="space-y-6 lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-clinical-primary animate-fade-in">
                <Sparkles className="h-3.5 w-3.5" />
                Version 1.0 Active
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-clinical-text sm:text-5xl md:text-6xl !leading-tight">
                Clinical-grade <br />
                <span className="bg-gradient-to-r from-clinical-primary to-clinical-secondary bg-clip-text text-transparent">
                  AI skin analysis
                </span>
                <br />
                in seconds.
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-clinical-muted">
                Gain instant, private insights into skin anomalies. Upload a photo to receive a
                confidence-scored classification. Informative, safe, and designed to bring peace
                of mind.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to={startAnalysisPath}>
                  <Button size="lg" className="shadow-lg shadow-teal-600/10">
                    Start Analysis
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" onClick={scrollToHowItWorks}>
                  Learn How it Works
                </Button>
              </div>
            </div>

            {/* Right Column: Floating Mock Interface Preview */}
            <div className="lg:col-span-5">
              <div className="landing-preview-card relative rounded-2xl border border-clinical-border bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                {/* Visual indicator of analysis */}
                <div className="flex items-center justify-between border-b border-clinical-border pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-clinical-primary">
                      <ScanEye className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-clinical-text">Analysis Preview</p>
                      <p className="text-xs text-clinical-muted">Neural Network Output</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-clinical-success">
                    Active Session
                  </span>
                </div>

                {/* Mock Image & Detection overlay */}
                <div className="relative mt-4 overflow-hidden rounded-lg bg-slate-50 border border-clinical-border aspect-[4/3] flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full border-4 border-dashed border-clinical-primary/40 animate-spin [animation-duration:15s]" />
                  </div>
                  <div className="absolute rounded-lg border border-clinical-primary bg-white/95 px-3 py-1.5 text-xs font-semibold text-clinical-primary shadow-sm flex items-center gap-1.5 animate-pulse">
                    <Activity className="h-3.5 w-3.5" />
                    Scanning features...
                  </div>
                </div>

                {/* Mock Results */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-clinical-text">Benign Pattern</span>
                    <span className="text-sm font-bold text-clinical-primary">94.8% confidence</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-clinical-primary" style={{ width: '94.8%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core benefits section */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-clinical-text sm:text-3xl">
            Why choose Slawdli?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-clinical-muted">
            Our platform brings simplicity and security to early skin evaluation, letting you stay
            proactive without the stress.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Card hover className="p-6 space-y-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-clinical-primary">
              <ScanEye className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-clinical-text">AI-Driven Insights</h3>
            <p className="text-sm leading-relaxed text-clinical-muted">
              Instantly checks skin features against thousands of reference patterns for benign,
              precancerous, and malignant classifications.
            </p>
          </Card>

          <Card hover className="p-6 space-y-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-clinical-secondary">
              <Lock className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-clinical-text">Guaranteed Privacy</h3>
            <p className="text-sm leading-relaxed text-clinical-muted">
              We process your photos on-the-fly and never store them. Saved reports stay inside your
              browser's secure local storage.
            </p>
          </Card>

          <Card hover className="p-6 space-y-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-clinical-success">
              <FileBarChart2 className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-clinical-text">Track Progress</h3>
            <p className="text-sm leading-relaxed text-clinical-muted">
              Organize previous scans in a detailed dashboard so you can monitor potential changes over
              time and consult professionals.
            </p>
          </Card>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="border-t border-clinical-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-clinical-text sm:text-3xl">
              How the analysis works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-clinical-muted">
              Follow three simple steps to check your skin anomalies and log the details.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3 relative">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 border border-clinical-border text-lg font-bold text-clinical-text">
                01
              </div>
              <h3 className="font-bold text-clinical-text">Upload Skin Photo</h3>
              <p className="text-sm leading-relaxed text-clinical-muted">
                Take a clear, focused photo of the area under good lighting and upload it.
              </p>
            </div>

            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 border border-teal-100 text-lg font-bold text-clinical-primary">
                02
              </div>
              <h3 className="font-bold text-clinical-text">Wait For AI Diagnostic</h3>
              <p className="text-sm leading-relaxed text-clinical-muted">
                The neural network processes the image structure and estimates categories in seconds.
              </p>
            </div>

            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 border border-clinical-border text-lg font-bold text-clinical-text">
                03
              </div>
              <h3 className="font-bold text-clinical-text">Save & Share</h3>
              <p className="text-sm leading-relaxed text-clinical-muted">
                Save the generated breakdown to your reports dashboard for doctor visits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics and Trust banner */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-clinical-border bg-gradient-to-br from-teal-50/20 to-sky-50/20 p-8 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div className="space-y-1">
              <p className="text-4xl font-extrabold text-clinical-primary">94.2%</p>
              <p className="text-sm font-semibold text-clinical-text">Validation Accuracy</p>
              <p className="text-xs text-clinical-muted">Trained on HAM10000 set</p>
            </div>
            <div className="space-y-1 border-clinical-border sm:border-x">
              <p className="text-4xl font-extrabold text-clinical-secondary">&lt; 3s</p>
              <p className="text-sm font-semibold text-clinical-text">Average Speed</p>
              <p className="text-xs text-clinical-muted">Fast server response</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-extrabold text-teal-600">100%</p>
              <p className="text-sm font-semibold text-clinical-text">Local Data Privacy</p>
              <p className="text-xs text-clinical-muted">No cloud-sync required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer and prompt section */}
      <section className="border-t border-clinical-border bg-white py-16 text-center">
        <div className="mx-auto max-w-xl px-4">
          <ShieldAlert className="mx-auto h-8 w-8 text-clinical-warning" />
          <h2 className="mt-4 text-xl font-bold text-clinical-text">Important Safety Notice</h2>
          <p className="mt-2 text-sm leading-relaxed text-clinical-muted">
            Slawdli is designed for informational purposes only. It is not a replacement for
            professional medical advice, diagnosis, or treatment. Always consult a dermatologist
            regarding any skin changes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to={startAnalysisPath}>
              <Button size="lg">Analyze Now</Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary" size="lg">Read FAQ</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
