import { useState } from 'react';
import { ChevronDown, ShieldCheck, Stethoscope, Upload, BarChart3 } from 'lucide-react';
import Card from '../components/ui/Card';

const STEPS = [
  {
    icon: Upload,
    title: 'Upload a photo',
    description: 'Choose a clear, well-lit image of the skin area you want analyzed.',
  },
  {
    icon: BarChart3,
    title: 'AI analyzes patterns',
    description: 'Our model evaluates visual features and returns confidence-scored predictions.',
  },
  {
    icon: Stethoscope,
    title: 'Review with a professional',
    description: 'Use results as a starting point and consult a dermatologist for diagnosis.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How accurate is the analysis?',
    answer:
      'Accuracy depends on image quality, lighting, and the underlying model. Slawdli is designed as an informational tool and should not replace professional medical evaluation.',
  },
  {
    question: 'Is my data stored on a server?',
    answer:
      'Images are sent to the analysis API for processing. Saved reports are stored locally in your browser only — they are not uploaded to a cloud account.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'JPEG, PNG, and WebP files up to 10 MB are supported.',
  },
  {
    question: 'Can this diagnose my condition?',
    answer:
      'No. Slawdli provides AI-assisted suggestions for informational purposes. Only a qualified healthcare provider can provide a medical diagnosis.',
  },
  {
    question: 'When should I see a doctor?',
    answer:
      'Seek professional care if you notice rapid changes, bleeding, persistent symptoms, or any concern about your skin health — regardless of what this tool shows.',
  },
  {
    question: 'Who built Slawdli?',
    answer:
      'Slawdli is a skin analysis demo application pairing a React frontend with a FastAPI backend and machine learning model.',
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-clinical-text">About Slawdli</h1>
        <p className="mt-4 text-lg leading-relaxed text-clinical-muted">
          Slawdli helps you explore possible skin conditions through AI-assisted image analysis.
          Upload a photo, review confidence-scored results, and save reports for your own reference.
        </p>
        <p className="mt-4 leading-relaxed text-clinical-muted">
          The tool is built for clarity and calm — designed to inform, not alarm. Always pair
          digital insights with care from a licensed healthcare professional.
        </p>
      </div>

      <Card className="mt-10 border-teal-100 bg-teal-50/30">
        <div className="flex gap-4">
          <ShieldCheck className="h-6 w-6 shrink-0 text-clinical-primary" aria-hidden="true" />
          <div>
            <h2 className="font-semibold text-clinical-text">Important disclaimer</h2>
            <p className="mt-2 text-sm leading-relaxed text-clinical-muted">
              Slawdli is not a medical device and does not provide medical advice, diagnosis, or
              treatment. Results may be incorrect. Do not delay seeking professional care based on
              this application.
            </p>
          </div>
        </div>
      </Card>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-clinical-text">How it works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, description }, index) => (
            <Card key={title} className="relative">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-clinical-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-clinical-primary">
                Step {index + 1}
              </span>
              <h3 className="mt-2 font-semibold text-clinical-text">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-clinical-muted">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-clinical-text">Frequently asked questions</h2>
        <div className="mt-6 space-y-3">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.question} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden p-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium text-clinical-text">{question}</span>
        <ChevronDown
          className={[
            'h-5 w-5 shrink-0 text-clinical-muted transition-transform duration-200',
            open ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="border-t border-clinical-border px-5 pb-4 pt-2">
          <p className="text-sm leading-relaxed text-clinical-muted">{answer}</p>
        </div>
      )}
    </Card>
  );
}
