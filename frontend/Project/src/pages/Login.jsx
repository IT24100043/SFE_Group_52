import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import { Spinner } from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { login } from '../api/authApi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  function validate() {
    const next = {};
    if (!email.trim()) next.email = 'Email is required.';
    if (!password) next.password = 'Password is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { user } = await login({ email: email.trim(), password });
      loginUser(user);
      toast.success(`Welcome back, ${user.username}!`);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ink-50">
      {/* Branding side */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-500 to-brand-800 text-white p-10">
        <Logo dark size="md" />
        <div>
          <h1 className="font-display text-3xl font-bold leading-tight max-w-sm">
            "Small progress every day adds up to big results."
          </h1>
          <p className="mt-4 text-white/80 max-w-sm">
            Come back and pick up right where you left off — your assignments, deadlines and progress are waiting.
          </p>
        </div>
        <p className="text-sm text-white/60">Plan Better. Study Smarter. Achieve More.</p>
      </div>

      {/* Form side */}
      <div className="relative flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
        <ThemeToggle className="absolute top-6 right-6 w-9 h-9" />
        <div className="lg:hidden mb-8">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <h2 className="font-display text-3xl font-extrabold text-ink-900 tracking-tight">Welcome back</h2>
          <p className="mt-2 text-base text-ink-600 font-medium">Log in to continue to your StudyWithMe dashboard.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-ink-800 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="you@gmail.com"
                  className={`w-full rounded-xl border bg-surface pl-10 pr-4 py-3 text-base text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:ring-2 focus:ring-brand-200 ${
                    errors.email ? 'border-rose-accent focus:border-rose-accent' : 'border-ink-300 focus:border-brand-400'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm font-semibold text-rose-accent">{errors.email}</p>}
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
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border bg-surface pl-10 pr-10 py-3 text-base text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:ring-2 focus:ring-brand-200 ${
                    errors.password ? 'border-rose-accent focus:border-rose-accent' : 'border-ink-300 focus:border-brand-400'
                  }`}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 text-base font-bold text-white shadow-md hover:bg-brand-600 transition-colors disabled:opacity-60"
            >
              {loading && <Spinner size={18} />}
              {loading ? 'Signing you in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-base font-medium text-ink-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
