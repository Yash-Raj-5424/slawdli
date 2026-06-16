import { Link, NavLink } from 'react-router-dom';
import { LogIn, LogOut, Menu, Scan, User, X } from 'lucide-react';
import { useState } from 'react';
import { NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    [
      'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
      isActive
        ? 'bg-teal-50 text-clinical-primary'
        : 'text-clinical-muted hover:bg-slate-100 hover:text-clinical-text',
    ].join(' ');

  const visibleLinks = user
    ? NAV_LINKS
    : NAV_LINKS.filter(({ to }) => to === '/' || to === '/analyze');

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
          {visibleLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass} end={to === '/'}>
              {label}
            </NavLink>
          ))}

          {user ? (
            <div className="ml-2 flex items-center gap-2 border-l border-clinical-border pl-3">
              <NavLink to="/profile" className={linkClass}>
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" aria-hidden="true" />
                  {user.name?.split(' ')[0] || user.username}
                </span>
              </NavLink>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign out
              </Button>
            </div>
          ) : (
            <div className="ml-2 flex items-center gap-2 border-l border-clinical-border pl-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
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
            {visibleLinks.map(({ to, label }) => (
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
            {user ? (
              <>
                <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>
                  Profile
                </NavLink>
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-clinical-muted hover:bg-slate-100"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" size="sm" className="mt-2 w-full">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button size="sm" className="mt-2 w-full">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
