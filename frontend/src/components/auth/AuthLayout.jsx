import { Link } from 'react-router-dom';
import { Scan } from 'lucide-react';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="landing-hero flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6">
      <div className="landing-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold text-clinical-text">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-clinical-primary">
              <Scan className="h-5 w-5" aria-hidden="true" />
            </span>
            Slawdli
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-clinical-text">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-clinical-muted">{subtitle}</p>}
        </div>
        <div className="rounded-card border border-clinical-border bg-white p-6 shadow-card sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
