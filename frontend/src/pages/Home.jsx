import { useRef, useState } from 'react';
import { ArrowDown, BookmarkPlus, RefreshCw, ScanLine } from 'lucide-react';
import { predictImage } from '../api/predict';
import UploadZone from '../components/upload/UploadZone';
import ImagePreview from '../components/upload/ImagePreview';
import ResultCard from '../components/results/ResultCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { useReports } from '../hooks/useReports';
import { fileToDataUrl } from '../utils/formatLabel';

export default function Home() {
  const uploadRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState(null);
  const [resultTime, setResultTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const { addReport } = useReports();

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setResultTime(null);
    setError('');
    setSaved(false);
    const url = await fileToDataUrl(selectedFile);
    setPreviewUrl(url);
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl('');
    setResult(null);
    setResultTime(null);
    setError('');
    setSaved(false);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);
    setSaved(false);

    try {
      const data = await predictImage(file);
      setResult(data);
      setResultTime(new Date().toISOString());
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReport = async () => {
    if (!result || !previewUrl) return;
    addReport({
      filename: result.filename,
      prediction: result.prediction,
      confidence: result.confidence,
      all_predictions: result.all_predictions,
      imageDataUrl: previewUrl,
    });
    setSaved(true);
  };

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <section className="hero-gradient border-b border-clinical-border">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <BadgeHero />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-clinical-text sm:text-4xl">
              Understand your skin with AI-assisted analysis
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-clinical-muted">
              Upload a clear photo of the affected area and receive a confidence-scored
              assessment in seconds. For informational purposes only — not a medical diagnosis.
            </p>
            <Button size="lg" className="mt-8" onClick={scrollToUpload}>
              Start analysis
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section ref={uploadRef} className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-clinical-text">Upload your image</h2>
          <p className="mt-1 text-sm text-clinical-muted">
            Use good lighting and focus on the area of concern for best results.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <UploadZone onFileSelect={handleFileSelect} disabled={loading} />
          <div className="space-y-4">
            {previewUrl ? (
              <ImagePreview src={previewUrl} filename={file?.name} onClear={handleClear} />
            ) : (
              <Card className="flex min-h-[220px] items-center justify-center border-dashed bg-slate-50/50">
                <p className="text-sm text-clinical-muted">Your preview will appear here</p>
              </Card>
            )}

            {file && !loading && !result && (
              <Button size="lg" className="w-full" onClick={handleAnalyze}>
                <ScanLine className="h-4 w-4" aria-hidden="true" />
                Analyze image
              </Button>
            )}
          </div>
        </div>

        <div aria-live="polite" className="mt-8 space-y-6">
          {loading && (
            <Card className="flex justify-center py-12">
              <Spinner label="Analyzing your image…" />
            </Card>
          )}

          {error && (
            <Card className="border-rose-200 bg-rose-50/50" role="alert">
              <p className="font-medium text-clinical-error">Analysis failed</p>
              <p className="mt-1 text-sm text-clinical-muted">{error}</p>
              <Button variant="secondary" className="mt-4" onClick={handleAnalyze}>
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Try again
              </Button>
            </Card>
          )}

          {result && !loading && (
            <div className="space-y-4">
              <ResultCard result={result} timestamp={resultTime} />
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleSaveReport} disabled={saved}>
                  <BookmarkPlus className="h-4 w-4" aria-hidden="true" />
                  {saved ? 'Saved to reports' : 'Save to reports'}
                </Button>
                <Button variant="secondary" onClick={handleClear}>
                  Analyze another
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function BadgeHero() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-clinical-primary">
      <ScanLine className="h-4 w-4" aria-hidden="true" />
      Clinical-grade AI analysis
    </span>
  );
}
