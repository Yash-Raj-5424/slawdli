import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import FormField from '../../components/auth/FormField';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email';
    if (form.username.trim().length < 3) return 'Username must be at least 3 characters';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register({
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
      });
      navigate('/complete-profile', { replace: true });
    } catch (err) {
      const message = err.message || 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const emailAlreadyRegistered = error.toLowerCase().includes('already registered');

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register with email, username, and password"
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
          id="username"
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="johndoe"
          autoComplete="username"
        />

        <FormField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />

        <FormField
          id="confirmPassword"
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Repeat your password"
          autoComplete="new-password"
        />

        {error && (
          <div
            className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-clinical-error"
            role="alert"
          >
            <p>{error}</p>
            {emailAlreadyRegistered && (
              <Link to="/login" className="mt-2 inline-block font-medium text-clinical-primary hover:underline">
                Go to login →
              </Link>
            )}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-clinical-muted">
        Already registered?{' '}
        <Link to="/login" className="font-medium text-clinical-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
