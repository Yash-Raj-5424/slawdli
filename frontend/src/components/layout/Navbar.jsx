import { Link, NavLink } from 'react-router-dom';
import { Menu, Scan, X } from 'lucide-react';
import { useState } from 'react';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    [
      'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
      isActive
        ? 'bg-teal-50 text-clinical-primary'
        : 'text-clinical-muted hover:bg-slate-100 hover:text-clinical-text',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-clinical-border bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-clinical-text">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-clinical-primary">
            <Scan className="h-5 w-5" aria-hidden="true" />
          </span>
          Slawdli
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-clinical-muted hover:bg-slate-100 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-clinical-border bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={linkClass}
                end={to === '/'}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
