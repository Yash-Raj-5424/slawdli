import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import FormField, { inputClass } from '../../components/auth/FormField';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export default function CompleteProfile() {
  const { user, completeProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', gender: '', age: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true });
      return;
    }
    if (!authLoading && user?.profile_complete) {
      navigate('/dashboard', { replace: true });
      return;
    }
    if (user) {
      setForm({
        name: user.name || user.username || '',
        gender: user.gender || '',
        age: user.age ? String(user.age) : '',
      });
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!form.gender) return 'Please select your gender';
    const age = Number(form.age);
    if (!form.age || Number.isNaN(age) || age < 1 || age > 120) {
      return 'Please enter a valid age (1–120)';
    }
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
      await completeProfile({
        name: form.name.trim(),
        gender: form.gender,
        age: Number(form.age),
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Could not save your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return null;
  }

  return (
    <AuthLayout
      title="Complete your profile"
      subtitle="Tell us a bit more about yourself to personalize your experience"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          id="name"
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          autoComplete="name"
        />

        <FormField id="gender" label="Gender" name="gender">
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="age"
          label="Age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="25"
          min={1}
          max={120}
        />

        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-clinical-error" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          <UserCheck className="h-4 w-4" aria-hidden="true" />
          {loading ? 'Saving…' : 'Continue to dashboard'}
        </Button>
      </form>
    </AuthLayout>
  );
}
