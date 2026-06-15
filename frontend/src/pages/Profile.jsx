import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AtSign,
  CheckCircle2,
  FileImage,
  LogOut,
  ScanLine,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import FormField, { inputClass } from '../components/auth/FormField';
import { useReports } from '../hooks/useReports';
import { useAuth } from '../hooks/useAuth';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

function formatGender(value) {
  return GENDER_OPTIONS.find((o) => o.value === value)?.label || 'Not set';
}

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { reports } = useReports();
  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        gender: user.gender || '',
        age: user.age ? String(user.age) : '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
    setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!form.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email';
    if (!form.gender) return 'Please select your gender';
    const age = Number(form.age);
    if (!form.age || Number.isNaN(age) || age < 1 || age > 120) {
      return 'Please enter a valid age (1–120)';
    }
    return null;
  };

  const handleSave = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError('');

    try {
      await updateProfile({
        name: form.name.trim(),
        email: form.email.trim(),
        gender: form.gender,
        age: Number(form.age),
      });
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  const initials = form.name
    ? form.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : user?.username?.slice(0, 2).toUpperCase() || '?';

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-clinical-text">Profile</h1>
          <p className="mt-2 text-clinical-muted">
            View and edit your account details.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center text-center lg:col-span-1">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-sky-100 text-2xl font-bold text-clinical-primary">
            {initials}
          </span>
          <h2 className="mt-4 text-lg font-semibold text-clinical-text">
            {form.name || user?.username}
          </h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-clinical-muted">
            <AtSign className="h-3.5 w-3.5" aria-hidden="true" />
            {user?.username}
          </p>
          <div className="mt-6 w-full space-y-3 border-t border-clinical-border pt-6 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-clinical-muted">Gender</span>
              <span className="font-medium text-clinical-text">{formatGender(form.gender)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-clinical-muted">Age</span>
              <span className="font-medium text-clinical-text">{form.age || '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-clinical-muted">Saved scans</span>
              <Badge variant="primary">{reports.length}</Badge>
            </div>
          </div>
          <Link to="/analyze" className="mt-6 w-full">
            <Button variant="secondary" className="w-full">
              <ScanLine className="h-4 w-4" aria-hidden="true" />
              New analysis
            </Button>
          </Link>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-clinical-text">Account details</h2>
          <p className="mt-1 text-sm text-clinical-muted">
            All fields are editable. Changes are saved to your account.
          </p>

          <div className="mt-6 space-y-5">
            <FormField
              id="name"
              label="Full name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
            />

            <FormField
              id="email"
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
            />

            <FormField id="gender" label="Gender" name="gender">
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
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
              <p className="text-sm text-clinical-error" role="alert">
                {error}
              </p>
            )}

            {saved && (
              <p className="flex items-center gap-2 text-sm text-clinical-success">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Profile updated successfully
              </p>
            )}

            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </Card>
      </div>

      {reports.length > 0 && (
        <Card className="mt-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-clinical-primary">
              <FileImage className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium text-clinical-text">Activity summary</p>
              <p className="text-sm text-clinical-muted">
                You have {reports.length} saved {reports.length === 1 ? 'report' : 'reports'}.
              </p>
            </div>
            <Link to="/reports" className="ml-auto">
              <Button variant="ghost" size="sm">
                View reports
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
