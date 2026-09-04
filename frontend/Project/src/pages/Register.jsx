import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import { Spinner } from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { register } from '../api/authApi';

const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.username.trim()) next.username = 'Username is required.';
    else if (form.username.trim().length < 3) next.username = 'Username must be at least 3 characters.';

    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!GMAIL_REGEX.test(form.email.trim())) next.email = 'Please use a @gmail.com email address.';

    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters.';

    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { user } = await register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      loginUser(user);
      toast.success(`Welcome to StudyWithMe, ${user.username}! 🎉`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl border bg-surface pl-10 pr-4 py-3 text-base text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:ring-2 focus:ring-brand-200 ${
      errors[field] ? 'border-rose-accent focus:border-rose-accent' : 'border-ink-300 focus:border-brand-400'
    }`;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ink-50">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-500 to-brand-800 text-white p-10">
        <Logo dark size="md" />
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight max-w-md">
            Every completed task is one step closer to your goal.
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-sm font-medium">
            Join thousands of Sri Lankan university students turning chaotic deadlines into clear, manageable progress.
          </p>
        </div>
        <p className="text-base font-semibold text-white/70">Plan Better. Study Smarter. Achieve More.</p>
      </div>

      <div className="relative flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
        <ThemeToggle className="absolute top-6 right-6 w-9 h-9" />
        <div className="lg:hidden mb-8">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <h2 className="font-display text-3xl font-extrabold text-ink-900 tracking-tight">Create your account</h2>
          <p className="mt-2 text-base text-ink-600 font-medium">Start organizing your academic life today.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-ink-800 mb-2">
                Full Name / Username
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={(e) => set('username', e.target.value)}
                  placeholder="Nimasha Perera"
                  className={inputClass('username')}
                />
              </div>
              {errors.username && <p className="mt-2 text-sm font-semibold text-rose-accent">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-ink-800 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="you@gmail.com"
                  className={inputClass('email')}
                />
              </div>
              {errors.email ? (
                <p className="mt-2 text-sm font-semibold text-rose-accent">{errors.email}</p>
              ) : (
                <p className="mt-2 text-xs sm:text-sm font-medium text-ink-500">Only @gmail.com addresses are accepted.</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-ink-800 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  placeholder="Minimum 8 characters"
                  className={`${inputClass('password')} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm font-semibold text-rose-accent">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-ink-800 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => set('confirmPassword', e.target.value)}
                  placeholder="Re-enter password"
                  className={inputClass('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm font-semibold text-rose-accent">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 text-base font-bold text-white shadow-md hover:bg-brand-600 transition-colors disabled:opacity-60"
            >
              {loading && <Spinner size={18} />}
              {loading ? 'Creating your account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-base font-medium text-ink-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

