import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import FormField from '../../components/auth/FormField';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login({
        email: form.email.trim(),
        password: form.password,
      });
      navigate(user.profile_complete ? from : '/complete-profile', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in with your registered email and password"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          id="email"
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <FormField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Your password"
          autoComplete="current-password"
        />

        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-clinical-error" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          <LogIn className="h-4 w-4" aria-hidden="true" />
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-clinical-muted">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-clinical-primary hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
